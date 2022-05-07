import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import styles from "../styles/Home.module.scss";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Home() {
  const { isLoading, user, error } = useUser();

  return (
    <>
      <Head>
        <title>CryptoQ</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <header className={styles.header}>
        <h1>Fast, Efficient {"&"} Secure</h1>
        <h1 className={styles.gradetitle}>Platform to Invest in Crypto</h1>
        <span>
          CryptoQ is an innovative solution for all crypto enthusiasts.
        </span>
        <div className="flex justify-center mt-12">
          <button className="btn btn-info mr-2">Try for free {">"}</button>
          <button className="btn btn-outline ml-2">Contact Us</button>
        </div>
      </header>

      <div className="wrapper">
        <section className={styles.sectionOne}>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <i className="fas fa-sliders"></i>
              <h1>Customizable</h1>
              <div className={styles.titleBg}>
                <div />
              </div>
              <p>
                Enjoy your own preferences at your will. You will able to
                customize your experience with our service. Every last bit.
              </p>
            </div>
          </div>

          <div className={styles.middleCard}>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <i className="fas fa-lock"></i>
                <h1>Strong Security</h1>
                <div className={styles.titleBg}>
                  <div />
                </div>
                <p>
                  Protection against DDoS attacks, full data encryption,
                  cryptocurrency cold storage, compliance. Alongside with two
                  factor authentication, automatic backups and so much more for
                  your own protection.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <i className="fas fa-message"></i>
              <h1>Action Alerts</h1>
              <div className={styles.titleBg}>
                <div />
              </div>
              <p>
                You will not miss any action eferred to your account. We will
                notify you on the selected platforms at real-time.
              </p>
            </div>
          </div>

          <img src="/blur.png" className={styles.blur} />
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
                    <div className={styles.titleBg}>
                      <div />
                    </div>
                    <div className={styles.cryptoPrice}>
                      <div className="text-success">
                        <i className="fas fa-angle-up mr-2 -mt-[3px]" />
                        USD 47,958.8 (+2.4%)
                      </div>
                    </div>
                    <p className="ml-0 mt-3 mb-8 md:mb-0 md:ml-52 md:-mt-16 xl:mt-0 xl:ml-0">
                      Bitcoin is a decentralized cryptocurrency originally
                      described in a 2008 whitepaper by a person, or group of
                      people, using the alias Satoshi Nakamoto. It was launched
                      soon after, in January 2009. Bitcoin is a peer-to-peer....
                    </p>
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
                    <div className={styles.titleBg}>
                      <div />
                    </div>
                    <div className={styles.cryptoPrice}>
                      <div className="text-error">
                        <i className="fas fa-angle-down mr-2 -mt-[3px]" />
                        USD 3402.58 (-1.8%)
                      </div>
                    </div>
                    <p className="ml-0 mt-3 mb-8 md:ml-52 md:-mt-16 md:mb-0">
                      {" "}
                      Ethereum is a decentralized open-source blockchain system
                      that features its own cryptocurrency, Ether. ETH works as
                      a platform for numerous other cryptocurrencies, as well as
                      for the execution of decentralized smart contracts....{" "}
                    </p>
                    <div className={styles.learnMore}>
                      <div>Learn More...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block xl:flex row-span-2 col-span-2 gap-12">
              {/* Ripple */}
              <div className="grow">
                <div className={styles.XRP}>
                  <div className={styles.cryptoBorder}>
                    <div className={styles.cryptoContainer}>
                      <h1>Ripple</h1>
                      <div className={styles.titleBg}>
                        <div />
                      </div>
                      <div className={styles.cryptoPrice}>
                        <div className="text-success">
                          <i className="fas fa-angle-up mr-2 -mt-[3px]" />
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
                      <div className={styles.titleBg}>
                        <div />
                      </div>
                      <div className={styles.cryptoPrice}>
                        <div className="text-success">
                          <i className="fas fa-angle-up mr-2 -mt-[3px]" />
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

          <img src="/blur.png" className={styles.blur} />
          <img src="/graph_vector.png" className={styles.graphVector} />
        </section>

        <section className={styles.sectionThree}>
          <h1 className={styles.title}>Brought to you by</h1>
          <div className="flex">
            <div className={styles.imageContainer}>
              <Image
                src="/next.png"
                height="100%"
                width="100%"
                objectFit="contain"
                alt=""
              />
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/vercel.png"
                height="100%"
                width="100%"
                objectFit="contain"
                alt=""
              />
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/supabase.png"
                height="100%"
                width="100%"
                objectFit="contain"
                alt=""
              />
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/github.png"
                height="22px"
                width="62px"
                objectFit="contain"
                alt=""
              />
            </div>
          </div>
        </section>

        <section className={styles.sectionFour}>
          <h1 className={styles.title}>No fees. No limits. No holdback.</h1>
          <span>Sign Up Now and Do as you Pleases.</span>
          <div className="flex justify-center mt-12">
            <button className="btn btn-outline btn-gradient btn-gradient-primary mr-2">
              <div>Get Started</div>
            </button>
            <button className="btn btn-info ml-2">Features</button>
          </div>
        </section>
      </div>

      <footer className="footer footer-center p-10 bg-primary text-primary-content mt-32">
        <div>
          <Image
            src="/logo.png"
            width="200px"
            height="75px"
            objectFit="contain"
          />
          <p className="font-bold">Providing crypto solutions since 2017</p>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
