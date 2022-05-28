import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import axios from "axios";
import { isValidElement, useEffect, useState } from "react";
import styles from "../../styles/Tracker.module.scss";
import { CoinList } from "../../lib/CoinGecko";
import { CryptoState } from "../../lib/MainContext";

export default function Exchanges() {
  const { currency, symbol } = CryptoState();
  const router = useRouter();

  const { isLoading, user } = useUser();

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const fetchExchanges = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges?per_page=50&page=1`
    );
    setExchanges(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExchanges();
  }, [currency]);

  return (
    <div>
      <Head>
        <title>CryptoQ - Tracker</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main className="flex flex-col items-center text-center pt-24">
        <div className="max-w-xl">
          <h1 className="text-4xl tracking-wider mb-3">Best Crypto Tracker</h1>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </span>
        </div>
        <div className="max-w-4xl">
          <div className="flex my-6">
            <Link href="/tracker/coins">
              <button className="btn btn-ghost">Cryptocurrencies</button>
            </Link>
            <Link href="/tracker/exchanges">
              <button className="btn btn-ghost">Exchanges</button>
            </Link>
            <Link href="/tracker/favorites">
              <button className="btn btn-ghost">Favorites</button>
            </Link>
          </div>
          <div className="flex my-2 px-6">
            <div className={`${styles.id}`}>#</div>
            <div className={`${styles.name}`}>Name</div>
            <div className={`${styles.price}`}>24h Volume</div>
            <div className={`${styles.day}`}>Year</div>
            <div className={`${styles.marketCap}`}>Country</div>
          </div>
          <div className="w-full overflow-x-auto border border-neutral border-opacity-25 rounded-lg">
            {loading ? (
              isLoading ? (
                <>
                  <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                  <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                  <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                </>
              ) : (
                <>
                  <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                  <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                  <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                </>
              )
            ) : (
              exchanges
                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                .map((exchange) => {
                  return (
                    <Link href={exchange.url}>
                      <a target="_blank">
                        <div className={styles.coinContainer}>
                          <div className={`${styles.id}`}>
                            {exchange.trust_score_rank}
                          </div>
                          <div className={`${styles.name}`}>
                            <Image
                              src={exchange.image}
                              height={30}
                              width={30}
                              objectFit="fill"
                            />
                            <span className="ml-2">{exchange.name}</span>
                          </div>
                          <div className={`${styles.price}`}>
                            {/*  */}
                            {/* Convert to selected Currency!! */}
                            {/*  */}
                            BTC
                            {exchange.trade_volume_24h_btc.toLocaleString()}
                          </div>
                          <div className={`${styles.day}`}>
                            {exchange.year_established
                              ? exchange.year_established
                              : "-"}
                          </div>
                          <div className={`${styles.marketCap}`}>
                            {exchange.country ? exchange.country : "-"}
                          </div>
                        </div>
                      </a>
                    </Link>
                  );
                })
            )}
          </div>
          <button className="btn btn-primary" onClick={() => setPerPage(10)}>
            10
          </button>{" "}
          <button className="btn btn-primary" onClick={() => setPerPage(20)}>
            20
          </button>
          <div className="flex btn-group justify-center mt-6">
            <button
              className="btn btn-primary"
              disabled={page == 1 ? true : false}
              onClick={() => setPage(page - 1)}
            >
              <i className="fas fa-angle-left" />
            </button>
            <button className="btn btn-primary no-animation">{page}</button>
            <button
              className="btn btn-primary"
              disabled={page * perPage - exchanges.length >= 0 ? true : false}
              onClick={() => setPage(page + 1)}
            >
              <i className="fas fa-angle-right" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
