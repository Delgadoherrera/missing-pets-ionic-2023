import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { IonTextarea } from "@ionic/react";
import { Form, Field } from "react-final-form";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { InputTextarea } from "primereact/inputtextarea";

export default function MascotaPerdida({ state, idMascotaPerdida, setDialog }) {
  const [displayPosition, setDisplayPosition] = useState(true);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [petDetail, setPetDetail] = useState({});
  const [msg, setMsg] = useState(null);
  const { user } = useAuth0();

  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  let fechaMensaje = nowDate.toLocaleDateString("en-ZA");
  const sendData = () => {
    const msgData = {
      msg: msg,
      emisor: user.email,
      receptor: idMascotaPerdida.emailMascota,
      date: fechaMensaje,
    };
    axios
      .post("https://backend.missingpets.art/mensajes/nuevoMensaje", msgData)
      .then((response) => {});
    setDialog(false);
  };
  const sendMessage = (data) => {
    setMsg(data);
  };

  useEffect(() => {
    if (msg !== null) {
      sendData();
    }
  }, [msg]);
  console.log("mensaje", msg);

  const onHide = () => {
    setDialog(false);
  };

  useEffect(() => {
    setPetDetail(idMascotaPerdida);
  }, [displayResponsive]);

  const renderFooter = (name) => {
    return <div></div>;
  };
  return (
    <div className="dialog-demo">
      <Dialog
        style={{ textAlign: "center" }}
        header={
          <div>
            <p className="textoBusqueda"> Has encontrado una mascota! </p>
          </div>
        }
        contentClassName="contactoMascotaDialog"
        visible={displayPosition}
        position={position}
        onHide={() => onHide("displayBasic")}
        draggable={false}
        resizable={false}
      >
        <Form
          onSubmit={sendMessage}
          initialValues={{ msg: "" }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="formContainer">
              <div className="mascotaNombrePerdida">
                Escribele para ponerte en contacto
              </div>
              <Field
                name="msg"
                render={({ input }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputTextarea
                        name="msg"
                        {...input}
                        style={{ width: "100%", height: "20vh" }}
                      />
                      <label htmlFor="msg"></label>
                    </span>
                  </div>
                )}
              />
              {/*                        <img src={petDetail.fotoMascota} className="fotoMascota" />
                        <img src={idMascotaPerdida.fotoMascota} className="fotoMascota" /> */}
              <div className="divicon">
                <div className="photoAttachPetFound">
                  Puedes adjuntar una foto para que te confirmen si es su
                  mascota.
                </div>
                <AddAPhoto style={{fontSize:'2.5rem'}} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  label="Cancelar"
                  onClick={() => setDialog(false)}
                  className="sendMsg"
                />
                <Button type="submit" label="Enviar mensaje" />
              </div>
            </form>
          )}
        />
      </Dialog>
    </div>
  );
}
