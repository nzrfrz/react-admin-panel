import { ReactNode } from "react";

interface SidebarItemProps {
    key?: string;
    label?: ReactNode;
    path?: string;
    isIndex?: boolean;
    element?: ReactNode;
    icon?: ReactNode | null;
};

export interface SidebarRouteProps extends SidebarItemProps {
    children?: SidebarItemProps[];
};