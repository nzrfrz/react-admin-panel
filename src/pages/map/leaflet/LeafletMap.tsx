import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/contextCreate";

import { useLeafletMap } from "./useLeafletMap";
import { MapContainer, TileLayer } from "react-leaflet";

import { CustomButton, MainContainer } from "../../../_components";

import { theme } from "antd";
import { BsFiletypeJson } from "react-icons/bs";
import { LeafletDraw } from "./LeafletDraw";
import { GeojsonDrawer } from "./GeojsonDrawer";

export function LeafletMap() {
  const { isDarkMode } = useContext(GlobalContext);
  const { token: { borderRadiusLG } } = theme.useToken();

  const {
    mapRef,
    featureGroupRef,
    customMarker,
    defaultZoom,
    centerPoint,
    openDrawer, setOpenDrawer,
    geojson,
    handleChange,
    handleOnCreated,
    handleOnEdit,
    handleCurrentLocation,
  } = useLeafletMap();

  useEffect(() => {
    const root = document.documentElement;
    const filterDarkMode = "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)"
    root.style.setProperty('--layerFilter', isDarkMode ? filterDarkMode : "unset");
  }, [isDarkMode]);

  return (
    <MainContainer>
      <div style={{ width: "100%", height: "100%" }}>
        <MapContainer
          ref={mapRef}
          zoom={defaultZoom}
          style={{ width: "100%", height: "100%", borderRadius: borderRadiusLG }}
          center={centerPoint}
        >
          <TileLayer
            tileSize={512}
            zoomOffset={-1}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LeafletDraw 
            ref={featureGroupRef}
            customMarker={customMarker}
            handleOnEdit={handleOnEdit}
            handleChange={handleChange}
            handleOnCreated={handleOnCreated}
            onCurrentLocation={handleCurrentLocation}
            onOpenDrawer={() => setOpenDrawer(true)}
          />
          <div style={{ position: "absolute", zIndex: 99, top: 10, left: 10 }}>
            <CustomButton
              shape="circle"
              colorType="default"
              icon={<BsFiletypeJson />}
            />
          </div>
        </MapContainer>
      </div>

      <GeojsonDrawer 
        drawerOpen={openDrawer}
        setDrawerOpen={setOpenDrawer}
        geoJsonData={geojson}
      />
    </MainContainer>
  );
};