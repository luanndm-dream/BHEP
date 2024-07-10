import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  PurchaseError,
  requestPurchase,
  requestSubscription,
  useIAP,
  validateReceiptIos,
  finishTransaction,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  SubscriptionPurchase,
  ProductPurchase,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';

const errorLog = ({ message, error }) => {
  console.error('An error happened', message, error);
};

const isIos = Platform.OS === 'ios';

// Product IDs from App Store Connect app -> subscriptions
const subscriptionSkus = Platform.select({
  ios: ['personalService3Month'],
});

const App = () => {
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
    purchaseHistory,
    getPurchaseHistory,
  } = useIAP();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupIAPListeners = async () => {
      try {
        await initConnection();
        await flushFailedPurchasesCachedAsPendingAndroid();

        const purchaseUpdateSubscription = purchaseUpdatedListener(
          (purchase: SubscriptionPurchase | ProductPurchase) => {
            console.log('purchaseUpdatedListener', purchase);
            const receipt = purchase.transactionReceipt;
            if (receipt && isIos) {
              const isTestEnvironment = __DEV__;
              validateReceiptIos({
                receiptBody: { 'receipt-data': receipt },
                isTest: isTestEnvironment,
              }).then(async (appleReceiptResponse) => {
                if (appleReceiptResponse?.status === 0) {
                  await finishTransaction({ purchase, isConsumable: true });
                } else {
                  // Handle failed receipt validation
                }
              });
            }
          }
        );

        const purchaseErrorSubscription = purchaseErrorListener(
          (error: PurchaseError) => {
            console.warn('purchaseErrorListener', error);
          }
        );

        return () => {
          purchaseUpdateSubscription.remove();
          purchaseErrorSubscription.remove();
        };
      } catch (error) {
        console.error('Error setting up IAP listeners', error);
      }
    };

    setupIAPListeners();
  }, []);

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({ message: 'handleGetPurchaseHistory', error });
    }
  };

  useEffect(() => {
    handleGetPurchaseHistory();
  }, [connected]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus });
    } catch (error) {
      errorLog({ message: 'handleGetSubscriptions', error });
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  const handleBuySubscription = async (productId) => {
    try {
      setLoading(true);
      await requestSubscription({
        sku: productId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        errorLog({ message: 'handleBuySubscription', error });
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: 'center',
              paddingBottom: 15,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Subscribe
          </Text>
          <Text style={styles.listItem}>
            Subscribe to some cool stuff today.
          </Text>
          <Text
            style={{
              fontWeight: '500',
              textAlign: 'center',
              marginTop: 10,
              fontSize: 18,
            }}>
            Choose your membership plan.
          </Text>
          <View style={{ marginTop: 10 }}>
            {subscriptions.map((subscription, index) => {
              const owned = purchaseHistory.find(
                (s) => s?.productId === subscription.productId,
              );
              return (
                <View style={styles.box} key={index}>
                  {subscription.introductoryPriceSubscriptionPeriodIOS && (
                    <Text style={styles.specialTag}>SPECIAL OFFER</Text>
                  )}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        paddingBottom: 10,
                        fontWeight: 'bold',
                        fontSize: 18,
                        textTransform: 'uppercase',
                      }}>
                      {subscription.title}
                    </Text>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {subscription.localizedPrice}
                    </Text>
                  </View>
                  {subscription.introductoryPriceSubscriptionPeriodIOS && (
                    <Text>
                      Free for 1{' '}
                      {subscription.introductoryPriceSubscriptionPeriodIOS}
                    </Text>
                  )}
                  <Text style={{ paddingBottom: 20 }}>
                    {subscription.description}
                  </Text>
                  {owned && (
                    <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                      You are Subscribed to this plan!
                    </Text>
                  )}
                  {owned && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#0071bc' }]}
                      onPress={() => {
                        navigation.navigate('Home');
                      }}>
                      <Text style={styles.buttonText}>Continue to App</Text>
                    </TouchableOpacity>
                  )}
                  {!loading && !owned && isIos && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        handleBuySubscription(subscription.productId)
                      }>
                      <Text style={styles.buttonText}>Subscribe</Text>
                    </TouchableOpacity>
                  )}
                  {loading && <ActivityIndicator size="large" />}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    fontSize: 16,
    paddingLeft: 8,
    paddingBottom: 3,
    textAlign: 'center',
    color: 'black',
  },
  box: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    shadowColor: 'rgba(0, 0, 0, 0.45)',
    shadowOffset: { height: 16, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'mediumseagreen',
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  specialTag: {
    color: 'white',
    backgroundColor: 'crimson',
    width: 125,
    padding: 4,
    fontWeight: 'bold',
    fontSize: 12,
    borderRadius: 7,
    marginBottom: 2,
  },
});

export default App;
