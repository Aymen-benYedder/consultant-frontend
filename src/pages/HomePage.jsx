import React, { useState, useEffect } from 'react';
import data from '../data.json';
import SearchBar from '../components/SearchBar';
import ConsultantCard from '../components/ConsultantCard';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

function HomePage() {
  const [consultants, setConsultants] = useState([]);
  const [services, setServices] = useState([]);
  const [searchResults, setSearchResults] = useState({
    consultants: [],
    services: []
  });

  useEffect(() => {
    setConsultants(data.users.filter(user => user.role === 'consultant'));
    setServices(data.services);
    setSearchResults({
      consultants: data.users.filter(user => user.role === 'consultant'),
      services: data.services
    });
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredConsultants = consultants.filter(consultant =>
      consultant.name.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredServices = services.filter(service =>
      service.name.toLowerCase().includes(lowerCaseQuery)
    );
    setSearchResults({
      consultants: filteredConsultants,
      services: filteredServices
    });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Section */}
      <section className="mb-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Find Your Consultant</h1>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Consultants Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Consultants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.consultants.length > 0 ? (
            searchResults.consultants.map(consultant => (
              <ConsultantCard key={consultant.googleId} consultant={consultant} />
            ))
          ) : (
            <p className="text-center text-gray-500">No consultants found.</p> 
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.services.length > 0 ? (
            searchResults.services.map(service => (
              <ServiceCard key={service.name} service={service} />
            ))
          ) : (
            <p className="text-center text-gray-500">No services found.</p>
          )}
        </div>
      </section>

      <div className="text-center mt-6">
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link> | 
        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </div>
    </div>
  );
}

export default HomePage; 