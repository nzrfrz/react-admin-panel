import { MainContainer } from "../../_components";

import illustrationImg from "../../assets/dashboard_illustration_v2.png";

export const Dashboard = () => {
    return (
        <MainContainer centerItems>
            <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={illustrationImg} />
                </div>
            </div>
        </MainContainer>
    );
};