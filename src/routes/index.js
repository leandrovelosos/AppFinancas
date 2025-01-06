import react, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { AuthContext } from "../contexts/auth";

function Routes() {
    const loading = false;
    const { signed } = useContext(AuthContext);



    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;