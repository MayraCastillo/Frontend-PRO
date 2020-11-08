// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import TableList from 'views/TableList/TableList.js';
import Login from 'views/Login/Login.js';
import Typography from 'views/Typography/Typography.js';
import Icons from 'views/Icons/Icons.js';
import Maps from 'views/Maps/Maps.js';
import NotificationsPage from 'views/Notifications/Notifications.js';
import UpgradeToPro from 'views/UpgradeToPro/UpgradeToPro.js';
// core components/views for RTL layout
import RTLPage from 'views/RTLPage/RTLPage.js';
import AgregarPlato from 'views/JefeCocina/AgregarPlato';
import GestionPlatos from 'views/JefeCocina/GestionPlatos';
import GestionPlatosDeshabilitados from 'views/JefeCocina/GestionPlatosDeshabilitados';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Crear Plato',
		rtlName: 'لوحة القيادة',
		icon: Dashboard,
		component: AgregarPlato,
		layout: '/admin',
	},
	{
		path: '/table',
		name: 'Listado De Platos',
		rtlName: 'قائمة الجدول',
		icon: 'content_paste',
		component: GestionPlatos,
		layout: '/admin',
	},

	{
		path: '/user',
		name: 'Platos Deshabilitados',
		rtlName: 'ملف تعريفي للمستخدم',
		icon: BubbleChart,
		component: GestionPlatosDeshabilitados,
		layout: '/admin',
	} /*,
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
  }*/,
];

export default dashboardRoutes;
