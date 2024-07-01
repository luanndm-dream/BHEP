import { STACK_NAVIGATOR_SCREENS } from "src/constants";

export const WorkSpaceDoctorData = [
  {
    id: 1,
    name: "Chỉnh sửa hồ sơ",
    imgIcon: require("../assets/icons/work-space.png"),
    iconLastName: "cog",
    screen: STACK_NAVIGATOR_SCREENS?.EDITWORKPROFILESCREEN
  },
  // {
  //   id: 2,
  //   name: "Bệnh nhân mới",
  //   imgIcon: require("../assets/icons/patient.png"),
  //   iconLastName: "chevron-right",
  //   screen: ""
  // },
  // {
  //   id: 3,
  //   name: "Lịch trình của tôi",
  //   imgIcon: require("../assets/icons/scheduling.png"),
  //   iconLastName: "chevron-right",
  //   screen: ""

  // },
  {
    id: 4,
    name: "Đặt lịch làm việc",
    imgIcon: require("../assets/icons/calendar.png"),
    iconLastName: "chevron-right",
    screen: STACK_NAVIGATOR_SCREENS.SCHEDULESCREEN
  },
];
