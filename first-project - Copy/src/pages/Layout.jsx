import Content from "../component/Content";
import LayoutNavBar from "../component/LayoutNavBar";
import SideBar from "../component/SideBar";
import styles from "./layout.module.css";
function Layout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <div className={styles.fullpage}>
        <LayoutNavBar />
        <Content />
      </div>
    </div>
  );
}

export default Layout;
