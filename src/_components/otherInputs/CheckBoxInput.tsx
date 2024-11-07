import { useEffect } from "react";
import { Checkbox } from "antd";

export type checkboxInputType = "single" | "multiple";

export interface CheckboxDataProps {
	label: string,
	value: string,
	isChecked: boolean,
};

interface ThisProps {
	data: CheckboxDataProps[];
	checkboxMode: checkboxInputType;
	checkedItems: string | string[] | undefined;
	setCheckedItems: React.Dispatch<React.SetStateAction<string | string[] | undefined>>;
	checkboxData: CheckboxDataProps[];
	setCheckboxData: React.Dispatch<React.SetStateAction<CheckboxDataProps[]>>;
};

const CheckboxGroup = Checkbox.Group;

export const CheckBoxInput: React.FC<ThisProps> = ({
	data,
	checkboxMode,
	checkedItems,
	setCheckedItems,
	checkboxData,
	setCheckboxData,
}) => {

	const onChangeMultiple = (list: string[]) => {
		setCheckedItems(list);
	};

	const onChangeSingle = (selectedValue: string) => {
		setCheckboxData((prevValues) => {
			return prevValues?.map((data) => {
				switch (true) {
					case selectedValue === data?.value && data?.isChecked === false:
						setCheckedItems(selectedValue);
						return { ...data, isChecked: true };
					case selectedValue === data?.value && data?.isChecked === true:
						setCheckedItems(undefined);
						return { ...data, isChecked: false };
					case selectedValue !== data?.value && data?.isChecked === true:
						return { ...data, isChecked: false };
					default:
						return { ...data };
				}
			})
		});
	};

	useEffect(() => {
		setCheckboxData(data);
	}, [checkboxMode]);

	if (checkboxMode === "single") return (
		<>
			{
				checkboxData?.map((data) => (
					<Checkbox
						key={data.value}
						checked={data?.isChecked}
						onChange={() => onChangeSingle(data.value as string)}
					>
						{data.label}
					</Checkbox>
				))
			}
		</>
	);
	else return (
		<CheckboxGroup
			options={checkboxData}
			onChange={onChangeMultiple}
			value={checkedItems as string[]}
		/>
	);
};