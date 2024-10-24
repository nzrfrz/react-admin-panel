import { MainContainer } from "../../_components";
import { CheckBoxEntry } from "./components/otherEntries/CheckBoxEntry";
import { EntryOTP } from "./components/otherEntries/EntryOTP";
import { FileUploader } from "./components/otherEntries/FileUploader";
import { GlobalNotification } from "./components/otherEntries/GlobalNotification";
import { ServerSearch } from "./components/otherEntries/ServerSearch";

export const OtherEntriesPage = () => {
  return (
    <MainContainer scrolly>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }} >
        <h1>Other Entries</h1>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
            <FileUploader />
            <ServerSearch />
          </div>
          <div style={{ display: "flex", flex: "1 1 320px", flexDirection: "column", gap: 16 }}>
            <CheckBoxEntry />
            <EntryOTP />
            <GlobalNotification />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};