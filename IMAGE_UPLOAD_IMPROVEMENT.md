# Image Upload Improvement

## Overview
The image upload system has been improved to store images in the file system instead of the database as BLOBs. This provides better performance, scalability, and easier image management.

## Changes Made

### Backend Changes

#### 1. New Configuration Files
- **`src/main/java/com/rental/config/ImageConfig.java`**: Configures static resource serving for images
- **`src/main/java/com/rental/utils/ImageUtils.java`**: Utility class for image file operations

#### 2. Updated Application Properties
- **`src/main/resources/application.properties`**: Added file upload configuration
  - `spring.servlet.multipart.max-file-size=10MB`
  - `spring.servlet.multipart.max-request-size=10MB`
  - `app.image.upload.path=./images/`
  - `app.image.upload.allowed-types=image/jpeg,image/png,image/gif,image/webp`

#### 3. Updated Entity and DTO
- **`src/main/java/com/rental/entity/Car.java`**: Changed from `byte[] image` to `String imagePath`
- **`src/main/java/com/rental/dto/CarDto.java`**: Updated to use `String imagePath` instead of `byte[] returnedImage`

#### 4. Updated Service Layer
- **`src/main/java/com/rental/service/admin/AdminServiceImpl.java`**: 
  - Uses `ImageUtils` to save images to file system
  - Stores only the image path in database
  - Handles image deletion when cars are deleted/updated

### Frontend Changes

#### 1. Updated Image Utilities
- **`car-rental-frontend/src/utils/imageUtils.js`**: 
  - New `getImageUrl()` function for handling image paths
  - Maintains backward compatibility with `createImageDataUrl()`

#### 2. Updated Components
- **`car-rental-frontend/src/pages/AdminDashboard.js`**: Uses `getImageUrl()` for image display
- **`car-rental-frontend/src/pages/CarList.js`**: Uses `getImageUrl()` for image display
- **`car-rental-frontend/src/pages/CarDetail.js`**: Uses `getImageUrl()` for image display

## Database Migration

### Required Steps
1. Run the database migration script: `database_migration.sql`
2. Restart the Spring Boot application
3. The old BLOB column will be automatically dropped by Hibernate

### Migration Script
```sql
-- Add image_path column to cars table
ALTER TABLE cars ADD COLUMN image_path VARCHAR(255);
```

## File Structure

```
Car-Rental_Spring/
├── images/                    # Image storage directory
│   └── [uploaded images]     # Automatically created
├── src/main/java/com/rental/
│   ├── config/
│   │   └── ImageConfig.java  # Static resource configuration
│   └── utils/
│       └── ImageUtils.java   # Image handling utilities
└── car-rental-frontend/
    └── src/utils/
        └── imageUtils.js      # Frontend image utilities
```

## Features

### Image Upload
- **File Type Validation**: Only allows image files (JPEG, PNG, GIF, WebP)
- **Size Limits**: Maximum 10MB per file
- **Unique Filenames**: Uses UUID to prevent filename conflicts
- **Automatic Directory Creation**: Creates upload directory if it doesn't exist

### Image Serving
- **Static Resource Serving**: Images served via `/images/{filename}` endpoint
- **Fallback Images**: Shows placeholder when no image is available
- **URL Generation**: Automatic URL generation for frontend display

### Image Management
- **Automatic Cleanup**: Deletes old images when cars are updated/deleted
- **Error Handling**: Graceful handling of file operations
- **Security**: Validates file types and prevents malicious uploads

## Benefits

1. **Performance**: Faster database queries without BLOB data
2. **Scalability**: Better memory usage and database performance
3. **Maintainability**: Easier to manage and backup images
4. **Flexibility**: Can easily implement CDN or cloud storage later
5. **Security**: Better control over file types and sizes

## Usage

### Uploading Images
Images are automatically handled when creating or updating cars through the admin interface. The system will:
1. Validate the file type
2. Generate a unique filename
3. Save to the `images/` directory
4. Store the filename in the database

### Displaying Images
The frontend automatically generates the correct URL for image display:
- New images: `http://localhost:8080/images/{filename}`
- Missing images: Shows placeholder image

## Troubleshooting

### Common Issues

1. **Images not displaying**: Check if the `images/` directory exists and has proper permissions
2. **Upload errors**: Verify file type and size limits in `application.properties`
3. **Database errors**: Ensure the migration script has been run

### Debug Steps
1. Check application logs for file operation errors
2. Verify image files exist in the `images/` directory
3. Test image URLs directly in browser
4. Check database for correct image paths

## Future Enhancements

1. **Image Compression**: Automatic image resizing and compression
2. **Cloud Storage**: Integration with AWS S3 or similar services
3. **CDN Integration**: Serve images through a content delivery network
4. **Image Optimization**: WebP format support and responsive images 