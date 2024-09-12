'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
  return (
    <div>
        <nav className="flex-between pt-3 w-full mb-16">
            <Link href="/" className="flex gap-2 flex-center">
                <Image alt="promptopia logo" width={30} height={30} className="object-contain" src="/assets/images/logo.svg" />
            </Link>
        </nav>
    </div>
  )
}

export default Nav
