// Payment type
export type TPayment = {
  _id: string;
  userId: string;
  username: string;
  email: string;
  amount: number;
  date: Date;
  expiresIn: Date;
  status: "pending" | "completed" | "failed";
  subscriptionType: "monthly" | "yearly";
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
};
