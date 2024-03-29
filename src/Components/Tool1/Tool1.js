import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AvailableCountries from "./AvailableCountries";

const Tool1 = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [allCountryDetails, setAllCountryDetails] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Date arrangement
    const parsedDate = new Date(startDate);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    const date = `${year}-${month}-${day}`;
    const budget = document.getElementById("budget").value;

    // Storing date in localStorage
    localStorage.setItem("date", date);

    // Fetching allCountryDetails data from database
    axios
      .patch(
        `${process.env.REACT_APP_server_url}/allcountrydetails?budget=${budget}`
      )
      .then((res) => {
        setAllCountryDetails(res.data);
        setLoading(false);

        // Fetching flag from restcountries API and merging with allCountryDetails
        Promise.all(
          res.data.map((country) =>
            axios
              .get(
                `https://restcountries.com/v3.1/name/${country?.country_name}`
              )
              .then((res) => ({
                ...country,
                flag: res.data[0].flags.png,
              }))
          )
        ).then((data) => {
          setAllCountryDetails(data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="px-8 lg:px-14 py-10 mx-auto">
      <form onSubmit={handleSubmit} className="sm:text-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              className="block font-medium pb-2 pl-1 text-lg text-left"
              htmlFor="email"
            >
              Budget (USD)
            </label>
            <input
              className="w-full rounded-lg p-3 text-base text-gray-900 font-semibold"
              placeholder="Your Budget for the trip"
              type="number"
              id="budget"
              required
            />
          </div>

          <div className="inline-grid">
            <label
              className="block font-medium pb-2 pl-1 text-lg text-left"
              htmlFor="email"
            >
              Date
            </label>

            <DatePicker
              className="w-full rounded-lg p-3  text-base text-gray-900 font-semibold inline"
              selected={startDate}
              id="date"
              required
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 mt-8 rounded inline-block font-semibold">
          Search
        </button>
      </form>
      {/* Available country within budget */}
      <AvailableCountries
        allCountryDetails={allCountryDetails}
        loading={loading}
      />
    </div>
  );
};

export default Tool1;
