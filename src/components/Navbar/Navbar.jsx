import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/all", label: "Все котики" },
  { to: "/favorites", label: "Любимые котики" },
];

export default function Navbar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          {tabs.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
