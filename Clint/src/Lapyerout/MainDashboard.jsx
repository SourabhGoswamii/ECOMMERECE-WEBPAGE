import { useUser } from "../context/user.context.jsx";  
import Navbar from "../Components/navbar.jsx";  
const SignIn = () => {
    const { user } = useUser();  
    return (
        <div>
            <Navbar />
        </div>
    );
};

export default SignIn;
