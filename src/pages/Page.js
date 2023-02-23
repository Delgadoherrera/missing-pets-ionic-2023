import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import { PetFound } from "../components/PetFound";
import PetLostThumbails from "../components/PetLostThumbails";
import AdoptionPets from "../components/AdoptionPets";
import MyPets from "../components/MyPets";
import { SearchMyPet } from "../components/SearchMyPet";
import homeImg from "../img/background.jpg";
import LoginButton from "../components/LoginButton";
import MyProfile from "../components/MyProfile";

const Page = ({ position, user }) => {
  const { name } = useParams();
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
          <SearchMyPet position={position} />
        </IonContent>
      ) : (
        <></>
      )}

      {name === "Mi perfil" ? (
        <IonContent>
          {user ? null : <LoginButton />}
          <MyProfile user={user} />
        </IonContent>
      ) : (
        <></>
      )}
      {name === "Home" ? (
        <IonContent>
          <IonImg src={homeImg} alt="homeBackgroundPicture"></IonImg>

          {user ? null : (
            <>
              <LoginButton />
            </>
          )}
        </IonContent>
      ) : (
        <></>
      )}
    </IonPage>
  );
};
export default Page;
