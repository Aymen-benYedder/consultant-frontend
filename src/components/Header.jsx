import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logoPath from '../medi/logo.png';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleGoogleLogin = (credentialResponse) => {
        const userObject = jwtDecode(credentialResponse.credential);
        console.log(userObject);
        alert('Connected with Google!');
    };

    const handleFailure = (error) => {
        console.error(error);
        alert('Failed to connect with Google.');
    };

    const navigationItems = [
        { name: 'Home', href: '#' },
        { name: 'Consultants', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'About', href: '#' },
    ];

    // Desktop and Mobile Login Button Component
    const LoginButton = ({ isMobile = false }) => (
        <div className="relative">
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onFailure={handleFailure}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className={`${isMobile ? 'w-full' : ''} bg-sky-950 border border-[#d6b884] text-white px-6 py-2 rounded-full text-sm hover:bg-sky-900 transition-colors flex items-center justify-center space-x-2`}
                    >
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                            alt="Google Logo" 
                            className="w-4 h-4"
                        />
                        <span>Sign in</span>
                    </button>
                )}
            />
        </div>
    );

    return (
        <header className="bg-sky-950 text-white sticky top-0 z-50">
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-24">
                    {/* Logo and Brand Name */}
                    <div className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-contain bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${logoPath})` }}
                            />
                            <h1 className="text-2xl font-bold text-[#d6b884] mt-1">Lavocato</h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Login */}
                    <div className="hidden md:block">
                        <LoginButton />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-sky-900"
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-4">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-sky-900"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="px-4 pt-2">
                                <LoginButton isMobile />
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header; 