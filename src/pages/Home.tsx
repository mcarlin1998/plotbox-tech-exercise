import { Dispatch, SetStateAction, useState } from "react";
import { PostCodeDataProps } from "../types";

interface HomeProps {
  postCodeData: PostCodeDataProps | null;
  setPostCodeSearch: Dispatch<SetStateAction<string>>;
  postCodeSearch: string;
  getPostCodeData: () => void;
}

export default function Home({
  postCodeData,
  setPostCodeSearch,
  postCodeSearch,
  getPostCodeData,
}: HomeProps) {
  const [loading, setLoading] = useState<boolean>(false); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

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
      setError("Failed to fetch data. Please try again."); // Handle errors
    } finally {
      setLoading(false); // Set loading state back to false
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
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

      {loading && <p className="text-blue-600 mt-4">Loading data...</p>}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {postCodeData ? (
        <div className="mt-8 w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{postCodeData.country}</h3>
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
    </div>
  );
}
