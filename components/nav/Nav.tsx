import React from "react";
import LogoNav from "../logonav/LogoNav";

export const Nav = () => {
  return(
    <nav className="flex border-b border-zinc-100 dark:border-zinc-800 py-2 px-4 items-center dark:bg-gradient-to-b from-[#4E160E] to-zinc-950">
      <div className="mr-auto">
      <LogoNav />
      </div>
      <ul>
        <li><button className="text-sm">Sign Out</button></li>
      </ul>
    </nav>

  )
}

export default Nav