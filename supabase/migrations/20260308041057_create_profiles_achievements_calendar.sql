/*
  # Your-Info Personal Portfolio Database Schema

  ## Overview
  This migration creates the core tables for the Your-Info personal portfolio website,
  including user profiles, achievements, and calendar events with reminders.

  ## New Tables

  ### 1. profiles
  Stores user profile information that appears on their personal page
  - `id` (uuid, primary key) - Links to auth.users
  - `username` (text, unique) - Unique username for login
  - `full_name` (text) - User's full name
  - `title` (text) - Professional title/headline
  - `bio` (text) - About me section
  - `skills` (text array) - List of skills
  - `education` (text) - Education background
  - `experience` (text) - Work experience
  - `contact_email` (text) - Contact email
  - `contact_phone` (text) - Contact phone
  - `profile_photo_url` (text) - URL to profile photo in storage
  - `social_links` (jsonb) - Social media links (LinkedIn, GitHub, etc.)
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. achievements
  Stores user achievements and milestones
  - `id` (uuid, primary key) - Achievement ID
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `title` (text) - Achievement title
  - `description` (text) - Achievement description
  - `date` (date) - Date of achievement
  - `category` (text) - Category (education, work, personal, etc.)
  - `image_url` (text) - Optional image/certificate URL
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. calendar_events
  Stores calendar events and reminders
  - `id` (uuid, primary key) - Event ID
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `title` (text) - Event title
  - `description` (text) - Event description
  - `event_date` (timestamptz) - Date and time of event
  - `remind_before_days` (integer) - Days before to show reminder (default 1)
  - `is_completed` (boolean) - Whether event is completed
  - `color` (text) - Color code for calendar display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:

  #### profiles table
  1. Users can view any profile (public portfolios)
  2. Users can only insert their own profile
  3. Users can only update their own profile
  4. Users can only delete their own profile

  #### achievements table
  1. Users can view any achievements (public portfolios)
  2. Users can only insert their own achievements
  3. Users can only update their own achievements
  4. Users can only delete their own achievements

  #### calendar_events table
  1. Users can only view their own events (private)
  2. Users can only insert their own events
  3. Users can only update their own events
  4. Users can only delete their own events

  ## Important Notes
  - Username must be unique across the system
  - Profile photos will be stored in Supabase Storage
  - Calendar events support reminders shown on dashboard
  - All timestamps use UTC timezone
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  title text DEFAULT '',
  bio text DEFAULT '',
  skills text[] DEFAULT '{}',
  education text DEFAULT '',
  experience text DEFAULT '',
  contact_email text DEFAULT '',
  contact_phone text DEFAULT '',
  profile_photo_url text DEFAULT '',
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  category text DEFAULT 'general',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create calendar_events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  event_date timestamptz NOT NULL,
  remind_before_days integer DEFAULT 1,
  is_completed boolean DEFAULT false,
  color text DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_date ON achievements(date DESC);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_id ON calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events(event_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_completed ON calendar_events(is_completed);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for achievements table
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own achievements"
  ON achievements FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own achievements"
  ON achievements FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for calendar_events table
CREATE POLICY "Users can view own events"
  ON calendar_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own events"
  ON calendar_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own events"
  ON calendar_events FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own events"
  ON calendar_events FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage bucket
CREATE POLICY "Users can upload own profile photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view profile photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can update own profile photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own profile photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
