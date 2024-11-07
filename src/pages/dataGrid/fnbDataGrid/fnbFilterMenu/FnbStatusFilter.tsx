import { useCallback, useContext, useEffect } from "react";
import { FilterOptionProps, FnbContext } from "../fnbContext/fnbContextCreate";

import styles from "../../../../_styles/FnbFilterMenuDD.module.css";

export function FnbStatusFilter () {
  const {
    fnbList,
    statusFilterOptions,
    setStatusFilterOptions,
  } = useContext(FnbContext);

  const selectedStatusFilter = useCallback((option: FilterOptionProps) => {
    setStatusFilterOptions && setStatusFilterOptions((prev) => {
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
  }, [statusFilterOptions]);

  useEffect(() => {
    setStatusFilterOptions && setStatusFilterOptions([
      {
        key: 0,
        title: "Available",
        value: "AVAILABLE",
        isSelected: false,
      },
      {
        key: 1,
        title: "Unavailable",
        value: "UNAVAILABLE",
        isSelected: false,
      }
    ]);
  }, []);

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionTitle}>
        <span>Filter by status</span>
      </div>
      <div className={styles.sectionContentWrapper}>
        {
          statusFilterOptions?.map((option) => (
            <div
              key={option.key}
              onClick={() => !fnbList?.isFetching && selectedStatusFilter(option)}
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