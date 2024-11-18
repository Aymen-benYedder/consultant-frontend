import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const SearchBar = React.memo(({ onSearch }) => {
  const { register } = useForm();

  const handleChange = useCallback((event) => {
    onSearch(event.target.value);
  }, [onSearch]);

  return (
    <form className="flex">
      <input
        {...register('searchQuery')}
        type="text"
        placeholder="Search consultants or services..."
        className="flex-grow p-2 rounded-full text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
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
});

export default SearchBar;