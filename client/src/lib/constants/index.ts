import { Users, UserRound, HandCoins, Wallet, House } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Customers",
    url: "/customer",
    icon: Users,
  },
  {
    title: "Accounts",
    url: "/account",
    icon: UserRound,
  },
  {
    title: "Deposito Type",
    url: "/deposito-type",
    icon: HandCoins,
  },
  {
    title: "Transactions",
    url: "/transaction",
    icon: Wallet,
  },
];

export const cardsMenu = [
  {
    title: "Customers",
    url: "/customer",
    link: "Go to Customers",
    icon: Users,
    shortDescription: "Manage customer information",
    description: "Create, edit, and delete customer profiles",
  },
  {
    title: "Accounts",
    url: "/account",
    link: "Go to Accounts",
    icon: UserRound,
    shortDescription: "Manage customer accounts",
    description: "Create, edit, and delete customer accounts",
  },
  {
    title: "Deposito Types",
    url: "/deposito-type",
    link: "Go to Deposito Types",
    icon: HandCoins,
    shortDescription: "Manage deposito types",
    description: "Create, edit, and delete deposito types",
  },
];

export const howItWorksMenu = [
  {
    id: 1,
    title: "Create Customers",
    description: "Start by adding customer information to the system",
  },
  {
    id: 2,
    title: "Create Accounts",
    description: "Open accounts for customers with selected deposito types",
  },
  {
    id: 3,
    title: "Manage Transactions",
    description: "Deposit or withdraw funds. System calculates returns automatically.",
  },
];
