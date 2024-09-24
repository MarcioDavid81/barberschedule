import { Sidebar } from '@/components/Sidebar'
import Head from 'next/head'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { Flex } from '@chakra-ui/react';

export default function Haircuts() {

    const { user } = useAuth();

  return (
    <>
        <Sidebar>
            <Head>
            <title>Cortes: {user ? user.name : ""}</title>
            </Head>
            <Flex bg="#1c1d29" minH="100vh" color="#fff">
                <div>Cortes</div>
                {user ? user.name : null}<br />
            </Flex>
        </Sidebar>
    </>
  )
}
