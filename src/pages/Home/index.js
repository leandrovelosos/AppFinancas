import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { Background, ListBalance } from "./styles"

import Header from "../../components/Header";
import api from "../../services/api";
import { format } from 'date-fns'
import { useIsFocused } from "@react-navigation/native";
import BalaceItem from "../../components/BalanceItem";

export default function Home() {
    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([]);
    const [dateMovements, setDateMovements] = useState(new Date())

    const { signOut, user } = useContext(AuthContext);

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            //formata a data 
            let dateFormated = format(dateMovements, 'dd/MM/yyyy');

            //faz a requisicao
            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setListBalance(balance.data);
            }
        }

        getMovements();

        return () => isActive = false;

        //para chamar a funcao novamente
    }, [isFocused])


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
            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrolIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (<BalaceItem data={item} />)}
            />
        </Background>

    )
}