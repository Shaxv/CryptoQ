import Navbar from "./navBar"

export default function Layout({ children }) {
    return (
        <main className="bg-secondary">
            <Navbar/>
            {children}
        </main>
    )
}