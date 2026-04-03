package com.winwin.backend.service;

import com.winwin.backend.model.Order;
import com.winwin.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PROCESSING");
        
        // Calculate total amount from items to ensure accuracy
        double calculatedTotal = order.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(calculatedTotal);
        
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "orderDate"));
    }

    public Order updateOrderStatus(String id, String status) {
        Order existingOrder = orderRepository.findById(id).orElse(null);
        if (existingOrder != null) {
            existingOrder.setStatus(status);
            return orderRepository.save(existingOrder);
        }
        return null;
    }
}
