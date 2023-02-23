import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useRef, useState, useEffect } from "react";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import EditPetDialog from "./EditPetDialog";
import CoonfirmDeletePet from "./ConfirmDeletePet";
import ConfirmarAdopcionDialog from "./ConfirmarAdopcionDialog";
import ConfirmarQuitarAdopcionDialog from "./ConfirmarQuitarAdopcionDialog";
import Modal from "./Modal";
import { IonCard, IonIcon, IonItem } from "@ionic/react";
import { buildOutline } from "ionicons/icons";
import ActionSheet from './ActionSheet'
const MenuDemo = ({ petToEdit, printToast, updatePets, setRefreshPets }) => {
  const menu = useRef(null);
  const toast = useRef(null);
  const [petEdit, setPetEdit] = useState(false);
  const [deletePetDialog, setdeletePetDialog] = useState(false);
  const [adoptar, setAdoptar] = useState(false);
  const [quitarAdoptar, setQuitarAdoptar] = useState(false);

  const updateEditComponent = () => {
    setPetEdit(true);
  };
  const hideDeleteDialog = () => {
    setdeletePetDialog(false);
  };
  const hideEditDialog = (i) => {
    console.log("hidedialog", i);
    setPetEdit(i);
  };

  const hideAdopcionDialog = () => {
    setAdoptar(false);
  };
  const hideQuitarAdoptarDialog = () => {
    setQuitarAdoptar(false);
  };

  const items = [
    {
      items: [
        {
          label: "Editar",
          icon: 'circle',
          command: () => {
            setPetEdit(true);
          },
        },
        {
          label: "Eliminar",
          icon: "pi pi-times",
          command: () => {
            setdeletePetDialog(true);
          },
        },
      ],
    },

    petToEdit.status !== 4
      ? {
          items: [
            {
              label: "Dar en adopción",
              icon: "pi pi-external-link",
              command: () => {
                setAdoptar(true);
              },
            },
          ],
        }
      : {
          items: [
            {
              label: "Quitar de adopción",
              icon: "pi pi-external-link",
              command: () => {
                setQuitarAdoptar(true);
              },
            },
          ],
        },
  ];

  return (
    <div>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Toast ref={toast}></Toast>
      <IonIcon
        icon={buildOutline}
        onClick={(event) => menu.current.toggle(event)}
        style={{
          fontSize: "1.5rem",
          boxShadow: "none",
          border: "none",
          marginTop:'35%'

        }}
      ></IonIcon>

      {/*       <i
        onClick={(event) => menu.current.toggle(event)}
        aria-controls="popup_menu"
        aria-haspopup
        class="pi pi-cog iconEditMyPetMobile"
        style={{
          fontSize: "1.5rem",
          marginTop: "50%",
        }}
      ></i> */}
      {petEdit === true ? (
        <Modal
          petToEdit={petToEdit}
          setPetEdit={setPetEdit}
          updateEditComponent={updateEditComponent}
          printToast={printToast}
          updatePets={updatePets}
          petEdit={petEdit}
        />
      ) : (
        <p> </p>
      )}

      {deletePetDialog === true ? (
        <ActionSheet
          hideDialog={hideDeleteDialog}
          petToDelete={petToEdit}
          updatePets={updatePets}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}

      {adoptar ? (
        <ConfirmarAdopcionDialog
          hideDialog={hideAdopcionDialog}
          petToDelete={petToEdit}
          updatePets={setRefreshPets}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}

      {quitarAdoptar ? (
        <ConfirmarQuitarAdopcionDialog
          hideDialog={hideQuitarAdoptarDialog}
          petToDelete={petToEdit}
          updatePets={setRefreshPets}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MenuDemo;
