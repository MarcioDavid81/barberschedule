import Head from "next/head";
import { Flex, Text, Heading, Button, useMediaQuery, Link, Input, Stack, Switch } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { ChangeEvent, useState } from "react";
import Router from "next/router";

interface HaircutProps {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface SubscriptionProps {
    id: string;
    status: string;
}

interface EditHaircutProps {
    haircut: HaircutProps;
    subscription: SubscriptionProps | null;
}

export default function EditHaircut({subscription, haircut}: EditHaircutProps) {

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const [name, setName] = useState(haircut?.name);
    const [price, setPrice] = useState(haircut?.price);
    const [status, setStatus] = useState(haircut?.status);

    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled");

    const { user } = useAuth();

    //Função para atualizar o corte
    async function handleSave() {

        if(name === "" || price === "") {
            alert("Preencha todos os campos!");
            return;
        }

        try{

            const apiClient = setupAPIClient();
            await apiClient.put('/haircut', {
                haircut_id: haircut?.id,
                name: name,
                price: Number(price),
                status: status
            });

            alert("Corte atualizado com sucesso!");

        }catch(err){
            console.log(err);
            alert("Erro ao atualizar corte!");
        }
    }

    //Função para alterar o status do corte
    function handleChangeStatus(e : ChangeEvent<HTMLInputElement>) {
        if(e.target.value === "disabled") {
            setDisableHaircut("enabled");
            setStatus(false);
        } else {
            setDisableHaircut("disabled");
            setStatus(true);
        }
    }

    //Função para deletar o corte
    async function handleDelete() {
        try{

            const apiClient = setupAPIClient();
            await apiClient.delete('/haircut', {
                params: {
                    haircut_id: haircut.id
                }
            });

            alert("Corte deletado com sucesso!");

            Router.push('/haircuts');

        }catch(err){
            console.log(err);
            alert("Erro de novo burro! Acerta logo esse código!");
        }
    }

  return (
    <>
      <Head>
        <title>Editar Corte: {user ? user.name : ""}</title>
      </Head>
        <Sidebar>
            <Flex
                bg="#1c1d29"
                minH="100vh"
                color="#fff"
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Flex 
                    direction={isMobile ? "column" : "row"} 
                    w="100%" 
                    align={isMobile ? 'flex-start' : 'center'} 
                    mb={isMobile ? 2 : 4}
                >

                    <Link href='/haircuts' style={{textDecoration: "none"}}>
                      <Button mr={4} display="flex" alignItems="center" justifyContent="center">
                        <FiChevronLeft size={28} color='orange'/>
                        Voltar
                      </Button>
                    </Link>

                    <Heading fontSize={isMobile ? "26px" : "3xl"} mt={4} mb={4} mr={4} color="orange">
                      Modelos de Corte
                    </Heading>
                </Flex>

                <Flex maxW="700px" bg="barber.900" w="100%" align="center" justify="center" pt={8} pb={8} direction="column" rounded={6}>

                    <Heading mb={4} fontSize="2xl">
                        Editar Corte
                    </Heading>

                    <Flex w="85%" direction="column">

                        <Input
                            placeholder="Nome do Corte"
                            bg="barber.400"
                            mb={3}
                            size="lg"
                            type="text"
                            w="100%"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Preço do Corte"
                            bg="barber.400"
                            mb={3}
                            size="lg"
                            type="number"
                            w="100%"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Stack my={4} direction="row" align="center" justify="space-between">
                            <Flex direction="row" gap={4} justify="center" align="center">
                            <Text fontWeight="bold">
                                {status ? "Desativar" : "Reativar"}
                            </Text>
                            <Switch
                                colorScheme="red"
                                size="lg"
                                value={disableHaircut}
                                isChecked={disableHaircut === "disabled" ? false : true}
                                onChange={(e : ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                                isDisabled= {subscription?.status !== "premium"}
                            />
                            </Flex>
                            <Button 
                                bg="transparent"
                                borderWidth={1}
                                borderColor="button.danger"
                                color="button.danger" 
                                _hover={{ bg: "button.danger", color: "barber.900" }}
                                isDisabled= {subscription?.status !== "premium"}
                                onClick={handleDelete}
                            >
                                Excluir
                                <FiTrash2 style={{marginLeft: "10px"}} />
                            </Button>
                        </Stack>

                        <Button
                            bg="orange"
                            color="#1c1d29"
                            _hover={{ bg: "transparent", color: "button.cta", borderWidth: 1, borderColor: "button.cta" }}
                            mb={4}
                            size="lg"
                            isDisabled= {subscription?.status !== "premium"}
                            onClick={handleSave}
                        >
                            Salvar
                        </Button>

                        {subscription?.status !== "premium" && (
                            <Flex direction="row" align="center" justifyContent="center">
                                <Link href='/planos' fontWeight="bold" color="#31fb64" ml={2}>
                                    <Text fontSize="md" mr={2}>
                                        Seja premium
                                    </Text>
                                </Link>
                                <Text fontSize="md" color="red.500">
                                    e tenha acesso a todas as funcionalidades.
                                </Text>
                            </Flex>
                        )}

                    </Flex>
                </Flex>
            </Flex>
        </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const { id } = ctx.params;

    try{

        const apiClient = setupAPIClient(ctx);

        const check = await apiClient.get('/haircut/check');

        const response = await apiClient.get('/haircut/detail',{
            params: {
                haircut_id: id
            }
        });

        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions
            }
        }
    }catch(err){
        console.log(err);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
});