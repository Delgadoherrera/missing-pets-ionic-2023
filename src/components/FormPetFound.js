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

const App = () => {
  const value = useSelector(formValue);
  const position = useSelector(markerValue);
  const image = useSelector(imageValue);
  const uploadNewPet = new PetServiceWeb();
  const { user } = useAuth0();
  const email = user.email;

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

  useEffect(() => {
    console.log("este es el valor del form", value);
  }, [dispatch]);

  const file = value.payload.counter.file;

  const onSubmit = async (data) => {
    dispatch(formValue(data || 10));
    if (position[0] === undefined) {
      return alert("indique en donde debemos buscar a su mascota");
    }
    uploadNewPet.newPetFound(data, position, file, email).then((data) => {
      dispatch(formValue({} || 10));
      dispatch(imageValue({} || 10));
      reset();
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonSelect
              placeholder="Tipo"
              slot='start'
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
          rules={{ required: "This is a required field" }}
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
              placeholder="Peso"
              value={field.value}
              slot='start'
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
          rules={{ required: "This is a required field" }}
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
              placeholder="Color primario"
              value={field.value}
              slot='start'
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
          rules={{ required: "This is a required field" }}
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
              placeholder="Color secundario"
              value={field.value}
              slot='start'
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
          rules={{ required: "This is a required field" }}
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="colorSecundario"
        as={<div style={{ color: "red" }} />}
      />
      <IonItem>
        <IonLabel></IonLabel>
        <Controller
          render={({ field }) => (
            <IonTextarea
              placeholder="Descripcion"
              value={field.value}
              slot={"start"}
              onIonChange={(e) => setValue("descripcion", e.detail.value)}
            ></IonTextarea>
          )}
          control={control}
          name="descripcion"
          rules={{ required: "This is a required field" }}
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name="descripcion"
        as={<div style={{ color: "red" }} />}
      />

      <div>
        <IonButton type="submit">Enviar</IonButton>
      </div>
    </form>
  );
};

export default App;
