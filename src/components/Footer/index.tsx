import React from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../../public/images/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {

    const ano = new Date().getFullYear();

    return (
        <>
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div>
                    <Link href="/">
                        <Image src={logoImg} alt="logo" width={120} height={100} />
                    </Link>
                </div>
                <div>
                    <nav className={styles.navigation}>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="#sobre">Sobre</Link></li>
                            <li><Link href="#contato">Contato</Link></li>
                        </ul>
                        <button className={styles.button}>
                            <Link href="/login">
                                LOGIN
                            </Link>
                        </button>
                    </nav>
                </div>
                <div className={styles.social}>
                    <h3>Siga nossas redes sociais</h3>
                    <ul className={styles.footerSocial}>
                        <li><Link href="https://www.facebook.com" target='_blank'><FaFacebook size={40} /></Link></li>
                        <li><Link href="https://www.instagram.com" target='_blank'><FaInstagram size={40} /></Link></li>
                        <li><Link href="https://www.twitter.com" target='_blank'><FaTwitter size={40} /></Link></li>
                    </ul>
                </div>
            </div>
        </footer>
        <div>
            <p className={styles.footerCopy}>&copy; {ano} - Todos os direitos reservados</p>
        </div>
        </>
    );
}