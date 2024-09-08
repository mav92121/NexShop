import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className="mt-5">{children}</div>
    </div>
  );
};

export default AdminLayout;
