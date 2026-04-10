import { useState } from "react";
import {HeartIcon} from "../../ui/HeartIcon.jsx";
import styles from "./CatCard.module.css";

function CatCard({ cat, isFavorite, onToggle }) {
    const [hovered, setHovered]           = useState(false);
    const [heartHovered, setHeartHovered] = useState(false);
    const [imgError, setImgError]         = useState(false);

    const showHeart = hovered || isFavorite;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setHeartHovered(false); }}
            className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
        >
            {imgError ? (
                <div className={styles.fallback}>🐱</div>
            ) : (
                <img
                    src={`https://cataas.com/cat?${cat.id}`}
                    alt="котик"
                    onError={() => setImgError(true)}
                    className={styles.image}
                />
            )}

            {showHeart && (
                <button
                    onMouseEnter={() => setHeartHovered(true)}
                    onMouseLeave={() => setHeartHovered(false)}
                    onClick={() => onToggle(cat.id)}
                    aria-label={isFavorite ? "Убрать из любимых" : "Добавить в любимые"}
                    className={`${styles.heartButton} ${(heartHovered || isFavorite) ? styles.heartButtonHovered : ""}`}
                >
                    <span className={styles.heartIconWrap}>
                        <HeartIcon
                            classNameBase={styles.heartIconBase}
                            classNameHover={styles.heartIconHover}
                        />
                    </span>
                </button>
            )}
        </div>
    );
}
export default CatCard;