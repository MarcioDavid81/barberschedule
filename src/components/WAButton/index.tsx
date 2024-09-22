"use client"
import React from 'react';
import styles from './wabutton.module.scss';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';


export default function WAButton() {
    return (
        <motion.a
            href="https://wa.me/5519999999999"
            target="_blank"
            className={styles.waButton}
            initial={{
                opacity: 0,
                y: 100,
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                },
            }}
        >
            <FaWhatsapp />
        </motion.a>
    );
}