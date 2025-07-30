package com.rental.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class ImageUtils {

    @Value("${app.image.upload.path}")
    private String uploadPath;

    @Value("${app.image.upload.allowed-types}")
    private String allowedTypes;

    public String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty or null");
        }

        // Validate file type
        if (!isValidImageType(file.getContentType())) {
            throw new IllegalArgumentException("Invalid image type. Allowed types: " + allowedTypes);
        }

        // Create upload directory if it doesn't exist
        Path uploadDir = Paths.get(uploadPath);
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        // Save file
        Path filePath = uploadDir.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFilename;
    }

    public void deleteImage(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            return;
        }

        try {
            Path filePath = Paths.get(uploadPath, filename);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        } catch (IOException e) {
            // Log error but don't throw exception
            System.err.println("Error deleting image file: " + filename + " - " + e.getMessage());
        }
    }

    private boolean isValidImageType(String contentType) {
        if (contentType == null) {
            return false;
        }
        
        String[] allowedTypeArray = allowedTypes.split(",");
        for (String allowedType : allowedTypeArray) {
            if (contentType.equals(allowedType.trim())) {
                return true;
            }
        }
        return false;
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return ".jpg"; // Default extension
        }
        return filename.substring(filename.lastIndexOf("."));
    }

    public String getImageUrl(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            return null;
        }
        return "/images/" + filename;
    }
} 