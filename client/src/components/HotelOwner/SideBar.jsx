import { assets } from '@/assets/assets';
import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
    const sidebarLinks = [
        { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
        { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
        { name: "List Rooms", path: "/owner/list-room", icon: assets.listIcon },
    ];

    return (
        <div className="md:w-64 w-20 border-r h-screen text-base border-gray-200 pt-6 bg-white shadow-sm transition-all duration-300">
            <div className="flex flex-col space-y-1">
                {sidebarLinks.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 transition-all duration-200 ${isActive
                                ? "bg-blue-100 text-blue-600 font-medium border-r-4 border-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={item.icon} alt={item.name} className="w-5 h-5" />
                        <span className="hidden md:inline-block">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
