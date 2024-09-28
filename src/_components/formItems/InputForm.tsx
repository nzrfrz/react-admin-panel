import { useCallback, useContext, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { 
    noValidation, 
    urlValidation,
    emailValidation, 
    idCardValidation, 
    generalValidation, 
    phoneNumberValidation,
    stripCountryCode, 
} from "../../_utils";

import { Form, Input } from "antd";
import { FaIdCard } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";

type fieldSize = "small" | "middle" | "large";
type validateStatus = "" | "success" | "warning" | "error" | "validating" | undefined;
type mode = "general" | "email" | "phoneNumber" | "idCard" | "url";

interface ThisProps {
    help?: string;
    label?: string;
    inputMode?: mode;
    size?: fieldSize;
    noStyle?: boolean;
    placeholder?: string;
    hasFeedback?: boolean;
    requiredMark?: boolean;
    isRulesRequired?: boolean;
    disabled?: boolean | undefined;
    validateStatus?: validateStatus;
    countryCode?: string | undefined;
    name?: [number, string] | string;
    addonAfter?: React.ReactNode | string;
    addonBefore?: React.ReactNode | string;
};

export const InputForm: React.FC<ThisProps> = ({
    name,
    help,
    label,
    disabled,
    addonAfter,
    placeholder,
    hasFeedback,
    addonBefore,
    requiredMark,
    validateStatus,
    size = "middle",
    noStyle = false,
    inputMode = "general",
    isRulesRequired = true,
    countryCode = inputMode !== "phoneNumber" ? undefined : "62",
}) => {
    const formInstance = Form.useFormInstance();
    const { language } = useContext(GlobalContext);
    
    const handleOnBlur = useCallback(() => {
        if (inputMode !== "phoneNumber") return;

        const value = formInstance.getFieldValue(name);
        const strippedValue = stripCountryCode(value, countryCode as string);
        formInstance.setFieldsValue({ [name as string]: strippedValue });
    }, [inputMode, countryCode]);

    const fieldRules = useMemo(() => {
        switch (true) {
            case inputMode === "general":
                return generalValidation.find((item) => item.language === language)?.fieldRules;
            case inputMode === "email":
                return emailValidation.find((item) => item.language === language)?.fieldRules;
            case inputMode === "phoneNumber":
                return phoneNumberValidation.find((item) => item.language === language)?.fieldRules;
            case inputMode === "idCard":
                return idCardValidation.find((item) => item.language === language)?.fieldRules;
            case inputMode === "url":
                return urlValidation.find((item) => item.language === language)?.fieldRules;
            default:
                break;
        }
    }, [inputMode, language]);

    const renderAddonBefore = useMemo(() => {
        switch (true) {
            case inputMode === "email":
                return (<MdOutlineAlternateEmail />);
            case inputMode === "phoneNumber":
                return `+${countryCode}`;
            case inputMode === "idCard":
                return (<FaIdCard />);
            case inputMode === "url":
                return (<TbWorldWww />);
            default:
                break;
        }
    }, [inputMode, countryCode]);

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
            <Input 
                size={size}
                autoComplete="off"
                disabled={disabled}
                onBlur={handleOnBlur}
                addonAfter={addonAfter}
                style={{ width: '100%' }}
                placeholder={placeholder === undefined ? `Input ${label}` : placeholder}
                addonBefore={addonBefore === undefined ? renderAddonBefore : addonBefore}
            />
        </Form.Item>
    );
};