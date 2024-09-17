import { MainContainer } from "../../_components";
import { BasicInputForm } from "./components/BasicInputForm";
import { EmailInputForm } from "./components/EmailInputForm";
import { IDCardNumberInputForm } from "./components/IDCardNumberInputForm";
import { PhoneNumberInputForm } from "./components/PhoneNumberInputForm";
import { URLInputForm } from "./components/URLInputForm";

export const BasicFormsPage = () => {
    return (
        <MainContainer scrolly={true} >
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
                    <BasicInputForm />
                    <URLInputForm />
                    <IDCardNumberInputForm />
                </div>
                <div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
                    <PhoneNumberInputForm />
                    <EmailInputForm />
                </div>
            </div>
        </MainContainer>
    );
};