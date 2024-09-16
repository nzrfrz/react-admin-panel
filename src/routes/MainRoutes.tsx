import { useMemo } from "react"; 
import { Navigate, Route, Routes } from "react-router-dom";
import { SidebarRouteProps, useFlattenRoutes } from "../_utils";

import { PrivateRoute } from "./PrivateRoute";

import { otherRoutesRegistry } from "./OtherRouteRegistry";

import { 
    AdminLayout,
} from "../_components";

export const MainRoutes = () => {
    const flattenedRoutes = useFlattenRoutes();

    const privateRouteList = useMemo(() => {
        const routes = [ ...flattenedRoutes, ...otherRoutesRegistry ];
        return routes.map((route: SidebarRouteProps, index: number) => {
            return (
                <Route key={index} index={route.isIndex} path={route.path} element={route.element} />
            )
        });
    }, [flattenedRoutes, otherRoutesRegistry]);
    
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />} >
                <Route path="/" element={<AdminLayout />} >
                    <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
                    {privateRouteList}
                </Route>
            </Route>
        </Routes>
    );
};