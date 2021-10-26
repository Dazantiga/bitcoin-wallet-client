export const Routes = {
  // pages
  DashboardOverview: { path: "/dashboard/overview" },
  Transactions: { path: "/transactions/transactions" },
  TransactionForm: { path: "/transactions/transactionForm" },
  TransactionEditForm: { path: "/transactions/transactionForm/:id" },
  Settings: { path: "/settings" },
  Signin: { path: "/auth/sign-in" },
  Signup: { path: "/auth/sign-up" },
  ForgotPassword: { path: "/auth/forgot-password" },
  ResetPassword: { path: "/auth/reset-password" },
  Lock: { path: "/auth/lock" },
  NotFound: { path: "/error/404" },
  ServerError: { path: "/error/500" },
};
