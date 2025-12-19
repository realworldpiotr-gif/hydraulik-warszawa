/*
  # Create gallery_images table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key) - Unique identifier for each gallery image
      - `image_url` (text) - URL/path to the image in Supabase Storage
      - `title` (text, optional) - Title or description of the image
      - `created_at` (timestamptz) - Timestamp when image was uploaded
      - `display_order` (integer) - Order for displaying images in gallery
  
  2. Storage
    - Create storage bucket for gallery images
  
  3. Security
    - Enable RLS on `gallery_images` table
    - Add policy for public read access (anyone can view gallery)
    - Add policy for authenticated admin insert (for uploading - will need auth later)
*/

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view gallery images (public read access)
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow inserts for now (will add auth check later if needed)
CREATE POLICY "Allow uploads"
  ON gallery_images
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow deletes for now (will add auth check later if needed)
CREATE POLICY "Allow deletes"
  ON gallery_images
  FOR DELETE
  TO public
  USING (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can view gallery images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Access'
  ) THEN
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'gallery');
  END IF;
END $$;

-- Storage policy: Allow uploads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow uploads to gallery'
  ) THEN
    CREATE POLICY "Allow uploads to gallery"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'gallery');
  END IF;
END $$;

-- Storage policy: Allow deletes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow deletes from gallery'
  ) THEN
    CREATE POLICY "Allow deletes from gallery"
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'gallery');
  END IF;
END $$;