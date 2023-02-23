import {
  IonAvatar,
  IonContent,
  IonImg,
  IonItem,
  IonPage,
  IonThumbnail,
} from "@ionic/react";
import homeImg from "../img/background.jpg";
const HomeView = ({ user }) => {
  return (
    <IonContent>
      {user ? (
        <IonContent>
          <IonAvatar>
            <img src={`${user.picture}`} alt="homeBackgroundPicture"></img>
          </IonAvatar>
          <IonItem>{user.name}</IonItem>
          <IonItem>{user.email}</IonItem>
        </IonContent>
      ) : (
        <p> Porfavor inicie sesion o registrese.</p>
      )}
    </IonContent>
  );
};

export default HomeView;
