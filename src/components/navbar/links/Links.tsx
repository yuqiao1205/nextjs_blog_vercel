"use client"

import Link from "next/link";
import "./links.css";
import NavLink from "./navLink/navLink";
import { use } from "react";
import { useState } from "react";
import { handleLogout } from "@/lib/action";
import { auth } from "@/lib/auth";

const links = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "About",
        path: "/about",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "Blog",
        path: "/blog",
    },
 
  ];

const Links = ({ session }: { session: any }) => {
  // responsive menu logic here
  const [open, setOpen] = useState(false);


  // temporary
  //take session as prop
  // const session = await auth();
  // const isAdmin = true;


  return (
    <div className="links-container">
    <div className="links">
      {links.map(link => (
        <NavLink item={link} key={link.title} />
      ))}
      {session?.user ? (
        <>
          {session.user?.isAdmin && (
            <NavLink item={{ title: "Admin", path: "/admin" }} />
          )}  
          <form action={handleLogout}>
            <button className="logout">
                      Logout
            </button>
          </form>
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
   <button className="menu-button" onClick={() => setOpen(prev => !prev)}>
  <img 
    src={open ? "/closeicon1.png" : "/hamburger04.png"} 
    alt="menu icon"
    className="menu-button"
  />
</button>
    {open && (
      <div className="responsive-menu">
        {links.map(link => (
          <NavLink item={link} key={link.title} />
        ))}

    </div>
    )}
  </div>
  );


};

export default Links;
