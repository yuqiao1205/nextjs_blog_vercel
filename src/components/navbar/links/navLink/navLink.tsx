"use client"
import Link from 'next/link';
import './navLink.css';
import { usePathname } from 'next/navigation';
import { use } from 'react';

const NavLink = ({ item }: { item: { path: string; title: string } }) => {
 
    const pathName = usePathname();
    return (
        <Link href={item.path} className={`navlink ${pathName === item.path && 'active'}`}>
            {item.title}
        </Link>
    );
};

export default NavLink;