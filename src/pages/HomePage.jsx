import React, { useEffect, useContext, useState } from 'react';
import data from '../data.json';
import ConsultantCard from '../components/Cards/consultant-card/ConsultantCard';
import ServiceCard from '../components/Cards/service-card/ServiceCard';
import { AppContext } from '../AppContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

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
      <Header onSearch={handleSearch} setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="w-full">
        <SearchBar 
          onSearch={handleSearch} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        {activeTab === 'consultants' ? (
          <section>
            <h2 className="mx-8 text-2xl font-bold mb-4 text-gray-800">Consultants</h2>
            <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
              {filteredConsultants.map(consultant => (
                <ConsultantCard key={consultant.googleId} consultant={consultant} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="mx-8 text-2xl font-bold mb-4 text-gray-800">Services</h2>
            <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
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