import { useState } from "react";

import { useRegionSelect } from "./useRegionSelect";
import { useCountrySelect } from "./useCountrySelect";
import { useStateSelect } from "./useStateSelect";
import { useCitySelect } from "./useCitySelect";

import {
  CustomButton,
  MainContainer,
  SelectForm,
  SelectOptionProps,
} from "../../_components";

import { Col, Form, Row, TreeSelect } from 'antd';
import { generalValidation } from "../../_utils";

export function RegionDataPage() {
  const [form] = Form.useForm();
  const [value, setValue] = useState("");

  const {
    selectedRegion,
    regionSelectOptions,
    selectedRegionDetails,
  } = useRegionSelect(form, setValue);

  const [treeSelectDefaultExpandedKeys, setTreeSelectDefaultExpandedKeys] = useState(regionSelectOptions[0].value);

  const onSelectedRegion = (value: string | number) => {
    const temp = regionSelectOptions.find((option) => {
      return option.children.find((childOption) => childOption.value === value)
    });
    setTreeSelectDefaultExpandedKeys(temp?.value as string);
  };

  const {
    selectedCountry,
    countryFormHelper,
    countryListLoading,
    countrySelectOptions,
    selectedCountryDetails
  } = useCountrySelect(form, selectedRegion);

  const {
    selectedState,
    stateFormHelper,
    stateFormRequired,
    stateSelectOptions,
    selectedStateDetails,
    stateListLoading,
  } = useStateSelect(form, selectedCountry);

  const {
    cityFormHelper,
    cityListLoading,
    cityFormRequired,
    citySelectOptions,
    selectedCityDetails,
  } = useCitySelect(
    form,
    selectedState,
    selectedCountry,
    stateSelectOptions as SelectOptionProps[]
  );

  // console.log(stateSelectOptions);

  const ColWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '50%' }}
        md={{ span: 6 }}
        lg={{ flex: '25%' }}
        xl={{ flex: '100%' }}
      >
        {children}
      </Col>
    );
  };

  const onSubmitForm = () => {
    const formData = {
      region: selectedRegionDetails,
      country: selectedCountryDetails,
      state: selectedStateDetails,
      city: selectedCityDetails
    }
    setValue(formData as any);
    // console.log(formData);
  };

  return (
    <MainContainer scrolly>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <h1>Region Data</h1>
        </div>
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError
          wrapperCol={{ span: 24 }}
          style={{ width: "100%" }}
          onFinish={onSubmitForm}
        >
          <Row gutter={[8, 8]} style={{ width: "100%" }}>
            <ColWrapper>
              <Form.Item
                name="region"
                label="Region"
                required={true}
                rules={generalValidation.find((item) => item.language === "en")?.fieldRules}
              >
                <TreeSelect
                  placeholder="Select Region"
                  treeData={regionSelectOptions}
                  treeDefaultExpandedKeys={[treeSelectDefaultExpandedKeys]}
                  loading={countryListLoading || stateListLoading || cityListLoading}
                  disabled={countryListLoading || stateListLoading || cityListLoading}
                  onSelect={(value: string | number) => onSelectedRegion(value)}
                />
              </Form.Item>
            </ColWrapper>
            <ColWrapper>
              <SelectForm
                name="country"
                label="Country"
                allowClear={true}
                showSearch={false}
                requiredMark={true}
                selectMode="single"
                help={countryFormHelper || undefined}
                selectOptions={countrySelectOptions as SelectOptionProps[]}
                isLoading={countryListLoading || stateListLoading || cityListLoading}
                disabled={countryListLoading || stateListLoading || cityListLoading}
              />
            </ColWrapper>
            <ColWrapper>
              <SelectForm
                name="state"
                label="State"
                allowClear={true}
                showSearch={false}
                selectMode="single"
                help={stateFormHelper}
                requiredMark={stateFormRequired}
                isRulesRequired={stateFormRequired}
                selectOptions={stateSelectOptions as SelectOptionProps[]}
                isLoading={countryListLoading || stateListLoading || cityListLoading}
                disabled={countryListLoading || stateListLoading || cityListLoading}
              />
            </ColWrapper>
            <ColWrapper>
              <SelectForm
                name="city"
                label="City"
                allowClear={true}
                showSearch={false}
                selectMode="single"
                help={cityFormHelper}
                requiredMark={cityFormRequired}
                isRulesRequired={cityFormRequired}
                selectOptions={citySelectOptions as SelectOptionProps[]}
                isLoading={countryListLoading || stateListLoading || cityListLoading}
                disabled={countryListLoading || stateListLoading || cityListLoading}
              />
            </ColWrapper>
          </Row>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <CustomButton
              htmlType="submit"
              colorType="success"
              loading={countryListLoading || stateListLoading || cityListLoading}
            >
              Submit
            </CustomButton>
          </div>
        </Form>
      </div>

      <div style={{ display: value === "" ? "none" : "flex", flexDirection: "column", gap: 8 }}>
        <span>Form Value: </span>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </MainContainer>
  );
};