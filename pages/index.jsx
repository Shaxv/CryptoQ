import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from "react"
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

export default function Home() {
  const { isLoading, user, error } = useUser()
  
  return (
    <div className={styles.container}>
      <Head>
        <title>CryptoQ</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

    </div>
  )
}
