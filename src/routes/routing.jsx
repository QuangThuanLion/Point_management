// ui components
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import LoginComponent from '../components/loginPage/login.jsx';
import UserComponent from '../views/ui-components/UserComponent/UserList/index.jsx';
import UserDetailComponent from '../views/ui-components/UserComponent/UserDetail/index.jsx';
import UserAddComponent from '../views/ui-components/UserComponent/UserCreate/index.jsx';
import UserUpdateComponent from '../views/ui-components/UserComponent/UserUpdate/index.js';
import ProductComponent from '../views/ui-components/ProductComponent/ProductList/index.jsx';
import ProductDetailComponent from '../views/ui-components/ProductComponent/ProductDetail/index.jsx';
import ProductAddComponent from '../views/ui-components/ProductComponent/ProductAdd/index.jsx';
import ProductUpdateComponent from '../views/ui-components/ProductComponent/ProductUpdate/index.jsx';
import ChangePasswordComponent from '../views/ui-components/ChangePassComponent/index.jsx';
import PointComponent from '../views/ui-components/PointComponent/index.jsx';
import DashBoardComponent from '../views/dashboard-component/index.jsx';
import NotificationsComponent from '../views/ui-components/NotificationsComponent/index.js';

var ThemeRoutes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: 'ti-loop', 
    hidden: false,
    component: DashBoardComponent 
  },
  {
    path: '/dashboard/user',
    name: 'User',
    icon: 'mdi mdi-arrange-send-backward',
    hidden: false,
    component: UserComponent
  },
  {
    path: '/dashboard/user-information/:id',
    name: 'UserInformation',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: true,
    component: UserDetailComponent
  },
  {
    path: '/dashboard/user-update/:id',
    name: 'UserUpdate',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: true,
    component: UserUpdateComponent
  },
  {
    path: '/dashboard/user-add',
    name: 'UserAdd',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: true,
    component: UserAddComponent
  },
  {
    path: '/dashboard/product',
    name: 'Product',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: false,
    component: ProductComponent
  },
  {
    path: '/dashboard/product-detail/:id',
    name: 'ProductDetail',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: true,
    component: ProductDetailComponent
  },
  {
    path: '/dashboard/product-add',
    name: 'ProductAdd',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: true,
    component: ProductAddComponent
  },
  {
    path: '/dashboard/product-update/:id',
    name: 'ProductUpdate',
    hidden: true,
    component: ProductUpdateComponent
  },
  {
    path: '/dashboard/notifications',
    name: "Notifications",
    hidden: false,
    icon: 'mdi mdi-arrange-send-backward',
    component: NotificationsComponent
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: true,
    component: LoginComponent
  },
  {
    path: '/dashboard/changePassword',
    name: 'ChangePassword',
    hidden: true,
    icon: 'mdi mdi-credit-card-multiple',
    component: ChangePasswordComponent
  },
  // {
  //   path: '/dashboard/logout',
  //   name: 'Logout',
  //   hidden: false,
  //   icon: 'mdi mdi-pencil-circle',
  // },
  {
    path: '/dashboard/changeGift/:id',
    name: 'ChangeGift',
    hidden: true,
    icon: 'mdi mdi-pencil-circle',
    component: PointComponent
  },
  {
    path: '/dashboard/badge',
    name: 'Badges',
    icon: 'mdi mdi-arrange-send-backward',
    hidden: false,
    component: Badges
  },
  {
    path: '/dashboard/button',
    name: 'Buttons',
    icon: 'mdi mdi-toggle-switch',
    hidden: false,
    component: Buttons
  },
  {
    path: '/dashboard/card',
    name: 'Cards',
    icon: 'mdi mdi-credit-card-multiple',
    hidden: false,
    component: Cards
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
