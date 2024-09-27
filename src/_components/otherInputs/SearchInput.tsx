import { Input } from "antd";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

interface ThisProps {
    placeHolder?: string, 
    onSearch?: SearchProps['onSearch'], 
    onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export const SearchInput: React.FC<ThisProps> = ({
    placeHolder,
    onSearch,
    onChange,
}) => {
    return (
        <Search 
            allowClear
            enterButton 
            size="large"
            onSearch={onSearch}
            onChange={onChange}
            placeholder={placeHolder} 
        />
    );
};