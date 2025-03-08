import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/signin";
import Register from "../Components/signup";
import Home from "../Lapyerout/MainDashboard";
import Products from "../Components/admin/Products";
import Dashboard from "../Components/admin/DashboardCards";
import Recentactivity from "../Components/admin/Recentactivity";
import AdminLayout from "../Lapyerout/AdminLayerout"; // Ensure spelling is correct
import Adminauth from "../config/authentication";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1> 404 Not Found</h1>} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<Adminauth />}>
                <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<><Dashboard /><Recentactivity /></>} />
                    <Route path="products" element={<Products />} >
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
