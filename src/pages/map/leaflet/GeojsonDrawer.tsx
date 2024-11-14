import { Drawer } from "antd";
import { GeoJSONProps } from "./useLeafletMap";

interface ThisProps {
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  geoJsonData: GeoJSONProps,
};

export const GeojsonDrawer: React.FC<ThisProps> = ({
  drawerOpen,
  setDrawerOpen,
  geoJsonData,
}) => {
  return (
    <Drawer
      closable={true}
      title="Geo JSON"
      open={drawerOpen}
      forceRender={true}
      maskClosable={true}
      getContainer={false}
      onClose={() => setDrawerOpen(false)}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span>Form Value: </span>
        <pre>{JSON.stringify(geoJsonData, null, 2)}</pre>
      </div>
    </Drawer>
  );
};