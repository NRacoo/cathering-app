export interface DashboardData {
    newSubscription: number;
    monthlyRecurringRevenue: number;
    reactivations: number;
    activeSubscriptions: number;
    totalUsers: number;
    averageOrderValue: number;
    churnRate: string;
    conversionRate: string;
  }
  
  export interface MenuFormData {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    features: string;
    calories: string;
    protein: string;
    carb: string;
    fat: string;
    popular: boolean;
  }
  
  export interface DateRange {
    from: Date;
    to: Date;
  }
  
  export type QuickSelectOption = 
    | 'Hari ini'
    | 'Kemarin'
    | '7 hari terakhir'
    | 'Bulan ini'
    | '30 hari terakhir'
    | '60 hari terakhir'
    | 'Custom';

export interface CustomUser {
    id: string;
    email: string;
    fullname: string;
    password: string;
    role: string;
}