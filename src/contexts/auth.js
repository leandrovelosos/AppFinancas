import react, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signUp(email, password, nome) {

        setLoadingAuth(true);
        try {
            const response = await api.post('/users', {
                name: nome,
                password: password,
                email: email,
            })
            setLoadingAuth(false);
            navigation.goBack();

        } catch (err) {
            console.log("Erro: ", err)
            setLoadingAuth(false);
        }
    }

    async function signIn(email, password) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            })

            //desconstruindo obj
            const { id, name, token } = response.data;

            //informacoes do user
            const data = {
                id,
                name,
                token,
                email,
            };

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
            })

            setLoadingAuth(false);

        } catch (error) {
            console.log('Erro: ', error)
            setLoadingAuth(false);
        }
    }

    return (
        //para que as informacoes seja acessada por qualquer componente colocamos no value
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;