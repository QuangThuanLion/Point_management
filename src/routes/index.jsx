import LoginComponent from '../components/loginPage/login.jsx';
import Fulllayout from '../layouts/fulllayout.jsx';

var indexRoutes = [
    { path: '/dashboard', name: 'Dashboard', component: Fulllayout },
    { path: '/', name: 'Login', component: LoginComponent }
];

export default indexRoutes;
