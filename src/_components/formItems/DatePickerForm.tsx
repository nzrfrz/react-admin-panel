import dayjs from "dayjs";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { DatePickerMobile } from "./DatePickerMobile";

import { DatePicker, Form } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { generalValidation, noValidation } from "../../_utils";
import { PickerDate } from "antd-mobile/es/components/date-picker/util";

type pickerModeTypes = "single" | "range" | undefined;

interface RangePickerInfoProps {
    range?: string | undefined
};

interface DatePickerFormProps {
    noStyle?: boolean,
    name?: [number, string] | string,
    label?: string,
    size?: SizeType,
    minDate?: string | Date,
    maxDate?: string | Date,
    required?: boolean,
    disabled?: boolean,
    showTime?: boolean,
    requiredMark?: boolean, 
    pickerMode?: pickerModeTypes | string,
};

const { RangePicker } = DatePicker;

export const DatePickerForm: React.FC<DatePickerFormProps> = ({
    name,
    label,
    minDate,
    maxDate,
    noStyle = false,
    size = "middle",
    required = true,
    disabled = false,
    showTime = false,
    requiredMark = true,
    pickerMode = "single",
}) => {
    const form = Form.useFormInstance();
    const rangeUseWatch = Form.useWatch(name, form);

    const { language, windowDimension } = useContext(GlobalContext);

    const [rangeInfo, setRangeInfo] = useState("");
    const [datePickerMobileOpen, setDatePickerMobileOpen] = useState(false);
    const [rangeFieldValues, setRangeFieldValues] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

    const inputRules = useMemo(() => {
        if (required === true) return generalValidation.find((item) => item.language === language)?.fieldRules;
        else return noValidation;
    }, [language, required]);

    const onFocusDatePicker = useCallback((
        e: React.FocusEvent<HTMLElement, Element>, 
        info: RangePickerInfoProps
    ) => {
        if (windowDimension.width > 720) return;

        if (pickerMode === "single") return setDatePickerMobileOpen(true);
        else {
            setDatePickerMobileOpen(true);
            setRangeInfo(info.range as string);
        }
        return e;
    }, [pickerMode, windowDimension]);

    const onConfirmMobileDatePicker = useCallback((date: PickerDate) => {
        let newRangeFieldValues = [ ...rangeFieldValues ];        

        if (pickerMode === "single") {
            form?.setFieldsValue({ [name as string]: dayjs(date) });
        }
        else {
            const selectedDate = dayjs(date);
            if (rangeInfo === 'start') newRangeFieldValues[0] = selectedDate;
            else newRangeFieldValues[1] = selectedDate;

            setRangeFieldValues(newRangeFieldValues as [dayjs.Dayjs, dayjs.Dayjs]);
            form?.setFieldsValue({ [name as string]: newRangeFieldValues });
        }
        
    }, [pickerMode, rangeInfo, rangeFieldValues]);

    const onChangeRangePicker = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
        if (dates === null) {
            setRangeInfo("");
            setRangeFieldValues([null, null]);
        }
    };

    useEffect(() => {
        if (pickerMode === "single") return;

        if (rangeUseWatch === undefined) {
            setRangeInfo("");
            setRangeFieldValues([null, null]);
        }
    }, [rangeUseWatch, pickerMode]);

    return (
        <>
        <Form.Item
            name={name}
            label={label}
            noStyle={noStyle}
            rules={inputRules}
            required={requiredMark}
        >
            {
                pickerMode === "single" ?
                <DatePicker 
                    size={size}
                    showTime={showTime}
                    disabled={disabled}
                    style={{ width: "100%" }}
                    onFocus={onFocusDatePicker}
                    open={windowDimension.width <= 720 ? false : undefined}
                    minDate={minDate === undefined ? undefined : dayjs(minDate)}
                    maxDate={maxDate === undefined ? undefined : dayjs(maxDate)}
                    format={showTime === true ? "DD MMM YYYY HH:mm" : "DD MMM YYYY"}
                />
                :
                <RangePicker 
                    size={size}
                    showTime={showTime}
                    disabled={disabled}
                    style={{ width: "100%" }}
                    onFocus={onFocusDatePicker}
                    onChange={onChangeRangePicker}
                    open={windowDimension.width <= 720 ? false : undefined}
                    minDate={minDate === undefined ? undefined : dayjs(minDate)}
                    maxDate={maxDate === undefined ? undefined : dayjs(maxDate)}
                    format={showTime === true ? "DD MMM YYYY HH:mm" : "DD MMM YYYY"}
                />
            }
        </Form.Item>
        <DatePickerMobile 
            maxDate={maxDate}
            minDate={minDate}
            showTime={showTime}
            calendarOpen={datePickerMobileOpen}
            setCalendarOpen={setDatePickerMobileOpen}
            onConfirmDate={onConfirmMobileDatePicker}
        />
        </>
    );
};