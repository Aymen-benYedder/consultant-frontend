import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import consultantsImage from "../medi/consultants2.png";

const SearchBar = React.memo(({ onSearch, activeTab, setActiveTab }) => {
  const { register } = useForm();

  const handleChange = useCallback(
    (event) => {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  return (
    <div>
      <div className="bg-blue-500 text-white p-2 rounded-b-3xl">
        <img
          src={consultantsImage}
          alt="Consultants"
          className="w-2/2 md:w-3/3"
        />
        <form className="flex justify-center mb-4 relative">
          <input
            {...register("searchQuery")}
            type="text"
            placeholder="Search consultants or services..."
            className="w-[80%] p-2 pl-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-[11%] top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-b-xl ${
            activeTab === "consultants"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("consultants")}
        >
          Consultants
        </button>
        <button
          className={`px-4 py-2 rounded-b-xl ${
            activeTab === "services" ? "bg-blue-500 text-white" : "bg-gray-200 text-blue-500"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
      </div>
    </div>
  );
});

export default SearchBar;
