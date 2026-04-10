import {useState, useEffect, useCallback, useRef} from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import CatsGrid from "./components/CatsGrid/CatsGrid.jsx";
import styles from "./App.module.css";
import CatsService from "./components/api/CatsService.js";
import {Navigate, Route, Routes} from "react-router-dom";

export default function App() {
    const [cats, setCats] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favCats") || "[]");
        } catch {
            return [];
        }
    });

    const loadMoreCats = useCallback(async () => {
        setIsLoadingMore(true);
        const data = await CatsService.getCats(15);
        setIsLoadingMore(false);
        setCats((prev) => [...prev, ...data]);
    }, []);

    useEffect(() => {
        loadMoreCats();
    }, []);


    useEffect(() => {
        try {
            localStorage.setItem("favCats", JSON.stringify(favorites));
        } catch {
        }
    }, [favorites]);

    const toggle = useCallback(
        (id) => setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        ), []
    );

    const favoriteCats = cats.filter((c) => favorites.includes(c.id));

    return (
        <div className={styles.app}>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Navigate to="/all" replace/>}/>

                <Route
                    path="/all"
                    element={
                        <CatsGrid
                            list={cats}
                            favorites={favorites}
                            onToggle={toggle}
                            showLoading={true}
                            emptyTitle="Нет котиков"
                            onLoadMore={loadMoreCats}
                            isLoadingMore={isLoadingMore}
                        />
                    }
                />

                <Route
                    path="/favorites"
                    element={
                        <CatsGrid
                            list={favoriteCats}
                            favorites={favorites}
                            onToggle={toggle}
                            emptyTitle="Нет любимых котиков"
                            emptyHint="Добавьте котиков на вкладке «Все котики»"
                        />
                    }
                />

                <Route path="/favoriets" element={<Navigate to="/favorites" replace/>}/>
                <Route path="*" element={<Navigate to="/all" replace/>}/>
            </Routes>
        </div>
    );
}
