import Image from "next/image"
import Link from "next/link"
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'

import {MdOutlineEvent} from 'react-icons/md'


export const Header = () => {
    return (
        <header className="transition
        duration-200 ease-in-out hover:bg-indigo-700 bg-indigo-600">
            <Link href='/'>
                <div className='flex justify-between items-center p-4 text-slate-50'>
                    <div>
                        <MdOutlineEvent size={60} />
                    </div>
                    <div className='text-5xl text-slate-50'>
                        E V E N T S
                    </div>
                    <div>
                        <SignedOut>
                            <Link href='/sign-in'>
                                Signed Out
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                userProfileMode='modal'
                                afterSignOutUrl='/'
                            />
                        </SignedIn>
                    </div>
                </div>
            </Link>
        </header>
    )
}