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

interface DropDownListProps {
  onConfirm?: Function;
  onCancel: () => void;
  visible: boolean;
  placeholderText?: string;
  onSelectMajor?: (majorId: number, majorIdName: string) => void;
  dataList?: any;
  multiSelect?: boolean;
  onConfirmMultiSelected?: ((indexArray: any) => void) | undefined;
}

const DropDownList: React.FC<DropDownListProps> = ({
  onConfirm,
  onCancel,
  visible,
  onSelectMajor,
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

  const onPressItem = (itemId: number, itemName: string) => {
    if (multiSelect) {
      const isSelected = selectedItems.includes(itemId);
      if (isSelected) {
        setSelectedItems(selectedItems.filter((item) => item !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    } else {
      onSelectMajor && onSelectMajor(itemId, itemName);
      onCancel?.();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      contentContainerStyle={{ flexGrow: 1 }}
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
            <TextInput
              placeholder={placeholderText}
              onChangeText={(text) => setSearchValue(text)}
              value={searchValue}
              style={styles.labelSearch}
            />

            <SafeAreaView>
              <FlatList
                style={
                  multiSelect
                    ? { height: 230, marginBottom: 10 }
                    : { height: 200 }
                }
                data={filterData(dataList, searchValue)}
                renderItem={({ item }) => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <TouchableOpacity
                      onPress={() => onPressItem(item.id, item.name)}
                    >
                      <View style={styles.itemContainer}>
                        <View style={styles.itemBox}>
                          <Text
                            style={[
                              styles.item,
                              styles.itemId,
                              isSelected && styles.selectedItem,
                            ]}
                          >
                            {item.id}.{" "}
                          </Text>
                          <Text
                            style={[
                              styles.item,
                              styles.itemName,
                              isSelected && styles.selectedItem,
                            ]}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={30}
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

export default DropDownList;

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
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemBox: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    marginRight: 10,
  },
  itemId: {
    minWidth: 30, // Điều chỉnh theo nhu cầu
    marginRight: 5,
  },
  item: {
    fontSize: globalFontSize.lableFont,
    fontWeight: 'bold',
    color: 'black',
  },
  itemName: {
    flex: 1,
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
