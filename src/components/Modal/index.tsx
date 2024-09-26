import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Text, Flex, Button } from '@chakra-ui/react'
import { FiUsers, FiScissors, FiUser } from 'react-icons/fi'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { ScheduleItem } from '@/pages/dashboard'

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}


export function ModalInfo({ isOpen, onOpen, onClose, data, finishService }: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1c1d29">
            <ModalHeader color="white">Informações do agendamento</ModalHeader>
            <ModalCloseButton color="orange" />

            <ModalBody>

                <Flex align="center" mb={3}>
                    <FiUsers size={28} color='orange' />
                    <Text fontSize="2xl" fontWeight="bold" ml={3} color="white">Cliente: {data?.costumer}</Text>
                </Flex>

                <Flex align="center" mb={3}>
                    <FiScissors size={28} color='white' />
                    <Text fontSize="lg" fontWeight="bold" ml={3} color="white">{data?.haircut.name}</Text>
                </Flex>

                <Flex align="center" mb={3}>
                    <FaMoneyBillAlt size={28} color='#46ef75' />
                    <Text fontSize="lg" fontWeight="bold" ml={3} color="white">Preço: R$ {data?.haircut?.price} </Text>
                </Flex>

                <ModalFooter>
                    <Button colorScheme="green" mr={3} onClick={() => finishService() }>Finalizar</Button>
                    <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
                </ModalFooter>

            </ModalBody>

        </ModalContent>
    </Modal>
  )
}
