// until 1 hr 14 min

'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);

    const [toggleDropDown, setToggleDropDown] = useState(false);


    useEffect(()=>{
        const setProviders = async ()=>{
            const response = await getProviders();
            setProviders(response);
        }

        setProviders();
    }, []);

  return (
        <nav className="flex flex-between pt-3 w-full mb-16">
            <Link href="/" className="flex gap-2 flex-center">
                <Image alt="promptopia logo" width={30} height={30} className="object-contain" src="/assets/images/logo.svg" />
                <p className="logo-text">Promptopia</p>
            </Link>
            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5 ml-10">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>
                        <button className="outline_btn" type="button" onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href="/profile" className="">
                            <Image src="/assets/images/logo.svg" width={37} height={37} alt="profile image" className="rounded-full" />
                        </Link>
                    </div>
                ): (
                    <>
                        {
                            providers && 
                                Object.values(providers).map((provider)=>(
                                    <button type="button" key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
                                        Sign In
                                    </button>
                                ))
                        }
                    </>
                )}
            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image src="/assets/images/logo.svg" width={37} height={37} alt="profile image" className="rounded-full" onClick={()=> setToggleDropDown((prev)=> !prev)} />
                        {
                            toggleDropDown && (
                                <div className="dropdown">
                                    <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                                        My Profile
                                    </Link>
                                    <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                                        Create Prompt
                                    </Link>

                                    <button type="button" onClick={()=>{setToggleDropDown(false); signOut();}} className="mt-5 w-full black_btn">
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                    
                    </div>
                ): (
                    <>
                    {
                            providers && 
                                Object.values(providers).map((provider)=>(
                                    <button type="button" key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
                                        Sign In
                                    </button>
                                ))
                        }
                    </>
                )}
            </div>
        </nav>
  )
}

export default Nav
