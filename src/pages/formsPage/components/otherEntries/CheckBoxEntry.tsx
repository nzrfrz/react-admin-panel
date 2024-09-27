import { useState } from "react";

import { Card, Switch } from "antd";
import { CheckboxDataProps, CheckBoxInput, checkboxInputType } from "../../../../_components";
import { RenderFormValue } from "../RenderFormValue";

const data: CheckboxDataProps[] = [
    {
        label: "Apple",
        value: "apple",
        isChecked: false,
    },
    {
        label: "Orange",
        value: "orange",
        isChecked: false,
    },
    {
        label: "Banana",
        value: "banana",
        isChecked: false,
    },
    {
        label: "Grapes",
        value: "grapes",
        isChecked: false,
    },
    {
        label: "Pineapple",
        value: "pineapple",
        isChecked: false,
    },
    {
        label: "Strawberry",
        value: "strawberry",
        isChecked: false,
    },
    {
        label: "Mango",
        value: "mango",
        isChecked: false,
    },
    {
        label: "Blueberry",
        value: "blueberry",
        isChecked: false,
    },
    {
        label: "Watermelon",
        value: "watermelon",
        isChecked: false,
    },
    {
        label: "Peach",
        value: "peach",
        isChecked: false,
    }
];

export function CheckBoxEntry() {
    const [checkboxMode, setCheckboxMode] = useState<checkboxInputType>("single");
    const [checkedItems, setCheckedItems] = useState<string | string[] | undefined>(undefined);

    const toggleSwitch = (e: boolean) => {
        setCheckedItems(undefined);
        if (e === false) setCheckboxMode("single");
        else setCheckboxMode("multiple");
    };

    return (
        <Card title="Check Box Entry">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <Switch
                        checkedChildren="Multiple"
                        unCheckedChildren="Single"
                        onChange={toggleSwitch}
                    />
                </div>
                <div>
                    <CheckBoxInput 
                        data={data}
                        checkboxMode={checkboxMode}
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                    />
                </div>
                <RenderFormValue value={checkedItems} />
            </div>
        </Card>
    );
};