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
          <h1 className={styles.title}>Top Cryptocurrencies</h1>

          <div className={styles.mainGrid}>
            
            {/* Bitcoin */}
            <div className="row-span-3 col-span-1">
              <div className={styles.BTC}>
              <div className={styles.cryptoBorder}>
              <div className={styles.cryptoContainer}>
                <h1>Bitcoin</h1>
                <div className={styles.titleBg}><div/></div>
                <div className={styles.cryptoPrice}>
                  <div className="text-success">
                    <i className="fas fa-angle-up mr-2 -mt-[3px]"/>
                    USD 47,958.8 (+2.4%)
                  </div>
                </div>
                <p className="ml-0 mt-3 mb-8 md:mb-0 md:ml-52 md:-mt-16 xl:mt-0 xl:ml-0">Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.
                Bitcoin is a peer-to-peer....</p>
                <div className={styles.learnMore}>
                  <div>Learn More...</div>
                </div>
              </div>
              </div>
              </div>
            </div>

            {/* Ethereum */}
            <div className="col-span-2">
              <div className={styles.ETH}>
              <div className={styles.cryptoBorder}>
              <div className={styles.cryptoContainer}>
                <h1>Ethereum</h1>
                <div className={styles.titleBg}><div/></div>
                <div className={styles.cryptoPrice}>
                  <div className="text-error">
                    <i className="fas fa-angle-down mr-2 -mt-[3px]"/>
                    USD 3402.58 (-1.8%)
                  </div>
                </div>
                <p className="ml-0 mt-3 mb-8 md:ml-52 md:-mt-16 md:mb-0"> Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether. ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.... </p>
                <div className={styles.learnMore}>
                  <div>Learn More...</div>
                </div>
              </div>
              </div>
              </div>
            </div>

            <div className='block xl:flex row-span-2 col-span-2 gap-12'>

            {/* Ripple */}
            <div className="grow">
              <div className={styles.XRP}>
              <div className={styles.cryptoBorder}>
              <div className={styles.cryptoContainer}>
                <h1>Ripple</h1>
                <div className={styles.titleBg}><div/></div>
                <div className={styles.cryptoPrice}>
                  <div className="text-success">
                    <i className="fas fa-angle-up mr-2 -mt-[3px]"/>
                    USD 0.586 (+1.8%)
                  </div>
                </div>
                <div className={styles.learnMore}>
                  <div>Learn More...</div>
                </div>
              </div>
              </div>
              </div>
            </div>

            {/* Avalanche */}
            <div className="grow">
              <div className={styles.AVAX}>
              <div className={styles.cryptoBorder}>
              <div className={styles.cryptoContainer}>
                <h1>Avalanche</h1>
                <div className={styles.titleBg}><div/></div>
                <div className={styles.cryptoPrice}>
                  <div className="text-success">
                    <i className="fas fa-angle-up mr-2 -mt-[3px]"/>
                    USD 136.8 (+3.4%)
                  </div>
                </div>
                <div className={styles.learnMore}>
                  <div>Learn More...</div>
                </div>
              </div>
              </div>
              </div>
            </div>

            </div>


          </div>

          <img src="/blur.png" className={styles.blur}/>
          <img src="/graph_vector.png" className={styles.graphVector}/>
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