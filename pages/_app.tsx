import '../styles/index.css'
import { UserProvider } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import Layout from "../components/layout"
import { Toaster } from 'react-hot-toast'
import "@fortawesome/fontawesome-free/css/all.min.css"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Toaster toastOptions={{
        className: "alert",
        duration: 3000,
        // error: { iconTheme: { primary: "#FF7575" }, },
        // success: { iconTheme: { primary: "#78FF9E" } }
      }}/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp
