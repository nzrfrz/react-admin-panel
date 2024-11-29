import { useMemo } from "react";

import { Form, FormInstance } from "antd";
import { ApiSuccessResponse, CityProps, useQueryHook } from "../../_utils";

export const useCitySelect = (
  form: FormInstance,
  selectedState: string,
  selectedCountry: string,
  stateSelectOptions: string,
) => {
  const selectedCity = Form.useWatch("city", form);

  const cityApiParam = useMemo(() => {
    if (selectedState === undefined) return;

    const jsonParse = JSON.parse(selectedState);
    const { countryCode, stateCode } = jsonParse;
    return {
      countryCode,
      stateCode,
    };
  }, [selectedState]);

  const cityList = useQueryHook<ApiSuccessResponse<CityProps[]>>(
    false,
    `/api/region-data/cities-by-country-state-code/iso2CountryCode=${cityApiParam?.countryCode}/stateCode=${cityApiParam?.stateCode}`,
    ["cityList", cityApiParam?.countryCode, cityApiParam?.stateCode],
    10,
    selectedState !== undefined ? true : false,
  );

  const citySelectOptions = useMemo(() => {
    if (cityList.data === undefined) return;

    const options = cityList.data.data.map((city) => {
      return {
        label: city.name,
        value: city.id.toString(),
        slug: city.name.toLowerCase()
      }
    });

    return selectedState === undefined ? [] : options;
  }, [cityList, selectedState]);

  const selectedCityDetails = useMemo(() => {
    if (cityList.data === undefined || selectedCity === undefined) return;

    const details = cityList.data.data.find((item) => item.id.toString() === selectedCity);
    return details;
  }, [cityList, selectedCity]);

  const cityFormHelper = useMemo(() => {
    if (selectedState !== undefined) return undefined;
    else if (stateSelectOptions?.length === 0) return undefined;
    else return "Select State";
  }, [selectedState, stateSelectOptions]);

  const cityFormRequired = useMemo(() => {
    if (
      selectedCountry !== undefined &&
      stateSelectOptions !== undefined &&
      selectedState !== undefined &&
      citySelectOptions !== undefined &&
      citySelectOptions.length > 0
    ) return true;
    else if (
      selectedCountry !== undefined &&
      stateSelectOptions !== undefined &&
      stateSelectOptions.length === 0
    ) return false;
    else if (
      selectedCountry !== undefined &&
      stateSelectOptions !== undefined &&
      selectedState !== undefined &&
      citySelectOptions !== undefined &&
      citySelectOptions.length === 0
    ) return false;
  }, [selectedState, selectedCountry, stateSelectOptions, citySelectOptions]);
  // console.log("selected country: \n", selectedCountry);
  // console.log("selected state: \n", selectedState);
  // console.log("state select options: \n", stateSelectOptions);
  // console.log("city select options: \n", citySelectOptions);

  return {
    selectedCity,
    citySelectOptions,
    selectedCityDetails,
    cityFormHelper,
    cityFormRequired,
    cityListLoading: cityList.isFetching,
  };
};