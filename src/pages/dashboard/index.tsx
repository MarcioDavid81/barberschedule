import Head from 'next/head'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Button, Flex, Heading, Link, Text, useMediaQuery, useDisclosure } from '@chakra-ui/react';
import { setupAPIClient } from '@/services/api';
import { Sidebar } from '@/components/Sidebar';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { PiHairDryer } from 'react-icons/pi';
import { IoMdPerson } from 'react-icons/io';
import { ModalInfo } from '@/components/Modal';

export interface ScheduleItem {
  id: string;
  costumer: string;
  start: string;
  end: string;
  haircut: {
    id: string;
    name: string;
    price: number | string;
    user_id: string;
  }
}

interface DashboardProps {
  schedules: ScheduleItem[];
}

export default function Dashboard({schedules}: DashboardProps) {

  const [list, setList] = useState(schedules);

  const [service, setService] = useState<ScheduleItem>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const { user } = useAuth();

  function handleItemModal(item: ScheduleItem){
    setService(item);
    onOpen();
  }

  //Função para finalizar o serviço
  async function handleFinish(id: string){
    try{

      const apiClient = setupAPIClient();
      await apiClient.delete("/schedule", {
        params: {
          schedule_id: id
        }
      })

      const filterItem = list.filter(item => {
        return (item?.id !== id)
      });

      setList(filterItem);

      onClose();

      alert('Serviço finalizado com sucesso')

    }catch(err){
      console.log(err)
      onClose();
      alert('Erro ao finalizar o serviço')
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard: {user ? user.name : ""}</title>
      </Head>
      <Sidebar>
        <Flex minH="100vh" direction="column" justifyContent="flex-start" alignItems="flex-start" bg="#1c1d29" color="white">

            <Flex w="100%" direction="row" alignItems="center" justify="flex-start">
              <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange">
                Agenda
              </Heading>

              <Link href='/new'>
                <Button fontWeight="bold">
                  <PiHairDryer size={30} color='orange' />
                  Registrar
                </Button>                
              </Link>
            </Flex>

            {list.map(item => (
              <Link w="100%" m={0} p={0} mt={1} style={{textDecoration: "none"}}  _hover={{color: "orange"}}>
                <Flex
                  w="100%"
                  direction={isMobile ? "column" : "row"}
                  p={2}
                  rounded={6}
                  mb={2}
                  bg="barber.900"
                  justifyContent="space-between"
                  align={isMobile ? "flex-start" : "center"}
                  onClick={() => handleItemModal(item)}
                >
                    <Flex align="center" justify="center" direction="row" mb={2}>
                      <IoMdPerson size={30} color="orange" />
                      <Text ml={4} fontWeight="bold" noOfLines={1}>{item?.costumer}</Text>
                    </Flex>
                    <Text fontWeight="bold">Dia: {item?.start}</Text>
                    <Text fontWeight="bold">Das: 16:00{item?.start} às 17:00{item?.end}</Text>
                    <Text fontWeight="bold">{item?.haircut?.name}</Text>
                    <Text fontWeight="bold">R$ {item?.haircut?.price}</Text>

                </Flex>
              </Link>
            ))}


        </Flex>
      </Sidebar>

      <ModalInfo 
        isOpen={isOpen} 
        onOpen={onOpen} 
        onClose={onClose} 
        data={service} 
        finishService={ () => handleFinish(
          service?.id
        )}
      
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/schedules');

    return {
      props: {
        schedules: response.data
      }
    }

  }catch(err){
    console.log(err)
  }

})