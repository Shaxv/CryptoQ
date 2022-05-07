import { useUser } from "@supabase/supabase-auth-helpers/react";
import Link from "next/link";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { isLoading, user, error } = useUser();

  return (
    <div className="mt-[100px]">
      <h1>{JSON.stringify(user, null, 2)}</h1>
      <Link href="/api/auth/logout">
        <a
          className="btn btn-outline btn-error"
          onClick={() => toast.success("Signed Out!")}
        >
          Logout
        </a>
      </Link>
    </div>
  );
};

export default Dashboard;
