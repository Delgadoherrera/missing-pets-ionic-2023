import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonImg,
} from "@ionic/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { refreshPets } from "../features/counter/counterSlice";

function Example({ petToSwitch }) {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const refresh = useSelector(refreshPets);
let update = refresh.payload.counter.refreshPets
  const quitarDeListaDeBuscados = () => {
    axios
      .post(
        `https://backend.missingpets.art/mascotas/mascotaEncontrada/${petToSwitch.idMascota}`
      )
      .then((response) => {
        dispatch(refreshPets(true));
        setIsOpen(false);
      });
  };
  return (
    <IonContent className="ion-padding">
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Eliminar de lista de buscados</IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonButton onClick={() => quitarDeListaDeBuscados()}>
            Quitar a mi mascota de la lista
          </IonButton>
        </IonItem>
      </IonModal>
    </IonContent>
  );
}

export default Example;
