import { useParams } from "react-router-dom";

import { Result } from "antd";
import { MainContainer } from "../../_components";

export const DemoEditPage = () => {
    const { id } = useParams<{ id: string }>();
    
    return (
        <MainContainer centerItems={true} >
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