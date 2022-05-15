import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function SignIn() {
  const router = useRouter();

  const { isLoading, user } = useUser();
  if (user) router.push("/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignIn = async () => {
    const { user, error } = await supabaseClient.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      setError(error.message);
      console.log(error);
    } else {
      toast.success("Signed In!");
      router.push("/");
    }
  };

  return (
    <div>
      <Head>
        <title>CryptoQ - Sign In</title>
        <meta name="description" content="CryptoQ" />
        <link rel="icon" href="/small_logo.png" />
      </Head>

      <main className="w-screen h-screen">
        <div className="flex flex-col justify-center w-full h-full p-24">
          <div className="form-control mx-auto mt-3 w-full max-w-xs">
            <label className="label">
              <span className="label-text font-black">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Type here..."
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mx-auto mt-3 w-full max-w-xs">
            <label className="label">
              <span className="label-text font-black">Password:</span>
            </label>
            <input
              type="password"
              placeholder="Type here..."
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <h1 className="text-error text-center mt-6 -mb-4">{error}</h1>

          <button
            className="btn btn-primary w-full max-w-xs mt-10 mx-auto"
            onClick={() => handleSignIn()}
          >
            <p>SIGN IN</p>
          </button>

          <Link href="/signup">
            <a className="text-center m-4">Don't have account?</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
