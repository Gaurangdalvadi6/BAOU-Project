# Image Upload Test Guide

## Prerequisites
1. Backend application running on `http://localhost:8080`
2. Frontend application running on `http://localhost:3000`
3. MySQL database running with `car_rental_app` database

## Test Steps

### 1. Database Migration
The application will automatically handle the database schema changes when it starts. The old BLOB column will be dropped and the new `image_path` column will be created.

### 2. Test Image Upload
1. **Login as Admin**:
   - Go to `http://localhost:3000/login`
   - Login with admin credentials

2. **Add New Car with Image**:
   - Click "Add New Car" button
   - Fill in all required fields
   - Select an image file (JPEG, PNG, GIF, or WebP)
   - Click "Add Car"

3. **Verify Image Storage**:
   - Check that the image appears in the car list
   - Verify the image file exists in the `images/` directory
   - Check the database to confirm `image_path` column has the filename

### 3. Test Image Display
1. **View Car List**: Images should display correctly in the car listing
2. **View Car Details**: Images should display correctly in car detail pages
3. **Admin Dashboard**: Images should display correctly in the admin car management

### 4. Test Image Update
1. **Edit Existing Car**:
   - Click "Edit" on an existing car
   - Upload a new image
   - Save changes
   - Verify the old image file is deleted and new one is saved

### 5. Test Image Deletion
1. **Delete Car**:
   - Click "Delete" on a car with an image
   - Verify the image file is deleted from the `images/` directory

## Expected Behavior

### Image Upload
- ✅ File type validation (only images allowed)
- ✅ File size validation (max 10MB)
- ✅ Unique filename generation
- ✅ Automatic directory creation
- ✅ Database path storage

### Image Display
- ✅ Images served via `/images/{filename}` endpoint
- ✅ Fallback to placeholder when no image
- ✅ Correct URL generation in frontend

### Image Management
- ✅ Automatic cleanup on car deletion
- ✅ Old image deletion on car update
- ✅ Error handling for file operations

## Troubleshooting

### Common Issues

1. **Images not uploading**:
   - Check file type and size
   - Verify `images/` directory permissions
   - Check application logs for errors

2. **Images not displaying**:
   - Verify image files exist in `images/` directory
   - Check browser network tab for 404 errors
   - Test image URL directly in browser

3. **Database errors**:
   - Restart the application to trigger schema updates
   - Check database connection and permissions

### Debug Commands

```bash
# Check if images directory exists
ls -la images/

# Check application logs
tail -f logs/application.log

# Test image URL
curl http://localhost:8080/images/test-image.jpg
```

## Success Criteria

- [ ] Images upload successfully to file system
- [ ] Images display correctly in all frontend pages
- [ ] Image paths stored correctly in database
- [ ] Old images deleted when cars are updated/deleted
- [ ] File type and size validation works
- [ ] Fallback images display when no image is available 