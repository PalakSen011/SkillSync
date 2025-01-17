import { useSelector } from "react-redux";
import { Navigate} from "react-router"
import HomePage from "./Home";
const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.users.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/' />
    }
    else{
        return <HomePage />
    }
}
export default ProtectedRoute