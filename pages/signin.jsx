import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react"
import styles from "../styles/Home.module.scss"
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import Link from 'next/link';

export default function SignIn() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async () => {
        const { user, error } = await supabaseClient.auth.signIn({
            email: email,
            password: password,
        })
        if (error) {
            throw error
        } else {
            console.log("success!")
            console.log(user)
        }
    }

    return (
    <div className={styles.container}>
      <Head>
        <title>CryptoQ - Sign In</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main className={styles.main}>

        <div className={styles.grid}>

          <div className={styles.card} >
            <h2>Email</h2>
            <input type="email" onChange={e => setEmail(e.target.value)}/>
          </div>
        
          <div className={styles.card} >
            <h2>Password</h2>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </div>

          <button className={styles.card} onClick={() => handleSignIn()}>
            <p>SIGN IN</p>
          </button>

          <Link href='/signup'>
            <a className={styles.card}>Don't have an account?</a>
          </Link>
        
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}