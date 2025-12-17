package com.project.backend.repository;


import com.project.backend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("SELECT o FROM Order o WHERE o.orderId = :orderId AND o.user.userId = :userId")
    Order findOrderByOrderIdAndUserId(
            @Param("orderId") int orderId,
            @Param("userId") int userId
    );

    @Query("SELECT o FROM Order o WHERE o.user.userId = :userId")
    List<Order> findOrdersByUserId(@Param("userId") int userId);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.orderStatus = 'cancelled' WHERE o.orderId = :orderId")
    int cancelOrder(@Param("orderId") int orderId);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.orderStatus = 'delivered' WHERE o.orderId = :orderId")
    int setOrderStatus(@Param("orderId") int orderId, String status);



}
