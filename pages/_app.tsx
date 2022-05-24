import "../styles/index.css";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Layout from "../components/layout";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import MainContext from "../lib/MainContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <MainContext>
        <Toaster
          toastOptions={{
            className: "alert",
            duration: 3000,
            position: "top-center",
            // error: { iconTheme: { primary: "#FF7575" }, },
            // success: { iconTheme: { primary: "#78FF9E" } }
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MainContext>
    </UserProvider>
  );
}

export default MyApp;
