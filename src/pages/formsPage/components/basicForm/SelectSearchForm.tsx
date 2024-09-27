import { useEffect, useState } from "react";

import { Card, Checkbox, Form, Switch } from "antd";
import { CustomButton, SelectForm } from "../../../../_components";
import { RenderFormValue } from "../RenderFormValue";

const selectOptionsData = [
    {
        label: "Apple",
        value: "apple",
        slug: "apple"
    },
    {
        label: "Orange",
        value: "orange",
        slug: "orange"
    },
    {
        label: "Banana",
        value: "banana",
        slug: "banana"
    },
    {
        label: "Grapes",
        value: "grapes",
        slug: "grapes"
    },
    {
        label: "Pineapple",
        value: "pineapple",
        slug: "pineapple"
    },
    {
        label: "Strawberry",
        value: "strawberry",
        slug: "strawberry"
    },
    {
        label: "Mango",
        value: "mango",
        slug: "mango"
    },
    {
        label: "Blueberry",
        value: "blueberry",
        slug: "blueberry"
    },
    {
        label: "Watermelon",
        value: "watermelon",
        slug: "watermelon"
    },
    {
        label: "Peach",
        value: "peach",
        slug: "peach"
    }
];

export function SelectSearchForm() {
    const [form] = Form.useForm();
    const [value, setValue] = useState("");
    const [isHideSelected, setIsHideSelected] = useState(false);
    const [selectMode, setSelectMode] = useState<string | undefined>("single");

    const selectWatchedForm = Form.useWatch("fruit", form);

    const toggleCheckBox = () => {
        setValue("");
        form.resetFields();
        setIsHideSelected(!isHideSelected);
    };

    const toggleSwitch = (e: boolean) => {
        if (e === false) {
            setValue("");
            form.resetFields();
            setSelectMode("single");
            setIsHideSelected(false);
        }
        else {
            setValue("");
            form.resetFields();
            setSelectMode("multiple");
        }
    };

    const onSubmitForm = (values: any) => {
        setValue(values);
    };

    useEffect(() => {
        if (selectWatchedForm === undefined || selectWatchedForm?.length === 0) return setValue("");
    }, [selectWatchedForm]);

    return (
        <Card title="Select Form">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <Checkbox
                        checked={isHideSelected}
                        onClick={toggleCheckBox}
                        disabled={selectMode === "single"}
                    >
                        Hide Selected
                    </Checkbox>
                    <Switch
                        checkedChildren="Multiple"
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
                    <SelectForm
                        name={selectMode === "single" ? "fruit" : "fruits"}
                        label="Fruit(s)"
                        allowClear={true}
                        showSearch={true}
                        requiredMark={true}
                        hideSelected={isHideSelected}
                        selectOptions={selectOptionsData}
                        selectMode={selectMode as undefined}
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