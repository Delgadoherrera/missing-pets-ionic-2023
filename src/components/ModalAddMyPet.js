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
import { UploadMyPet } from "./UploadMyPet";
import { closeModal } from "../features/counter/counterSlice";
import { useSelector } from "react-redux";

function Example({ setShowModal }) {
  const [isOpen, setIsOpen] = useState(true);
  

  return (
    <IonContent className="ion-padding">
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Crea un perfil para tu mascota</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonItem></IonItem>
        <UploadMyPet />
      </IonModal>
    </IonContent>
  );
}

export default Example;
