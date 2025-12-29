import { useState } from "react";
import styles from "./App.module.css";

type View = "dashboard" | "transactions" | "add";

function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  return (
    <main className={styles.app}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.logo}>💰</span>
          <h1 className={styles.navTitle}>Finance Tracker</h1>
        </div>

        <div className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${currentView === "dashboard" ? styles.navLinkActive : ""}`}
            onClick={() => setCurrentView("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`${styles.navLink} ${currentView === "transactions" ? styles.navLinkActive : ""}`}
            onClick={() => setCurrentView("transactions")}
          >
            Transactions
          </button>

          <button
            className={`${styles.navLink} ${currentView === "add" ? styles.navLinkActive : ""}`}
            onClick={() => setCurrentView("add")}
          >
            + Add Transactions
          </button>
        </div>
      </nav>
    </main>
  );
}

export default App;
