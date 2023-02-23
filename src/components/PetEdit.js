import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { BottomNavigation } from "@mui/material";
import PetEditForm from "./PetEditForm";
export default function ReactFinalFormDemo({
  petToEdit,
  update,
  killDialog,
  showUpdate,
  printToast,
  updateEditComponent,
  updatePets,
  hideEditDialog,
}) {
  const [uploaded, setUploaded] = useState(false);
  const [formData, setFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [state, setState] = useState({ base64Data: null });
  const toast = useRef(null);

  const petColor = [
    { label: "Negro", value: "Negro" },
    { label: "Blanco", value: "Blanco" },
    { label: "Gris", value: "Gris" },
    { label: "Amarillo", value: "Amarillo" },
    { label: "Rojo", value: "Rojo" },
    { label: "Verde", value: "Verde" },
    { label: "Marron", value: "Marron" },
    { label: "Naranja", value: "Naranja" },
  ];
  const petType = [
    { label: "Perro", value: "Perro" },
    { label: "Gato", value: "Gato" },
    { label: "Ave", value: "Ave" },
    { label: "Otro", value: "Otro" },
  ];
  const pesoAproximado = [
    { label: "1kg a 5kg ", value: "1kg/5kg" },
    { label: "5kg a 10kg ", value: "5kg/10kg" },
    { label: "10kg a 15kg ", value: "10kg/15kg" },
    { label: "15kg a 20kg ", value: "15kg/20kg" },
    { label: "20kg a 25kg ", value: "20kg/25kg" },
    { label: "25kg a 30kg ", value: "25kg/30kg" },
    { label: "30kg a 40kg ", value: "30kg/40kg" },
    { label: "40kg a 50kg ", value: "40kg/50kg" },
    { label: "50kg a 60kg ", value: "50kg/60kg" },
    { label: "60kg a 70kg ", value: "60kg/70kg" },
  ];
  const sendData = async () => {
    await axios
      .post(
        `https://backend.missingpets.art/mascotas/editarMascota/${petToEdit.idMascota}`,
        {
          file: state,
          formdata: formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setUploaded(true);
          updateEditComponent(0);
          hideEditDialog();
          printToast({
            severity: "success",
            summary: "Edicion",
            detail: "Mascota editada",
            life: 3000,
          });
          updatePets();

          return <BottomNavigation status={uploaded} />;
        } else if (response.status !== 200) {
          updateEditComponent(0);
          hideEditDialog();
          console.log("error");
        }
      });
  };
  const handleReaderLoaded = (e) => {
    let binaryString = e.target.result;

    setState({
      base64Data: btoa(binaryString),
    });
  };

  const handleFile = (e) => {
    let file = e.target.files[0];

    if (file.size > 20000000) {
      alert(`El archivo no puede ser mayor a 2mb`);
      return null;
    }

    if (file.size < 20000000) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    setFile(state);
  };

  const validate = (data) => {
    let errors = {};

    if (!data.nombre) {
      errors.name = "Name is required.";
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    let newData = {
      ...data,
      id: localStorage.id,
      file: file,
    };
    setFormData(newData);

    setDataReady(true);

    form.restart();
  };

  useEffect(
    function () {
      setFormData(formData);

      if (dataReady === true) {
        sendData();
      }
    },
    [formData]
  );

  const cancel = () => {
    <Button
      label="Cancelar"
      className="editPetFetchButton"
      onClick={hideEditDialog()}
    />;
  };
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  return (
    <div className="form-demo petFound_formPetFound">
      <img
        alt="myPetImg"
        src={`data:image/jpeg;base64,${petToEdit.fotoMascota}`}
        className="imgPetEditDialog"
        style={{ width: "30vh", height: "30vh", objectFit: "cover" }}
      />
      <div className="PetFoundFormContainer petEditContainerForm">
        <PetEditForm petToEdit={petToEdit}></PetEditForm>
      </div>
    </div>
  );
}
