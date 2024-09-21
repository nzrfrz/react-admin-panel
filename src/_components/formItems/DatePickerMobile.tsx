import { useCallback, useContext, useState } from "react";
import { GlobalContext } from "../../context/contextCreate";

import { DatePicker, ConfigProvider } from "antd-mobile";

import enUS from 'antd-mobile/es/locales/en-US';
import idID from 'antd-mobile/es/locales/id-ID';
import { PickerDate } from "antd-mobile/es/components/date-picker/util";

interface DatePickerMobileProps {
    minDate?: string | Date,
    maxDate?: string | Date,
    showTime?: boolean,
    calendarOpen?: boolean,
    setCalendarOpen?: (calendarOpen: boolean) => void | undefined,
    onConfirmDate?: (date: PickerDate) => void
};

const getMonthName = (monthNumber: number, language: string): string => {
    const monthNamesEN = [
        "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthNamesID = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return language === "en" ? monthNamesEN[monthNumber - 1] : monthNamesID[monthNumber - 1];
};

export const DatePickerMobile: React.FC<DatePickerMobileProps> = ({
    showTime,
    minDate,
    maxDate,
    calendarOpen,
    setCalendarOpen,
    onConfirmDate,
}) => {
    const { language } = useContext(GlobalContext);
    const [locale] = useState(language === "en" ? enUS : idID);

    const labelRender = useCallback((type: string, data: number) => {
        return (
            <span>
                {type === 'year' && `${data}`}
                {type === 'month' && getMonthName(data, language)}
                {type === 'day' && `${data}`}
                {type === 'hour' && `H ${data}`}
                {type === 'minute' && `M ${data}`}
                {type === 'second' && `s ${data}`}
            </span>
        )      
    }, [language]);
    
    return (
        <ConfigProvider locale={locale}>
            <div style={{ touchAction: 'none' }}>
                <DatePicker 
                    tillNow={true}
                    mouseWheel={true}
                    visible={calendarOpen}
                    renderLabel={labelRender}
                    onConfirm={onConfirmDate}
                    precision={showTime === true ? "minute" : undefined}
                    onClose={() => setCalendarOpen && setCalendarOpen(false)}
                    max={maxDate === undefined ? undefined : new Date(maxDate)}
                    min={minDate === undefined ? new Date("1970-01-01") : new Date(minDate)}
                />
            </div>
        </ConfigProvider>
    );
};