import React from "react";
import AddPetForm from "./AddPetForm";
import { Button } from "primereact/button";
import AddPetDialog from "./AddPetDialog";
import { useState, useEffect } from "react";
import PetFound from "./PetFound";
import PetFoundDialog from "./PetFoundDialog";
import { IonContent, IonItem, IonPage } from "@ionic/react";

const AddMyPet = ({
  printToast,
  updatePets,
  setManageViews,
  manageViews,
  setRefreshPets,
}) => {
  const [addPetMsg, setaddPetMsg] = useState(false);
  const [petFoundMessage, setPetFoundMessage] = useState(false);

  const showPetFoundedMsg = () => {
    setPetFoundMessage(true);
  };
  const hideShowPettMsg = () => {
    setaddPetMsg(false);
    setPetFoundMessage(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent:'center' }}>
      <Button
        onClick={() => setaddPetMsg(true)}
        label="Agregar mi mascota"
        className="button-containerSidePanel"
      />

      {/* <Button
        onClick={() => setManageViews("Mis mascotas")}
        label="Mis mascotas"
        className="button-containerSidePanel"
      />
      {manageViews === "Mis mascotas" ? (
        <Button
          onClick={() => setaddPetMsg(true)}
          label="Agregar mascota"
          className="button-containerSidePanel subMenuItem"
        />
      ) : (
        <p></p>
      )} */}
      {addPetMsg === true ? (
        <AddPetDialog
          setRefreshPets={setRefreshPets}
          closeDialog={setaddPetMsg}
        />
      ) : (
        <p></p>
      )}
      {petFoundMessage === true ? (
        <PetFoundDialog
          hideShowPettMsg={hideShowPettMsg}
          updatePets={updatePets}
          printToast={printToast}
          setRefreshPets={setRefreshPets}
          closeDialog={hideShowPettMsg}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AddMyPet;
