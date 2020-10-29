
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Login from "views/Login/Login.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";


//core Administrador
import Personal from "views/Administrador/Personal.js"
import GestionPersonal from "views/Administrador/GestionPersonal.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Estadísticas",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },/*
  {
    path: "/user",
    name: "CREAR EMPLEADO",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BubbleChart,
    component: Personal,
    layout: "/admin"
  },*/
  {
    path: "/table",
    name: "GESTIÓN DEL PERSONAL",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: GestionPersonal,
    layout: "/admin"
  }/*,
  {
    path: "/login",
    name: "Login",
    icon: LibraryBooks,
    component: Login,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;
