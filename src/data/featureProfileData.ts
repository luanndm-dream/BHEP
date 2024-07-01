import { useAppSelector } from "@/redux";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";
import { globalColor } from "src/constants/color";

export const getFeatureProfileData = () => {
    const roleId = useAppSelector(state => state.user.userData.roleId);
    const data = [
        {
            id: 1,
            name: 'Thông tin cá nhân',
            iconName: "account",
            color: globalColor.blue2,
            screen: STACK_NAVIGATOR_SCREENS.INFORMATIONSCREEN
        },
        {
            id: 3,
            name: 'Sức khoẻ của tôi',
            iconName: "application-edit",
            color: globalColor.secondaryColor,
            screen: STACK_NAVIGATOR_SCREENS.MYHEALTHSCREEN
        },
        {
            id: 4,
            name: 'Lịch hẹn của tôi',
            iconName: "clock-outline",
            color: '#F3B580',
            screen: STACK_NAVIGATOR_SCREENS.MYSCHEDULESCREEN
        },
        {
            id: 5,
            name: 'Thanh toán',
            iconName: "credit-card-outline",
            color: '#51829B',
            screen: STACK_NAVIGATOR_SCREENS.PAYMENTSCREEN,
        },
        {
            id: 6,
            name: 'Mua dịch vụ',
            iconName: "cart-outline",
            color: '#e0afd1',
            screen: STACK_NAVIGATOR_SCREENS.SERVICESCREEN,
        },
        {
            id: 7,
            name: 'Lịch sử giao dịch',
            iconName: "history",
            color: '#39a6b8',
            screen: STACK_NAVIGATOR_SCREENS.HISTORYTRANSACTIONSCREEN,
        },
        {
            id: 8,
            name: 'Chính sách & Bảo mật',
            iconName: "book-open",
            color: '#ffda00',
            screen: STACK_NAVIGATOR_SCREENS.POLICYSCREEN,
        },
        {
            id: 9,
            name: 'Về chúng tôi',
            iconName: "information",
            color: '#3ea2f5',
            screen: STACK_NAVIGATOR_SCREENS.ABOUTUSSCREEN,
        },
    ];
    
    if (roleId === 3) {
        data.unshift({
            id: 2,
            name: 'Làm việc',
            iconName: "calendar-check",
            color: '#01b585',
            screen: STACK_NAVIGATOR_SCREENS.WORKSPACEDOCTORSCREEN
        });
    }

    return data;
};
