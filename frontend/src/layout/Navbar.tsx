import React, { useState } from "react";
import MobileNavbar from "../components/MobileNav";
import DesktopNavbar from "../components/DesktopNav";
import NavButton from "../components/NavButton";
import HamburgerButton from "../components/buttons/HamburgerButton";
type Props = {
  navOptions: { text: string; href: string }[];
};
const Navbar = ({ navOptions }: Props) => {
  const [navState, setNavState] = useState({ open: true, section: 0 });
  return (
    <>
      <DesktopNavbar>
        {navOptions.map((ele, i) => (
          <NavButton
            href={ele.href}
            text={ele.text}
            active={i === navState.section ? true : false}
            setState={() => setNavState({ section: i, open: false })}
            key={i}
          />
        ))}
      </DesktopNavbar>
      <MobileNavbar open={navState.open}>
        {navOptions.map((ele, i) => (
          <NavButton
            href={ele.href}
            text={ele.text}
            active={i === navState.section ? true : false}
            setState={() => setNavState({ section: i, open: false })}
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
