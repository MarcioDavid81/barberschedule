import { Sidebar } from '@/components/Sidebar'
import { Button, Flex, Heading, Link, Text, useMediaQuery } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { FiChevronLeft } from 'react-icons/fi';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

interface PlanosProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
        <Head>
            <title>Planos</title>
        </Head>
        <Sidebar>
            <Flex direction="column" alignItems="flex-start" justifyContent="flex-start" h="100vh" color="white">

            <Flex w="100%" direction="row" alignItems="center" justifyContent="flex-start">
              <Link href='/profile' style={{textDecoration: "none"}}>
                  <Button mr={4} display="flex" alignItems="center" justifyContent="center">
                      <FiChevronLeft size={28} color='orange'/>
                       Voltar
                  </Button>
              </Link>
              <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange">Planos Disponíveis</Heading>
            </Flex>

            <Flex pb={8} maxW="780px" w="100%" direction="column" align="flex-start" justify="flex-start">

              <Flex w="100%" gap={4} flexDirection={isMobile ? "column" : "row"}>

                <Flex rounded={6} p={2} flex={1} bg="barber.900" direction="column">
                  <Heading fontSize="2xl" textAlign="center" mt={2} mb={4}>Plano Grátis</Heading>
                  <Text fontWeight="md" ml={4} mb={2}>- Registrar 1 Corte.</Text>
                  <Text fontWeight="md" ml={4} mb={2}>- Agendar serviços.</Text>
                  <Text fontWeight="md" ml={4} mb={2}>- Editar perfil.</Text>
                </Flex>

                <Flex rounded={6} p={2} flex={1} bg="barber.900" direction="column">
                  <Heading fontSize="2xl" color="#31fb6a" textAlign="center" mt={2} mb={4}>Plano Premium</Heading>
                  <Text fontWeight="md" ml={4} mb={2}>- Registrar e editar cortes ilimitados.</Text>
                  <Text fontWeight="md" ml={4} mb={2}>- Ativar e desativar cortes.</Text>
                  <Text fontWeight="md" ml={4} mb={2}>- Agendar serviços.</Text>
                  <Text fontWeight="md" ml={4} mb={2}>- Editar perfil.</Text>
                  <Text fontWeight="md" ml={4} mb={2}>- Receber atualizações sem custo.</Text>
                  <Text fontWeight="bold" fontSize="xl" color="#31fb6a" mt={4} ml={4} mb={2}>R$9,90/mês.</Text>
                  <Button
                    w="100%"
                    bg="button.cta"
                    color="barber.900"
                    fontWeight="bold"
                    size="lg"
                    mb={4}
                    _hover={{ bg: "transparent", color: "button.cta", borderWidth: 1, borderColor: "button.cta" }}
                    onClick={() => console.log("Quero ser premium!")}
                    isDisabled={premium ? true : false}
                >
                  {premium ? "VOCÊ JÁ É PREMIUM" : "QUERO SER PREMIUM"}
                </Button>
                {premium && (
                  <Button 
                    w="100%"
                    bg="transparent"
                    borderWidth={1}
                    borderColor="button.danger"
                    color="button.danger"
                    fontWeight="bold"
                    _hover={{ bg: "button.danger", color: "barber.900"}}
                    onClick={() => console.log("Cancelar assinatura!")}
                  >
                    CANCELAR ASSINATURA
                  </Button>
                )}
                </Flex>

              </Flex>

            </Flex>

            </Flex>
        </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{

    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/me')

    return {
      props: {
        premium: response.data?.subscriptions?.status === "premium" ? true : false
      }
    }

  }catch(err){
    console.log(err)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }
})