import { useMemo } from "react";
import {
    theme,
    Button,
    ConfigProvider,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type Shape = "default" | "circle" | "round" | undefined;
type HTMLType = "button" | "submit" | "reset" | undefined;
type ColorType = "active" | "success" | "warning" | "error" | "info" | "default";

interface ThisProps {
    shape?: Shape, 
    block?: boolean, 
    size?: SizeType,
    loading?: boolean, 
    disabled?: boolean,
    htmlType?: HTMLType, 
    colorType?: ColorType,
    children?: React.ReactNode,
    icon?: React.ReactNode | undefined, 
    style?: React.CSSProperties | undefined,
    onClick?: React.MouseEventHandler<HTMLElement>,
};

export const CustomButton: React.FC<ThisProps> = ({
    icon,
    shape,
    style,
    loading,
    htmlType,
    colorType,
    disabled,
    children,
    onClick,
    block = false,
    size = "middle",
}) => {

    const {token: {colorPrimary}} = theme.useToken();

    const themeToken = useMemo(() => {
        switch (true) {
            case colorType === "success":
                return {
                    colorPrimary: '#16a34a',
                    colorPrimaryHover: '#007E33',
                    colorPrimaryActive: "rgba(0, 126, 51, 0.5)"
                }
            case colorType === "warning":
                return {
                    colorPrimary: '#ffbb33',
                    colorPrimaryHover: '#FF8800',
                    colorPrimaryActive: "rgba(255, 136, 0, 0.5)"
                }
            case colorType === "error":
                return {
                    colorPrimary: '#ff4444',
                    colorPrimaryHover: '#CC0000',
                    colorPrimaryActive: "rgba(204, 0, 0, 0.5)"
                }
            case colorType === "info":
                return {
                    colorPrimary: '#0284c7',
                    colorPrimaryHover: '#0099CC',
                    colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
                }
            case colorType === "active":
                return {
                    colorPrimary: colorPrimary,
                    colorPrimaryHover: colorPrimary,
                    colorPrimaryActive: colorPrimary,
                }
            default:
                break;
        }
    }, [colorType]); 

    const buttonType = useMemo(() => {
        return colorType !== "default" || colorType === "active" as string ? "primary" : "default";
    }, [colorType]);

    return (
        <ConfigProvider theme={{ token: {...themeToken} }}>
            <Button
                size={size}
                icon={icon}
                block={block}
                shape={shape}
                style={style}
                loading={loading}
                type={buttonType}
                onClick={onClick}
                disabled={disabled}
                htmlType={htmlType}
            >
                {children}
            </Button>
        </ConfigProvider>
    );
};