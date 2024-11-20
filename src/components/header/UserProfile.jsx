import React from 'react';

const UserProfile = ({ isOpen, onToggle }) => {
    return (
        <div className="relative">
            <button
                id="dropdownAvatarNameButton"
                onClick={onToggle}
                className="flex justify-end items-center text-m font-medium text-[#d6b884] rounded-full hover:text-white-100"
                type="button"
            >
                <span className="sr-only">Open user menu</span>
                <img 
                    className="w-10 h-10 me-2 rounded-full" 
                    src="https://toplawyerscanada.ca/wp-content/uploads/Criminal-Defence-Lawyer-Toronto-Richard-Posner.jpg" 
                    alt="user photo" 
                />
                Bonnie Green
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" style={{ minWidth: '11rem' }}>
                    <div className="px-4 py-3 text-sm text-gray-900">
                        <div className="font-medium">Pro User</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
