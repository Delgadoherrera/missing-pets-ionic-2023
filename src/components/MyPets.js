import React, { useEffect, useState } from "react";
import MyPetsCard from "./MyPetsCard";
import { PetServiceWeb } from "../services/PetService";
import AddMyPet from "./AddMyPet";
import { useSelector, useDispatch } from "react-redux";
import { myPets, formValue } from "../features/counter/counterSlice";
import ModalAddMyPet from "./ModalAddMyPet";
import { IonPage, IonContent } from "@ionic/react";
const MyPets = ({ printToast, updatePets, pet, user }) => {
  const [pets, setPets] = useState([]);
  const getMyPets = new PetServiceWeb();
  const dispatch = useDispatch();
  const refreshFormValues = useSelector(formValue);
  let refresh = refreshFormValues.payload.counter.formValue;

  useEffect(() => {
    getMyPets.getMyPets(user.email).then((data) => {
      setPets(data);
      dispatch(myPets(data || {}));
    });
  }, [refresh]);

  return (
    <IonContent>
      <AddMyPet />
      <MyPetsCard pets={pets} updatePets={updatePets} printToast={printToast} />
    </IonContent>
  );
};

export default MyPets;
