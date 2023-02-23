import AddPetDialog from "./AddPetDialog";
import { useState, useEffect } from "react";
import PetFoundDialog from "./PetFoundDialog";
import { IonButton, IonContent, IonItem, IonPage } from "@ionic/react";
import ModalAddMyPet from "./ModalAddMyPet";
const AddMyPet = ({}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonItem>
        <IonButton onClick={() => setShowModal(true)}>
          Agregar mascota
        </IonButton>
      </IonItem>
      {showModal === true ? <ModalAddMyPet setShowModal={setShowModal} /> : null}
    </>
  );
};

export default AddMyPet;
