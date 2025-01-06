import react, { useState, useContext } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Background, AreaInput, Container, Input, Logo, Link, LinkText, SubmitButton, SubmitText } from "./styles";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {

    const navigation = useNavigation();
    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        signIn(email, password);
    }

    return (

        <Background>

            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >

                <Logo
                    source={require('../../assets/Logo.png')}
                />

                <AreaInput>

                    <Input
                        placeholder='E-mail'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                </AreaInput>

                <AreaInput>

                    <Input
                        placeholder='Senha'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={handleLogin}>

                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                            <SubmitText>
                                Acessar
                            </SubmitText>
                        )
                    }

                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>

                    <LinkText>
                        Criar Conta
                    </LinkText>

                </Link>
            </Container>

        </Background>
    )
}