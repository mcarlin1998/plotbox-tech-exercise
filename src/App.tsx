import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { PostCodeDataProps } from "./types";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [postCodeData, setPostCodeData] = useState<PostCodeDataProps | null>(
    null
  );
  const [postCodeSearch, setPostCodeSearch] = useState<string>("");
  async function getPostCodeData() {
    if (!postCodeSearch) {
      setError("Please enter a postal code.");
      return;
    }
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${postCodeSearch}`
      );
      const data = await res.json();

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        setError(errorData.message);
        return;
      }

      const dataToSet = {
        country: data.result.country,
        constituency: data.result.parliamentary_constituency,
        district: data.result.admin_district,
        town: data.result.admin_ward,
      };
      setPostCodeData(dataToSet);
      setError(null);
    } catch (error) {
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
      <Home
        postCodeData={postCodeData}
        setPostCodeSearch={setPostCodeSearch}
        postCodeSearch={postCodeSearch}
        getPostCodeData={getPostCodeData}
      />
    </div>
  );
}

export default App;
