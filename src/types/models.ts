export type TransactionType = "income" | "expense"; // e.g., "income" for salary, "expense" for groceries

export type Transaction = {
  id: string; // unique id, e.g., "txn_001"
  date: string; // ISO date string, e.g., "2025-12-01"
  description: string; // human-friendly description, e.g., "Grocery shopping at Walmart"
  amount: number; // positive number in account currency, e.g., 49.99
  category: string; // category id or name, e.g., "cat_groceries" or "Groceries"
  type: TransactionType; // "income" or "expense"
  accountId: string; // account id where txn posted, e.g., "acc_checking_001"
  currencyId: string; // currency id/code, e.g., "USD"
  isProjected: false; // literal false for actual/posted transactions
};

export type ProjectedTransaction = {
  id: string; // unique id for projection, e.g., "ptxn_2026_01_rent"
  date: string; // next expected occurrence (ISO), e.g., "2026-01-01"
  description: string; // e.g., "Monthly rent"
  amount: number; // expected amount, e.g., 1200
  category: string; // e.g., "cat_rent" or "Rent"
  type: TransactionType; // usually "expense", could be "income" (salary)
  accountId: string; // target account id for projection, e.g., "acc_checking_001"
  currencyId: string; // e.g., "USD"
  isProjected: true; // literal true to mark forecasted transactions
  frequency?: "once" | "monthly" | "quarterly" | "yearly"; // recurrence, e.g., "monthly"
};

export type AnyTransaction = Transaction | ProjectedTransaction; // union of actual and projected

export type Currency = {
  id: string; // unique id (often same as code), e.g., "USD"
  code: string; // ISO 4217 code, e.g., "USD"
  symbol: string; // display symbol, e.g., "$"
  name: string; // full currency name, e.g., "United States Dollar"
};

export type Institution = {
  id: string; // e.g., "inst_chase_001"
  name: string; // display name, e.g., "Chase Bank"
  type: string; // institution type, e.g., "bank", "broker", "crypto_exchange"
};

export type AccountType = "credit_card" | "savings" | "investment" | "checking"; // high-level account type

export type AccountSubType =
  | "credit_card_personal" // personal credit card
  | "credit_card_corporate" // corporate/business credit card
  | "savings_emergency" // emergency fund
  | "savings_goal" // targeted savings (e.g., vacation)
  | "investment_stocks" // brokerage for stocks/ETFs
  | "investment_crypto" // crypto wallet/exchange
  | "investment_mutual_funds" // mutual funds account
  | "checking_personal" // personal checking account
  | "checking_business"; // business checking account

export type Account = {
  id: string; // e.g., "acc_checking_001"
  name: string; // e.g., "Personal Checking"
  type: AccountType; // e.g., "checking"
  subType: AccountSubType; // e.g., "checking_personal"
  institutionId: string; // link to Institution.id, e.g., "inst_chase_001"
  currencyId: string; // account currency id, e.g., "USD"
  balance?: number; // optional current balance, e.g., 2450.75
  createdAt: string; // ISO timestamp when account created, e.g., "2025-11-15T09:30:00Z"
};

export type AccountSummary = {
  accountId: string; // reference to Account.id, e.g., "acc_checking_001"
  accountName: string; // display name, e.g., "Personal Checking"
  currencyId: string; // currency id for summary, e.g., "USD"
  balance: number; // ending balance for period, e.g., 2450.75
  totalIncome: number; // sum of income txns in period, e.g., 3000
  totalExpense: number; // sum of expense txns in period, e.g., 550
  net: number; // totalIncome - totalExpense, e.g., 2450
};

export type Category = {
  id: string; // e.g., "cat_groceries"
  name: string; // display name, e.g., "Groceries"
  type: TransactionType; // category scoped to "income" or "expense"
  parentId?: string; // optional parent category id, e.g., "cat_living_expenses"
  description?: string; // optional description, e.g., "Food and household supplies"
  keywords?: string[]; // hints for auto-matching, e.g., ["supermarket","walmart","food"]
  icon?: string; // UI icon key, e.g., "shopping-cart"
  color?: string; // hex or CSS color, e.g., "#34D399"
};

export type CategoryPattern = {
  id: string; // e.g., "pat_walmart_groceries"
  categoryId: string; // linked Category.id, e.g., "cat_groceries"
  pattern: string; // text or regex string, e.g., "walmart|costco" or "\\bWALMART\\b"
  matchType: "regex" | "contains"; // matching strategy: "regex" uses RegExp
  confidence?: number; // optional 0-1 score for auto-categorization, e.g., 0.9
};

export type CategoryAggregate = {
  category: string; // category id or name, e.g., "cat_groceries" or "Groceries"
  actualAmount: number; // sum of posted transactions, e.g., 320.45
  projectedAmount: number; // sum of projected transactions, e.g., 350
  percentage?: number; // optional share of total, e.g., 0.18 for 18%
};

export type Goal = {
  id: string; // e.g., "goal_vacation_2026"
  name: string; // e.g., "Vacation Fund"
  targetAmount: number; // e.g., 2000
  currentAmount?: number; // optional current progress, e.g., 450
  targetDate?: string; // optional target date (ISO), e.g., "2026-06-01"
  accountId?: string; // optional linked savings account id, e.g., "acc_savings_001"
  createdAt: string; // ISO timestamp when goal created, e.g., "2025-10-01T12:00:00Z"
};

export type MonthlyAggregate = {
  month: string; // YYYY-MM, e.g., "2025-12"
  actualIncome: number; // sum of posted income, e.g., 3200
  projectedIncome: number; // expected income (includes projections), e.g., 3200
  actualExpense: number; // sum of posted expenses, e.g., 1800
  projectedExpense: number; // expected expenses (includes projections), e.g., 1600
};