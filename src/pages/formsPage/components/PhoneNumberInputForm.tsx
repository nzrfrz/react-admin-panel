import { useState } from "react";

import { CustomButton, InputForm } from "../../../_components";
import { RenderFormValue } from "./RenderFormValue";

import { Card, Form } from "antd";

const COUNTRY_CODE = "62";

export function PhoneNumberInputForm () {
    const [form] = Form.useForm();
    const [value, setValue] = useState("");

    const onSubmitForm = (values: any) => {
        const value: any = {
            phoneNumber: COUNTRY_CODE + values.phoneNumber
        }
        setValue({...value});
    };

    function resetForm () {
        setValue("");
        form.resetFields();
    };

    return (
        <Card title="Phone Number Input Form">
            <Form
                form={form}
                layout="vertical"
                scrollToFirstError
                wrapperCol={{ span: 24 }}
                style={{ width: "100%" }}
                onFinish={onSubmitForm}
            >
                <InputForm
                    name="phoneNumber"
                    label="Phone Number"
                    inputMode="phoneNumber"
                    countryCode={COUNTRY_CODE}
                    requiredMark={true}
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
                        onClick={resetForm}
                        style={{ display: value !== "" ? "block" : "none" }}
                    >
                        Reset
                    </CustomButton>
                </div>
                <RenderFormValue value={value} />
            </Form>
        </Card>
    )
}