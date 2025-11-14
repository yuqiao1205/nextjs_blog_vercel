import Link from 'next/link';
import Links from './links/Links';
import './navbar.css';
import { auth } from '@/lib/auth';

const Navbar = async() => {

    const session = await auth();
    console.log("Session:", session);

    return (
        <div className="container-navbar">
            <Link href="/" className="logo">Logo</Link>
            <div>
               <Links session={session} />
            </div>
        </div>
    );
};

export default Navbar;