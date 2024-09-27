
import { useState, useContext } from "react";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import { Flex, Text, Button, Input, Center } from "@chakra-ui/react";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Head from "next/head";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Login() {

    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        if(email === "" || password === "") {
            alert("Preencha todos os campos!");
            return;
        }

        await signIn({
            email,
            password,
        })
    }

    return(
        <>
            <Head>
                <title>Barber Schedule - Login</title>
            </Head>
        
            <Flex background="barber.400" height="100vh" alignItems="center" justifyContent="center" p={4}>
                <Flex width={640} direction="column" pl={14} pr={14} py={4} rounded={8} bg={"barber.900"}>
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Center p={4}>
                        <Image src={logoImg} alt="Logo" width={180} quality={100} objectFit="fill" />
                    </Center>

                    <Center>
                        <Text fontSize={24} fontWeight={500} mb={6} color={"orange"}>Faça Login</Text>
                    </Center>

                    <Input
                        background={"default"}
                        placeholder="E-mail"
                        type="email"
                        variant={"filled"}
                        size="lg"
                        mb={3}
                        color={"#1c1d29"}
                        _focus={{borderColor: "orange", color: "#fff"}}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        background={"default"}
                        placeholder="******"
                        type="password"
                        variant={"filled"}
                        size={"lg"}
                        mb={6}
                        color={"#1c1d29"}
                        _focus={{borderColor: "orange", color: "#fff"}}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        mb={6}
                        w={"100%"}
                        size={"lg"}
                        fontWeight={400}
                        bg="button.cta"
                        _hover={{ bg: "transparent", color: "button.cta", borderWidth: 1, borderColor: "button.cta" }}
                        onClick={handleLogin}
                    >
                        <Text size="lg" fontWeight="bold">ENTRAR</Text>
                    </Button>

                    <Center>
                        <Link href="/register">
                            <Text color="button.default" fontSize={14} fontWeight={500}>Não tem uma conta? <strong>Cadastre-se</strong></Text>
                        </Link>
                    </Center>

                    <Center>
                    <Link href="/">
                        <Button
                            mt={6}
                            size={"lg"}
                            fontWeight={400}
                            bg="button.cta"
                            _hover={{ bg: "transparent", color: "button.cta", borderWidth: 1, borderColor: "button.cta" }}
                        >
                            <IoArrowBackCircleOutline size={24} style={{marginRight: "10px"}} />
                            <Text size="lg" fontWeight="bold">Voltar</Text>
                        </Button>
                    </Link>
                    </Center>

                </motion.div>
                </Flex>
            </Flex>

        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {
            
        }
    }
})