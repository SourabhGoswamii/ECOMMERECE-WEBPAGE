import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/admin/Sidebar";
import TopNavbar from "../Components/admin/TopNavbar";

const AdminLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed on the left) */}
            <div className="w-64 bg-gray-100 h-full fixed">
                <Sidebar />
            </div>

            {/* Right Section (Navbar + Content) */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Navbar */}
                <TopNavbar />

                {/* Page Content */}
                <div className="p-6">
                    <Outlet /> {/* This will render Products, Dashboard, etc. */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
