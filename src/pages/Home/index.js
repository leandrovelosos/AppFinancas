import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { Background, ListBalance, Area, Title, List } from "./styles"

import Header from "../../components/Header";
import api from "../../services/api";
import { format } from 'date-fns'
import { useIsFocused } from "@react-navigation/native";
import BalaceItem from "../../components/BalanceItem";
import HistoricoList from "../../components/HistoricoList";
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Home() {
    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([]);
    const [dateMovements, setDateMovements] = useState(new Date())
    const [movements, setMovements] = useState([]);

    const { signOut, user } = useContext(AuthContext);

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            //formata a data 
            let dateFormated = format(dateMovements, 'dd/MM/yyyy');

            //busca as movimentacoes do dia
            const receives = await api.get('receives', {
                params: {
                    date: dateFormated
                }
            })
            //faz a requisicao
            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setMovements(receives.data);
                setListBalance(balance.data);
            }
        }

        getMovements();

        return () => isActive = false;

        //para chamar a funcao novamente
    }, [isFocused, dateMovements])

    async function handleDelete(id) {
        try {
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })

            setDateMovements(new Date())
            
        } catch (error) {
            console.log(error)
        }
    }
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
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (<BalaceItem data={item} />)}
            />

            <Area>

                <TouchableOpacity>
                    <Icon name="event" color="#121212" size={30} />
                </TouchableOpacity>

                <Title>Ultimas movimentações</Title>
            </Area>

            <List
                data={movements}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />


        </Background>

    )
}