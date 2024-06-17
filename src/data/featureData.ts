import { STACK_NAVIGATOR_SCREENS } from "src/constants"

export const OutstandingFunciton  = [
    {
        id: 1,
        name: 'Đối tác',
        imgName: require('../assets/icons/partner.png'),
        screen: STACK_NAVIGATOR_SCREENS.PARTNERSCREEN
    },
    {
        id: 6,
        name: 'Bác sĩ gần tôi',
        imgName: require('../assets/icons/advice.png'),
        screen: STACK_NAVIGATOR_SCREENS.FINDLOCATIONSCREEN
    },
    {
        id: 3,
        name: 'Sức khoẻ của tôi',
        imgName: require('../assets/icons/medical-report.png'),
        screen: STACK_NAVIGATOR_SCREENS.TRACKINGHEALTHSCREEN
    },
    // {
    //     id: 4,
    //     name: 'Test',
    //     imgName: require('../assets/icons/medical-report.png'),
    //     screen: STACK_NAVIGATOR_SCREENS.TESTSCREEN
    // },
]

export const specialistData  = [
    {
        id: 1,
        name: 'Đa khoa',
        imgName: require('../assets/icons/polyclinic.png')
    },
    {
        id: 2,
        name: 'Tim mạch',
        imgName: require('../assets/icons/cardiology.png')
    },
    {
        id: 3,
        name: 'Thần kinh',
        imgName: require('../assets/icons/neurology.png')
    },
    {
        id: 4,
        name: 'Khoa nhi',
        imgName: require('../assets/icons/pediatrics.png')
    }
]
