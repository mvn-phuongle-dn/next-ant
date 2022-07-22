import { Menu } from "antd";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { IconUser } from "../../../components/Icons";
import useAuth from "../../../hooks/useAuth";

import styles from "./Header.module.scss";
import { ProductsEndpointsEnum } from "../../../constants/products/products.endpoints";
import { UsersEndpointsEnum } from "../../../constants/users/users.endpoints";
import { CalendarsEndpointsEnum } from "../../../constants/calendar/calendar.endpoints";

const Header = () => {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const navLinks = [{
    title: "Products",
    path: ProductsEndpointsEnum.products,
    permissions: ['user', 'admin']
  },
  {
    title: "Users",
    path: UsersEndpointsEnum.users,
    permissions: ['admin']
  },
  {
    title: "Calendars",
    path: CalendarsEndpointsEnum.calendars,
    permissions: ['user', 'admin']
  }]

  const rootPathname = router.pathname.split(/(?=\/)/g, 1);

  const highlightMenu = router.pathname.split(/(?=\/)/g, 1);

  return (
    <header className={styles.header}>
      <h4 className={styles.title}>
        <Link href="/">
          <a>Project name</a>
        </Link>
      </h4>
      <Menu
        className={styles.menus}
        mode="horizontal"
        selectedKeys={highlightMenu}
        defaultOpenKeys={rootPathname}
      >
        {navLinks.map(navItem => (
          <Menu.Item key={navItem.path} className={styles.menuItem}>
            <Link href={navItem.path}>
              <a>{navItem.title}</a>
            </Link>
          </Menu.Item>
        ))}
        <Menu.SubMenu
          key="userMenus"
          className={cx(styles.menuItem, styles.subMenu)}
          icon={<IconUser />}
          title={auth.name}
          popupOffset={[0, -6]}
          popupClassName={styles.menuPopup}
        >
          <Menu.Item key="logout" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </header>
  );
};

export default Header;
