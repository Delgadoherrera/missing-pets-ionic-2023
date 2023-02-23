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
} from "@ionic/react";
import PetEdit from "./PetEdit";
import { useEffect } from "react";
function Example({ petEdit, setPetEdit, petToEdit }) {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen === false) {
    setPetEdit(false);
  }

  return (
    <IonContent className="ion-padding">
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar mascota</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <PetEdit petToEdit={petToEdit}></PetEdit>
        </IonContent>
      </IonModal>
    </IonContent>
  );
}

export default Example;
