import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import CatsGrid from "./components/CatsGrid/CatsGrid.jsx";
import styles from "./App.module.css";

const TOTAL = 15;
const cats = Array.from({ length: TOTAL }, (_, i) => ({ id: i + 1 }));



export default function App() {
    const [tab, setTab] = useState("all");
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem("favCats") || "[]"); }
        catch { return []; }
    });

    useEffect(() => {
        try { localStorage.setItem("favCats", JSON.stringify(favorites)); }
        catch {}
    }, [favorites]);

    const toggle = useCallback(
        (id) => setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        ), []
    );

    const list = tab === "all" ? cats : cats.filter((c) => favorites.includes(c.id));

    return (
        <div className={styles.app}>
            <Navbar tab={tab} onChangeTab={setTab} />
            <CatsGrid
              list={list}
              favorites={favorites}
              onToggle={toggle}
              tab={tab}
            />
        </div>
    );
}
