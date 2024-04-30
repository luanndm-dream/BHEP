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
        {
            id: 3,
            name: 'Sức khoẻ của tôi',
            iconName: "application-edit",
            color: globalColor.secondaryColor,
        },
    ];
    
    if (roleId === 3) {
        data.push({
            id: 2,
            name: 'Làm Việc',
            iconName: "calendar-check",
            color: '#01b585',
        });
    }

    return data;
};
