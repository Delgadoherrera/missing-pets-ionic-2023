import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonButton,
  IonCon,
  IonContent,
  IonItem,
} from "@ionic/react";
import "./Cards.css";

const Cards = ({ pet, idMascotaPerdida, setDialog }) => {
  console.log('idmascota',idMascotaPerdida)
  return (
    <>
      <IonCard class="IonCardMyPets">
        <IonImg
          className="imageCard"
          alt="Silhouette of mountains"
          src={`data:image/jpeg;base64,${pet.fotoMascota}`}
        />
        <IonCardHeader>
          <IonCardTitle>{pet.nombre}</IonCardTitle>
          <IonCardSubtitle>{pet.descripcion}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>{pet.geoAdress}</IonCardContent>
        
       {/*  <IonItem>
          <ContactoMascotaEncontrada
            idMascotaPerdida={idMascotaPerdida}
            setDialog={setDialog}
          />
        </IonItem> */}
      </IonCard>
    </>
  );
};
export default Cards;
