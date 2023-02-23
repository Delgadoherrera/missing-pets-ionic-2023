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
  const dispatch = useDispatch();

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
  const onSubmit = async (data) => {
    uploadNewPet.editPet(petToEdit, data).then((data) => {
      dispatch(formValue({} || 10));
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "right" }}>
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonInput
              placeholder={`${petToEdit.nombre}`}
              value={field.value}
              onIonChange={(e) => setValue("nombre", e.detail.value)}
            ></IonInput>
          )}
          control={control}
          name="nombre"
        />
      </IonItem>
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonSelect
              placeholder={petToEdit.tipoMascota}
              value={field.value}
              onIonChange={(e) => setValue("tipoMascota", e.detail.value)}
            >
              <IonSelectOption value="PERRO">Perro</IonSelectOption>
              <IonSelectOption value="GATO">Gato</IonSelectOption>
              <IonSelectOption value="AVE">Ave</IonSelectOption>
              <IonSelectOption value="OTRO">Otro</IonSelectOption>
            </IonSelect>
          )}
          control={control}
          name="tipoMascota"
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="tipoMascota"
        as={<div style={{ color: "red" }} />}
      />
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonSelect
              placeholder={petToEdit.pesoAproximado}
              value={field.value}
              onIonChange={(e) => setValue("peso", e.detail.value)}
            >
              <IonSelectOption value="1kg/5kg">1kg/5kg</IonSelectOption>
              <IonSelectOption value="5kg/10kg">5kg/10kg</IonSelectOption>
              <IonSelectOption value="10kg/20kg">10kg/20kg</IonSelectOption>
              <IonSelectOption value="20kg/30kg">20kg/30kg</IonSelectOption>
              <IonSelectOption value="30kg/40kg">30kg/40kg</IonSelectOption>
              <IonSelectOption value="40kg/50kg">40kg/50kg</IonSelectOption>
              <IonSelectOption value="50kg/70kg">50kg/70kg</IonSelectOption>
            </IonSelect>
          )}
          control={control}
          name="peso"
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="peso"
        as={<div style={{ color: "red" }} />}
      />
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonSelect
              placeholder={petToEdit.colorPrimario}
              value={field.value}
              onIonChange={(e) => setValue("colorPrimario", e.detail.value)}
            >
              <IonSelectOption value="NEGRO">Negro</IonSelectOption>
              <IonSelectOption value="BLANCO">Blanco</IonSelectOption>
              <IonSelectOption value="AMARILLO">Amarillo</IonSelectOption>
              <IonSelectOption value="ROJO">Rojo</IonSelectOption>
              <IonSelectOption value="GRIS">Gris</IonSelectOption>
              <IonSelectOption value="MARRON">Marron</IonSelectOption>
              <IonSelectOption value="VERDE">Verde</IonSelectOption>
              <IonSelectOption value="VIOLETA">Violeta</IonSelectOption>
            </IonSelect>
          )}
          control={control}
          name="colorPrimario"
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="colorPrimario"
        as={<div style={{ color: "red" }} />}
      />
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonSelect
              placeholder={petToEdit.colorSecundario}
              value={field.value}
              onIonChange={(e) => setValue("colorSecundario", e.detail.value)}
            >
              <IonSelectOption value="NEGRO">Negro</IonSelectOption>
              <IonSelectOption value="BLANCO">Blanco</IonSelectOption>
              <IonSelectOption value="AMARILLO">Amarillo</IonSelectOption>
              <IonSelectOption value="ROJO">Rojo</IonSelectOption>
              <IonSelectOption value="GRIS">Gris</IonSelectOption>
              <IonSelectOption value="MARRON">Marron</IonSelectOption>
              <IonSelectOption value="VERDE">Verde</IonSelectOption>
              <IonSelectOption value="VIOLETA">Violeta</IonSelectOption>
            </IonSelect>
          )}
          control={control}
          name="colorSecundario"
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="colorSecundario"
        as={<div style={{ color: "red" }} />}
      />
      {/* === ION INPUT === */}
      <IonItem>
        <IonLabel>Descripcion:</IonLabel>
        <IonTextarea
          placeholder={petToEdit.descripcion}
          {...register("descripcion")}
        />
      </IonItem>
      {/*     <span>
        formavalue:
        {value > 0 ? value.payload.colorPrimario : null}
      </span> */}
      <ErrorMessage
        errors={errors}
        name="descripcion"
        as={<div style={{ color: "red" }} />}
      />

      <div>
        <IonButton type="submit">Aceptar edicion</IonButton>
      </div>
    </form>
  );
};

export default App;
