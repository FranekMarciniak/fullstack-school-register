import React, { useState } from "react";
import MobileNavbar from "../components/MobileNav";
import DesktopNavbar from "../components/DesktopNav";
import NavButton from "../components/buttons/NavButton";
import LogoutButton from "../components/buttons/Logout";
import HamburgerButton from "../components/buttons/HamburgerButton";
import { useRouter } from "next/router";
import { notLoggedInNavOptions, adminNavOptions } from "../utils/navOptions";
import { connect } from "react-redux";
import { IGlobalState } from "../types/global";

const Navbar = ({ role }: { role?: string | null }) => {
  const router = useRouter();
  const [navState, setNavState] = useState({
    open: false,
    section: router.asPath,
  });
  const getNavBar = (role: string | null | undefined) => {
    switch (role) {
      case null:
        return notLoggedInNavOptions;
      case "admin":
        return adminNavOptions;
      default:
        return notLoggedInNavOptions;
    }
  };
  const navOptions = getNavBar(role);
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

        {role && <LogoutButton />}
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
        {role && <LogoutButton />}
      </MobileNavbar>
      <HamburgerButton
        open={navState.open}
        setState={() => setNavState({ ...navState, open: !navState.open })}
      />
    </>
  );
};
const mapStateToProps = ({ global }: { global: IGlobalState }) => ({
  role: Boolean(global.user.id) ? global.user.role : null,
});

export default connect(mapStateToProps)(Navbar);
