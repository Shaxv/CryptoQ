import Navbar from "./navBar"

export default function Layout({ children }) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}