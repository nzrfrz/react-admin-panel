import L, { LatLngExpression } from "leaflet";
import { useRef, useState } from "react";
import { useGeoLocation } from "./useGeoLocation";
import { generateUniqueID } from "../../../_utils";
import { Feature, FeatureCollection } from "geojson";

export interface GeoJSONProps extends FeatureCollection {
  type: "FeatureCollection",
  features: Feature[],
};

(delete (L.Icon.Default.prototype as any)._getIconUrl);

const customMarker = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41], // Point of the icon which corresponds to marker's location
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

(window as any).type = true;

export const useLeafletMap = () => {
  const location = useGeoLocation();
  const mapRef = useRef<L.Map | null>(null);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const [defaultZoom, setDefaultZoom] = useState<number | 0>(13); // max 18
  const [centerPoint, setCenterPoint] = useState<LatLngExpression | undefined>([40.71278711591925, -74.00597157007702]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [geojson, setGeojson] = useState<GeoJSONProps>({ type: "FeatureCollection", features: [] });

  function handleChange() {
    const geo = featureGroupRef.current?.toGeoJSON();
    // console.log(geo);
    if (geo?.type === 'FeatureCollection') setGeojson(geo as GeoJSON.FeatureCollection);
  };

  const handleOnCreated = (e: any) => {
    const { layerType, layer } = e;

    const uniqueID = generateUniqueID();
    const geoLayer = layer.toGeoJSON() as GeoJSON.Feature;
    geoLayer.properties = {
      ...geoLayer.properties,
      id: uniqueID,
      layerType: null,
      radius: null,
      options: null
    };

    if (layerType === 'marker') {
      geoLayer.properties.layerType = layerType;
      geoLayer.properties.options = layer.options;
    }

    if (layerType === 'circle' || layerType === 'circlemarker') {
      const radius = layer.getRadius();
      geoLayer.properties.radius = radius;
      geoLayer.properties.layerType = layerType;
      geoLayer.properties.options = layer.options;
    }

    if (layerType !== 'marker' || layerType !== 'circle' || layerType !== 'circlemarker') {
      geoLayer.properties.layerType = layerType;
    }

    layer.feature = geoLayer;
    handleChange();
  };

  const handleOnEdit = (e: any) => {
    e.layers.eachLayer((layer: any) => {
      const geoLayer = layer.toGeoJSON() as GeoJSON.Feature;

      if (layer instanceof L.Circle || layer instanceof L.CircleMarker) {
        const radius = layer.getRadius();

        if (!geoLayer.properties) geoLayer.properties = {};
        geoLayer.properties.radius = radius;
      }

      layer.feature = geoLayer;
      console.log("\n on edit: \n", geoLayer);
      handleChange();
    });
  };

  function handleCurrentLocation() {
    if (mapRef.current && location.loaded && location.error.code === 0) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        location.zoomLevel,
        { animate: true }
      );

      mapRef.current.once('zoomend', () => {
        // Add the marker after the animation
        const marker = L.marker([location.coordinates.lat, location.coordinates.lng]);
        if (featureGroupRef.current) {
          featureGroupRef.current.addLayer(marker);
          handleChange();
        }
      });
    }
    else alert(location?.error?.message);
  };

  // *** fixing edit circle drawer ***
  (L as any).Edit.Circle = (L as any)?.Edit?.CircleMarker?.extend({
    _createResizeMarker: function () {
      var center = this._shape.getLatLng(),
        resizemarkerPoint = this._getResizeMarkerPoint(center)

      this._resizeMarkers = []
      this._resizeMarkers.push(this._createMarker(resizemarkerPoint, this.options.resizeIcon))
    },

    _getResizeMarkerPoint: function (latlng: L.LatLng) {
      var delta = this._shape._radius * Math.cos(Math.PI / 4),
        point = this._map.project(latlng)
      return this._map.unproject([point.x + delta, point.y - delta])
    },

    _resize: function (latlng: L.LatLng) {
      var moveLatLng = this._moveMarker.getLatLng()
      var radius

      if ((L as any).GeometryUtil.isVersion07x()) {
        radius = moveLatLng.distanceTo(latlng)
      }
      else {
        radius = this._map.distance(moveLatLng, latlng)
      }

      // **** This fixes the circle resizing ****
      this._shape.setRadius(radius)

      this._map.fire((L as any).Draw.Event.EDITRESIZE, { layer: this._shape })
    }
  });

  return {
    mapRef,
    featureGroupRef,
    customMarker,
    defaultZoom, setDefaultZoom,
    centerPoint, setCenterPoint,
    openDrawer, setOpenDrawer,
    geojson, setGeojson,
    handleChange,
    handleOnCreated,
    handleOnEdit,
    handleCurrentLocation,
  };
};