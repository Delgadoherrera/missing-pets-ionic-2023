import { Camera, CameraResultType } from "@capacitor/camera";
import { useSelector, useDispatch } from "react-redux";
import { imageValue, selectCount } from "../features/counter/counterSlice";
import { IonImg, IonPage, IonHeader, IonContent, IonItem } from "@ionic/react";
import MapPetFound from "./MapPetFound";
import "../components/PetFound.css";
import FormPetFound from "../components/FormPetFound";
export function PetFound({ position }) {
  const value = useSelector(selectCount);
  const dispatch = useDispatch();

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    dispatch(imageValue(image || 10));
    console.log(image.base64String);
  };

  return (
    <IonPage>
      <IonHeader>Mapa</IonHeader>
      <MapPetFound position={position} />
      {value.length > 1 ? (
        <IonImg
          className="imageCard"
          src={`data:image/jpeg;base64,${value}`}
          style={{
            width: "100vw",
            height: "15vh",
            objectFit: "contain",
            marginTop: "2%",
            zoom: "100%",
          }}
        />
      ) : null}
      <IonItem>
        <button onClick={() => takePicture()}>CARGAR IMAGEN </button>
      </IonItem>

      <IonContent>
        <FormPetFound />
      </IonContent>
    </IonPage>
  );
}
