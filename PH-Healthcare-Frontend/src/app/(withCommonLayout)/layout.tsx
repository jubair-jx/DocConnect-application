import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
