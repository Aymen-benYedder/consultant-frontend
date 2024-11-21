import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ user, isOpen, onToggle, onLogout }) => {
    return (
        <div className="relative">
            <button
                id="dropdownAvatarNameButton"
                onClick={onToggle}
                className="flex items-center text-sm font-medium text-[#d6b884] rounded-full hover:text-white-100"
                type="button"
            >
                <span className="sr-only">Open user menu</span>
                <img 
                    className="w-10 h-10 me-2 rounded-full" 
                    src={user.picture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
                    alt="user photo" 
                />
                <span className="text-white">{user.name}</span>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <div className="px-4 py-3 text-sm text-gray-900">
                        <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                        </li>
                        <li>
                            <a href="/bookings" className="block px-4 py-2 hover:bg-gray-100">My Bookings</a>
                        </li>
                        <li>
                            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                        </li>
                    </ul>
                    <div className="py-2">
                        <button
                            onClick={onLogout}
                            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default UserProfile;
