import { useNavigate } from "react-router-dom";

import { Divider, Result } from "antd";
import { CustomButton, MainContainer } from "../../_components";
import { generateUniqueID } from "../../_utils";

export const DemoPage2B = () => {
    const navigateTo = useNavigate();

    function handleClickProductDetail () {
        const randomChars = generateUniqueID();
        navigateTo(`/demo-page-2-b/demo-detail/${randomChars}`);
    };

    return (
        <MainContainer centerItems={true} >
            <Result
                title="Demo Page 2 B"
                subTitle={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>This page is inside <strong><u>Demo Page 2</u></strong> child parent of the <code><i>Breadcrumb</i></code> parent most sidebar menu.</span>
                        <Divider />
                        <span>
                        This is the main page.  So in my opinion this page is not necessary to have a <code><i>Breadcrumb</i></code>.
                        </span>
                        <br></br>
                        <span>
                        Imagine this page showing you a list of products, and in here each of every product have a detail view, and inside the detail view you can edit the product detail.
                        </span>
                        <br></br>
                        <span>
                        All the action is redirect to a new page, so give it an action by clicking the button below.
                        </span>
                    </div>
                }
                extra={
                    <CustomButton 
                        onClick={handleClickProductDetail}
                    >
                        Product Detail
                    </CustomButton>
                }
            />
        </MainContainer>
    );
};