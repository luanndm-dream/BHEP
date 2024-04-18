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
  onCancel?: () => void;
  visible: boolean;
  placeholderText?: string;
  onSelectMajor?: (majorId: number, majorIdName: string) => void;
}

const DropDownList: React.FC<DropDownListProps> = ({
  onConfirm,
  onCancel,
  visible,
  onSelectMajor,
  placeholderText,
}) => {
  const [dataMajor, setDataMajor] = useState<any>(MajorData);
  const [searchValue, setSearchValue] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();
  // useEffect(() => {
  //     showLoading()
  //     getStationApi().then((res: any) => {
  //         if(res?.statusCode === 200){
  //             setDataOffice(res.data.items);
  //             hideLoading()
  //         }
  //         console.log('res', res?.data.items)

  //     });
  //   }, []);
  const filterData = (data: any[], query: string) => {
    if (!query) return data;
    return data?.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(query.toLowerCase())
    );
  };

  const onPressItem = (itemId: number, itemName: string) => {
    setSearchValue(itemName);
    onSelectMajor && onSelectMajor(itemId, itemName);
    onCancel?.();
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
      onTouchStart={()=>Keyboard.dismiss()}
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
                data={filterData(dataMajor, searchValue)}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onPressItem(item.id, item.name)}
                    >
                      <View style={styles.itemContainer}>
                        <View style={styles.itemBox}>
                          <Text style={styles.item}>{item.id}. </Text>
                          <Text style={styles.item}>{item.name}</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-down" size={30} />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemBox:{
    flexDirection: "row"
  },
  item:{
    fontSize: globalFontSize.lableFont,
    fontWeight: 'bold',
    color: 'black'
  },
  labelSearch: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 12
  },
});
