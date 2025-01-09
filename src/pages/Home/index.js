import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { Background } from "./styles"

import Header from "../../components/Header";

export default function Home() {
    const { signOut, user } = useContext(AuthContext);
    return (
        // <View>
        //     <Text>Tela Home</Text>
        //     <Text> Bem vindo {user.name}</Text>
        //     <Button
        //         title="Sair"
        //         onPress={() => signOut()}
        //     />
        // </View>
        <Background>
            <Header title="Minhas movimentações" />
        </Background>

    )
}