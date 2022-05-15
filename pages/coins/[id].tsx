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
import { SingleCoin, HistoricalChart } from "../../lib/CoinGecko";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const removeHttp = (url) => {
  if (url.startsWith("https://"))
    return removeWWW(url.slice("https://".length));
  if (url.startsWith("http://")) return removeWWW(url.slice("http://".length));
  return removeWWW(url);
};
const removeWWW = (url) => {
  if (url.startsWith("www.")) return url.slice("www.".length);
  return url;
};

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

export default function Coin() {
  const { currency, symbol } = CryptoState();
  const router = useRouter();
  const { id } = router.query;

  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(30);
  const [flag, setFlag] = useState(false);

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);
  useEffect(() => {
    fetchHistoricData();
  }, [days]);

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
                {removeHttp(coin["links"]["blockchain_site"][0])}
              </a>
            </div>

            {!historicData || flag === false ? (
              <progress className="progress w-full m-10 max-w-lg mx-auto" />
            ) : (
              <>
                <Line
                  data={{
                    labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#6366F1",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      tooltip: {
                        displayColors: false,
                        titleFont: { size: 16 },
                        bodyFont: { size: 14 },
                        padding: { bottom: 10, top: 10, right: 10, left: 10 },
                        callbacks: {
                          label: (tooltipItem, data) => {
                            return `${symbol} ${tooltipItem.formattedValue}`;
                          },
                        },
                      },
                      legend: false,
                    },
                    scales: {
                      x: {
                        ticks: {
                          callback: function (val, index) {
                            return index % 4 === 0
                              ? this.getLabelForValue(val)
                              : "";
                          },
                          align: "center",
                          minRotation: 0,
                          maxRotation: 30,
                        },
                      },
                    },
                    elements: {
                      point: {
                        radius: 1,
                      },
                      line: {
                        tension: 0.2,
                      },
                    },
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() => setDays(1)}
                    className="btn btn-primary"
                  >
                    1D
                  </button>
                  <button
                    onClick={() => setDays(7)}
                    className="btn btn-primary"
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setDays(30)}
                    className="btn btn-primary"
                  >
                    30D
                  </button>
                  <button
                    onClick={() => setDays(90)}
                    className="btn btn-primary"
                  >
                    3M
                  </button>
                  <button
                    onClick={() => setDays(365)}
                    className="btn btn-primary"
                  >
                    1Y
                  </button>
                  <button
                    onClick={() => setDays(1825)}
                    className="btn btn-primary"
                  >
                    5Y
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
