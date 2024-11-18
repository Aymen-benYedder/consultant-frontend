import React from 'react';
import { useForm } from 'react-hook-form';

function SearchBar({ onSearch }) {
  const { register } = useForm();

  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <form className="flex">
      <input
        {...register('searchQuery')}
        type="text"
        placeholder="Search consultants or services..."
        className="flex-grow p-2 border border-gray-300 rounded-l"
        onChange={handleChange}
      />
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;