import { ICON } from "@/constants/importImages";
const MENU_ITEMS = [
  {
    id: "myinfo",
    iconSrc: ICON.accountCheck.default.src,
    iconAlt: ICON.accountCheck.default.alt,
    content: "내 정보",
  },
  {
    id: "myreservations",
    iconSrc: ICON.textBoxCheck.default.src,
    iconAlt: ICON.textBoxCheck.default.alt,
    content: "예약 내역",
  },
  {
    id: "myactivities",
    iconSrc: ICON.setting.default.src,
    iconAlt: ICON.setting.default.alt,
    content: "내 체험 관리",
  },
  {
    id: "myreservedstatus",
    iconSrc: ICON.calendarCheck.default.src,
    iconAlt: ICON.calendarCheck.default.alt,
    content: "예약 현황",
  },
];
export default MENU_ITEMS;
