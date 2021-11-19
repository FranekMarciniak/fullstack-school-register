import React, { ReactElement, ReactNode } from "react";

interface Props {
  open?: boolean;
  children: ReactNode;
}

function DesktopNavbar({ children }: Props): ReactElement {
  return (
    <nav className="border-r-2 border-gray-300 top-0 hidden md:flex flex-col items-center w-3/12 h-screen rounded-r-sm  xl:max-w-1/12">
      {children}
    </nav>
  );
}
export default DesktopNavbar;
