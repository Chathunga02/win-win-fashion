package com.winwin.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    private String productId;
    private String itemCode;
    private String name;
    private int quantity;
    private double price;
    private String selectedSize;
    private String selectedColor;
}
