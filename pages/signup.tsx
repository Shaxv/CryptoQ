import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react"
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useRouter } from 'next/router';

export default function SignUp() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const handleSignUp = async () => {
        const { user, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            setError(error.message)
        } else {
            router.push("/")
        }
    }

    return (
    <div>
      <Head>
        <title>CryptoQ - Sign Up</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>
      
      <main>
        
        <div>
          <div>
            <h2>Email</h2>
            <input type="email" onChange={e => setEmail(e.target.value)}/>
          </div>
        
          <div>
            <h2>Password</h2>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </div>

          <h1 className="text-error">{error}</h1>

          <button onClick={() => handleSignUp()}>
            <p>SIGN UP</p>
          </button>
        </div>

      </main>

    </div>
  )
}
