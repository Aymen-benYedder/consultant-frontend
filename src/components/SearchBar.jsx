import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import consultantsImage from "../medi/unnamed.jpg";

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
<div
  className="w-screen h-[600px] bg-cover bg-center bg-no-repeat flex flex-col justify-end"
  style={{ backgroundImage: `url(${consultantsImage})` }}
>
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
      className="absolute right-[11%] top-1/2 transform -translate-y-1/2 bg-sky-950  text-white px-4 py-1 rounded-full hover:bg-blue-600"
    >
      Search
    </button>
  </form>
</div>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2  rounded-bl-xl ${activeTab === "consultants"
              ? "bg-sky-950  text-white"
              : "bg-gray-200"
            }`}
          onClick={() => setActiveTab("consultants")}
        >
          Consultants
        </button>
        <button
          className={`px-4 py-2 rounded-br-xl ${activeTab === "services" ? "bg-sky-950  text-white" : "bg-gray-200 text-sky-950"
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
