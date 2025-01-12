import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";
import CustomDrawer from "../components/CustomDrawer";


const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,

                drawerStyle: {
                    backgroundColor: '#FFF',
                    paddingTop: 20,
                },
                drawerActiveBackgroundColor: '#3b3dbf',
                drawerActiveTintColor: '#FFF',

                drawerInactiveBackgroundColor: '#F0F2FF',
                drawerInactiveTintColor: '#121212',

            }}
        >
            <AppDrawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerItemStyle: {
                        marginBottom: 10, // Espaçamento entre itens
                        borderWidth: 1,   // Borda ao redor do item
                        borderColor: 'transparent', // Cor da borda
                        borderRadius: 4,  // Bordas arredondadas
                    },
                }}
            />

            <AppDrawer.Screen
                name="Registrar"
                component={New}
                options={{
                    drawerItemStyle: {
                        marginBottom: 10, // Espaçamento entre itens
                        borderWidth: 1,   // Borda ao redor do item
                        borderColor: 'transparent', // Cor da borda
                        borderRadius: 4,  // Bordas arredondadas
                    },
                }}
            />

            <AppDrawer.Screen
                name="Perfil"
                component={Profile}
                options={{
                    drawerItemStyle: {
                        marginBottom: 10, // Espaçamento entre itens
                        borderWidth: 1,   // Borda ao redor do item
                        borderColor: 'transparent', // Cor da borda
                        borderRadius: 4,  // Bordas arredondadas
                    },
                }}
            />

        </AppDrawer.Navigator>
    )
}

export default AppRoutes;