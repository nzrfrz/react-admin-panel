import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";
import { generalValidation, noValidation } from "../../_utils";

import { Form, Input, Space } from "antd";

type fieldSize = "small" | "middle" | "large";
type validateStatus = "" | "success" | "warning" | "error" | "validating" | undefined;

interface ThisProps {
    inputValue?: string | undefined;
    name?: [number, string] | string;
    noStyle?: boolean,
    help?: string;
    label?: string;
    size?: fieldSize;
    onBlur?: () => void;
    isReadOnly?: boolean;
    placeholder?: string;
    hasFeedback?: boolean;
    requiredMark?: boolean;
    isRulesRequired?: boolean;
    disabled?: boolean | undefined;
    validateStatus?: validateStatus;
    autoFocus?: boolean | undefined;
    addonAfter?: React.ReactNode | string;
    addonBefore?: React.ReactNode | string;
    spaceCompactComponent?: React.ReactNode | undefined,
};

export const InputSpaceCompact: React.FC<ThisProps> = ({
    name,
    help,
    label,
    onBlur,
    disabled,
    autoFocus,
    inputValue,
    addonAfter,
    placeholder,
    hasFeedback,
    addonBefore,
    requiredMark,
    validateStatus,
    size = "middle",
    noStyle = false,
    isReadOnly = false,
    isRulesRequired = true,
    spaceCompactComponent = undefined
}) => {
    const { language } = useContext(GlobalContext);

    const fieldRules = useMemo(() => {
        return generalValidation.find((item) => item.language === language)?.fieldRules;
    }, [language]);

    return (
        <Form.Item
            name={name}
            help={help}
            label={label}
            noStyle={noStyle}
            required={requiredMark}
            hasFeedback={hasFeedback}
            validateStatus={validateStatus}
            rules={isRulesRequired === true ? fieldRules as [] : noValidation}
        >
            <Space.Compact style={{ width: "100%" }}>
                <Input
                    size={size}
                    onBlur={onBlur}
                    autoComplete="off"
                    value={inputValue}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    readOnly={isReadOnly}
                    addonAfter={addonAfter}
                    addonBefore={addonBefore}
                    style={{ width: '100%' }}
                    placeholder={placeholder === undefined ? `Input ${label}` : placeholder}
                />
                {spaceCompactComponent}
            </Space.Compact>
        </Form.Item>
    );
};