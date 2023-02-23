import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ButtonMascotaPerdida from "./MascotaPerdidaDialog";
import ButtonMascotaEncontrada from "./MascotaEcontradaDialog";
import MenuDemo from "../components/ButtonToolMyCardPet";
import SwitchPetLost from "../components/SwitchPetLost";
import {
  IonImg,
  IonItem,
  IonThumbnail,
  IonPage,
  IonContent,
  IonCard,
} from "@ionic/react";
import { height } from "@mui/system";

export default function MediaCard({ pets, updatePets, printToast, user }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [idMascota, setIdMascota] = useState(0);
  const [coordenadas, setCoordenadas] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoordenadas({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  return (
    <IonContent>
      {pets.length < 0 ? <p> Mis mascotas</p> : <p></p>}
      {/*       <p className="tittleMyPets"> Mis mascotas</p> */}
      {pets.map((one, inex) => {
        return (
          <IonItem>
            <IonCard
              className="avatarAndToolContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <p className="namePetMyPetCard">{one.nombre}</p>
              <IonImg
                alt="myPetAvatar"
                src={`data:image/jpeg;base64,${one.fotoMascota}`}
                className="avatarMyPets"
                style={{
                  width: "20vh",
                  height: "20vh",
                  objectFit: "cover",
                  justifyContent: "center",
                  borderRadius: "100px",
                }}
              />

              <MenuDemo
                petToEdit={one}
                printToast={printToast}
                updatePets={updatePets}
              />
              <SwitchPetLost
                user={user}
                state={coordenadas}
                idMascotaPerdida={one}
                updatePets={updatePets}
                printToast={printToast}
                petToSwitch={one}
              />
              <ButtonMascotaEncontrada
                user={user}
                idMascotaPerdida={one}
                updatePets={updatePets}
                printToast={printToast}
              />
            </IonCard>

            {/*          <div className="buttonContainerPetCard">
                {one.status === 1 ? (
            
                ) : (
                  <ButtonMascotaPerdida
                    user={user}
                    state={coordenadas}
                    idMascotaPerdida={one}
                    updatePets={updatePets}
                    printToast={printToast}
                  />
                )}
              </div> */}
          </IonItem>
        );
      })}
    </IonContent>
  );
}
