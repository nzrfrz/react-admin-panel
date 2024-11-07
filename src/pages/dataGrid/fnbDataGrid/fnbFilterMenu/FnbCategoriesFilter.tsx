import { useContext } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";
import {
  ApiSuccessResponse,
  FnbCategoryProps,
  useQueryHook
} from "../../../../_utils";

import { Spin } from "antd";
import styles from "../../../../_styles/FnbFilterMenuDD.module.css";

export function FnbCategoriesFilter() {
  const {
    fnbList,
    selectedCategoriesFilterOption,
    setSelectedCategoriesFilterOption,
  } = useContext(FnbContext);

  const fnbCategoriesQ = useQueryHook<ApiSuccessResponse<FnbCategoryProps>>(
    false,
    `/api/fnb-category/get/`,
    ["fnbCategories"],
    1440, // in minutes
  );

  const handleSelectedCategory = (categoryId: string) => {
    setSelectedCategoriesFilterOption && setSelectedCategoriesFilterOption((prev) => {
      if (prev === categoryId) return "";
      else return categoryId;
    })
  };

  return (
    <div className={styles.sectionContentWrapper}>
      <div className={styles.sectionTitle}>
        <span>Filter by categories</span>
      </div>
      {
        fnbList?.isFetching ?
          <div className={styles.loadingSection}>
            <Spin />
            <span>Processing ...</span>
          </div>
          :
          <div>
            {
              fnbCategoriesQ.data?.data.map((option: FnbCategoryProps) => (
                <div
                  key={option.id}
                  onClick={() => handleSelectedCategory(option.id as string)}
                  className={option.id === selectedCategoriesFilterOption ? styles.sectionContentActive : styles.sectionContent}
                >
                  <span>{option.title}</span>
                </div>
              ))
            }
          </div>
      }
    </div>
  );
};