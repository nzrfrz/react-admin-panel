import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/contextCreate";

import styles from "../_styles/ThemeToggler.module.css";

export function ThemeToggler () {
    const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);

    const classname = useMemo(() => {
        return isDarkMode ? styles.darkMode : styles.lightMode
    }, [isDarkMode]);

    return (
        <div className={styles.container} onClick={() => setIsDarkMode(!isDarkMode)}>
            <div className={classname} />
        </div>
    );
};