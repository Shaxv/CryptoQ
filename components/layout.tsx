import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <main className="bg-secondary">
      <Navbar />
      {children}
    </main>
  );
}
