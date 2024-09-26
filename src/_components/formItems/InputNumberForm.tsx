import { useCallback, useContext, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";
import { generalValidation, noValidation } from "../../_utils";

import { Form, InputNumber } from "antd";

type fieldSize = "small" | "middle" | "large";
type validateStatus = "" | "success" | "warning" | "error" | "validating" | undefined;
type mode = "general" | "currency" ;

interface ThiProps {
    name?: [number, string] | string;
    min?: number;
    max?: number;
    help?: string; 
    label?: string;
    inputMode?: mode;
    size?: fieldSize;
    noStyle?: boolean,
    placeholder?: string; 
    hasFeedback?: boolean; 
    requiredMark?: boolean; 
    isRulesRequired?: boolean;
    disabled?: boolean | undefined;
    validateStatus?: validateStatus; 
    autoFocus?: boolean | undefined;
    controls?: boolean | React.ReactNode;
    addonAfter?: React.ReactNode | string;
    addonBefore?: React.ReactNode | string;
};

export const InputNumberForm: React.FC<ThiProps> = ({
    name,
    min,
    max,
    help, 
    label,
    disabled,
    controls,
    autoFocus,
    addonAfter,
    placeholder, 
    addonBefore,
    hasFeedback, 
    requiredMark, 
    validateStatus,
    size = "middle",
    noStyle = false,
    inputMode = "general",
    isRulesRequired = true,
}) => {
    const { language } = useContext(GlobalContext);

    const formatter = useCallback((value: string | number | undefined) => {
        if (inputMode === "general") return value ? value.toString() : '';
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, [inputMode]);

    const parser = useCallback((value: string | undefined) => {
        if (!value) return '';
        if (inputMode === "general") return value;
        return value.replace(/\$\s?|(,*)/g, '');
    }, [inputMode]);

    const setRules = useMemo(() => {
        if (isRulesRequired === true) return generalValidation.find((item) => item.language === language)?.fieldRules;
        else return noValidation;
    }, [isRulesRequired]);

    return (
        <Form.Item
            name={name}
            help={help}
            label={label}
            noStyle={noStyle}
            required={requiredMark}
            hasFeedback={hasFeedback}
            validateStatus={validateStatus}
            rules={setRules}
        >
            <InputNumber 
                max={max}
                size={size}
                parser={parser} 
                autoComplete="off"
                disabled={disabled}
                autoFocus={autoFocus}
                formatter={formatter}
                addonAfter={addonAfter}
                addonBefore={addonBefore}
                style={{ width: '100%' }}
                min={inputMode === "currency" ? 0 : min}
                controls={inputMode === "currency" ? false : controls as boolean}
                placeholder={placeholder === undefined ? `Input ${label}` : placeholder}
            />
        </Form.Item>
    );
};