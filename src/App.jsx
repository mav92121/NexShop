import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [countries, setContries] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [initCountries, setInitCountries] = useState([]);
  useEffect(() => {
    // const url = `https://xcountries-backend.azurewebsites.net/all`;  
    const url = "https://restcountries.com/v3.1/all";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("new data ", data);
        setInitCountries(data);
        setContries(data);
        setError(null);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error.message}`);
        setError(`Error fetching data: ${error.message}`);
      });
  }, []);
  useEffect(() => {
    if (search === "") {
      setContries(initCountries);
      return;
    }
    const filteredCountries = initCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    setContries(filteredCountries);
  }, [search, initCountries]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          style={{ display: "inline-block", padding: "2px 5px 2px 5px" }}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="grid-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error &&
          countries.map((country) => {
            return (
              <div
                className="countryCard"
                key={country.name.official}
                style={{
                  width: 150,
                  height: 120,
                  border: "1px solid black",
                  display: "inline-block",
                  margin: "10px",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ width: 70 }}
                  src={country.flags.svg || country.flags.png}
                  alt={country.flags.alt || "Country Flag"}
                />
                <p>{country.name.common}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
