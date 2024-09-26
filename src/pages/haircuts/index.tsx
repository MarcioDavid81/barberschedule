import { Sidebar } from '@/components/Sidebar'
import Head from 'next/head'
import React, { useState, ChangeEvent } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Button, Flex, Heading, Stack, Switch, Text, useMediaQuery, Link } from '@chakra-ui/react';
import { IoMdPricetag } from 'react-icons/io';
import { FiScissors } from 'react-icons/fi';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/services/api';

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {

    const [isTablet] = useMediaQuery("(max-width: 810px)");

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const { user } = useAuth();

    const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);

    const [disableHaircut, setDisableHaircut] = useState("enabled");

    async function handleDisable(e: ChangeEvent<HTMLInputElement>) {

      const apiClient = setupAPIClient();

      if(e.target.value === 'disabled') {

        setDisableHaircut('enabled');

        const response = await apiClient.get('/haircuts', {
          params: {
            status: true
          }
        })

        setHaircutList(response.data);

      } else {

        setDisableHaircut('disabled');

        const response = await apiClient.get('/haircuts', {
          params: {
            status: false
          }
        })

        setHaircutList(response.data);

      }
    }

  return (
    <>
        <Head>
           <title>Cortes: {user ? user.name : ""}</title>
        </Head>
        <Sidebar>
            <Flex bg="#1c1d29" h="100vh" color="#fff" direction="column" alignItems="flex-start" justifyContent="flex-start">
                <Flex
                  direction={isMobile ? "column" : "row"}
                  w="100%"
                  alignItems={isMobile ? "flex-start" : "center"}
                  justifyContent="flex-start"
                  mb={0}
                >
                  <Heading fontSize={isTablet ? "26px" : "3xl"} mt={4} mb={4} mr={4} color="orange">
                    Modelos de Cortes
                  </Heading>
                  <Link href="/haircuts/new">
                    <Button fontWeight="bold">
                    <FiScissors size={30} color="orange" />
                      Novo
                    </Button>
                  </Link>
                  <Stack ml={isMobile ? "" : "auto"} align="center" direction="row" mt={isMobile ? "4" : ""}>
                    <Text fontWeight="bold">
                      ATIVOS
                    </Text>
                    <Switch 
                      colorScheme="green"
                      size="lg"
                      value={disableHaircut}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleDisable(e)}
                      isChecked={disableHaircut === 'disabled' ? false : true}
                    />
                  </Stack>
                </Flex>

                {haircutList.map(haircut => (
                  <Link key={haircut.id} href={`/haircuts/${haircut.id}`} w={"100%"} pt={2} style={{textDecoration: "none"}} _hover={{color: "orange"}}>
                    <Flex 
                      cursor="pointer"
                      w="100%" 
                      p={4} 
                      bg="barber.900"
                      direction="row"
                      rounded="6"                    
                      justifyContent="space-between"
                    >
                      <Flex direction="row" alignItems="center" justifyContent="center">
                        <IoMdPricetag size={28} color="orange" />
                        <Text ml={2} fontWeight="bold" noOfLines={1}>
                          {haircut.name}
                        </Text>
                      </Flex>

                      <Text fontWeight="bold">
                        Preço: R${haircut.price}
                      </Text>
                    </Flex>
                  </Link>
                ))}

            </Flex>
        </Sidebar>
    </>
  )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/haircuts', {
      params: {
        status: true
      }
    })

    if(response.data === null){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return {
      props: {
        haircuts: response.data
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