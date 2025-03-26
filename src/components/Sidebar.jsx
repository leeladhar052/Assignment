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
        className={`fixed sm:relative w-64 bg-white border-r flex flex-col h-screen sm:h-full min-h-screen transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:flex`}
      >

        <nav className="py-2 flex-1 overflow-auto">
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
        <div className="py-4 px-4 text-gray-500 text-sm text-center border-t bg-red-500">
  powered by <span className="font-semibold">Resollect</span>
</div>
      </aside>
    </>
  );
}

export default Sidebar;
