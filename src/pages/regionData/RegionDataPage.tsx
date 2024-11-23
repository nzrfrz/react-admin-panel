import { useMemo, useState } from "react";
import { MainContainer, SelectForm } from "../../_components";

import { Col, Form, Row, TreeSelect } from 'antd';

import regionDataMaster from "./regionDataJOSN/regions.json";
import subRegionDataMaster from "./regionDataJOSN/subregions.json";
import { generalValidation } from "../../_utils";

import styles from "../../_styles/RegionData.module.css";

export function RegionDataPage() {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>();

  const regionUseWatch = Form.useWatch("region", form);
  console.log(regionUseWatch);


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
        <div>
          <h1>Region Data</h1>
        </div>
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError
          wrapperCol={{ span: 24 }}
          style={{ width: "100%" }}
        // onFinish={onSubmitForm}
        >
          <div className={styles.formItemContainer}>

            <div className={styles.formItemEachWrapper}>
              <Form.Item
                name="region"
                label="Region"
                required={true}
                rules={generalValidation.find((item) => item.language === "en")?.fieldRules}
              >
                <TreeSelect
                  treeData={treeData}
                  placeholder="Select Region"
                  treeDefaultExpandedKeys={[1]}
                />
              </Form.Item>
            </div>

            <div className={styles.formItemEachWrapper}>
              <SelectForm
                name="countries"
                label="Countries"
                allowClear={true}
                showSearch={true}
                requiredMark={true}
              // hideSelected={isHideSelected}
              // selectOptions={selectOptionsData}
              // selectMode={selectMode as undefined}
              />
            </div>

            <div className={styles.formItemEachWrapper}>
              <SelectForm
                name="states"
                label="States"
                allowClear={true}
                showSearch={true}
                requiredMark={true}
              // hideSelected={isHideSelected}
              // selectOptions={selectOptionsData}
              // selectMode={selectMode as undefined}
              />
            </div>

            <div className={styles.formItemEachWrapper}>
              <SelectForm
                name="cities"
                label="Cities"
                allowClear={true}
                showSearch={true}
                requiredMark={true}
              // hideSelected={isHideSelected}
              // selectOptions={selectOptionsData}
              // selectMode={selectMode as undefined}
              />
            </div>

          </div>
        </Form>
      </div>
    </MainContainer>
  );
};

/*

          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 8 }}>
            <div style={{ flex: "1 1 150px" }}>
              <Form.Item
                name="region"
                label="Region"
                required={true}
                rules={generalValidation.find((item) => item.language === "en")?.fieldRules}
              >
                <TreeSelect
                  treeData={treeData}
                  placeholder="Select Region"
                  treeDefaultExpandedKeys={[1]}
                />
              </Form.Item>
            </div>

            <div style={{ flex: "1 1 150px" }}>
              <SelectForm
                name="countries"
                label="Countries"
                allowClear={true}
                showSearch={true}
                requiredMark={true}
                // hideSelected={isHideSelected}
                // selectOptions={selectOptionsData}
                // selectMode={selectMode as undefined}
              />
            </div>

            <div style={{ flex: "1 1 150px" }}>
              <SelectForm
                name="states"
                label="States"
                allowClear={true}
                showSearch={true}
                requiredMark={true}
              // hideSelected={isHideSelected}
              // selectOptions={selectOptionsData}
              // selectMode={selectMode as undefined}
              />
            </div>

            <div style={{ flex: "1 1 150px" }}>
              <SelectForm
                name="cities"
                label="Cities"
                allowClear={true}
                showSearch={true}
                requiredMark={true}
              // hideSelected={isHideSelected}
              // selectOptions={selectOptionsData}
              // selectMode={selectMode as undefined}
              />
            </div>
          </div>
*/