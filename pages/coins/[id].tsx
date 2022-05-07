import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Tracker.module.scss";
import { CryptoState } from "../../lib/MainContext";
import { SingleCoin } from "../../lib/CoinGecko";

export default function Coin() {
  const { currency, symbol } = CryptoState();
  const router = useRouter();
  const { id } = router.query;

  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin)
    return <progress className="progress w-full m-3 max-w-lg"></progress>;

  return (
    <div>
      <Head>
        <title>CryptoQ - Tracker</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main className="pt-24 flex flex-col items-center text-center">
        <h1>{coin?.name}</h1>

        {loading ? (
          <>
            <progress className="progress w-full m-3 max-w-lg"></progress>
            <progress className="progress w-full m-3 max-w-lg"></progress>
          </>
        ) : (
          <h1>Igen</h1>
        )}
      </main>
    </div>
  );
}
