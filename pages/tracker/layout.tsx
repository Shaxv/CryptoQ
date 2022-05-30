// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
// import Router, { useRouter } from "next/router";
// import toast from "react-hot-toast";
// import { useUser } from "@supabase/supabase-auth-helpers/react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import styles from "../../styles/Tracker.module.scss";
// import { CoinList } from "../../lib/CoinGecko";
// import { CryptoState } from "../../lib/MainContext";

// export default function Tracker({ Component, pageProps }) {
//   const { currency, symbol } = CryptoState();
//   const router = useRouter();

//   const { isLoading, user } = useUser();

//   const [total, setTotal] = useState([]);
//   const [totalLoading, setTotalLoading] = useState(true);

//   const fetchTotal = async () => {
//     setTotalLoading(true);
//     const { data } = await axios.get("https://api.coingecko.com/api/v3/global");
//     setTotal(data.data);
//     setTotalLoading(false);
//   };

//   useEffect(() => {
//     fetchTotal();
//   }, []);

//   return (
//     <div>
//       <main className="flex flex-col items-center text-center pt-24 min-h-screen">
//         <div className="max-w-xl">
//           <h1 className="text-4xl tracking-wider mb-3">Best Crypto Tracker</h1>
//           <span>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//             ever since the 1500s.
//             <br />
//             <br />
//             There are{" "}
//             <b>{totalLoading ? "" : total["active_cryptocurrencies"]}</b>{" "}
//             Cryptocurrencies out there!
//           </span>
//         </div>
//         <div className="max-w-4xl">
//           {totalLoading ? (
//             ""
//           ) : (
//             <div className="flex w-full justify-center items-center gap-x-3 my-5">
//               <div
//                 className={`w-full text-left rounded-md py-2 px-4 ${
//                   total["market_cap_change_percentage_24h_usd"] >= 0
//                     ? "bg-success"
//                     : "bg-error"
//                 } bg-opacity-20`}
//               >
//                 <h2 className="mb-2 text-gray tracking-wide text-sm">
//                   Market Cap
//                 </h2>
//                 <div className="flex items-center gap-x-3">
//                   <span className="font-bold text-lg">
//                     {symbol}
//                     {total["total_market_cap"][
//                       currency.toLowerCase()
//                     ].toLocaleString()}
//                   </span>
//                   {total["market_cap_change_percentage_24h_usd"] >= 0 ? (
//                     <div className="bg-success bg-opacity-20 w-max p-1 rounded-md">
//                       <i className="fas fa-angle-up text-success" />{" "}
//                       <span className="text-success font-bold">
//                         {total["market_cap_change_percentage_24h_usd"].toFixed(
//                           2
//                         )}
//                       </span>
//                     </div>
//                   ) : (
//                     <div className="bg-error bg-opacity-20 w-max p-1 rounded-md">
//                       <i className="fas fa-angle-down text-error" />{" "}
//                       <span className="text-error font-bold">
//                         {total["market_cap_change_percentage_24h_usd"].toFixed(
//                           2
//                         )}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="w-full text-left rounded-md py-2 px-4 bg-gray bg-opacity-25">
//                 <h2 className="mb-2 text-gray tracking-wide text-sm">
//                   Volume 24h
//                 </h2>
//                 <span className="font-bold text-lg">
//                   {symbol}
//                   {total["total_volume"][
//                     currency.toLowerCase()
//                   ].toLocaleString()}
//                 </span>
//               </div>
//               <div className="w-full text-left rounded-md py-2 px-4 bg-orange bg-opacity-40">
//                 <h2 className="mb-2 text-gray tracking-wide text-sm">
//                   BTC Dominance
//                 </h2>
//                 <span className="font-bold text-lg">
//                   {total["market_cap_percentage"]["btc"].toFixed(2)}%
//                 </span>
//               </div>
//             </div>
//           )}
//           <div className="flex my-6">
//             <Link href="/tracker/coins">
//               <button className="btn btn-ghost">Cryptocurrencies</button>
//             </Link>
//             <Link href="/tracker/exchanges">
//               <button className="btn btn-ghost">Exchanges</button>
//             </Link>
//             <Link href="/tracker/favorites">
//               <button className="btn btn-ghost">Favorites</button>
//             </Link>
//           </div>
//           <div className="flex my-2 px-6">
//             <div className={`${styles.id} pl-6`}>#</div>
//             <div className={`${styles.name}`}>Name</div>
//             <div className={`${styles.price}`}>Price</div>
//             <div className={`${styles.day}`}>24h %</div>
//             <div className={`${styles.marketCap}`}>Market Cap</div>
//           </div>
//           <div className="w-full overflow-x-auto border border-neutral border-opacity-25 rounded-lg">
//             {isLoading ? (
//               <>
//                 <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
//                 <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
//                 <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
//               </>
//             ) : (
//               <Component {...pageProps} />
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
