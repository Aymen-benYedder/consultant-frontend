import React, { useEffect, useContext, useState } from 'react';
import data from '../data.json';
import ConsultantCard from '../components/ConsultantCard';
import ServiceCard from '../components/ServiceCard';
import { AppContext } from '../AppContext';
import Header from '../components/Header';

function HomePage() {
  const { setConsultants, setServices } = useContext(AppContext);
  const [consultants, setLocalConsultants] = useState([]);
  const [services, setLocalServices] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeTab, setActiveTab] = useState('consultants');

  useEffect(() => {
    const fetchedConsultants = data.users.filter(user => user.role === 'consultant');
    const fetchedServices = data.services;

    setConsultants(fetchedConsultants);
    setServices(fetchedServices);
    setLocalConsultants(fetchedConsultants);
    setLocalServices(fetchedServices);
    setFilteredConsultants(fetchedConsultants);
    setFilteredServices(fetchedServices);
  }, [setConsultants, setServices]);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredConsultants = consultants.filter(consultant =>
      consultant.name.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredServices = services.filter(service =>
      service.name.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredConsultants(filteredConsultants);
    setFilteredServices(filteredServices);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto p-6">
        <div className="mb-4 flex flex-col md:flex-row">
          <button
            className={`px-4 py-2 mb-2 md:mb-0 md:mr-2 ${activeTab === 'consultants' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('consultants')}
          >
            Consultants
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
        </div>
        {activeTab === 'consultants' ? (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Consultants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConsultants.map(consultant => (
                <ConsultantCard key={consultant.googleId} consultant={consultant} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default HomePage; 