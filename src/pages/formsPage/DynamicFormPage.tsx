import dayjs from "dayjs";
import { useState } from "react";
import { CustomButton, MainContainer } from "../../_components";

import { Form } from "antd";
import { VoucherForm } from "./components/voucherForm/VoucherForm";
import { RenderFormValue } from "./components/RenderFormValue";

export function DynamicFormPage() {
	const [form] = Form.useForm();
	const [formValues, setFormValues] = useState<any>(undefined);

	function handleReset () {
		form.resetFields();
		setFormValues(undefined);
	};

	const onFinishForms = (values: any) => {
		const temp = values.vouchers.map((item: any) => {
			return {
				...item,
				voucherStartDate: dayjs(item.validityDate[0]).format("DD MMM YYYY HH:mm"),
				voucherEndDate: dayjs(item.validityDate[1]).format("DD MMM YYYY HH:mm"),
			}
		});
		setFormValues(temp);
	};

	return (
		<MainContainer scrolly>
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }} >
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<h1>Bulk Form</h1>
					<CustomButton
						colorType="default"
						onClick={handleReset}
					>
						Reset
					</CustomButton>
				</div>
				<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
					<div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
						<Form
							form={form}
							autoComplete="off"
							layout="vertical"
							wrapperCol={{ span: 24 }}
							style={{ width: "100%" }}
							initialValues={{ vouchers: [{}] }}
							onFinish={onFinishForms}
						>
							<Form.List name={"vouchers"}>
								{(fields, { add, remove }) => {
									return (
										<VoucherForm
											add={add}
											remove={remove}
											fields={fields}
										/>
									)
								}}
							</Form.List>
						</Form>
					</div>
					<div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
						<RenderFormValue value={formValues} />
					</div>
				</div>
			</div>
		</MainContainer>
	);
};