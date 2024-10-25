import { FnBDataGrid } from "./FnBDataGrid";
import { DataGridContextProvider } from "../../context/DataGridContextProvider";

export function DataGridPage() {
  return (
    <DataGridContextProvider>
      <FnBDataGrid />
    </DataGridContextProvider>
  );
};