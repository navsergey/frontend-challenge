import CatCard from "../CatCard/CatCard.jsx";
import styles from "./CatsGrid.module.css";
import {useEffect, useRef} from "react";

export default function CatsGrid(
    {
        list,
        favorites,
        onToggle,
        onLoadMore,
        showLoading,
        isLoadingMore = false,
        emptyTitle = "Ничего не найдено",
        emptyHint,
    })
{
    const ref = useRef(null);

    useEffect(() => {
        if (isLoadingMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                onLoadMore();
            },
            {rootMargin: "200px", threshold: 0}
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);

        return () => observer.disconnect();
    }, [list.length]);
    return (
        <main className={styles.main}>
            {list.length === 0 ? (
                <p className={styles.empty}>
                    {emptyTitle}
                    {emptyHint ? (
                        <>
                            <br/>
                            <span className={styles.emptyHint}>{emptyHint}</span>
                        </>
                    ) : null}
                </p>
            ) : (
                <div className={styles.grid}>
                    {list.map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            isFavorite={favorites.includes(cat.id)}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}

            {showLoading && list.length > 0 && (
                <p ref={ref} className={styles.loading}>
                    ... загружаем еще котиков ....
                </p>
            )}
        </main>
    );
}
