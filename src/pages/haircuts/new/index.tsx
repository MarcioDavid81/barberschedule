import { Sidebar } from '@/components/Sidebar'
import Head from 'next/head'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { Flex } from '@chakra-ui/react';

export default function NewHaircuts() {

    const { user } = useAuth();

  return (
    <>
        <Sidebar>
            <Head>
            <title>Novo Corte: {user ? user.name : ""}</title>
            </Head>
            <Flex bg="#1c1d29" minH="100vh" color="#fff">
                <div>Novo Corte</div>
                {user ? user.name : null}<br />
            </Flex>
        </Sidebar>
    </>
  )
}
