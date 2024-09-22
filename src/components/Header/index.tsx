
import React, { useEffect, useState} from 'react';
import Image from 'next/image';
import logoImg from '../../../public/images/logo.png'
import styles from './header.module.scss';
import Link from 'next/link';
import { FaUserLock } from 'react-icons/fa';

export default function Header() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, []);

    return (
        <header
            className={`${styles.headerContainer}
            ${scrolled ? styles.scrolled: ""}`}
        >
            <div className={styles.headerContent}>
                <Link href="/">
                    <Image src={logoImg} alt="logo" width={120} height={100} />
                </Link>
                <nav className={styles.navigation}>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="#sobre">Sobre</Link></li>
                        <li><Link href="#contato">Contato</Link></li>
                    </ul>
           
                       <Link href="/login" >
                        <button className={styles.button}>
                            <FaUserLock />
                            LOGIN
                        </button>
                       </Link>
            
                </nav>
            </div>
        </header>
    );
}