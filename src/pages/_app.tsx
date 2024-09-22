import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WAButton from "@/components/WAButton";

const colors = {
  barber: {
    900: '#12131b',
    400: '#1b1c29',
    100: '#c6c6c6',
  },
  button: {
    cta: 'orange',
    default: '#fff',
    grey: '#dfdfdf',
    danger: '#ff4040'
  },
  orange: {
    900: 'orange',
  }
}

const theme = extendTheme({ colors })

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider theme={theme}>

      <Component {...pageProps} />

    </ChakraProvider>
  )
}
