import { 
    useCallback,
    useContext, 
    useEffect, 
    useMemo, 
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/contextCreate";

import { sidebarRouteRegistry } from "../routes/SidebarRouteRegistry";

import { 
    normalizeStringPath, 
    useFlattenRoutes,
} from "../_utils";

import { MenuProps } from "antd";
import brandTextLogoDarkMode from "../assets/brandTextLogo_DarkMode.png";
import brandTextLogoLightkMode from "../assets/brandTextLogo_LightMode.png";
import styles from "../_styles/AdminLayout.module.css";

type MenuItem = Required<MenuProps>['items'][number];

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
};

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

const LAYOUT_NAVBAR_HEIGHT = 64;

export const useSidebarMenuHook = () => {
    const location = useLocation();    
    const flattenedRoutes = useFlattenRoutes();
    const { windowDimension, isDarkMode } = useContext(GlobalContext);

    const [collapsed, setCollapsed] = useState(false);
    const [isShrink, setIsShrink] = useState(false);
    const [currentRouteKeys, setCurrentRouteKeys] = useState<string[] | []>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const collapsableWidth = useMemo(() => {
        return windowDimension.width >= 768 ? "70" : "0";
    }, [windowDimension.width]);

    const brandTextLogo = useMemo(() => {
        return isDarkMode ? brandTextLogoDarkMode : brandTextLogoLightkMode
    }, [isDarkMode]);

    const layoutStyles = useMemo(() => {
        return {
            sider: {
                position: windowDimension.width < 768 ? "absolute" : "relative",
                zIndex: windowDimension.width < 768 ? 9999 : 1
            },
            siderHeader: collapsed === true ? styles.sidebarHeaderWrapperCollapsed : styles.sidebarHeaderWrapper,
            textBrandLogo: collapsed === true ? styles.textLogoWrapperCollapsed : styles.textLogoWrapper,
            siderMenu: { height: `calc(100vh - ${LAYOUT_NAVBAR_HEIGHT}px)`, overflowX: "scroll" },
            navbar: {
                paddingInline: 0,
                display: "flex",
                paddingRight: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 16,
            },
            mobileSiderMask: {
                width: "100%", 
                height: "100%", 
                position: "absolute", 
                background: "rgba(0, 0, 0, 0.45)",
                display: windowDimension.width <= 768 && collapsed === false ? "block" : "none", 
            }
        }
    }, [windowDimension.width, collapsed, styles]);

    const sidebarItems: MenuItem[] = useMemo(() => {
        return sidebarRouteRegistry.map((data) => {
            return {
                key: data.key,
                label: data.label,
                icon: data.icon,
                children: data.children
            }
        })
    }, [sidebarRouteRegistry]);
    
    const levelKeys = getLevelKeys(sidebarItems as LevelKeysProps[]);

    const onOpenChangeMenu: MenuProps["onOpenChange"] = (opennedKeys: string[]) => {
        const currentOpenKey = opennedKeys.find((key) => openKeys.indexOf(key) === -1);
        
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
            .filter((key) => key !== currentOpenKey)
            .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setOpenKeys(
                opennedKeys
                .filter((_, index) => index !== repeatIndex)
                .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
            );
        }
        else setOpenKeys(opennedKeys);
    };

    const handleClickedMenu = useCallback(() => {
        return collapsed === false && isShrink === true && setCollapsed(true);
    }, [collapsed, isShrink]);

    const handleClickedMobileSiderMask = useCallback(() => {
        return windowDimension.width <= 768 && collapsed === false && setCollapsed(true);
    }, [windowDimension.width, collapsed]);

    useEffect(() => {
        /**
         * To get the last path that user visited, so when user is refresh the page,
         * the sidebar indicator still on the same menu that user visited.
        */
        const defaultSelectedKeys = flattenedRoutes.filter((route) => normalizeStringPath(location.pathname).includes(normalizeStringPath(route?.path as string)));
        const routeKeys = defaultSelectedKeys.map((item) => item.key).reverse();
        
        setCurrentRouteKeys(routeKeys as string[]);
    }, [location.pathname]);

    return {
        collapsed, setCollapsed,
        setIsShrink,
        openKeys, setOpenKeys,
        collapsableWidth,
        layoutStyles,
        brandTextLogo,
        sidebarItems,
        currentRouteKeys,
        onOpenChangeMenu,
        handleClickedMenu,
        handleClickedMobileSiderMask
    };
};