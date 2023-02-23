import React from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonRange,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonText,
  IonPage,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  formValue,
  markerValue,
  imageValue,
} from "../features/counter/counterSlice";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { PetServiceWeb } from "../services/PetService";
import { useAuth0 } from "@auth0/auth0-react";

const App = ({ petToEdit }) => {
  const value = useSelector(formValue);
  const uploadNewPet = new PetServiceWeb();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  console.log("petToEdit", petToEdit);
  const onSubmit = async (data) => {
    uploadNewPet.editPet(petToEdit, data).then((data) => {});
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "right" }}>
      <IonItem>
        <IonLabel>Mensaje:</IonLabel>
        <IonTextarea
          placeholder={"Enviale un mensaje para que sepa que es tu mascota"}
          {...register("descripcion")}
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="descripcion"
        as={<div style={{ color: "red" }} />}
      />
      <div>
        <IonButton type="submit">Enviar mensaje</IonButton>
      </div>
    </form>
  );
};

export default App;
