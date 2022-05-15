import Link from "next/link";
import Image from "next/image";
import { useUser } from "@supabase/supabase-auth-helpers/react";

const Navbar = () => {
  const { isLoading, user, error } = useUser();

  return (
    <>
      <div className="navbar container mx-auto px-4 z-10 absolute left-0 right-0 top-2 bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Live Tracker</a>
              </li>
              <li>
                <a>Paper Trading</a>
              </li>
              <li>
                <a>DeFi Wallet</a>
              </li>
            </ul>
          </div>
          <Link href="/">
            <a className="mx-4">
              <Image
                src="/white_logo.png"
                height={30}
                width={165}
                alt="CryptoQ"
              />
            </a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/tracker">Live Tracker</Link>
            </li>
            <li>
              <a>Paper Trading</a>
            </li>
            <li>
              <a>DeFi Wallet</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!isLoading ? (
            user ? (
              <Link href="/dashboard">
                <a className="btn btn-outline">Dashboard</a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className="btn btn-outline">Sign In</a>
              </Link>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
