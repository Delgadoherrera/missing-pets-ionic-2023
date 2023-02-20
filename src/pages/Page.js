import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { PetFound } from "../components/PetFound";
import PetLostThumbails from "../components/PetLostThumbails";
import AdoptionPets from "../components/AdoptionPets";
import MyPets from "../components/MyPets";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchMyPet } from "../components/SearchMyPet";

const Page = ({ position }) => {
  const { name } = useParams();
  const { user } = useAuth0();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {name === "Encontre una mascota" ? (
        <>
          <IonContent>
            <PetFound position={position} />
          </IonContent>
        </>
      ) : (
        <></>
      )}

      {name === "Mascotas perdidas" ? (
        <IonContent style={{ background: "white" }}>
          <PetLostThumbails position={position} />
        </IonContent>
      ) : (
        <></>
      )}

      {name === "Mascotas en adopcion" ? (
        <IonContent style={{ background: "white" }}>
          <AdoptionPets />
        </IonContent>
      ) : (
        <></>
      )}
      {name === "Mis mascotas" ? (
        <IonContent style={{ background: "white" }}>
          <MyPets user={user} />
        </IonContent>
      ) : (
        <></>
      )}

      {name === "Buscar a mi mascota" ? (
        <IonContent>
          <SearchMyPet position={position}  />
        </IonContent>
      ) : (
        <></>
      )}
    </IonPage>
  );
};
export default Page;
