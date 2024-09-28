import { useCallback } from "react";

import { Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";

type fieldSize = "small" | "middle" | "large";

interface ThisProps {
    value?: string | undefined;
    length?: number | undefined;
    size?: fieldSize | undefined;
    disabled?: boolean | undefined;
    mask?: boolean | string;
    uppercaseFormat?: boolean | undefined;
    fieldStatus?: OTPProps["status"] | undefined;
    onCompleteFields?: ((text: string) => Promise<void>) | ((text: string) => void) | undefined;
};

export const InputOTP: React.FC<ThisProps> = ({
    value = "",
    length = 6,
    fieldStatus,
    mask = false,
    size = "middle",
    uppercaseFormat,
    disabled = false,
    onCompleteFields,
}) => {

    const formatter = useCallback((text: string) => {
        if (!uppercaseFormat) return text;
        return text.toUpperCase();
    }, [uppercaseFormat]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
            <div style={{ alignSelf: "center" }}>
                <Input.OTP
                    mask={mask}
                    size={size}
                    value={value}
                    length={length}
                    disabled={disabled}
                    status={fieldStatus}
                    formatter={formatter}
                    onChange={(text) => onCompleteFields && onCompleteFields(text)}
                />
            </div>
        </div>
    );
};