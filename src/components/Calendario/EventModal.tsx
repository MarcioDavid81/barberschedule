import React from "react";
import styles from "./eventModal.module.scss";
import { ScheduleItem } from "../../pages/dashboard";

interface EventModalProps {
    data: ScheduleItem;
    onClose: () => void;
}


export default function EventModal ({ data, onClose }: EventModalProps) {

    function handleAlert(){
        alert(data);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1>{data?.costumer}</h1>
                <p>{data?.haircut.name}</p>
                {/* <p>Iníco: {event.start.toLocaleString()}</p>
                <p>Fim: {event.end.toLocaleString()}</p> */}
                <button onClick={onClose} className={styles.button}>Fechar</button>
                <button onClick={handleAlert} className={styles.button}>Alert</button>
            </div>
        </div>
    );

};
