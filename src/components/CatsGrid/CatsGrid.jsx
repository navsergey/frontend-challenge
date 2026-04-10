import CatCard from "../CatCard/CatCard.jsx";
import styles from "./CatsGrid.module.css";

export default function CatsGrid({list, favorites, onToggle, tab}) {
    return (
        <main className={styles.main}>
            {list.length === 0 ? (
                <p className={styles.empty}>
                    Нет любимых котиков<br/>
                    <span className={styles.emptyHint}>
            Добавьте котиков на вкладке «Все котики»
          </span>
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

            {tab === "all" && (
                <p className={styles.loading}>
                    ... загружаем еще котиков ....
                </p>
            )}
        </main>
    );
}
