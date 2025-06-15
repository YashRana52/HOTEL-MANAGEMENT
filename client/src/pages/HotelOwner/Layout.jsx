import Navbar from '@/components/HotelOwner/Navbar';
import SideBar from '@/components/HotelOwner/SideBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f7f9fc]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
