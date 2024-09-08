"use client";
import React from "react";
import Link from "next/link";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();
  console.log("path -> ", path);
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <NavigationMenuItem className="flex gap-10 h-10 justify-center items-center">
          <Link
            className={`${path === "/admin" ? "white-background" : ""} px-4`}
            href="/admin"
          >
            Dashboard
          </Link>
          <Link
            className={`${
              path === "/admin/products" ? "white-background" : ""
            } px-4`}
            href="/admin/products"
          >
            Products
          </Link>
          <Link
            className={`${
              path === "/admin/customers" ? "white-background" : ""
            } px-4`}
            href="/admin/customers"
          >
            Customers
          </Link>
          <Link
            className={`${
              path === "/admin/sales" ? "white-background" : ""
            } px-4`}
            href="/admin/sales"
          >
            Sales
          </Link>
        </NavigationMenuItem>
      </div>
    </>
  );
};

export default NavBar;
