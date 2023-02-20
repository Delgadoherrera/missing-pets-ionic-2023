import { CapacitorHttp } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { useState, useEffect } from "react";
import Cards from "./Cards";

const PetLostThumbails = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("Current position:", coordinates);
      const doGet = async () => {
        const options = {
          url: "https://backend.missingpets.art/mascotas/mascotasEnAdopcion",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
            /*    distanceSlider: petDistance, */
          },
          /*    params: { distanceSlider: petDistance }, */
        };
        const response = await CapacitorHttp.get(options);
        setPets(response.data.data);
      };
      doGet();
    };

    printCurrentPosition();
  }, []);

  console.log("pets", pets);

  return (
    <div>
      {pets.map((one,key) => {
        return <Cards key={key} pet={one} />;
      })}
    </div>
  );
};
export default PetLostThumbails;
