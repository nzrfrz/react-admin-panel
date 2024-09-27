import { MainContainer } from "../../_components";
import { BasicInputForm } from "./components/basicForm/BasicInputForm";
import { BasicNumberInputForm } from "./components/basicForm/BasicNumberInputForm";
import { CurrencyInputForm } from "./components/basicForm/CurrencyInputForm";
import { DateTimeInputForm } from "./components/basicForm/DateTimeInputForm";
import { EmailInputForm } from "./components/basicForm/EmailInputForm";
import { IDCardNumberInputForm } from "./components/basicForm/IDCardNumberInputForm";
import { PasswordInputForm } from "./components/basicForm/PasswordInputForm";
import { PhoneNumberInputForm } from "./components/basicForm/PhoneNumberInputForm";
import { SelectSearchForm } from "./components/basicForm/SelectSearchForm";
import { TextAreaInputForm } from "./components/basicForm/TextAreaInputForm";
import { URLInputForm } from "./components/basicForm/URLInputForm";

export const BasicFormsPage = () => {
    return (
        <MainContainer scrolly={true} >
            <div style={{display: "flex", flexDirection: "column", gap: 16}} >
                <h1>Basic Form Items</h1>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
                    <div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
                        <BasicInputForm />
                        <URLInputForm />
                        <IDCardNumberInputForm />
                        <SelectSearchForm />
                        <PasswordInputForm />
                    </div>
                    <div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
                        <PhoneNumberInputForm />
                        <EmailInputForm />
                        <DateTimeInputForm />
                        <BasicNumberInputForm />
                        <CurrencyInputForm />
                        <TextAreaInputForm />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};