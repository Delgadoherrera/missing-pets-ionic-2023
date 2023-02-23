import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect, useRef } from "react";
import KnobDistanceLostPet from "./KnobDistanceLostPet";
import { Button } from "primereact/button";
import axios from "axios";
import ContactoMascotaEncontrada from "./ContactoMascotaEncontrada";
import { IonButton, IonCard } from "@ionic/react";
import ModalMyPet from "./ModalItsMyPet";

import { useAuth0 } from "@auth0/auth0-react";
const DataScrollerLoaderDemo = ({}) => {
  const [pets, setPets] = useState([]);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [dialogFounded, setDialogFounded] = useState(false);
  const [petDetail, setpetFoundDetail] = useState({});
  const [petDistance, setPetDistance] = useState(4);
  const { loginWithRedirect } = useAuth0();
  const { user } = useAuth0();

  console.log("petDetail", petDetail);
  const ds = useRef(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        await axios
          .get("https://backend.missingpets.art/mascotas/mascotasPerdidas", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              distanceSlider: petDistance,
            },
            distanceSlider: petDistance,
          })
          .then((res) => {
            /*       res.json() */
            setPets(res.data.data);
          });

        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [petDistance]);
  const petFounded = (data) => {
    setDialogFounded(true);
    setpetFoundDetail(data.e);
  };

  return (
    <>
      <p className="tittleMascotasPerdidas"></p>
      <KnobDistanceLostPet setPetDistance={setPetDistance} />
      {pets.length > 0 ? (
        <div
          className="contentPetThumbails"
        >
          {user !== undefined ? (
            <>
              {dialogFounded === true ? (
                <ModalMyPet
                  petToEdit={petDetail}
                  setDialogFounded={setDialogFounded}
                />
              ) : null}
            </>
          ) : (
            <p></p>
          )}
          {pets.map((one, key) => {
            return (
              <IonCard
                className="petCardContentThumbail"
                style={{ textAlign: "center" }}
              >
                <img
                  className="petImageThumbail"
                  src={`data:image/jpeg;base64,${one.fotoMascota}`}
                  alt="myPet"
                  style={{
                    width: "30vh",
                    height: "30vh",
                    objectFit: "cover",
                    borderRadius: "2%",
                  }}
                />
                <div className="cardLostPetContentData">
                  <div>
                    <p className="petCardContentThumbailName"> {one.nombre}</p>
                  </div>
                  {/*      <p className="petCardDetails">
                    Color principal: {one.colorPrimario}
                  </p>
                  <p className="petCardDetails">
                    Color secundario: {one.colorSecundario}
                  </p>
                  <p className="petCardDetails">
                    Peso aproximado: {one.pesoAproximado}
                  </p>
                  <div>
                    <p className="petCardDetailsDescription">
                      {one.descripcion}
                    </p>
                  </div> */}
                  <div className="divGeoAdress">
                    {one.geoAdress === "No está perdida" ? (
                      <p className="geoAdress">Perdida en: {one.geoAdress} </p>
                    ) : (
                      <div className="geoAdressDiv">
                        <p className="geoAdress">
                          Encontrada en: {one.geoAdress}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {one.status === 3 ? (
                  <IonButton
                    onClick={() => {
                      petFounded({ e: one });
                    }}
                    className="buttonCardPetThumbail"
                  >
                    Es mi mascota
                  </IonButton>
                ) : (
                  <Button
                    onClick={() => petFounded({ e: one })}
                    className="buttonCardPetThumbail"
                    label={`Encontré ${one.nombre}`}
                  />
                )}

                {user === undefined ? (
                  <>{dialogFounded === true ? loginWithRedirect() : <p></p>}</>
                ) : (
                  <p></p>
                )}
              </IonCard>
            );
          })}
        </div>
      ) : (
        <p> Cargando...</p>
      )}
    </>
  );
};
export default DataScrollerLoaderDemo;
