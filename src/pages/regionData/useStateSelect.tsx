import { useEffect, useMemo } from "react";

import { Form, FormInstance, Tag } from "antd";
import { ApiSuccessResponse, StateProps, useQueryHook } from "../../_utils";

export const useStateSelect = (
  form: FormInstance,
  selectedCountry: string,
) => {
  const selectedState = Form.useWatch("state", form);

  const stateList = useQueryHook<ApiSuccessResponse<StateProps[]>>(
    false,
    `/api/region-data/states-by-country-code/iso2CountryCode=${selectedCountry}`,
    ["stateList", selectedCountry],
    10,
    selectedCountry !== undefined ? true : false,
  );

  const stateSelectOptions = useMemo(() => {
    if (stateList.data === undefined) return;

    const options = stateList.data.data.map((state) => {
      return {
        label: <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <span className="ellipsis-text">{state.name}</span>
          {state.state_code !== null && <Tag>{state.state_code}</Tag>}
        </div>,
        value: JSON.stringify({
          stateId: state.id,
          countryCode: state.country_code,
          stateCode: state.state_code
        }),
        slug: state.name.toLowerCase()
      }
    });

    return selectedCountry === undefined ? [] : options;
  }, [stateList, selectedCountry]);

  const selectedStateDetails = useMemo(() => {
    if (stateList.data === undefined || selectedState === undefined) return;

    const { stateId } = JSON.parse(selectedState);
    const details = stateList.data.data.find((item) => item.id.toString() === stateId.toString());
    return details;
  }, [stateList, selectedState]);

  const stateFormHelper = useMemo(() => {
    if (selectedCountry !== undefined) return undefined;
    else return "Select Country";
  }, [selectedCountry]);

  const stateFormRequired = useMemo(() => {
    if (selectedCountry === undefined && stateSelectOptions === undefined) return true;
    else if (selectedCountry !== undefined && stateSelectOptions !== undefined && stateSelectOptions?.length > 0) return true;
    else return false;
  }, [selectedCountry, stateSelectOptions]);

  useEffect(() => {
    if (selectedState) form.resetFields(["city"]);
  }, [form, selectedState]);

  return {
    selectedState,
    stateSelectOptions,
    selectedStateDetails,
    stateFormHelper,
    stateFormRequired,
    stateListLoading: stateList.isFetching,
  };
};