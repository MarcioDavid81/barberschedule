import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../services/apiClient";
import { useRouter } from "next/navigation";

interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    logoutUser: () => Promise<void>;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    adress: string | null;
    phone: string | null;
    banner: string | null;
    subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
    id: string;
    status: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

interface SignInProps {
    email: string;
    password: string;
}

interface SignUpProps {
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

//Função para deslogar o usuario
export function SignOut() {

    const router = useRouter();

    console.log("error logout")
    try{
        destroyCookie(null, "@barber.token", {path: "/"});
        router.push("/login");
    }catch(err){
        console.log("error logout")

    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    
    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        const { "@barber.token": token } = parseCookies();

        if(token) { // se o token for valido, ele vai pegar os dados do usuario e efetuar o login
            api.get("/me").then(response => {
                const { id, name, email, adress, phone, banner, subscriptions } = response.data;

                setUser({
                    id,
                    name,
                    email,
                    adress,
                    phone,
                    banner,
                    subscriptions
                });
            }).catch(() => { // se der erro no token, ele vai deslogar
                SignOut();
            });
        }
    }, []);

    //Função para logar o usuario
    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password,
            });

            const { id, name, token, subscriptions, adress, phone, banner } = response.data;

            setCookie(undefined, "@barber.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/"
            })

            setUser({
                id,
                name,
                email,
                adress,
                phone,
                banner,
                subscriptions
            });

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            alert("Login efetuado com sucesso");

            // Router.push("/dashboard");
            router.push("/dashboard");

        }catch(err) {

            alert("Erro ao entrar, tente novamente");
        }

    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post("/users", {
                name,
                email,
                password
            })

            router.push("/login");
            alert("Cadastro efetuado com sucesso");

        } catch(err) {
            console.log("erro ao cadastrar", err)
            alert("Erro ao cadastrar, tente novamente");
        }

    }

    async function logoutUser() {
        try{
            destroyCookie(null, "@barber.token", {path: "/"});
            router.push("/");
            setUser(null);
        } catch(err) {
            console.log("erro ao sair", err)
        }
    }

    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}