import react, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const navigation = useNavigation();

    const [user, setUser] = useState({
        nome: 'Leandro'
    });

    async function signUp(email, password, nome) {

        try {
            const response = await api.post('/users', {
                name: nome,
                password: password,
                email: email,
            })
            navigation.goBack();

        } catch (err) {
            console.log("Erro: ", err)
        }
    }

    return (
        //para que as informacoes seja acessada por qualquer componente colocamos no value
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;