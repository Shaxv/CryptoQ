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

  const { isLoading, user } = useUser();
  const [favorites, setFavorites] = useState([]);

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    if (!isLoading) {
      const response = supabaseClient
        .from<any>("favorites")
        .select("favorites")
        .match({ id: user.id });
      response.then((res) => {
        setFavorites(res.data.map((item) => item.favorites));
      });
    }
  }, []);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

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

      <main className="h-screen w-screen flex flex-col justify-center items-center text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl tracking-wider mb-3">Best Crypto Tracker</h1>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </span>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="input input-primary mt-10 mb-5"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="max-w-4xl">
          <div className="flex my-2 px-6">
            <div className={`${styles.id} pl-6`}>#</div>
            <div className={`${styles.name}`}>Name</div>
            <div className={`${styles.price}`}>Price</div>
            <div className={`${styles.day}`}>24h %</div>
            <div className={`${styles.marketCap}`}>Market Cap</div>
          </div>
          <div className="w-full overflow-x-auto border border-neutral border-opacity-25 rounded-lg">
            {loading ? (
              <>
                <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
                <progress className="progress w-full m-4 mx-6 max-w-xl"></progress>
              </>
            ) : (
              filteredCoins
                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                .map((coin) => {
                  const profit = coin.price_change_percentage_24h > 0;
                  let isFavorite = false;
                  favorites.forEach((item) => {
                    item == coin.id
                      ? (isFavorite = true)
                      : (isFavorite = false);
                  });
                  return (
                    <Link
                      href={{
                        pathname: `/coins/${coin.id}`,
                        query: { id: `${coin.id}` },
                      }}
                      as={`/coins/${coin.id}`}
                    >
                      <div className={styles.coinContainer}>
                        <div className={`${styles.id}`}>
                          <i
                            className={`${
                              isFavorite ? "fas" : "far"
                            } fa-star text-warning mr-2`}
                            onMouseEnter={(e) => {
                              e.target.classList.remove("far");
                              e.target.classList.add("fas");
                            }}
                            onMouseLeave={(e) => {
                              e.target.classList.remove("fas");
                              e.target.classList.add("far");
                            }}
                          />
                          <i
                            className="far fa-star text-warning mr-2"
                            onMouseEnter={(e) => {
                              e.target.classList.remove("far");
                              e.target.classList.add("fas");
                            }}
                            onMouseLeave={(e) => {
                              e.target.classList.remove("fas");
                              e.target.classList.add("far");
                            }}
                          />
                          {coin.market_cap_rank}
                        </div>
                        <div className={`${styles.name}`}>
                          <Image
                            src={coin.image}
                            height={30}
                            width={30}
                            objectFit="fill"
                          />
                          <span className="ml-2">{coin.name}</span>
                          <span className="ml-1 hidden md:block text-gray tracking-wide text-2xs">
                            • ({coin.symbol.toUpperCase()})
                          </span>
                        </div>
                        <div className={`${styles.price}`}>
                          {symbol}
                          {coin.current_price.toLocaleString()}
                        </div>
                        <div className={`${styles.day}`}>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <div className="bg-success bg-opacity-20 w-max p-1 rounded-md">
                              <i className="fas fa-angle-up text-success" />{" "}
                              <span className="text-success">
                                {coin.price_change_percentage_24h.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <div className="bg-error bg-opacity-20 w-max p-1 rounded-md">
                              <i className="fas fa-angle-down text-error" />{" "}
                              <span className="text-error">
                                {coin.price_change_percentage_24h
                                  .toFixed(2)
                                  .slice(1)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={`${styles.marketCap}`}>
                          {symbol}
                          {coin.market_cap.toLocaleString()}
                        </div>
                      </div>
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
              disabled={
                page * perPage - filteredCoins.length >= 0 ? true : false
              }
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
