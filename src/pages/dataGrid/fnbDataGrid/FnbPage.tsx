import { FnbContextProvider } from "./fnbContext/FnbContextProvider";
import { FnbDataGrid } from "./FnbDataGrid";


export function FnbPage () {
  return (
    <FnbContextProvider>
      <FnbDataGrid />
    </FnbContextProvider>
  );
};