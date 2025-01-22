/*
  # Digital Agency CRM Initial Schema

  1. New Tables
    - `profiles`
      - Extends Supabase auth.users
      - Stores additional user information
      - Links to both clients and staff
    - `services`
      - Stores available services
      - Includes pricing and description
    - `orders`
      - Tracks service orders
      - Links clients to services
    - `payments`
      - Records client payments
      - Tracks payment status
    - `messages`
      - Stores chat messages
      - Links to conversations
    - `conversations`
      - Groups messages between client and staff
    
  2. Security
    - RLS enabled on all tables
    - Specific policies for clients and staff
*/

-- Profiles for both clients and staff
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  company_name text,
  role text NOT NULL DEFAULT 'client',
  phone text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Available services
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service orders
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id),
  service_id uuid REFERENCES services(id),
  status text NOT NULL DEFAULT 'pending',
  requirements text,
  total_amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payment records
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  client_id uuid REFERENCES profiles(id),
  amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_method text,
  created_at timestamptz DEFAULT now()
);

-- Chat conversations
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id),
  staff_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat messages
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id),
  sender_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Services policies
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Staff can manage services"
  ON services FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'staff'
  ));

-- Orders policies
CREATE POLICY "Clients can view own orders"
  ON orders FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Staff can view all orders"
  ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'staff'
  ));

CREATE POLICY "Clients can create orders"
  ON orders FOR INSERT
  WITH CHECK (client_id = auth.uid());

-- Payments policies
CREATE POLICY "Clients can view own payments"
  ON payments FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Staff can view all payments"
  ON payments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'staff'
  ));

CREATE POLICY "Clients can create payments"
  ON payments FOR INSERT
  WITH CHECK (client_id = auth.uid());

-- Conversations policies
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (client_id = auth.uid() OR staff_id = auth.uid());

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (client_id = auth.uid() OR staff_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view conversation messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.client_id = auth.uid() OR conversations.staff_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());