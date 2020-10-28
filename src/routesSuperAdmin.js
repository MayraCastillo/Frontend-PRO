
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import BubbleChart from "@material-ui/icons/BubbleChart";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import CrearAdministrador from "views/SuperAdmin/CrearAdministrador.js"
import CrearRestaurante from "views/SuperAdmin/CrearRestaurante.js"
import Icons from "views/Icons/Icons.js";

// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Gestión Restaurante",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: CrearRestaurante,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Gestión Administrador",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BubbleChart,
    component: CrearAdministrador,
    layout: "/admin"
  }/*,
  {
    path: "/table",
    name: "Listado De Platos",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
   {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },*/
  
  
];

export default dashboardRoutes;
