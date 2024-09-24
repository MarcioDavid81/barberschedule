import Head from 'next/head'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '@/services/apiClient';
import { Watch } from 'react-loader-spinner';
import { Sidebar } from '@/components/Sidebar';
import styles from './dashboard.module.scss';
import Link from 'next/link';
import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Dashboard() {

  const { user } = useAuth();

  // const [dataUser, setDataUser] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //     async function loadUserData() {
  //         const response = await api.get('/me')

  //         setDataUser(response.data);
  //         setLoading(false);
  //     }

  //     loadUserData();

  // }, []);

  // if(loading) {
  //     return (
  //         <>
  //             <Flex bg={"#1c1d29"} h={"100vh"} justifyContent="center" alignItems="center">
  //                 <Watch
  //                     visible={true}
  //                     height="80"
  //                     width="80"
  //                     radius="48"
  //                     color="orange"
  //                     ariaLabel="watch-loading"
  //                     wrapperStyle={{}}
  //                     wrapperClass=""
  //                 />
  //             </Flex>
  //         </>
  //     )
  // }

  return (
    <>
    <Sidebar>
      <Head>
        <title>Dashboard: {user ? user.name : ""}</title>
      </Head>
      <Flex h="100vh" direction="column" justifyContent="center" alignItems="center" bg="#1c1d29" color="white">
        <Flex direction="column" w="100%" justifyContent="center" p="4" alignItems="center">
          <div>Dashboard</div>
          {user ? user.name : null}<br />
          {user ? user.email : null}<br />
          {user ? user.adress : null}

          <Link
            className={styles.linkHome}
            href="/"
          >
             Retorne à <strong>Home</strong>
          </Link>

        </Flex>
      </Flex>
    </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {
      
    }
  }
})