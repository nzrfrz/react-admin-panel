import { CSSProperties, useMemo } from "react";

interface ThisProps {
    scrollx?: boolean,
    scrolly?: boolean,
    centerItems?: boolean,
    children: React.ReactNode,
};

export const MainContainer: React.FC<ThisProps> = ({
    scrollx = false,
    scrolly = false,
    centerItems = false,
    children
}) => {

    const basicStyles: CSSProperties = useMemo(() => {
        return {
            width: "100%",
            height: "100%",
            padding: "16px 24px",
            overflowX: scrollx === false ? "hidden" : "scroll",
            overflowY: scrolly === false ? "hidden" : "scroll",
        }
    }, [scrollx, scrolly]);

    const centerItemStyles: CSSProperties | undefined = useMemo(() => {
        if (centerItems === false) return undefined;
        return {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }
    }, [centerItems]);

    return (
        <div style={{...basicStyles, ...centerItemStyles}}>
            {children}
        </div>
    );
};