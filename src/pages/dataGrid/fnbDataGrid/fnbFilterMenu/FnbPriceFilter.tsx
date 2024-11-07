import { useCallback, useContext, useEffect } from "react";
import { FilterOptionProps, FnbContext } from "../fnbContext/fnbContextCreate";

import styles from "../../../../_styles/FnbFilterMenuDD.module.css";

export function FnbPriceFilter() {
  const {
    fnbList,
    priceFilterOptions, 
    setPriceFilterOptions,
  } = useContext(FnbContext);

  const selectedPriceFilter = useCallback((option: FilterOptionProps) => {
    setPriceFilterOptions && setPriceFilterOptions((prev) => {
      return prev?.map((data) => {
        switch (true) {
          case option.value === data?.value && data?.isSelected === false:
            return { ...data, isSelected: true };
          case option.value === data?.value && data?.isSelected === true:
            return { ...data, isSelected: false };
          case option.value !== data?.value && data?.isSelected === true:
            return { ...data, isSelected: false };
          default:
            return { ...data };
        }
      })
    });
  }, [priceFilterOptions]);

  useEffect(() => {
    setPriceFilterOptions && setPriceFilterOptions([
      {
        key: 0,
        title: "Price, high to low",
        value: "high-to-low",
        isSelected: false,
      },
      {
        key: 1,
        title: "Price, low to high",
        value: "low-to-high",
        isSelected: false,
      }
    ]);
  }, []);

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionTitle}>
        <span>Filter by price</span>
      </div>
      <div className={styles.sectionContentWrapper}>
        {
          priceFilterOptions?.map((option) => (
            <div
              key={option.key}
              onClick={() => !fnbList?.isFetching && selectedPriceFilter(option)}
              className={option.isSelected ? styles.sectionContentActive : styles.sectionContent}
            >
              <span>{option.title}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};