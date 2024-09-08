import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/db/dbConfig";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const getSalesData = async () => {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
};


const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageCountPerUser:
      userCount === 0
        ? 0
        : (orderData?._sum?.pricePaidInCents ?? 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const [activeProducts, inactiveProducts] = await Promise.all([
    prisma.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    prisma.product.count({
      where: {
        isAvailableForPurchase: false,
      },
    }),
  ]);
  return {
    activeProducts,
    inactiveProducts,
  };
};

const AdminDashborad = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="flex flex-wrap gap-5 justify-center ">
      <AdminCard
        title="Sales"
        desctiption={`${formatNumber(salesData.amount)} Orders`}
        subtext={formatCurrency(salesData.numberOfSales)}
      />
      <AdminCard
        title="Customer"
        desctiption={formatCurrency(userData.averageCountPerUser)}
        subtext={formatNumber(userData.userCount)}
      />
      <AdminCard
        title="Active Products"
        desctiption={formatNumber(productData.inactiveProducts)}
        subtext={formatNumber(productData.activeProducts)}
      />
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
