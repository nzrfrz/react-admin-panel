import { CSSProperties, useMemo } from "react";
import { CustomBreadcrumb } from "../customBreadcrumb/CustomBreadcrumb";

interface ThisProps {
    scrollx?: boolean,
    scrolly?: boolean,
    withBreadcrumb?: boolean,
    children: React.ReactNode,
};

export const MainContainer: React.FC<ThisProps> = ({
    scrollx = false,
    scrolly = false,
    withBreadcrumb = false,
    children
}) => {

    const basicStyles: CSSProperties = useMemo(() => {
        return {
            width: "100%",
            height: "100%",
            padding: withBreadcrumb ? "0px 24px 16px 24px" : "16px 24px 16px 24px",
            overflowX: scrollx === false ? "hidden" : "scroll",
            overflowY: scrolly === false ? "hidden" : "scroll",
        }
    }, [scrollx, scrolly, withBreadcrumb]);

    return (
        <div style={basicStyles}>
            {withBreadcrumb && <CustomBreadcrumb />}
            {children}
        </div>
    );
};