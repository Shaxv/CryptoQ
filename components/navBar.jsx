import Link from "next/link"
import Image from 'next/image'
import { useUser } from "@supabase/supabase-auth-helpers/react"

const Navbar = ({ children }) => {
    const { isLoading, user, error } = useUser()

    return (
    <>
        <div className="navbar container mx-auto px-4">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Features</a></li>
                    <li><a>Company</a></li>
                    <li><a>Contact</a></li>
                </ul>
                </div>
                <Link href="/">
                    <a className="mx-4">
                        <Image
                            src="/white_logo.png"
                            height={35}
                            width={175}
                        />
                    </a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">                
                    <li><a>Features</a></li>
                    <li><a>Company</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                { !isLoading ? user ? (
                    <Link href="/api/auth/logout"><a className="btn btn-outline">Logout</a></Link>
                    ) : (
                    <Link href="/signin"><a className="btn btn-outline">Sign In</a></Link>) : ""}
            </div>
        </div>
    </>
    )
}

export default Navbar