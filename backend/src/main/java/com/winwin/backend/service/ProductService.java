package com.winwin.backend.service;

import com.winwin.backend.model.Product;
import com.winwin.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getFilteredProducts(String category, String size, String color, String sortBy) {
        Query query = new Query();

        if (category != null && !category.isEmpty()) {
            query.addCriteria(Criteria.where("category").is(category));
        }
        if (size != null && !size.isEmpty()) {
            query.addCriteria(Criteria.where("sizes").in(size));
        }
        if (color != null && !color.isEmpty()) {
            query.addCriteria(Criteria.where("colors").in(color));
        }

        if ("priceAsc".equals(sortBy)) {
            query.with(Sort.by(Sort.Direction.ASC, "price"));
        } else if ("priceDesc".equals(sortBy)) {
            query.with(Sort.by(Sort.Direction.DESC, "price"));
        } else {
            // Default sort, perhaps newest first? Assuming id contains timestamp for mongo
            query.with(Sort.by(Sort.Direction.DESC, "id"));
        }

        return mongoTemplate.find(query, Product.class);
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product productDetails) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setItemCode(productDetails.getItemCode());
            existingProduct.setName(productDetails.getName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setImageUrl(productDetails.getImageUrl());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setSizes(productDetails.getSizes());
            existingProduct.setColors(productDetails.getColors());
            return productRepository.save(existingProduct);
        }
        return null;
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
