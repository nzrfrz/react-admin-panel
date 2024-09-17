
import { MainContainer } from "../../_components";
import comingSoonIllustartion from "../../assets/coming_soon_v3.png";

export const OtherEntriesPage = () => {
    return (
        <MainContainer>
            <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 500 }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={comingSoonIllustartion} />
                </div>
            </div>
        </MainContainer>
    );
};