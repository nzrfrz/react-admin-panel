import { Input } from "antd";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

interface ThisProps {
  disabled?: boolean
  placeHolder?: string,
  onSearch?: SearchProps['onSearch'],
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export const SearchInput: React.FC<ThisProps> = ({
  disabled,
  placeHolder,
  onSearch,
  onChange,
}) => {
  return (
    <Search
      allowClear
      enterButton
      size="middle"
      disabled={disabled}
      onSearch={onSearch}
      onChange={onChange}
      placeholder={placeHolder}
    />
  );
};