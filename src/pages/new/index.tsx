import { Sidebar } from '@/components/Sidebar'
import { useAuth } from '@/context/AuthContext'
import { Button, Flex, Heading, Input, Link, Select } from '@chakra-ui/react'
import Head from 'next/head'
import React, { ChangeEvent, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { setupAPIClient } from '@/services/api'

interface HaircutProps {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface NewProps {
    haircuts: HaircutProps[];
}

export default function New({haircuts}: NewProps) {

    const { user } = useAuth()

    const [customer, setCustomer] = useState('')
    const [haircutSelected, setHaircutSelected] = useState(haircuts[0])

    function handleChangeSelect(id: string){

        const haircutItem = haircuts.find(item => item.id === id)

        setHaircutSelected(haircutItem)
    }

    async function handleSave() {
        
        if(customer === "") {
            alert("Preencha todos os campos!");
            return;
        }

        try{

            const apiClient = setupAPIClient();
            await apiClient.post('/schedule', {
                costumer: customer,
                haircut_id: haircutSelected?.id
            })

            alert("Agendamento realizado com sucesso!");

            setCustomer('')

        }catch(err){
            console.log(err)
            alert("Erro ao realizar agendamento!")
        }
    }

  return (
    <>
        <Head>
            <title>
                Agendamento | {user?.name}
            </title>
        </Head>

        <Sidebar>
            <Flex h="100vh" direction="column" justifyContent="flex-start" alignItems="flex-start" bg="#1c1d29" color="white">

            <Flex w="100%" direction="row" alignItems="center" justify="flex-start">
              <Link href='/dashboard' mr={4}>
                <Button fontWeight="bold">
                    <FiChevronLeft size={28} color='orange'/>
                    Voltar
                </Button>                
              </Link>
              <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange">
                Novo Agendamento
              </Heading>

            </Flex>

            <Flex maxW="700px" w="100%" pt={8} pb={8} direction="column" align="center" justify="center" bg="barber.900">

                <Input
                    placeholder="Nome do Cliente"
                    color="button.cta"
                    bg="barber.400"
                    mb={3}
                    size="lg"
                    type="text"
                    w="85%"
                    value={customer}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                />

                <Select mb={3} size="lg" w="85%" color="button.cta" bg="barber.400" onChange={(e) => handleChangeSelect(e.target.value)}>
                    {haircuts?.map(item => (
                        <option style={{backgroundColor: "#1c1d29", color: "orange"}} key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </Select>

                <Button bg="orange" color="barber.900" w="85%" size="lg" mb={3} _hover={{bg: "transparent", borderWidth: "1px", borderColor: "orange", color: "orange"}} onClick={handleSave}>
                    Agendar
                </Button>

            </Flex>

            </Flex>
        </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{
        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get('/haircuts',{
            params: {
                status: true,
            }
        })

        if(response.data === null){
            return{
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        console.log(response.data);

        return{
            props: {
                haircuts: response.data
            }
        }

    }catch(err){
        console.log(err)
        return{
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})