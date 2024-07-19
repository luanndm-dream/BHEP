import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import { Header } from '@/components';
import { useAppSelector } from '@/redux';
import { apiGetHealthRecord } from 'src/api/api_get_healthRecord';

const HealthRecordScreen = () => {
  const userId = useAppSelector(state => state.user.userData.id);
  const [healthRecords, setHealthRecords] = useState<any[]>([]);

  useEffect(() => {
    apiGetHealthRecord(userId).then((res: any) => {
      if (res.statusCode === 200) {
        setHealthRecords(res.data.healthParams);
      }
    });
  }, [userId]);

  const getBackgroundColor = (temp: number) => {
    if (temp >= 39) {
      return '#ffcccc'; // Màu đỏ nhạt cho nhiệt độ nguy hiểm cao
    } else if (temp >= 37.5) {
      return '#ffebcc'; // Màu cam nhạt cho nhiệt độ hơi cao
    } else if (temp < 36) {
      return '#ccccff'; // Màu xanh nhạt cho nhiệt độ thấp
    } else {
      return '#ccffcc'; // Màu xanh nhạt cho nhiệt độ bình thường
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.recordContainer, { backgroundColor: getBackgroundColor(item.temp) }]}>
      <Text style={styles.recordText}>Ngày tạo: {item.createdDate}</Text>
      <Text style={styles.recordText}>Nhịp tim: {item.heartBeat}</Text>
      <Text style={styles.recordText}>Nồng độ Oxy: {item.eSpO2}</Text>
      <Text style={styles.recordText}>Nhiệt độ: {item.temp}</Text>
    </View>
  );

  return (
    <>
      <Header headerTitle='Kết quả đo' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={healthRecords}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </>
  );
};

export default HealthRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  recordContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  recordText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black'
  },
});
