import { useMemo, useState } from "react";

import { Card } from "antd";
import { OTPProps } from "antd/es/input/OTP";

import { CheckboxDataProps, CheckBoxInput, InputOTP } from "../../../../_components";
import { generateUniqueID } from "../../../../_utils";

const data = [
    {
        label: "With 8 Length",
        value: "8",
        isChecked: false,
    },
    {
        label: "With Formatter",
        value: "format",
        isChecked: false,
    },
    {
        label: "Mask Input",
        value: "mask",
        isChecked: false,
    },
];

export function EntryOTP() {
    const [isLoading, setIsLoading] = useState(false);
    const [OTPFieldStatus, setOTPFieldStatus] = useState<OTPProps["status"]>("");

    const [checkedValue, setCheckedValue] = useState<string>("");
    const [checkboxData, setCheckboxData] = useState<CheckboxDataProps[]>(data);

    const demoOTPCode = useMemo(() => {
        const numberLength = checkedValue === "8" ? +checkedValue : 6;
        const isFormatted = checkedValue === "format" ? true : false;
        const uniqueChar = generateUniqueID(numberLength);

        if (isFormatted) return uniqueChar.toUpperCase();
        return uniqueChar;
    }, [checkedValue]);

    const fieldLength = useMemo(() => {
        if (checkedValue !== "8") return 6;
        else return +checkedValue;
    }, [checkedValue]);

    const maskInput = useMemo(() => {
        if (checkedValue === "mask") return "*";
        else return false;
    }, [checkedValue]);

    const checkCode = (text: string) => {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                if (text === demoOTPCode) return reslove({ statusCode: 200, message: "OTP Valid" });
                else return reject({ statusCode: 400, message: "OTP Invalid" });
            }, 1500);
        });
    };

    const onCompleteOTP = async (text: string) => {
        setIsLoading(true);
        try {
            await checkCode(text);
            setIsLoading(false);
            setOTPFieldStatus("");
        } catch (error) {
            setIsLoading(false);
            setOTPFieldStatus("error");
        }
    };

    return (
        <Card title="OTP Input">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }} >
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignSelf: "flex-end" }}>
                        <CheckBoxInput
                            data={checkboxData}
                            checkboxMode="single"
                            checkedItems={checkedValue}
                            setCheckedItems={setCheckedValue as any}
                            checkboxData={checkboxData}
                            setCheckboxData={setCheckboxData}
                        />
                    </div>
                    <div style={{ display: "flex", alignSelf: "center" }}>
                        <span style={{ textAlign: "center" }}>Your OTP Code: <br></br>{demoOTPCode}</span>
                    </div>
                </div>
                <div>
                    <InputOTP
                        mask={maskInput}
                        length={fieldLength}
                        disabled={isLoading}
                        fieldStatus={OTPFieldStatus}
                        uppercaseFormat={checkedValue === "format"}
                        onCompleteFields={(text) => onCompleteOTP(text)}
                    />
                </div>
            </div>
        </Card>
    );
};