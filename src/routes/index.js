import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/auth";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";



function Routes() {
    //const loading = false;
    const { signed, loading } = useContext(AuthContext);

    //se o loading esta true mostra o indicator
    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F0F4FF"
            }}>

                <ActivityIndicator
                    size="large"
                    color="#131313"
                />

            </View>
        )
    }

    //verifica se esta logado ou nao, dai manda para uma das rotas
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;