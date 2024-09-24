import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { AuthProvider } from "@/context/AuthContext";

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

const fonts = {
  body: 'Nunito, sans-serif',
}

const theme = extendTheme({ colors, fonts })

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}
