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

const removeHttp = (url) => {
  if (url.startsWith("https://")) return url.slice(12);
  return url.slice(11);
};

export default function Coin() {
  const { currency, symbol } = CryptoState();
  const router = useRouter();
  const { id } = router.query;

  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin)
    return (
      <div className="flex items-center pt-24">
        <progress className="progress w-full m-3 max-w-lg" />
      </div>
    );

  return (
    <div>
      <Head>
        <title>CryptoQ - Tracker</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main className="wrapper pt-32">
        {loading ? (
          <div className="flex flex-col items-center text-ceter">
            <progress className="progress w-full m-3 max-w-lg" />
            <progress className="progress w-full m-3 max-w-lg" />
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <Image
                src={coin["image"]["small"]}
                height={"50px"}
                width={"50px"}
              />
              <h1 className="ml-4 mr-3 text-xl">
                <span className="font-extrabold">{coin["name"]}</span>{" "}
                <span className="text-gray">
                  ({coin["symbol"].toUpperCase()})
                </span>
              </h1>
              <i className="far fa-star" />
            </div>
            <div className="flex items-center pl-3 mt-4">
              <h1 className="font-semibold text-2xl mr-3">
                {symbol}
                {coin["market_data"]["current_price"][
                  currency.toLowerCase()
                ].toLocaleString()}
              </h1>
              <span
                className={`badge ${
                  coin["market_data"]["price_change_percentage_24h"] < 0
                    ? "badge-error"
                    : "badge-success"
                }`}
              >
                {coin["market_data"]["price_change_percentage_24h"].toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between max-w-[225px]">
              <div className="text-gray tracking-wider">Website</div>
              <a
                href={coin["links"]["homepage"][0]}
                className="badge badge-md badge-black"
              >
                {removeHttp(coin["links"]["homepage"][0])}
              </a>
            </div>

            <div className="flex justify-between max-w-[225px] mt-5">
              <div className="text-gray tracking-wider">Community</div>

              {coin["links"]["subreddit_url"] ? (
                <a
                  href={coin["links"]["subreddit_url"]}
                  className="badge badge-md badge-black"
                >
                  <i className="fab fa-reddit-alien mr-1" />
                  Reddit
                </a>
              ) : (
                ""
              )}

              {coin["links"]["repos_url"]["github"][0] ? (
                <a
                  href={coin["links"]["repos_url"]["github"][0]}
                  className="badge badge-md badge-black"
                >
                  <i className="fab fa-github mr-1" />
                  Github
                </a>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-between max-w-[225px]">
              <div className="text-gray tracking-wider">Explorers</div>
              <a
                href={coin["links"]["blockchain_site"][0]}
                className="badge badge-md badge-black"
              >
                {coin["links"]["blockchain_site"][0]}
              </a>
            </div>
            {/* name={coin["name"]}
            <Image
              src={coin["image"]["large"]}
              height={100}
              width={100}
              objectFit="contain"
            />
            <h1>symbol={coin["symbol"]}</h1>
            <h1>
              marketcap=
              {coin["market_data"]["market_cap"][currency.toLowerCase()]}
            </h1>
            <h1>
              price=
              {coin["market_data"]["current_price"][currency.toLowerCase()]}
            </h1>
            <h1>
              priceChange={coin["market_data"]["price_change_percentage_24h"]}
            </h1>
            <h1>
              volume=
              {coin["market_data"]["total_volume"][currency.toLowerCase()]}
            </h1> */}
          </>
        )}
      </main>
    </div>
  );
}
