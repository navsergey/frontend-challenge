import styles from "./Navbar.module.css";

const tabs = [
  { key: "all", label: "Все котики" },
  { key: "favorites", label: "Любимые котики" },
];

export default function Navbar({ tab, onChangeTab }) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onChangeTab(key)}
              className={`${styles.tabButton} ${tab === key ? styles.tabButtonActive : ""}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
