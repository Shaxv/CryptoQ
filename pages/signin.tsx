import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react"
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function SignIn() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const handleSignIn = async () => {
        const { user, error } = await supabaseClient.auth.signIn({
            email: email,
            password: password,
        })
        if (error) {
            setError(error.message)
            console.log(error)
        } else {
            toast.success("Signed In!")
            router.push("/")
        }
    }

    return (
    <div>
      <Head>
        <title>CryptoQ - Sign In</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main>

        <div className='mt-10'>

          <div>
            <h2>Email</h2>
            <input type="email" onChange={e => setEmail(e.target.value)}/>
          </div>
        
          <div>
            <h2>Password</h2>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </div>

          <h1 className="text-error">{error}</h1>

          <button onClick={() => handleSignIn()}>
            <p>SIGN IN</p>
          </button>

          <Link href='/signup'>
            <a>Don't have an account?</a>
          </Link>
        
        </div>

      </main>
    </div>
  )
}
