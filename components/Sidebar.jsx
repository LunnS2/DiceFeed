"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-black text-white flex flex-col justify-between p-5">
      <div>
        <Link href="/" className="flex items-center gap-2 mb-10">
          <Image
            src="public/assets/icons/test-icon"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="text-xl font-semibold">DiceFeed</p>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col gap-5">
          {session?.user ? (
            <>
              <Link
                href="/create-post"
                className="bg-white text-black py-2 px-4 rounded hover:bg-slate-200 transition"
              >
                Create Post
              </Link>
              <Link
                href="/profile"
                className="bg-white text-black py-2 px-4 rounded hover:bg-slate-200 transition"
              >
                My Profile
              </Link>
              <Link
                href="/"
                className="bg-white text-black py-2 px-4 rounded hover:bg-slate-200 transition"
              >
                Feed
              </Link>
            </>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Sign in with {provider.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* User Profile & Sign Out (if logged in) */}
      {session?.user && (
        <div className="flex flex-col items-center">
          <Image
            src={session?.user.image}
            width={50}
            height={50}
            className="rounded-full mb-4 cursor-pointer"
            alt="profile"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />
          <button
            type="button"
            onClick={signOut}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full"
          >
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
