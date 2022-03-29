import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from "react"
import { useUser } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import styles from  "../styles/Home.module.scss"
import '@fortawesome/fontawesome-free/css/all.css'

export default function Home() {
  const { isLoading, user, error } = useUser()
  
  return (
    <>
      <Head>
        <title>CryptoQ</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <header className={styles.header}>
        <h1>Fast, Efficient {'&'} Secure</h1>
        <h1 className={styles.gradetitle}>Platform to Invest in Crypto</h1>
        <span>CryptoQ is an innovative solution for all crypto enthusiasts.</span>
        <div className="flex justify-center mt-12">
          <button className="btn btn-info mr-2">Try for free {">"}</button>
          <button className="btn btn-outline ml-2">Contact Us</button>
        </div>
      </header>

      <div className='wrapper'>
        <section className={styles.sectionOne}>

          <div className={styles.cardContainer}>
          <div className={styles.card}>
            <i className="fas fa-sliders"></i>
            <h1>Customizable</h1>
            <div className={styles.titleBg}><div/></div>
            <p>Enjoy your own preferences at your will. You will able to customize your experience with our service. Every last bit.</p>
          </div>
          </div>

          <div className={styles.middleCard}>
          <div className={styles.cardContainer}>
          <div className={styles.card}>
            <i className="fas fa-lock"></i>
            <h1>Strong Security</h1>
            <div className={styles.titleBg}><div/></div>
            <p>Protection against DDoS attacks, full data encryption, cryptocurrency cold storage, compliance. Alongside with two factor authentication, automatic backups and so much more for your own protection.</p>
          </div>
          </div>
          </div>

          <div className={styles.cardContainer}>
          <div className={styles.card}>
            <i className="fas fa-message"></i>
            <h1>Action Alerts</h1>
            <div className={styles.titleBg}><div/></div>
            <p>You will not miss any action eferred to your account. We will notify you on the selected platforms at real-time.</p>
          </div>
          </div>

          <img src="/blur.png" className={styles.blur}/>

        </section>

        <section className={styles.sectionTwo}>
          <h1>Top Cryptocurrencies</h1>
          <img src="/graph_vector.png" className={styles.graphVector}/>
          <img src="/purple_blur.png" className={styles.purpleBlur}/>
        </section>
      </div>


      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </>
  )
}