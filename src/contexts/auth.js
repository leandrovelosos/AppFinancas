import React, { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorage() {
            //busca o token
            const storageUser = await AsyncStorage.getItem('@finToken');

            if (storageUser) {
                //faz a requisicao e verifica o token
                const response = await api.get('/me', {
                    headers: {
                        'Authorization': `Bearer ${storageUser}`
                    }
                })
                    //se nao tiver token ou estiver errado o usuario e deslogado
                    .catch(() => {
                        setUser(null);
                    })

                //se tudo der certo as informacoes sao capturadas e usadas nas proximas requsicoes agora o toke fica na variavel storageUser
                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                //pega os dados para serem utilizadas para relogar
                setUser(response.data);
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, [])

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

            await AsyncStorage.setItem('@finToken', token);

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
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;