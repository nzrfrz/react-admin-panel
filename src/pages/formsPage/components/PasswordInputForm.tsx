import { useState } from "react";
import { Card, Checkbox, Form } from "antd";
import { CustomButton, PasswordForm } from "../../../_components";
import { RenderFormValue } from "./RenderFormValue";

export function PasswordInputForm() {
    const [form] = Form.useForm();
    const [value, setValue] = useState("");
    const [useStrict, setUseStrict] = useState(false);

    const toggleCheckBox = () => {
        setValue("");
        form.resetFields();
        setUseStrict(!useStrict);
    };

    const onSubmitForm = (values: any) => {
        setValue(values);
    };

    return (
        <Card title="Password Input Form">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Checkbox checked={useStrict} onClick={toggleCheckBox}>Use Strict Password</Checkbox>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    scrollToFirstError
                    wrapperCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    onFinish={onSubmitForm}
                >
                    <PasswordForm
                        requiredMark={true}
                        withConfirmPassword={true}
                        useStrictPassword={useStrict}
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