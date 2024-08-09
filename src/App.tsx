import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { PostCodeDataProps } from "./types";

function App() {
  //useState setup
  const [error, setError] = useState<string | null>(null);
  const [postCodeData, setPostCodeData] = useState<PostCodeDataProps | null>(
    null
  );
  const [postCodeSearch, setPostCodeSearch] = useState<string>("");
  const [markerLocation, setMarkerLocation] = useState<{
    lat: string;
    lng: string;
  } | null>(null);

  async function getPostCodeData() {
    if (!postCodeSearch) {
      return;
    }
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${postCodeSearch}`
      );
      const data = await res.json();

      if (!res.ok) {
        console.log("in this thing here");
        setError("Error Fetching Postcode");
        return;
      }
      //create local variables of res data to then set in state.
      const dataToSet = {
        country: data.result.country,
        constituency: data.result.parliamentary_constituency,
        district: data.result.admin_district,
        town: data.result.admin_ward,
      };

      const locationDetails = {
        lat: data.result.latitude,
        lng: data.result.longitude,
      };

      //Set postcode data in state
      setMarkerLocation(locationDetails);
      setPostCodeData(dataToSet);
      setError(null);
    } catch (error) {
      //error Handler
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  }

  useEffect(() => {
    getPostCodeData();
  }, []);
  return (
    <div className="App">
      {/* Home page component injections */}
      <Home
        postCodeData={postCodeData}
        setPostCodeSearch={setPostCodeSearch}
        postCodeSearch={postCodeSearch}
        getPostCodeData={getPostCodeData}
        error={error}
        setError={setError}
        markerLocation={markerLocation}
      />
    </div>
  );
}

export default App;
