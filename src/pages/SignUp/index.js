import reac, { useContext } from "react";
import { View, Text, Platform } from "react-native";
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles';

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {

    const { user } = useContext(AuthContext)

    function handleSignUp() {

    }
    return (
        <Background>

            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >

                <AreaInput>

                    <Input
                        placeholder="Nome"
                    />

                </AreaInput>

                <AreaInput>

                    <Input
                        placeholder="E-mail"
                    />

                </AreaInput>

                <AreaInput>

                    <Input
                        placeholder="Senha"
                    />

                </AreaInput>

                <SubmitButton onPress={handleSignUp}>

                    <SubmitText>
                        Cadastrar
                    </SubmitText>

                </SubmitButton>

            </Container>

        </Background>
    )
}