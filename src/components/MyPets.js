import React, { useEffect, useState } from "react";
import MyPetsCard from "./MyPetsCard";
import { PetServiceWeb } from "../services/PetService";
import AddMyPet from "./AddMyPet";
import { useSelector, useDispatch } from "react-redux";
import { myPets } from "../features/counter/counterSlice";

const MyPets = ({ printToast, updatePets, pet, user }) => {
  const [pets, setPets] = useState([]);
  const getMyPets = new PetServiceWeb();
  const dispatch = useDispatch();
  const dispatchPets = useSelector(myPets);

  useEffect(() => {
    getMyPets.getMyPets(user.email).then((data) => {
      setPets(data);
      dispatch(myPets(data || {}));
    });
  }, []);

  return (
    <div className="divMyPetsContent">
      <AddMyPet />
      <MyPetsCard pets={pets} updatePets={updatePets} printToast={printToast} />
    </div>
  );
};

export default MyPets;
