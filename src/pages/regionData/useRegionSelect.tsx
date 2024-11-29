import { useEffect, useMemo } from "react";

import { Form, FormInstance } from "antd";

import regionDataMaster from "./regionDataJOSN/regions.json";
import subRegionDataMaster from "./regionDataJOSN/subregions.json";

export const useRegionSelect = (
  form: FormInstance,
) => {
  const selectedRegion = Form.useWatch("region", form);

  const regionSelectOptions = useMemo(() => {
    return regionDataMaster.map((regionData) => {
      return {
        selectable: false,
        title: regionData.name,
        value: `${regionData.name.toLowerCase()}-${regionData.id}`,
        children: subRegionDataMaster.filter((subRegionData) => subRegionData.region_id === regionData.id).map((subRegionFiltered) => {
          return {
            title: subRegionFiltered.name,
            value: subRegionFiltered.id,
          }
        })
      }
    })
  }, [regionDataMaster, subRegionDataMaster]);

  const selectedRegionDetails = useMemo(() => {
    if (selectedRegion === undefined) return;

    const details = subRegionDataMaster.find((subRegion) => subRegion.id === selectedRegion);
    return details;
  }, [selectedRegion, subRegionDataMaster]);

  useEffect(() => {
    if (selectedRegion) form.resetFields(["country", "state", "city"]);
  }, [form, selectedRegion]);

  return {
    selectedRegion,
    regionSelectOptions,
    selectedRegionDetails,
  }
};