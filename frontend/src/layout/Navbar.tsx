import React, { useState } from "react";
import MobileNavbar from "../components/MobileNav";
import DesktopNavbar from "../components/DesktopNav";
import NavButton from "../components/NavButton";
import HamburgerButton from "../components/buttons/HamburgerButton";
import { useRouter } from "next/router";
type Props = {
  navOptions: { text: string; href: string }[];
};
const Navbar = ({ navOptions }: Props) => {
  const router = useRouter();
  const [navState, setNavState] = useState({
    open: false,
    section: router.asPath,
  });
  console.log(router.asPath);
  return (
    <>
      <DesktopNavbar>
        {navOptions.map((ele, i) => (
          <NavButton
            href={ele.href}
            text={ele.text}
            navState={navState.section}
            setState={() => setNavState({ section: ele.href, open: false })}
            key={i}
          />
        ))}
      </DesktopNavbar>
      <MobileNavbar open={navState.open}>
        {navOptions.map((ele, i) => (
          <NavButton
            href={ele.href}
            text={ele.text}
            navState={navState.section}
            setState={() => setNavState({ section: ele.href, open: false })}
            key={i}
          />
        ))}
      </MobileNavbar>
      <HamburgerButton
        open={navState.open}
        setState={() => setNavState({ ...navState, open: !navState.open })}
      />
    </>
  );
};

export default Navbar;
