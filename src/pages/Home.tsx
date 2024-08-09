import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostCodeDataProps } from "../types";
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from "../components/CustomMap";

//Type check for props
interface HomeProps {
  postCodeData: PostCodeDataProps | null;
  setPostCodeSearch: Dispatch<SetStateAction<string>>;
  postCodeSearch: string;
  getPostCodeData: () => void;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  markerLocation: { lat: string; lng: string } | null;
}

export default function Home({
  postCodeData,
  setPostCodeSearch,
  postCodeSearch,
  getPostCodeData,
  error,
  setError,
  markerLocation,
}: HomeProps) {
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPostCodeSearch(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      await getPostCodeData(); // Trigger the API call with the current search term
    } catch (err) {
      console.log("this try");
      //   setError("Failed to fetch data. Please try again."); // Handle errors
    } finally {
      setLoading(false); // Set loading state back to false
    }
  }
  return (
    // Styling is with tailwindcss for speed
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      {/* Fixed or Sticky Input Form at the Top */}
      <div className="w-full max-w-md mx-auto sticky top-0 bg-white shadow-md rounded-lg p-6 z-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              value={postCodeSearch}
              onChange={handleChange}
              placeholder="Enter postcode"
              disabled={loading} // Disable input while loading
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {loading && <p className="text-blue-600 mt-4">Loading data...</p>}

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {postCodeData ? (
          <div className="mb-4 w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">
              {postCodeData.country}
            </h3>
            <h3 className="text-lg mb-1">{postCodeData.constituency}</h3>
            <h3 className="text-lg mb-1">{postCodeData.district}</h3>
            <h3 className="text-lg mb-1">{postCodeData.town}</h3>
          </div>
        ) : !loading && !error ? (
          <h3 className="text-gray-600 mt-4">
            No data found for the given postcode.
          </h3>
        ) : (
          <h3 className="text-gray-600 mt-4">Please enter a postcode.</h3>
        )}
        {/* Google cloud provide an API to access their maps package - 
        API key should be in an .env for security and privacy - development map package shown here */}
        {markerLocation && (
          <APIProvider apiKey={process.env.MAPSAPIKEY || ""}>
            <CustomMap markerLocation={markerLocation} />
          </APIProvider>
        )}
      </div>
    </div>
  );
}
