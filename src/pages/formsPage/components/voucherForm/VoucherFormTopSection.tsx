import { FormListFieldData } from "antd";
import { InputForm, InputNumberForm } from "../../../../_components";

interface ThisProps {
  field: FormListFieldData
};

export const VoucherFormTopSection: React.FC<ThisProps> = ({ field }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
      <div style={{ width: "70%" }}>
        <span>Voucher Name</span>
        <InputForm
          noStyle
          label="Voucher Name"
          name={[field.name, "voucherName"]}
        />
      </div>
      <div style={{ width: "30%" }}>
        <span>Qty</span>
        <InputNumberForm
          min={0}
          noStyle
          label="Qty"
          name={[field.name, "qty"]}
        />
      </div>
    </div>
  );
};