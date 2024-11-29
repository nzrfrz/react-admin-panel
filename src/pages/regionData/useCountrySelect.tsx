import { useEffect, useMemo } from "react";

import { Form, FormInstance, Tag } from "antd";
import { ApiSuccessResponse, CountryProps, useQueryHook } from "../../_utils";

export const useCountrySelect = (
  form: FormInstance,
  selectedRegion: string,
) => {
  const selectedCountry = Form.useWatch("country", form);

  const countryList = useQueryHook<ApiSuccessResponse<CountryProps[]>>(
    false,
    `/api/region-data/countries-by-subregion/subregionId=${selectedRegion}`,
    ["countryList", selectedRegion],
    10,
    selectedRegion !== undefined ? true : false,
  );  

  const countrySelectOptions = useMemo(() => {
    if (countryList.data === undefined) return;

    const options = countryList.data.data.map((country) => {
      return {
        label: <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: "75%", display: "flex", flexDirection: "row", gap: 8 }}>
            <span className="emoji-country-flag">{country.emoji}</span>
            <span className="ellipsis-text">{country.name}</span>
          </div>
          <Tag>{country.iso2}</Tag>
        </div>,
        value: country.iso2,
        slug: country.name.toLowerCase()
      }
    });

    return options;
  }, [countryList]);

  const selectedCountryDetails = useMemo(() => {
    if (countryList.data === undefined) return;

    const details = countryList.data.data.find((item) => item.iso2 === selectedCountry);
    return details;
  }, [countryList, selectedCountry]);

  const countryFormHelper = useMemo(() => {
    if (selectedRegion !== undefined) return "";
    else return "Select Region"
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCountry) form.resetFields(["state", "city"]);
  }, [form, selectedCountry]);

  return {
    selectedCountry,
    countrySelectOptions,
    selectedCountryDetails,
    countryFormHelper,
    countryListLoading: countryList.isFetching,
  }
};