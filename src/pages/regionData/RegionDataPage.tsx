import { useMemo, useState } from "react";
import { MainContainer } from "../../_components";

import { TreeSelect } from 'antd';

import regionDataMaster from "./regionDataJOSN/regions.json";
import subRegionDataMaster from "./regionDataJOSN/subregions.json";

export function RegionDataPage() {
  const [value, setValue] = useState<string>();

  const treeData = useMemo(() => {
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

  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  console.log("\n value: \n", value);

  return (
    <MainContainer>
      <div style={{ display: "flex", height: "inherit", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <h1>Region Data</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TreeSelect
            value={value}
            treeData={treeData}
            onChange={onChange}
            style={{ width: 250 }}
            placeholder="Select Region"
            treeDefaultExpandedKeys={[1]}
          />
        </div>
      </div>
    </MainContainer>
  );
};