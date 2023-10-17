"use client";

import React from "react";
import Header from "../header";

const PrivateLayout = ({ children, ...rest }: React.PropsWithChildren) => {
  return (
    <>
      <Header {...rest} />
      <div>{children}</div>
    </>
  );
};

export default PrivateLayout;
