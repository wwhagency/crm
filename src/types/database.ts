export interface Profile {
  id: string;
  full_name: string;
  company_name?: string;
  role: 'client' | 'staff';
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  client_id: string;
  service_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  requirements?: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  client_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  payment_method?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  client_id: string;
  staff_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
}