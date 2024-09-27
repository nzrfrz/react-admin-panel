import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";
import { generalValidation, noValidation } from "../../_utils";

import { Form, Input } from "antd";

interface ThisProps {
    help?: string,
    rows?: number,
    label?: string;
    noStyle?: boolean,
    maxLength?: number;
    showCount?: boolean;
    placeholder?: string;
    hasFeedback?: boolean;
    requiredMark?: boolean;
    isRulesRequired?: boolean;
    disabled?: boolean | undefined;
    name?: [number, string] | string;
};

export const TextAreaForm: React.FC<ThisProps> = ({
    help,
    name,
    label,
    disabled,
    rows = 2,
    showCount,
    maxLength,
    placeholder,
    hasFeedback,
    requiredMark,
    noStyle = false,
    isRulesRequired = true,
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
            rules={isRulesRequired === true ? fieldRules as [] : noValidation}
        >
            <Input.TextArea
                rows={rows}
                disabled={disabled}
                showCount={showCount}
                maxLength={maxLength}
                style={{ width: '100%' }}
                placeholder={placeholder === undefined ? `Input ${label}` : placeholder}
            />
        </Form.Item>
    );
};