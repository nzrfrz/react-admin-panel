import { useParams } from "react-router-dom";

import { Result } from "antd";
import { MainContainer } from "../../_components";

export function DemoProductEditPage () {
    const { id } = useParams<{ id: string }>();

    return (
        <MainContainer withBreadcrumb>
            <Result
                title={`Product ${id} Edit Page`}
                subTitle={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>This page is the last part of <strong><u>Demo Page 2 B</u></strong></span>
                    </div>
                }
            />
        </MainContainer>
    );
};