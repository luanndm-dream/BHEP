import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import useLoading from "src/hook/useLoading";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MajorData } from "src/data/majorData";
import ButtonText from "./ButtonText";
import { globalColor } from "src/constants/color";
import { TouchableOpacity } from "react-native";
import { globalFontSize } from "src/constants/fontSize";

interface DropDownListWithImageProps {
  onConfirm?: Function;
  onCancel: () => void;
  visible: boolean;
  placeholderText?: string;
  onSelectItem?: (itemId: number, itemName: string, image?: string, typeMethod?: string) => void;
  dataList?: any;
  multiSelect?: boolean;
  onConfirmMultiSelected?: ((indexArray: any) => void) | undefined;
}

const DropDownListWithImage: React.FC<DropDownListWithImageProps> = ({
  onConfirm,
  onCancel,
  visible,
  onSelectItem,
  placeholderText,
  dataList,
  multiSelect,
  onConfirmMultiSelected,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const filterData = (data: any[], query: string) => {
    if (!query) return data;
    return data?.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(query.toLowerCase())
    );
  };

  const onPressItem = (itemId: number, itemName: string, image?: string,typeMethod?: string) => {
    if (multiSelect) {
      const isSelected = selectedItems.includes(itemId);
      if (isSelected) {
        setSelectedItems(selectedItems.filter((item) => item !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    } else {
      onSelectItem && onSelectItem(itemId, itemName, image);
      onCancel?.();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, height: 400 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      // contentContainerStyle={{ flexGrow: 1 }}
    >
      <CustomModal
        onBackDropPress={() => {
          onCancel?.();
        }}
        visible={visible}
        animationType="slide"
        onTouchStart={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <View style={styles.indicatorTop} />
          <View>
            <SafeAreaView>
              <FlatList
              showsVerticalScrollIndicator={false}
                style={
                  multiSelect
                    ? { height: 380, marginBottom: 10 }
                    : { height: 350, }
                    
                }
                data={filterData(dataList, searchValue)}
                renderItem={({ item }) => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <TouchableOpacity
                      onPress={() => onPressItem(item.id, item.name, item.img, item.type)}
                    >
                      <View style={styles.itemContainer}>
                        <View style={styles.itemBox}>
                          <Image source={item.img} style={{width: 30, height: 30, marginRight: 20}}/>
                          <Text
                            style={[
                              styles.item,
                              isSelected && styles.selectedItem,
                            ]}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={30}
                          color='black'
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
              {multiSelect && (
                <ButtonText
                  onPress={() => {
                    if (onConfirmMultiSelected) {
                      onConfirmMultiSelected(selectedItems);
                      onCancel?.();
                    }
                  }}
                  text="Chọn"
                  styleText={{ fontWeight: "bold" }}
                  styleContainer={{
                    backgroundColor: globalColor.primaryColor,
                    height: 60,
                    borderRadius: 12,
                  }}
                />
              )}
            </SafeAreaView>
          </View>
        </View>
      </CustomModal>
    </KeyboardAvoidingView>
  );
};

export default DropDownListWithImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 12,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 12,
    height: 400,
  },
  indicatorTop: {
    width: 60,
    height: 6,
    backgroundColor: "#eaeaea",
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: '#f2f4f5',
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
    opacity: 0.7
  },
  itemBox: {
    flexDirection: "row",
    marginVertical: 6,
    alignItems: 'center'
  },
  item: {
    fontSize: globalFontSize.lableFont,
    fontWeight: "bold",
    color: "black",
  },
  labelSearch: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  selectedItem: {
    color: globalColor.primaryColor,
  },
});
