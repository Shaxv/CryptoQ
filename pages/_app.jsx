import '../styles/index.css'
import Layout from '../components/layout'
import { UserProvider } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp
