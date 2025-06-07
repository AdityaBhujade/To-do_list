import React, { useState } from 'react';
import logo from '../Images/3rd.png';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const NAV_TABS = [
  { key: 'all', label: 'All Tasks' },
  { key: 'remaining', label: 'Remaining' },
  { key: 'completed', label: 'Completed' },
  { key: 'dashboard', label: 'Dashboard' },
];

const Navbar = ({ currentTab, onTabChange, userButton }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-lg shadow" />
          <span className="text-2xl font-bold tracking-tight text-indigo-700 font-sans">MyTodo</span>
        </div>
        {/* Authenticated: Desktop Nav */}
        <SignedIn>
          <div className="hidden md:flex gap-2 items-center">
            {NAV_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
                  currentTab === tab.key
                    ? 'bg-indigo-100 text-indigo-700 shadow'
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            {userButton && <div className="ml-4">{userButton}</div>}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded hover:bg-indigo-50 focus:outline-none"
            >
              <svg className="h-7 w-7 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </SignedIn>
        {/* Not Authenticated: Only Login Button */}
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
      {/* Authenticated: Mobile Menu */}
      <SignedIn>
        {open && (
          <div className="md:hidden bg-white shadow px-4 pb-4 flex flex-col gap-2">
            {NAV_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { onTabChange(tab.key); setOpen(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 text-left ${
                  currentTab === tab.key
                    ? 'bg-indigo-100 text-indigo-700 shadow'
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            {userButton && <div className="mt-2">{userButton}</div>}
          </div>
        )}
      </SignedIn>
    </nav>
  );
};

export default Navbar;
