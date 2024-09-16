import { useContext, useEffect, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";

import styles from "../../_styles/MenuBurger.module.css";

interface ThisProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuBurger: React.FC<ThisProps> = ({
    collapsed,
    setCollapsed
}) => {
    const { windowDimension } = useContext(GlobalContext);

    const burgerPosition = useMemo(() => {
        switch (true) {
            case windowDimension.width >= 768:
                return collapsed === false ? "210px" : "50px";
            default:
                return collapsed === false ? "209px" : "8px";
        }
    }, [windowDimension.width, collapsed]);

    const lineStyles = useMemo(() => {
        return {
            icon1: collapsed === true ? styles.icon1 : styles.icon1A,
            icon2: collapsed === true ? styles.icon2 : styles.icon2C,
            icon3: collapsed === true ? styles.icon3 : styles.icon3B,
        }
    }, [collapsed, styles]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--left', burgerPosition);
    }, [burgerPosition]);

    return (
        <div id="icon" className={styles.hamburgerIcon} onClick={() => setCollapsed(!collapsed)}>
            <div id="a" className={lineStyles.icon1} />
            <div id="a" className={lineStyles.icon2} />
            <div id="a" className={lineStyles.icon3} />
            <div className={styles.clear} />
        </div>
    )
};