import { ReactNode, useContext } from "react";
import { 
    IconButton, 
    Box,
    CloseButton,
    Flex,
    Drawer,
    DrawerContent,
    useColorModeValue,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Icon
} from "@chakra-ui/react";
import { FiMenu, FiScissors, FiSettings, FiClipboard, FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import { color } from "framer-motion";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}



const linkItens: Array<LinkItemProps> = [
    {name: 'Agenda', icon: FiClipboard, href: '/dashboard'},
    {name: 'Cortes', icon: FiScissors, href: '/haircuts'},
    {name: 'Minha Conta', icon: FiSettings, href: '/profile'},
]

export function Sidebar({children}: {children: ReactNode}) {

    const {isOpen, onOpen, onClose} = useDisclosure();

    return(
        <Box minH={100} bg="#1c1d29">
            <SidebarContent 
                onClose={() => onClose}
                display={{base: "none", md: "block"}}    
            />

            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
                onClose={onClose}
            >
                <DrawerContent>
                    <SidebarContent 
                        onClose={() => onClose()}
                        display={{base: "block", md: "none"}}
                        color="orange"
                    />
                </DrawerContent>

            </Drawer>

            <MobileNav onOpen={onOpen} />

            <Box ml={{base: 0, md: 60}} p={4}>
                {children}
            </Box>

        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    display: BoxProps["display"];
}

const SidebarContent = ({onClose, display, ...rest}: SidebarProps) => {

    const { logoutUser } = useContext(AuthContext);

    const { user } = useAuth();

    async function handleLogout() {
        await logoutUser();
    }

    return(
        <Box
            bg="barber.900"
            borderRight="1px"
            borderRightColor="gray.700"
            w={{base: "full", md: 60}}
            position="fixed"
            h="full"
            display={display}
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                justifyContent="space-between"
                mx="8"
            >
                <Link href="/dashboard">
                    <Text fontSize="2xl" color="orange" ml="2">Olá,</Text>
                    {user? <Text fontSize="lg" color="white" ml="2"> {user.name}</Text> : null}
                  
                </Link>
                <CloseButton
                    color="orange"
                    display={{base: 'flex', md: 'none'}}
                    onClick={onClose}
                />
            </Flex>

            {linkItens.map(link => (
                <NavItem key={link.name} icon={link.icon} route={link.href}>
                    {link.name}
                </NavItem>
            ))}

            <Box 
                position={"fixed"}
                bottom="8"
                w="full"
                display="flex"
                alignItems={"center"}

            >
                <Text fontSize="xl" color="white" ml="8" my="4">Logout</Text>
                <IconButton
                    ml="4"
                    onClick={handleLogout}
                    icon={<FiLogOut color="#1c1d29" fontSize={20} /> }
                    variant="outline"
                    aria-label="open menu"
                    borderColor={"transparent"}
                    backgroundColor={"orange"}
                    _hover={{
                        bg: "gray.200",
                        borderColor: "#1c1d29",
                    }}
                />
            </Box>

        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactNode;
    route: string;
}

const NavItem = ({icon, children, route, ...rest}: NavItemProps) => {
    return(
        <Link href={route} style={{textDecoration: "none"}}>
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: "#1c1d29",
                color: "white"
            }}
            {...rest}
        >
            {icon && (
                <Icon 
                    mr={4}
                    fontSize="20"
                    as={icon} 
                    color="orange"
                    _groupHover={{
                        color: "white"

                    }}
                />
            )}
            <Text ml="4" fontSize="md" color="white">{children}</Text>
        </Flex>
    </Link>
    )
}

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({onOpen}: MobileProps) => {

    const { user } = useAuth();

    return(
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 24}}
            height="20"
            alignItems="center"
            bg={"barber.900"}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.900")}
            justifyContent="flex-start"
            display={{base: "flex", md: "none"}}
        >
            <IconButton
                display={{base: "flex", md: "none"}}
                onClick={onOpen}
                icon={<FiMenu color="orange" fontSize={30} />}
                variant="outline"
                aria-label="open menu"
                borderColor={"transparent"}
            />

            <Flex flex={{base: 1, md: "auto"}} ml={8} display="flex" alignItems="center">
                <Text fontSize="2xl" color="orange">Olá,</Text>
                {user? <Text fontSize="2xl" color="white" ml="2"> {user.name}</Text> : null}
            </Flex>

        </Flex>
    )

}