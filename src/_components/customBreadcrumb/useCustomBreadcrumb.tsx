import { useContext, useEffect, useMemo, useRef } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { 
    useLocation, 
    useNavigate, 
    useParams 
} from "react-router-dom";
import { 
    normalizeStringPath, 
    toTitleCase, 
    useFlattenRoutes,
} from "../../_utils";
import { otherRoutesRegistry } from "../../routes/OtherRouteRegistry";

import styles from "../../_styles/CustomBreadcrumb.module.css";

export const useCustomBreadcrumb = () => {
    const location = useLocation();
    const navigateTo = useNavigate();
    const { id } = useParams<{ id: string }>();
    const flattenedRoutes = useFlattenRoutes();
    const { windowDimension } = useContext(GlobalContext);
    
    const breadcrumbContainerRef = useRef<HTMLDivElement>(null);

    const tempBreadcrumbItems = useMemo(() => {
        const normalizedPath = normalizeStringPath(location.pathname);

        const getsidebarDrawerRoutes = flattenedRoutes.filter((route) => normalizedPath.includes(normalizeStringPath(route?.path as string)));

        const getadditionalChildRoutes = otherRoutesRegistry.filter((route) => normalizedPath.includes(normalizeStringPath(route?.path as string).replace(/:[^/]+/, "")));
        const tempBreadcrumbItems = [...getsidebarDrawerRoutes.filter((item) => item.element !== null), ...getadditionalChildRoutes];

        return tempBreadcrumbItems;
    }, [location.pathname, flattenedRoutes, id]);

    const breadcrumbItems = useMemo(() => {
        const items = tempBreadcrumbItems.map((item, index) => {

            // full path with parent path
            const normalizePath = normalizeStringPath(item.path as string).replace(/:[^/]+/, "");
            const isLastItem = index === tempBreadcrumbItems.length - 1;

            // only path after the parent path
            const manipulated = item.path && item?.path
            .split("/")
            .filter(part => part && !part.startsWith(':'))
            .map(part => part.replace(/-/g, ' '));

            const completePath = item?.path?.includes(":id") ? item.path.replace(":id", `${id}`) : item.path;

            if (manipulated === undefined) return; 

            return {
                key: `${index}_${normalizePath}`,
                label: <div 
                    className={isLastItem ? styles.breadcrumbLinkActive : styles.breadcrumbLinkInactive}
                    onClick={() => {
                        if (isLastItem) return;
                        navigateTo(completePath as string);
                    }}
                >
                    {item.icon}
                    <span>{toTitleCase(manipulated[index])}</span>
                </div>,
                separator: isLastItem ? null : <div><span>&nbsp;&nbsp;/</span></div>,
            }
        });

        return items;
    }, [tempBreadcrumbItems, styles]);

    const renderBackButtonText = useMemo(() => {
        return windowDimension.width <= 710 ? undefined : "Back";
    }, [windowDimension.width]);

    const renderBackButtonShape = useMemo(() => {
        return windowDimension.width <= 710 ? "circle" : "default";
    }, [windowDimension.width]);

    const renderBreadcrumb = useMemo(() => {
        return breadcrumbItems.map((item) => 
            <span key={item?.key} style={{ display: "flex", flexDirection: "row" }}>
                {item?.label}
                {item?.separator}
            </span>
        )
    }, [breadcrumbItems]);

    useEffect(() => {
        if (breadcrumbContainerRef.current) {
            breadcrumbContainerRef.current.scrollLeft = breadcrumbContainerRef.current.scrollWidth;
        }
    }, []);

    return {
        navigateTo,
        renderBreadcrumb,
        renderBackButtonText,
        renderBackButtonShape,
        breadcrumbContainerRef,
    };
    
};