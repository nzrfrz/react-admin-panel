export const themeToken = (isDarkMode: boolean): Record<string, any> => {
  return {
    fontFamily: "Poppins",
    colorBgLayout: isDarkMode === true ? "#121212" : "#E5edee",
    colorBgElevated: isDarkMode === true ? "#171d20" : "#dfe7e8",
    colorBgContainer: isDarkMode === true ? "#171d20" : "#dfe7e8",
    boxShadow: isDarkMode === true ? "0 6px 16px 0 rgba(255, 255, 255, 0.08), 0 3px 6px -4px rgba(255, 255, 255, 0.12), 0 9px 28px 8px rgba(255, 255, 255, 0.05)" : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    boxShadowCard: isDarkMode === true ? "0 1px 2px -2px rgba(255, 255, 255, 1), 0 3px 6px 0 rgba(255, 255, 255, 0.1), 0 5px 12px 4px rgba(255, 255, 255, 0.1)" : "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
    colorPrimary: '#0891b2',
    colorSuccess: '#16a34a',
    colorWarning: '#ea580c',
    colorError: '#e11d48',
    colorInfo: '#0284c7',
    colorBorder: isDarkMode === true ? "#424242" : "#9aacb3",
    borderRadius: 10,
  };
};

export const themeComponents = (isDarkMode: boolean): Record<string, any> => {
  return {
    components: {
      Layout: {
        siderBg: isDarkMode === true ? "#171d20" : "#dfe7e8",
        headerBg: isDarkMode === true ? "#171d20" : "#dfe7e8",
      },
      Form: {
        verticalLabelPadding: "0 0 0",
        itemMarginBottom: 8
      },
      Menu: {
        darkItemHoverBg: "rgba(8, 145, 178, .2)",
        darkSubMenuItemBg: "transparent",
        darkPopupBg: "#171d20",
        darkItemBg: "transparent",
        subMenuItemBorderRadius: 10,
      },
      Typography: {
        titleMarginBottom: 25,
        titleMarginTop: 0
      },
      Divider: {
        verticalMarginInline: "0",
      },
      Segmented: {
        trackBg: isDarkMode === true ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.7)",
      },
      Card: {},
      Select: {
        optionSelectedBg: isDarkMode === true ? "#1b2c34" : "rgba(0, 0, 0, 0.06)",
        clearBg: "red"
      },
      Popover: {
        colorBgElevated: isDarkMode === true ? "#2a3338" : "#ebf4f5",
      },
      TreeSelect: {
        indentSize: 8,
        nodeSelectedBg: isDarkMode === true ? "#1b2c34" : "rgba(0, 0, 0, 0.06)"
      }
    }
  };
};