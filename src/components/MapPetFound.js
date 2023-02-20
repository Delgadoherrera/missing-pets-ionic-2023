import {
  IonContent,
  IonPage,
  useIonModal,
  useIonViewWillEnter,
  IonButton,
} from "@ionic/react";
import { GoogleMap } from "@capacitor/google-maps";
import { useRef, useState } from "react";
import {
  newMarkerValue,
  selectCount,
  coordinates,
} from "../features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";

const Home = ({ position }) => {
  const value = useSelector(selectCount);
  const dispatch = useDispatch();
  const key = "AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0";
  let newMap;
  const mapRef = useRef(null);
  const a ='a'

  const markers = [
    {
      lat: position.latitude,
      lng: position.longitude,
    },
  ];

  const [mapConfig, setMapConfig] = useState({
    zoom: 15,
    center: {
      lat: position.latitude,
      lng: position.longitude,
    },
  });
  const markerClick = (marker) => {
    console.log(marker);
    /*    setSelectedMarker(
        markers.filter(
          (m) => m.lat === marker.latitude && m.lng === marker.longitude
        )[0]
      );
      present(modalOptions); */
  };
  const dragMarker = (marker) => {
    dispatch(newMarkerValue(marker || 10));
  };

  const addMapMarker = async (marker) => {
    await newMap.addMarker({
      coordinate: {
        lat: marker.lat,
        lng: marker.lng,
      },
      draggable: true,
      tintColor: {
        r: 160,
        g: 75,
        b: 30,
        a: 100,
      },
    });
    dispatch(newMarkerValue(marker || 10));

  };

  var filterMarkers = [];

  const addMapMarkers = () =>
    markers.forEach((markerId) => {
      if (!filterMarkers[markerId]) {
        filterMarkers[markerId] = true;
        //code to marker to map
        addMapMarker(markerId);
      }
      
    });

  const createMap = async () => {
    if (!mapRef.current) return;
    filterMarkers = [];

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      // PUEDO REEMPLAZARLO CON EL ESTADO DE CONFIGURACION.
      config: mapConfig,
      forceCreate: true,
    });

    newMap.setOnMarkerClickListener((marker) => markerClick(marker));
    newMap.setOnMarkerDragEndListener((marker) => dragMarker(marker));

    addMapMarkers();
    /*     newMap.destroy()
     */
    
  };

  useIonViewWillEnter(() => createMap());

  return <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>;
};

export default Home;
