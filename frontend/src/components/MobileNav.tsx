import React, { ReactElement, ReactNode } from "react";

interface Props {
  open?: boolean;
  children: ReactNode;
}

function MobileNavbar({ open, children }: Props): ReactElement {
  return (
    <>
      <nav
        className={`top-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden w-8/12 xs:w-3/6 h-screen rounded-r-sm absolute bg-gray-200 overflow-hidden transition-all flex flex-col items-center`}
      >
        {children}
      </nav>
    </>
  );
}
export default MobileNavbar;
