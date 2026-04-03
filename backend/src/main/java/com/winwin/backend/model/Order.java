package com.winwin.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private List<CartItem> items;
    private double totalAmount;
    private CustomerDetails customerDetails;
    private String status; // e.g., "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"
    private LocalDateTime orderDate;
}
