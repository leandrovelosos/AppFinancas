import React from "react";

import { Container, TipoText, Tipo, IconView, ValorText } from "./styles";
import { Alert, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/Feather'


export default function HistoricoList({ data, deleteItem }) {

    function handleDeleteItem(){
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja deletar esse registro?',
            [
                {
                    text: 'Cancelar' ,
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => deleteItem(data.id)
                }
            ]
        )
    }

    return (
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>

            <Container>

                <Tipo>

                    <IconView tipo={data.type}>

                        <Icon name="arrow-down" size={20} color="#FFF" />

                        <TipoText>{data.type}</TipoText>

                    </IconView>

                </Tipo>

                <ValorText>
                    R$ {data.value}
                </ValorText>
            </Container>

        </TouchableWithoutFeedback>
    )
}