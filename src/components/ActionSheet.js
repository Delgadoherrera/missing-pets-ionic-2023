import React, { useState } from "react";
import { IonButton, useIonActionSheet } from "@ionic/react";

function Example({hideDialog}) {
  const [present] = useIonActionSheet();
  const [result, setResult] = useState();

  return (
    <div>
      {present({
        header: "Deseas eliminar a tu mascota?",
       buttons: [
          {
            text: "Eliminar",
            role: "destructive",
            data: {
              action: "delete",
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
            data: {
              action: hideDialog(),
            },
          },
        ],
        onDidDismiss: ({ detail }) => setResult(detail),
      })}
      {result && <code>{JSON.stringify(result, null, 2)}</code>}
    </div>
  );
}
export default Example;
