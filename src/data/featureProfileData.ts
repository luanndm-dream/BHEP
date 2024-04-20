import { useAppSelector } from "@/redux";
import { globalColor } from "src/constants/color";

export const getFeatureProfileData = () => {
    const roleId = useAppSelector(state=>state.user.userData.roleId);
    const data = [
        {
            id: 1,
            name: 'Thông Tin Cá Nhân',
            iconName: "account",
            color: globalColor.blue2,
        },
    ];
    
    if (roleId === 3) {
        data.push({
            id: 2,
            name: 'Làm Việc',
            iconName: "bookmark-check",
            color: '#01b585',
        });
    }

    return data;
};
