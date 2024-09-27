import { useState } from "react";
import { useDebounce } from "../../../../_hooks";

import { Card } from "antd";
import { SearchInput } from "../../../../_components";
import { RenderFormValue } from "../RenderFormValue";

export function ServerSearch() {
    const [searchValue, setSearchValue] = useState<string>("");
    const debounceSave = useDebounce((nextValue) => {
        setSearchValue(nextValue);
    }, 700);

    return (
        <Card title="Server Search">
            <div style={{ margin: "8px 0px" }}>
                <SearchInput
                    placeHolder="Try to type here..."
                    onSearch={(value) => setSearchValue(value)}
                    onChange={(e) => debounceSave(e.target.value)}
                />
            </div>
            <div style={{ marginTop: 16 }}>
                <RenderFormValue value={searchValue} />
            </div>
        </Card>
    );
};