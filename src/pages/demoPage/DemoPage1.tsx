import { Result } from "antd";
import { MainContainer } from "../../_components";

export const DemoPage1 = () => {
    return (
        <MainContainer>
            <Result
                title="Demo Page 1"
                subTitle={<span>This page is inside <code>Breadcrumb</code> Parent most sidebar menu.</span>}
            />
        </MainContainer>
    );
};