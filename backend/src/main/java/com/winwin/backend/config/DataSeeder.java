package com.winwin.backend.config;

import com.winwin.backend.model.Product;
import com.winwin.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        productRepository.deleteAll(); // Clear old dummy data for new real products
        
        List<Product> products = Arrays.asList(
                Product.builder()
                        .name("Olive Cargo Shorts")
                        .description("Comfortable and durable olive green cargo shorts with multiple pockets. Perfect for casual wear.")
                        .price(25.99)
                        .imageUrl("/product1.jpg")
                        .category("Pants")
                        .sizes(Arrays.asList("30", "32", "34", "36"))
                        .colors(Arrays.asList("Olive", "Grey"))
                        .build(),
                Product.builder()
                        .name("Colorful Smocked Tops")
                        .description("Vibrant, comfortable smocked tops available in multiple bright summer colors.")
                        .price(15.50)
                        .imageUrl("/product2.jpg")
                        .category("T-Shirts")
                        .sizes(Arrays.asList("S", "M", "L"))
                        .colors(Arrays.asList("Pink", "Blue", "Orange", "White", "Purple"))
                        .build(),
                Product.builder()
                        .name("Khaki Cargo Shorts")
                        .description("Classic khaki cargo shorts for everyday utility and comfort.")
                        .price(24.99)
                        .imageUrl("/product3.jpg")
                        .category("Pants")
                        .sizes(Arrays.asList("30", "32", "34", "36"))
                        .colors(Arrays.asList("Khaki"))
                        .build(),
                Product.builder()
                        .name("Pink Floral Mini Dress")
                        .description("Elegant pink floral mini dress with puffed sleeves and a square neckline. A summer favorite.")
                        .price(35.00)
                        .imageUrl("/product4.jpg")
                        .category("Dresses")
                        .sizes(Arrays.asList("XS", "S", "M", "L"))
                        .colors(Arrays.asList("Pink/Floral"))
                        .build(),
                Product.builder()
                        .name("Dark Floral Midi Dress")
                        .description("Stunning dark navy floral midi dress with draped sleeves and a delicate front slit.")
                        .price(42.00)
                        .imageUrl("/product5.jpg")
                        .category("Dresses")
                        .sizes(Arrays.asList("S", "M", "L"))
                        .colors(Arrays.asList("Navy/Floral"))
                        .build()
        );
        productRepository.saveAll(products);
        System.out.println("Real products seeded directly to MongoDB");
    }
}
