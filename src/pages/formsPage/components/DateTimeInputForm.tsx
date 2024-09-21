import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { CustomButton } from "../../../_components";
import { RenderFormValue } from "./RenderFormValue";

import { Card, Checkbox, Form, Switch } from "antd";
import { DatePickerForm } from "../../../_components/formItems/DatePickerForm";

export const DateTimeInputForm = () => {
    const [form] = Form.useForm();
    const [showTime, setShowTime] = useState(false);
    const [value, setValue] = useState<any>("");
    const [pickerMode, setPickerMode] = useState<string>("single");

    const dateFormValue = Form.useWatch("pickedDate", form);

    const toggleCheckBox = () => {
        setValue("");
        form.resetFields();
        setShowTime(!showTime);
    };

    const toggleSwitch = (e: boolean) => {
        if (e === false) {
            setValue("");
            form.resetFields();
            setPickerMode("single");
        }
        else {
            setValue("");
            form.resetFields();
            setPickerMode("range");
        }
    };

    const onSubmitForm = (values: any) => {
        const isArray = Array.isArray(values.pickedDate);
        const dateFormat = showTime === true ? 'DD MMM YYYY HH:mm' : 'DD MMM YYYY';

        if (isArray === false) {
            const formattedValues = {
                pickedDate: dayjs(values.pickedDate).format(dateFormat),
            };
            setValue(formattedValues);
        }
        else {
            const formattedValues = {
                startDate: dayjs(values.pickedDate[0]).format(dateFormat),
                endDate: dayjs(values.pickedDate[1]).format(dateFormat),
            };
            setValue(formattedValues);
        }
    };

    useEffect(() => {
        if (dateFormValue === null) setValue("");
    }, [dateFormValue]);

    return (
        <Card title="Date Time Input Form">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <Checkbox checked={showTime} onClick={toggleCheckBox}>Show Time</Checkbox>
                    <Switch
                        checkedChildren="Range"
                        unCheckedChildren="Single"
                        onChange={toggleSwitch}
                    />
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    scrollToFirstError
                    wrapperCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    onFinish={onSubmitForm}
                >
                    <DatePickerForm
                        name="pickedDate"
                        label="Pick Any Date"
                        required={true}
                        showTime={showTime}
                        pickerMode={pickerMode as string}
                    />
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <CustomButton
                            htmlType="submit"
                            colorType="success"
                        >
                            Submit
                        </CustomButton>
                        <CustomButton
                            colorType="default"
                            style={{ display: value !== "" ? "block" : "none" }}
                            onClick={() => {
                                setValue("");
                                form.resetFields();
                            }}
                        >
                            Reset
                        </CustomButton>
                    </div>
                </Form>
                <RenderFormValue value={value} />
            </div>
        </Card>
    );
};