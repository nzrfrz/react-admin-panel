import { useState } from "react";

import { Card, Form } from "antd";
import { CustomButton, InputNumberForm } from "../../../_components";
import { RenderFormValue } from "./RenderFormValue";

export function CurrencyInputForm() {
    const [form] = Form.useForm();
    const [value, setValue] = useState("");

    const onSubmitForm = (values: any) => {
        setValue(values);
    };

    function resetForm () {
        setValue("");
        form.resetFields();
    };

    return (
        <Card title="Currency Input Form">
            <Form
                form={form}
                layout="vertical"
                scrollToFirstError
                wrapperCol={{ span: 24 }}
                style={{ width: "100%" }}
                onFinish={onSubmitForm}
            >
                <InputNumberForm
                    name="price"
                    label="Price"
                    inputMode="currency"
                    requiredMark={true}
                    addonBefore={"$"}
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
    );
};