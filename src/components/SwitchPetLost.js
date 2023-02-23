import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import { Button } from "primereact/button";
import axios from "axios";
import "primeflex/primeflex.css";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { petSelected } from "../features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { IonButton, IonItem } from "@ionic/react";
import ModalMyPetFounded from "./ModalMyPetFounded";

const InputSwitchDemo = ({
  petToSwitch,
  idMascotaPerdida,
  state,
  updatePets,
  printToast,
  setRefreshPets,
}) => {
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState("center");
  const [petFound, setPetFound] = useState(false);
  const [petToSearch, setPetToSearch] = useState(false);
  const selectPet = useSelector(petSelected);
  const dispatch = useDispatch();

  const sendLocation = [];
  const updateLocation = (f) => {
    let newData = {
      latitude: f.lat,
      longitude: f.lng,
    };
    sendLocation.push(newData);
  };
  const dialogFuncMap = {
    displayPosition: setDisplayPosition,
  };

  const onHide = (name, e) => {
    dialogFuncMap[`${name}`](false);
    setPetFound(false);
  };

  const enviarCoordenadas = (name, e) => {
    if (sendLocation.length > 0) {
      let id = e.currentTarget.value;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            sendLocation[sendLocation.length - 1].latitude
          },${
            sendLocation[sendLocation.length - 1].longitude
          }%20&key=AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0`
        )
        .then((data) => {
          const lugarEncontrado = [
            data.data.results[0].address_components[1].short_name,
            data.data.results[0].address_components[0].short_name,
            data.data.results[0].address_components[2].short_name,
            data.data.results[0].address_components[4].short_name,
          ];
          axios
            .post(
              `https://backend.missingpets.art/mascotas/mascotaPerdidaNewLocation/${id}`,
              { sendLocation, lugarEncontrado }
            )
            .then((response) => {
              updatePets();
            });
        });
    } else {
      let id = e.currentTarget.value;

      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.latitude},${state.longitude}%20&key=AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0`
        )
        .then((data) => {
          const lugarEncontrado = [
            data.data.results[0].address_components[1].short_name,
            data.data.results[0].address_components[0].short_name,
            data.data.results[0].address_components[2].short_name,
            data.data.results[0].address_components[4].short_name,
          ];
          axios
            .post(
              `https://backend.missingpets.art/mascotas/mascotaPerdida/${id}`,
              { state, lugarEncontrado }
            )
            .then((response) => {
              printToast({
                severity: "success",
                summary: "Mascota",
                detail: "Estamos buscando a tu mascota",
                life: 3000,
              });

              updatePets();
            });
        });
    }
    dialogFuncMap[`${name}`](false);
  };
  return (
    <IonItem style={{bottom:'3%'}}>
      {petFound === true ? (
        <ModalMyPetFounded
          petToSwitch={idMascotaPerdida}
          setRefreshPets={setRefreshPets}
          printToast={printToast}
        />
      ) : null}
      {petToSearch === true ? (
        <Redirect
          to="/page/Buscar a mi mascota"
          petToSwitch={idMascotaPerdida}
          setPetToSearch={setPetToSearch}
          setRefreshPets={setRefreshPets}
          state={state}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}

      {/* 
      {petToSearch === true ? (
        <MascotaPerdidaDialog
          idMascotaPerdida={petToSwitch}
          setPetToSearch={setPetToSearch}
          setRefreshPets={setRefreshPets}
          state={state}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )} */}

      {petToSwitch.status === 0 ? (
        <IonButton
          /* icon="pi pi-times" */ onClick={() => {
            setPetToSearch(true);
            dispatch(petSelected(petToSwitch || 10));
          }}
        >{` ¿${petToSwitch.nombre} se ha perdido? `}</IonButton>
      ) : (
        <p> </p>
      )}
      {petToSwitch.status === 1 ? (
        <IonButton
          /* icon="pi pi-times" */ onClick={() => setPetFound(true)}
        >{` Encontré a ${petToSwitch.nombre} `}</IonButton>
      ) : (
        <p></p>
      )}
      {petToSwitch.status === 4 ? (
        <Button
          label={` En adopcion `}
          disabled
          /* icon="pi pi-times" */ onClick={() =>
            console.log("La mascota esta en adopcion")
          }
        />
      ) : (
        <p></p>
      )}
    </IonItem>
  );
};
export default InputSwitchDemo;
