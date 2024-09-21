import { Result } from "antd";
import { MainContainer } from "../../_components";

export const DemoPage2A = () => {
    return (
        <MainContainer centerItems={true} >
            <Result
                title="Demo Page 2 A"
                subTitle={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>This page is inside <strong><u>Demo Page 2</u></strong> child parent of the <code><i>Breadcrumb</i></code> parent most sidebar menu.</span>
                        <span>Go to <strong><u>Demo Page 2 B</u></strong> to see <code><i>Breadcrumb</i></code> in action.</span>
                    </div>
                }
            />
        </MainContainer>
    );
};