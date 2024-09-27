
import { Sidebar } from '@/components/Sidebar'
import Head from 'next/head'
import React, { useState } from 'react'
import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

interface UserProps {
  id: string;
  name: string;
  email: string;
  adress: string | null;
  phone: number | null;
  banner: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {

  const [name, setName] = useState(user && user.name);
  const [adress, setAdress] = useState(user?.adress ? user?.adress : "");
  const [phone, setPhone] = useState(user?.phone ? user?.phone : "");

  async function handleUpdateUser() {
    if(name === "") {
      alert("Preencha o campo de nome!");
      return;
    }

    try{

      const apiClient = setupAPIClient();
      await apiClient.put('/users', {
        name: name,
        adress: adress,
        phone: phone,
      });

      alert("Usuário atualizado com sucesso!");

    }catch(err) {
      console.log(err);

  }
}

  return (
    <>
      <Head>
        <title>Minha Conta: {user ? user.name : ""}</title>
      </Head>
      <Sidebar>
          <Flex direction="column" alignItems="flex-start" justifyContent="flex-start" h="100vh" color="white">
            <Flex w="100%" direction="row" alignItems="center" justifyContent="flex-start">
              <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange">Minha Conta</Heading>
            </Flex>
            <Flex py={8} bg="barber.900" maxW="700px" w="100%" direction="column" alignItems="center" justifyContent="center" rounded={6}>
              <Flex direction="column" w="85%">
                <Text mb={2} fontSize="xl" fontWeight="bold">Nome da Barbearia:</Text>
                <Input 
                  w="100%"
                  bg="gray.900"
                  placeholder="Nome da Barbearia" 
                  size="lg"
                  type='text'
                  mb={4}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Text mb={2} fontSize="xl" fontWeight="bold">Endereço:</Text>
                <Input 
                  w="100%"
                  bg="gray.900"
                  placeholder="Endereço da Barbearia" 
                  size="lg"
                  type='text'
                  mb={4}
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                />
                <Text mb={2} fontSize="xl" fontWeight="bold">Telefone:</Text>
                <Input 
                  w="100%"
                  bg="gray.900"
                  placeholder="Telefone" 
                  size="lg"
                  type='text'
                  mb={4}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Text mb={2} fontSize="xl" fontWeight="bold">Plano Atual:</Text>
                <Flex 
                  direction="row" 
                  w="100%" mb={4} p={1} 
                  borderWidth={1} 
                  rounded={6}
                  bg="barber.900"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                >
                  <Text fontSize="xl" fontWeight="bold" color={premium ? "orange" : "#4dffb4"} p={2}>
                    {premium ? "Plano Premium" : "Plano Básico"}
                  </Text>
                  <Link href="/planos">
                    <Box cursor="pointer" p={1} pl={2} pr={2} bg="#00cd52" rounded={4} >
                      Mudar Plano
                    </Box>
                  </Link>
                </Flex>

                <Button
                  w="100%"
                  bg="button.cta"
                  color="barber.900"
                  size="lg"
                  mb={4}
                  _hover={{ bg: "transparent", color: "button.cta", borderWidth: 1, borderColor: "button.cta" }}
                  onClick={handleUpdateUser}
                >
                  Salvar
                </Button>
                <Link href="/">
                  <Button
                    w="100%"
                    bg="transparent"
                    borderWidth={1}
                    borderColor="button.danger"
                    color="button.danger"
                    size="lg"
                    _hover={{ bg: "button.danger", color: "barber.900"}}
                  >
                    Retornar à Home
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');
    
    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      adress: response.data?.adress,
      phone: response.data?.phone,
      banner: response.data?.banner,
    }

    return {
      props: {
        user: user,
        premium: response.data?.subscriptions?.status === 'premium' ? true : false
      }
  }

}catch(err) {
    console.log(err);

    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }
})