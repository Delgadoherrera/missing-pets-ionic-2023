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
import PetContact from "./PetContact";
import { useEffect } from "react";
function Example({ setDialogFounded, petToEdit }) {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen === false) {
    setDialogFounded(false);
  }

  return (
    <IonContent className="ion-padding">
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Contactate para recuperar a tu mascota</IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonImg
          style={{ width: "30vh", height: "30vh", objectFit: "contain" }}
          src={`data:image/jpeg;base64,${petToEdit.fotoMascota}`}
        ></IonImg>
        <PetContact petToEdit={petToEdit}></PetContact>
        <IonItem></IonItem>
      </IonModal>
    </IonContent>
  );
}

export default Example;
