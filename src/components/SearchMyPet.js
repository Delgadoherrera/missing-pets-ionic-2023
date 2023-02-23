import {
  IonImg,
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonButton,
} from "@ionic/react";
import MapFindMyPet from "../components/MapFindMyPet";
import { useSelector, useDispatch } from "react-redux";
import { petSelected, newMarkerValue } from "../features/counter/counterSlice";
import { PetServiceWeb } from "../services/PetService";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

export function SearchMyPet({ position }) {
  const [searchingPet, setSearchingPet]= useState(false)
  const myPet = useSelector(petSelected);
  const positionLost = useSelector(newMarkerValue);
  const searchThisPet = new PetServiceWeb();
  const dispatch = useDispatch();

  const pet = myPet.payload.counter.petSelected;
  const coords = positionLost.payload.counter.newMarkerValue;
  console.log(coords);

  const searchPet = () => {
    if (coords[0] === undefined || coords[1] === undefined) {
      return alert(
        "Porfavor indique con el marcador donde se ha perdido la mascota."
      );
    }
    searchThisPet.searchMyPet(pet.idMascota, coords).then((data) => {
      setSearchingPet(true)
    });
  };

  return (
    <IonPage style={{ height: "60vh" }}>
         {searchingPet === true ? (
        <Redirect
          to="/page/Mis mascotas"    
        />
      ) : (
        <p></p>
      )}
      <IonItem>
        Indica donde buscar a {myPet.payload.counter.petSelected.nombre}
      </IonItem>
      <IonContent style={{ backgroundColor: "transparent" }}>
        <MapFindMyPet position={position} />
      </IonContent>
      <IonItem>
        <IonImg
          src={`data:image/jpeg;base64,${pet.fotoMascota}`}
          style={{ width: "20vh", height: "20vh", objectFit: "cover" }}
        ></IonImg>
        <IonButton onClick={() => searchPet()}>Buscar</IonButton>
      </IonItem>
    </IonPage>
  );
}
