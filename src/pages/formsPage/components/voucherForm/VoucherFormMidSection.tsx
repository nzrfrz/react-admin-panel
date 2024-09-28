import { useCallback, useContext, useMemo } from "react";
import { GlobalContext } from "../../../../context/contextCreate";

import { Form, FormListFieldData } from "antd";
import { CustomButton, InputNumberForm, InputSpaceCompact } from "../../../../_components";
import { generateUniqueID } from "../../../../_utils";

interface ThisProps {
  field: FormListFieldData
};

export const VoucherFormMidSection: React.FC<ThisProps> = ({ field }) => {
  const form = Form.useFormInstance();
  const { windowDimension } = useContext(GlobalContext);

  const generateVoucherCode = useCallback((index: number, fieldName: string) => {
    const randomize = generateUniqueID(10);
    const formValues = form?.getFieldValue("vouchers"); // set the "form name" inside .getFieldValue() as argument
    formValues[index] = { ...formValues[index], [fieldName]: randomize };
    form.setFieldValue('vouchers', formValues);
  }, [form]);

  const secondRowStyles = useMemo(() => {
    switch (true) {
      case windowDimension.width >= 822 && windowDimension.width <= 1190:
      case windowDimension.width >= 752 && windowDimension.width <= 767:
      case windowDimension.width >= 250 && windowDimension.width <= 527:
        return { display: "flex", flexDirection: "column", gap: 8 };
      default:
        return { display: "flex", flexDirection: "row", gap: 8 };
    }
  }, [windowDimension]);

  return (
    <div style={secondRowStyles as React.CSSProperties}>
      <div style={{ width: "100%" }}>
        <span>Voucher Code</span>
        <InputSpaceCompact
          noStyle
          isReadOnly={true}
          label="Voucher Code"
          placeholder="Voucher Code"
          name={[field.name, "voucherCode"]}
          inputValue={form?.getFieldValue("vouchers")[field.name]?.voucherCode}
          spaceCompactComponent={
            <CustomButton
              onClick={() => generateVoucherCode(field.name, "voucherCode")}
            >
              Generate
            </CustomButton>
          }
        />
      </div>
      <div style={{ width: "100%" }}>
        <span>Amount</span>
        <InputNumberForm
          min={0}
          noStyle
          label="Amount"
          addonBefore="USD"
          inputMode="currency"
          name={[field.name, "amount"]}
        />
      </div>
    </div>
  );
};