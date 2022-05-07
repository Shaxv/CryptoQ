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
import { CoinList } from "../lib/CoinGecko";
import { CryptoState } from "../lib/MainContext";

export default function SignUp() {
  const { currency, symbol } = CryptoState();
  const router = useRouter();

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Head>
        <title>CryptoQ - Tracker</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main className="pt-24 flex flex-col items-center text-center">
        <h1>CryptoQ Tracker</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {loading ? (
          <>
            <progress className="progress w-full m-3 max-w-lg"></progress>
            <progress className="progress w-full m-3 max-w-lg"></progress>
          </>
        ) : (
          filteredCoins
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((coin) => {
              const profit = coin.price_change_percentage_24h > 0;
              return (
                <div
                  onClick={() => router.push(`/coins/${coin.id}`)}
                  className="cursor-pointer"
                >
                  <h1 className="m-4 bg-primary">{coin.name}</h1>
                </div>
              );
            })
        )}

        <div className="flex btn-group">
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
            disabled={page * 10 - filteredCoins.length >= 0 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            <i className="fas fa-angle-right" />
          </button>
        </div>
      </main>
    </div>
  );
}

const Coin = ({
  name,
  image,
  symbol,
  current_price,
  total_volume,
  price_change_percentage_24h,
  market_cap,
}) => {
  return (
    <div className={styles.coin}>
      <div className="flex">
        <div className="coin__coin">
          <img src={image} alt="coin" />
          <h1>{name}</h1>
          <p className="coin__symbol">{symbol}</p>
        </div>
        <div className="coin__data">
          <p className="coin__price">${current_price}</p>
          <p className="coin__volume">${total_volume.toLocaleString()}</p>
          <p
            className={`${
              price_change_percentage_24h < 0 ? "text-error" : "text-success"
            }`}
          >
            {price_change_percentage_24h.toFixed(2)}%
          </p>
          <p className="coin__marketcap">
            Mkt Cap: ${market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// export default function CoinsTable() {

//               <TableBody>
//                 {handleSearch()
//                   .slice((page - 1) * 10, (page - 1) * 10 + 10)
//                   .map((row) => {
//                     const profit = row.price_change_percentage_24h > 0;
//                     return (
//                       <TableRow
//                         onClick={() => history.push(`/coins/${row.id}`)}
//                         className={classes.row}
//                         key={row.name}
//                       >
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           style={{
//                             display: "flex",
//                             gap: 15,
//                           }}
//                         >
//                           <img
//                             src={row?.image}
//                             alt={row.name}
//                             height="50"
//                             style={{ marginBottom: 10 }}
//                           />
//                           <div
//                             style={{ display: "flex", flexDirection: "column" }}
//                           >
//                             <span
//                               style={{
//                                 textTransform: "uppercase",
//                                 fontSize: 22,
//                               }}
//                             >
//                               {row.symbol}
//                             </span>
//                             <span style={{ color: "darkgrey" }}>
//                               {row.name}
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell align="right">
//                           {symbol}{" "}
//                           {numberWithCommas(row.current_price.toFixed(2))}
//                         </TableCell>
//                         <TableCell
//                           align="right"
//                           style={{
//                             color: profit > 0 ? "rgb(14, 203, 129)" : "red",
//                             fontWeight: 500,
//                           }}
//                         >
//                           {profit && "+"}
//                           {row.price_change_percentage_24h.toFixed(2)}%
//                         </TableCell>
//                         <TableCell align="right">
//                           {symbol}{" "}
//                           {numberWithCommas(
//                             row.market_cap.toString().slice(0, -6)
//                           )}
//                           M
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>

//         {/* Comes from @material-ui/lab */}
//         <Pagination
//           count={(handleSearch()?.length / 10).toFixed(0)}
//           style={{
//             padding: 20,
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//           classes={{ ul: classes.pagination }}
//           onChange={(_, value) => {
//             setPage(value);
//             window.scroll(0, 450);
//           }}
//         />
//       </Container>
//     </ThemeProvider>
//   );
// }
