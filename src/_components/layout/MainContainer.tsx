import { CSSProperties, useMemo } from "react";

interface ThisProps {
    scrollx?: boolean,
    scrolly?: boolean,
    children: React.ReactNode
};

export const MainContainer: React.FC<ThisProps> = ({
    scrollx = false,
    scrolly = false,
    children
}) => {

    const styles: CSSProperties = useMemo(() => {
        return {
            width: "100%",
            height: "100%",
            padding: "16px 24px",
            overflowX: scrollx === false ? "hidden" : "scroll",
            overflowY: scrolly === false ? "hidden" : "scroll",
            // backgroundColor: "grey",
        }
    }, [scrollx, scrolly]);

    return (
        <div style={styles}>
            {children}
        </div>
    );
};