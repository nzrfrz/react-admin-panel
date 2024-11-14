import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CustomButton } from "../../../_components";

import { Space } from "antd";
import { BsFiletypeJson } from "react-icons/bs";
import { FaLocationCrosshairs } from "react-icons/fa6";

interface ThisProps {
  ref: React.MutableRefObject<L.FeatureGroup | null>,
  handleChange: () => void,
  handleOnEdit: (e: any) => void,
  handleOnCreated: (e: any) => void,
  customMarker: any,
  onCurrentLocation: () => void,
  onOpenDrawer: () => void,
};

export const LeafletDraw = React.forwardRef<L.FeatureGroup, ThisProps>(
  ({
    handleChange, 
    handleOnEdit, 
    handleOnCreated, 
    customMarker,
    onCurrentLocation,
    onOpenDrawer,
  }, ref) => {
    return (
      <>
        <FeatureGroup ref={ref}>
          <EditControl
            position="topleft"
            onDeleted={handleChange}
            onEdited={handleOnEdit}
            onCreated={handleOnCreated}
            draw={{
              rectangle: true,
              circle: true,
              polyline: true,
              polygon: true,
              circlemarker: true,
              marker: {
                icon: customMarker,
              },
            }}
          />
        </FeatureGroup>
        <div style={{ position: "absolute", zIndex: 990, top: 10, right: 10 }}>
          <Space.Compact>
            <CustomButton
              colorType="default"
              icon={<FaLocationCrosshairs />}
              tooltipTitle="Current Location"
              tooltipPlacement="bottomLeft"
              onClick={onCurrentLocation}
            />
            <CustomButton
              colorType="default"
              icon={<BsFiletypeJson />}
              tooltipTitle="Show Geo JSON"
              tooltipPlacement="bottomLeft"
              onClick={onOpenDrawer}
            />
          </Space.Compact>
        </div>
      </>
    );
  }
);