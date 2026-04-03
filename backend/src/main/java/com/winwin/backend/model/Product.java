package com.winwin.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String itemCode;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private String category;
    private List<String> images;
    private List<String> sizes;
    private List<String> colors;
}
