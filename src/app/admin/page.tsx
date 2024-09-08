"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminDashborad = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center ">
      <AdminCard title="Sales" desctiption="desc" subtext="sub" />
      <AdminCard title="Customer" desctiption="desc" subtext="sub" />
      <AdminCard title="Active Products" desctiption="desc" subtext="sub" />
    </div>
  );
};

interface AdminCardProps {
  title: string;
  desctiption: string;
  subtext: string;
}
const AdminCard = ({ title, desctiption, subtext }: AdminCardProps) => {
  return (
    <Card className=" w-[30vw] ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desctiption}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{subtext}</p>
      </CardContent>
    </Card>
  );
};

export default AdminDashborad;
