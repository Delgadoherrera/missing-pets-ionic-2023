import { useState } from "react";
import { IonItem, IonButton, IonRange, IonContent, IonImg } from "@ionic/react";
import { Button } from "primereact/button";

const KnobDistanceLostPet = ({ setPetDistance }) => {
  const [value, setValue] = useState(1);

  return (
    <IonItem>
      Distancia: {value} Km.
      <IonRange
        max={100}
        min={1}
        onIonChange={(e) => setValue(e.detail.value)}
      />
      <IonItem>
        <IonButton
          label="Buscar"
          onClick={(e) => {
            console.log(value);
            setPetDistance(value);
          }}
        >
          Buscar
        </IonButton>
      </IonItem>
    </IonItem>
  );
};

export default KnobDistanceLostPet;
