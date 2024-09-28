import { Card, FormListFieldData } from "antd";
import { StoreValue } from "antd/es/form/interface";
import { CustomButton, DatePickerForm } from "../../../../_components";
import { VoucherFormTopSection } from "./VoucherFormTopSection";
import { VoucherFormMidSection } from "./VoucherFormMidSection";

interface ThisProps {
	fields?: FormListFieldData[],
	remove: (index: number | number[]) => void,
	add: (defaultValue?: StoreValue, insertIndex?: number) => void,
};

export const VoucherForm: React.FC<ThisProps> = ({
	fields,
	add,
	remove,
}) => {
	return (
		<>
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{
					fields?.map((field) =>
						<Card
							key={field.key}
							title={`Voucher ${field.name + 1}`}
							extra={
								<CustomButton
									colorType="error"
									disabled={fields.length === 1 ? true : false}
									onClick={() => remove(field.name)}
								>
									Remove
								</CustomButton>
							}
						>
							<div style={{ display: "flex", flexDirection: "column", gap: 8 }} >
								<VoucherFormTopSection field={field} />
								<VoucherFormMidSection field={field} />
								<div>
									<span>Voucher Validity</span>
									<DatePickerForm
										noStyle
										showTime={true}
										pickerMode="multiple"
										label="Voucher Validity Date"
										name={[field.name, "validityDate"]}
									/>
								</div>
							</div>
						</Card>
					)
				}
			</div>

			<div style={{ display: "flex", flexDirection: "row", margin: "16px 0px", gap: 8 }}>
				<CustomButton
					block={true}
					onClick={() => add()}
				>
					Add Voucher
				</CustomButton>
				<CustomButton
					htmlType="submit"
					colorType="success"
				>
					Submit
				</CustomButton>
			</div>
		</>
	);
};