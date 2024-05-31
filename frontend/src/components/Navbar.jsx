import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

export function Navbar() {
    const navItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'Profile',
            icon: 'pi pi-crown',
            url: '/profile'
        },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            url: '/login'
        },
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            url: '/register'
        },
    ];

    return (
        <div>
            <Menubar model={navItems} />
        </div>
    )
}

export default Navbar