import { Sidebar } from '@/components/Sidebar'
import Head from 'next/head'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Button, Flex, Heading, Link, Text, useMediaQuery, Input } from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '../../../services/api';

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const { user } = useAuth();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    async function handleRegister() {
      if(name === "" || price === "") {
        alert("Preencha todos os campos!");
        return;
      }

      try{

        const apiClient = setupAPIClient()
        await apiClient.post('/haircut', {
          name: name,
          price: Number (price),
        })

        alert("Corte cadastrado com sucesso!")

        setName('')
        setPrice('')

      }catch(err){
        console.log(err)
        alert("Erro ao cadastrar corte!")
      }
    }

  return (
    <>
        <Head>
          <title>Novo Corte: {user ? user.name : ""}</title>
        </Head>
        <Sidebar>
            <Flex bg="#1c1d29" minH="100vh" color="#fff" direction="column" alignItems="flex-start" justifyContent="flex-start">

                <Flex direction={isMobile ? "column" : "row"} w="100%" align={isMobile ? 'flex-start' : 'center'} mb={isMobile ? 2 : 4}>
                    <Link href='/haircuts'>
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
                  <Heading mb={4} fontSize="2xl" >
                    Cadastrar Modelo
                  </Heading>

                  <Input 
                    placeholder="Nome do Corte"
                    size="lg"
                    type='text'
                    w="85%"
                    bg="barber.400"
                    color="white"
                    mb={3}
                    isDisabled= {!subscription && count >= 1 ? true : false}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input 
                    placeholder="Valor do Corte"
                    size="lg"
                    type='number'
                    w="85%"
                    bg="barber.400"
                    color="white"
                    mb={4}
                    isDisabled={!subscription && count >= 1 ? true : false}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <Button
                    w="85%"
                    bg="orange"
                    color="#1c1d29"
                    size="lg"
                    _hover={{  bg: "transparent", color: "button.cta", borderWidth: 1, borderColor: "button.cta" }}
                    mb={4}
                    isDisabled={!subscription && count >= 1 ? true : false}
                    onClick={handleRegister}
                  >
                    Cadastrar
                  </Button>

                  {!subscription && count >= 1 && (
                    <Flex direction="row" align="center" justifyContent="space-between">
                      <Text fontSize="md" color="red.500">
                        Você atingiu o limite de cortes.
                      </Text>
                      <Link href='/planos' fontWeight="bold" color="#31fb64" ml={2}>
                        <Text fontSize="md">
                          Seja premium
                        </Text>
                      </Link>
                    </Flex>
                  )}

                </Flex>

            </Flex>
        </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try{

    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/haircut/check')
    const count = await apiClient.get('/haircut/count')

    return {
      props:{
        subscription: response.data?.subscriptions?.status === 'premium' ? true : false,
        count: count.data
      }
    }

  }catch(err){
    console.log(err)

    return {
      redirect:{
        destination: '/dashboard',
        permanent: false
      }
    }
  }
})