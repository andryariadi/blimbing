export interface Customer {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  accounts?: Account[];
  refreshToken?: RefreshToken[];
}

export interface RefreshToken {
  id: string;
  token: string;
  expiresAt: Date;
  customerId: string;
  createdAt: string;
}

export interface DepositoType {
  id: string;
  name: string;
  yearlyReturn: number;
  createdAt: string;
  updatedAt: string;
  accounts?: Account[];
}

export interface Account {
  id: string;
  customerId: string;
  packetId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  packet?: DepositoType;
  transactions?: Transaction[];
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  transactionDate: string;
  balanceBefore: number;
  balanceAfter: number;
  interestEarned: number;
  createdAt: string;
  account?: Account;
}

export interface InterestCalculation {
  accountId: string;
  startingBalance: number;
  depositDate: string;
  withdrawDate: string;
  months: number;
  depositoType: string;
  yearlyReturn: number;
  monthlyReturn: number;
  interestEarned: number;
  endingBalance: number;
}
