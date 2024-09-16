/**
 * Use to remove children from route registry and make it same level as the parent route, check "src/SidebarRouteRegistry.tsx".
 * So this will make it easier to do .map function to get the page current route key, or path, or even route label 
*/

import { useCallback } from "react";
import { SidebarRouteProps } from "./props/sidebarMenuProps";
import { sidebarRouteRegistry } from "../routes/SidebarRouteRegistry";

export const useFlattenRoutes = () => {
    const flattenRoutes = useCallback((routes: SidebarRouteProps[]) => {
        const flatRoutes: SidebarRouteProps[] = [];
    
        function traverse(routelist: SidebarRouteProps[]) {
            routelist.forEach(route => {
                const { children, ...routeWithoutChildren } = route;
                flatRoutes.push(routeWithoutChildren);
                if (children) traverse(children);
            });
        };
    
        traverse(routes);
        return flatRoutes;
    }, []);

    const flattenedRoutes = flattenRoutes(sidebarRouteRegistry);

    return flattenedRoutes;
};