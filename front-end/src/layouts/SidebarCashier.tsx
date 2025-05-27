import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  Squares2X2Icon,
  ReceiptPercentIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Home", icon: Squares2X2Icon, path: "/cashier/home" },
  { name: "Manage Bill", icon: ReceiptPercentIcon, path: "/cashier/manage-bill-cashier" },
  { name: "Logout", icon: ArrowRightOnRectangleIcon, path: "/logout" },
];

const SidebarCashier: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`relative min-h-screen bg-white flex flex-col items-center
        transition-all duration-300 shadow-lg border border-gray-200
        ${expanded ? "w-72 py-10 px-6" : "w-16 py-4 px-1"}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle Sidebar"
        className="absolute top-4 right-4 p-1 rounded hover:bg-gray-200 flex items-center justify-center z-20"
      >
        <Bars3Icon
          className={`text-gray-600 ${expanded ? "w-8 h-8" : "w-6 h-6"}`}
        />
      </button>

      {/* Profile */}
      <div
        className={`relative rounded-full bg-yellow-400 flex items-center justify-center transition-all duration-300 ${
          expanded ? "w-24 h-24 mb-2" : "w-8 h-8 mb-2"
        }`}
      >
        {/* ใส่รูปโปรไฟล์หรือ icon ได้ */}
      </div>

      {expanded && (
        <div className="text-black font-bold text-center mb-8">CASHIER</div>
      )}

      {/* Menu */}
      <nav className="flex flex-col gap-4 w-full items-center">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            title={expanded ? undefined : name}
            className={({ isActive }) =>
              `flex items-center w-full rounded-lg px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors duration-200 overflow-hidden ${
                expanded
                  ? "gap-3 justify-start text-sm"
                  : "justify-center p-2"
              } ${isActive ? "bg-green-200 font-bold text-green-800" : ""}`
            }
          >
            <Icon
              className={`flex-shrink-0 text-gray-600 transition-all duration-300 ${
                expanded ? "w-6 h-6" : "w-6 h-6"
              }`}
            />
            {expanded && (
              <span className="font-semibold whitespace-nowrap">{name}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SidebarCashier;
