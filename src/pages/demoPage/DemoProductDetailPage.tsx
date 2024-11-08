import { useNavigate, useParams } from "react-router-dom";
import { CustomButton, MainContainer } from "../../_components";
import { Divider, Result } from "antd";

export function DemoProductDetailPage () {
    const navigateTo = useNavigate();
    const { id } = useParams<{ id: string }>();

    function handleCLickEditProduct () {
        navigateTo(`/demo-page-2-b/demo-detail/edit/${id}`);
    };

    return (
        <MainContainer withBreadcrumb >
            <Result
                title={`Product ${id} Detail Page`}
                subTitle={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>This page is part of <strong><u>Demo Page 2 B</u></strong></span>
                        <Divider />
                        <span>
                            Now you can see the <code><i>Breadcrumb</i></code> is active.
                        </span>
                        <span>
                            Click button below to go to the last part of the page and witness more <code><i>Breadcrumb</i></code> in action.
                        </span>
                    </div>
                }
                extra={
                    <CustomButton 
                        onClick={handleCLickEditProduct}
                    >
                        Edit Product
                    </CustomButton>
                }
            />
        </MainContainer>
    )
};