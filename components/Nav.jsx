"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
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
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 items-center'>
        <Image
          src='/assets/images/test-icon.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='text-lg font-semibold'>DiceFeed</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='bg-black text-white px-4 py-2 rounded'>
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className='border border-black px-4 py-2 rounded'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='bg-black text-white px-4 py-2 rounded'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='flex sm:hidden relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2'>
                <Link
                  href='/profile'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='bg-black text-white px-4 py-2 rounded'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
