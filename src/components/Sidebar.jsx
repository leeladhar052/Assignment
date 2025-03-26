// import React from 'react';
// import {
//   LayoutGrid, Bell, Gavel, Upload,
//   UserCog, Shield
// } from 'lucide-react';

// function Sidebar({ activeTab, onTabChange, onUploadClick }) {
//   const menuItems = [
//     { icon: LayoutGrid, name: 'Dashboard' },
//     { icon: LayoutGrid, name: 'Portfolio', active: true },
//     { icon: Bell, name: 'Notifications' },
//     { icon: Gavel, name: 'Auction' },
//     { icon: Upload, name: 'Data Upload', onClick: onUploadClick },
//     { icon: UserCog, name: 'Control Panel' },
//     { icon: Shield, name: 'User Management' },
//     { icon: Shield, name: 'Permissions' }
//   ];

//   return (
//     <aside className="w-64 bg-white border-r flex flex-col">
//       {/* Sidebar Menu */}
//       <nav className="py-2 flex-grow">
//         {menuItems.map((item) => (
//         <div
//         key={item.name}
//         className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
//           item.name === activeTab
//             ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500'
//             : 'text-gray-700'
//         }`}
//         onClick={() => {
//           if (item.onClick) {
//             onTabChange(item.name); // Set active tab first
//             item.onClick(); // Then call the upload function
//           } else {
//             onTabChange(item.name);
//           }
//         }}
//       >
//         <item.icon className="w-5 h-5 mr-3" />
//         <span className="text-sm">{item.name}</span>
//       </div>

//         ))}
//       </nav>
//        {/* Footer */}
//        <div className="py-4 px-4 text-gray-500 text-sm text-center">
//         powered by <span className="font-semibold">Resollect</span>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;

import React, { useState } from "react";
import { LayoutGrid, Bell, Gavel, Upload, UserCog, Shield, Menu, X } from "lucide-react";

function Sidebar({ activeTab, onTabChange, onUploadClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutGrid, name: "Dashboard" },
    { icon: LayoutGrid, name: "Portfolio", active: true },
    { icon: Bell, name: "Notifications" },
    { icon: Gavel, name: "Auction" },
    { icon: Upload, name: "Data Upload", onClick: onUploadClick },
    { icon: UserCog, name: "Control Panel" },
    { icon: Shield, name: "User Management" },
    { icon: Shield, name: "Permissions" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="sm:hidden p-2 text-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:relative w-64 bg-white border-r flex flex-col transform transition-transform duration-300 h-screen overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:flex`}
      >
        <nav className="py-2 flex-grow">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                item.name === activeTab
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => {
                setIsOpen(false);
                onTabChange(item.name);
                if (item.onClick) item.onClick();
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm md:text-base">{item.name}</span>
            </div>
          ))}
        </nav>
        {/* Footer */}
        <div className="py-4 px-4 text-gray-500 text-sm text-center">
          powered by <span className="font-semibold">Resollect</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
