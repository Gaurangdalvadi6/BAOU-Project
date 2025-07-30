package com.rental.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class ImageConfig implements WebMvcConfigurer {

    @Value("${app.image.upload.path}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        try {
            Path uploadDir = Paths.get(uploadPath);
            
            // Create directory if it doesn't exist
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            
            String uploadAbsolutePath = uploadDir.toFile().getAbsolutePath();
            
            registry.addResourceHandler("/images/**")
                    .addResourceLocations("file:" + uploadAbsolutePath + "/");
        } catch (Exception e) {
            // Log error but don't fail application startup
            System.err.println("Error configuring image resource handler: " + e.getMessage());
        }
    }
} 