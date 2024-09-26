import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { Form, Select, Tooltip } from 'antd';

import { DefaultOptionType } from 'antd/es/select';
import { FilterFunc } from 'rc-select/lib/Select';
import { generalValidation, noValidation } from "../../_utils";

type validateStatus = "" | "success" | "warning" | "error" | "validating" | undefined;
type fieldSize = "small" | "middle" | "large";
type selectMode = "single" | "multiple";

interface ThisProps {
    showSearch?: boolean,
    allowClear?: boolean,
    help?: string,
    name?: string,
    label?: string,
    size?: fieldSize,
    noStyle?: boolean,
    disabled?: boolean,
    placeholder?: string,
    hasFeedback?: boolean,
    requiredMark?: boolean,
    hideSelected?: boolean,
    selectMode?: selectMode,
    isRulesRequired?: boolean,
    validateStatus?: validateStatus,
    selectOptions: DefaultOptionType[],
};

export interface SelectOptionProps {
    label: string,
    value: string,
    slug?: string,
};

export const SelectForm: React.FC<ThisProps> = ({
    help, 
    name, 
    label, 
    disabled,
    placeholder, 
    hasFeedback, 
    validateStatus,
    selectOptions, 
    noStyle = false,
    size = "middle",
    showSearch = false,
    allowClear = false,
    requiredMark = true, 
    hideSelected = false,
    selectMode = "single",
    isRulesRequired = true,
}) => {
    const { language } = useContext(GlobalContext);
    
    const form = Form.useFormInstance();
    const optionUseWatch = Form.useWatch(name, form);

    const fieldRules = useMemo(() => {
        if (isRulesRequired === false) return noValidation;
        else return generalValidation.find((item) => item.language === language)?.fieldRules;
    }, [language, isRulesRequired]);

    const maxTagCount = useMemo(() => {
        if (selectMode !== "single") return "responsive";
        else return undefined;
    }, [selectMode]);

    const optionItems = useMemo(() => {
        if (selectMode === "single") return selectOptions;
        else {
            if (hideSelected === true) return selectOptions.filter((item) => !optionUseWatch?.includes(item.value));
            else return selectOptions;
        }
    }, [selectMode, selectOptions, hideSelected, optionUseWatch]);

    const filterOption = (input: string, option?: SelectOptionProps) => option?.slug?.includes(input.toLowerCase()) || option?.value?.includes(input.toLowerCase());
    
    return (
        <Form.Item
            name={name}
            help={help}
            label={label}
            noStyle={noStyle}
            required={requiredMark}
            hasFeedback={hasFeedback}
            validateStatus={validateStatus}
            rules={fieldRules}
        >
            <Select 
                size={size}
                disabled={disabled}
                options={optionItems}
                showSearch={showSearch}
                allowClear={allowClear}
                style={{ width: "100%" }}
                maxTagCount={maxTagCount}
                optionFilterProp="children"
                mode={selectMode === "single" ? undefined : selectMode}
                placeholder={placeholder === undefined ? `Select ${label}` : placeholder}
                filterOption={filterOption as FilterFunc<DefaultOptionType> | boolean | undefined}
                maxTagPlaceholder={(omittedValues) => {
                    if (selectMode === "single") return undefined;
                    else return (
                        <Tooltip
                            overlayStyle={{ pointerEvents: 'none' }}
                            title={omittedValues?.map(({ label }) => label).join(', ')}
                        >
                            <span>+{omittedValues?.length} ...</span>
                        </Tooltip>
                    )
                }}
            />
        </Form.Item>
    );
};