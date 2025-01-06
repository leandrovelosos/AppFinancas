import react from "react";
import { View, Text, Platform } from "react-native";
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles';

export default function SignUp() {
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

                <SubmitButton>

                    <SubmitText>
                        Cadastrar
                    </SubmitText>

                </SubmitButton>

            </Container>

        </Background>
    )
}