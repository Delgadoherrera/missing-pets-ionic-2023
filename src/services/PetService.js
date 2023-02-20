import { CapacitorHttp } from "@capacitor/core";
import axios from "axios";

/* export class PetServiceCapacitor {
  newPetFound = (value, position, image) => {
    const options = {
      url: "https://backend.missingpets.art/mascotas/nuevaMascotaPerdida",
      headers: { "X-Fake-Header": "Fake-Value" },
      params: value,
    };
    const response = CapacitorHttp.newPetFound(options);
    console.log(response);
  };
} */

export class PetServiceWeb {
  newPetFound(value, position, image, email) {
    return axios
      .post(`https://backend.missingpets.art/mascotas/nuevaMascotaPerdida/`, {
        body: {
          position: position,
          value: value,
          image: image,
          email: email,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getNearPets(petDistance, position) {
    return axios
      .get(`https://backend.missingpets.art/mascotas/mascotasPerdidas/`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          distanceSlider: petDistance,
          latitude: position.latitude,
          longitude: position.longitude,
        },
      })
      .then((d) => d.data);
  }

  getMyPets(mail) {
    return fetch(`https://backend.missingpets.art/mascotas/getMyPets/${mail}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        "x-access-token": localStorage.authKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  }

  searchMyPet(petId, coords) {
    console.log(petId);
    return axios.post(
      `https://backend.missingpets.art/mascotas/mascotaPerdida/${petId}`,
      {
        body: {
          coords: coords,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
