import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
    const { user } = useContext(UserContext);

    // If no user or user is not an admin, redirect to home ("/")
    if (!user || user.role !== "admin") {
        return <Navigate to="/" />;
    }

    // If user is admin, render the child routes
    return <Outlet />;
};

export default Admin;
