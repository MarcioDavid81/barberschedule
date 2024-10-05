import React from "react";
import styles from "./eventModal.module.scss";
import { ScheduleItem } from '@/pages/dashboard'

interface EventModalProps {
    event: ScheduleItem;
    onClose: () => void;
}


const EventModal = ({ event, onClose }) => {


    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1>{event.title}</h1>
                <p>{event.desc}</p>
                <p>Iníco: {event.start.toLocaleString()}</p>
                <p>Fim: {event.end.toLocaleString()}</p>
                <button onClick={onClose} className={styles.button}>Fechar</button>
            </div>
        </div>
    );

};

export default EventModal;