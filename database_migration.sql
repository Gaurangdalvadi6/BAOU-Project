-- Database Migration Script for Image Path Storage
-- Run this script to update your existing database

-- Add image_path column to cars table
ALTER TABLE cars ADD COLUMN image_path VARCHAR(255);

-- Update existing records to have a default image path (optional)
-- UPDATE cars SET image_path = 'default-car.jpg' WHERE image_path IS NULL;

-- Note: The old 'image' column (BLOB) will be automatically dropped by Hibernate
-- when you restart the application due to the entity change 