import Head from "next/head"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import WAButton from "@/components/WAButton"
import Footer from "@/components/Footer"
import styles from "./home.module.scss"
import Image from "next/image";
import prodImg from "../../public/images/produtividade.jpg";
import agendaImg from "../../public/images/agenda.jpg";
import atrasoImg from "../../public/images/atrasos.jpg";



export default function Home() {
  return(
    <>
      <Head>
        <title>Barber Schedule - Sua Agenda On Line</title>
      </Head>
      <Header />
      <Hero />
      <WAButton />
      
      <section id="sobre" className={styles.sobreContainer}>
          <div className={styles.interface}>
            <div className={styles.sobreTitle} >
              <h1>Bem-vindo ao Barber Schedule</h1>
              <p>O sistema de agendamentos online que vai transformar a forma como sua barbearia gerencia o tempo e os atendimentos.</p>
            </div>
            <div className={styles.sobreContent}>
              <div className={styles.content}>
                <Image src={prodImg} alt="produtividade" width={400} height={300} />
                <h2>Maior Produtividade para a Equipe</h2>
                <p>
                  Com o agendamento organizado e automatizado, sua equipe pode se concentrar no que faz de melhor: atender bem seus clientes. Menos preocupações com a gestão da agenda e mais foco no atendimento de qualidade.
                </p>
              </div>
              <div className={styles.content}>
                <Image src={agendaImg} alt="agenda" width={400} height={300} />
                <h2>Praticidade e Organização</h2>
                <p>
                  Diga adeus às anotações manuais e agendas complicadas. Com o Barber Schedule, você gerencia todos os agendamentos em uma plataforma centralizada e intuitiva. Sua equipe pode acessar a agenda em tempo real, facilitando o controle de horários e evitando conflitos ou erros de marcação.
                </p>
              </div>
              <div className={styles.content}>
                <Image src={atrasoImg} alt="atraso" width={400} height={300} />
                <h2>Redução de Faltas e Atraso</h2>
                <p>
                  O sistema envia lembretes automáticos aos clientes por SMS ou e-mail antes do horário marcado, ajudando a diminuir o número de faltas e atrasos. Isso otimiza a ocupação dos seus horários e garante um fluxo constante de atendimentos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className={styles.contatoContainer}>
          <h1>Contato</h1>
          <p>Entre em contato conosco para mais informações</p>
          <form className={styles.formContainer}>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="E-mail" />
            <textarea placeholder="Mensagem"  />
            <button type="submit">Enviar</button>
          </form>
        </section>

      <Footer />
    </>
  )
}