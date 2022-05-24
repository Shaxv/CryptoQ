import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@supabase/supabase-auth-helpers/react";

export default function SignUp() {
  const router = useRouter();

  const { isLoading, user } = useUser();
  if (user) router.push("/dashboard");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== password2) {
      setError("Passwords don't match!");
    } else {
      if (!username) setError("Username required!");
      else {
        const { user, error } = await supabaseClient.auth.signUp(
          {
            email: email,
            password: password,
          },
          {
            data: {
              username: username,
              balance: 1000000,
            },
          }
        );
        if (error) {
          setError(error.message);
        } else {
          const { data, error } = await supabaseClient
            .from("favorites")
            .insert([{ id: user.id, created_at: new Date() }]);
          if (error) {
            setError(error.message);
          } else {
            toast.success("Successful Sign Up!");
            router.push("/");
          }
        }
      }
    }
  };

  return (
    <div>
      <Head>
        <title>CryptoQ - Sign Up</title>
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
              <span className="label-text font-black">Username:</span>
            </label>
            <input
              type="text"
              placeholder="Type here..."
              className="input input-bordered w-full"
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="form-control mx-auto mt-3 w-full max-w-xs">
            <label className="label">
              <span className="label-text font-black">
                Password confirmation:
              </span>
            </label>
            <input
              type="password"
              placeholder="Type here..."
              className="input input-bordered w-full"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <h1 className="text-error">{error}</h1>

          <button
            className="btn btn-primary w-full max-w-xs mt-10 mx-auto"
            onClick={() => handleSignUp()}
          >
            <p>SIGN UP</p>
          </button>

          <Link href="/signin">
            <a className="text-center m-4">Already have an account?</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
