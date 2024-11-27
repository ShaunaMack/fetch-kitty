import { useState } from "react";
import "../App.css";

function Cat() {
  const [url, setUrl] = useState(
    "https://4.bp.blogspot.com/-MV4p366deQ8/VsS_dcwA0iI/AAAAAAABktc/RI9KlNfRUWU/s1600/funny-cats-194-26.jpg"
  ); // Default image
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch a cat image from the API
  function fetchCat() {
    setLoading(true); // Start loading spinner
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request Failed");
      })
      .then((jsonRes) => {
        if (jsonRes && jsonRes.length > 0) {
          setUrl(jsonRes[0].url); // Update the state with the fetched image URL
        } else {
          throw new Error("No image found");
        }
      })
      .catch((error) =>
        console.error("Error fetching cat image:", error.message)
      )
      .finally(() => setLoading(false)); // Stop loading spinner
  }

  return (
    <>
      <div className="cat-container">
        {loading ? (
          <div className="spinner"></div> // Show spinner when loading
        ) : (
          <img className="cat-image" src={url} alt="A cute kitty" />
        )}
      </div>
      <button className="cat-button" onClick={fetchCat}>
        Get another kitty!
      </button>
    </>
  );
}

export default Cat;
