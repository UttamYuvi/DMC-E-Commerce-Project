package com.project.backend.repository;


import com.project.backend.dtos.VendorOrderRespDTO;
import com.project.backend.entities.Order;
import com.project.backend.entities.Vendor;
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
    @Query(value = "update orders set orderStatus = :status where orderId = :orderId", nativeQuery = true)
    int setOrderStatus(@Param("orderId") int orderId, @Param("status") String status);


    @Query(
            value = """
            SELECT 
                p.name AS name,
                u.firstName AS firstName,
                DATE_FORMAT(o.createdAt, '%d-%m-%Y') AS created_at,
                o.orderId AS orderId,
                SUM(od.subtotal) AS amount,
                o.orderStatus AS status
            FROM orders o
            JOIN orderdetails od ON o.orderId = od.orderId
            JOIN products p ON od.productId = p.productId
            JOIN users u ON o.userId = u.userId
            WHERE p.vendorId = :vendorId
            GROUP BY o.orderId, p.name, u.firstName, o.createdAt, o.orderStatus
            ORDER BY o.createdAt DESC
        """,
            nativeQuery = true
    )
    List<Object[]> findVendorOrders(@Param("vendorId") int vendorId);

    @Query(
            value = """
            SELECT 
                p.name AS name,
                u.firstName AS firstName,
                DATE_FORMAT(o.createdAt, '%d-%m-%Y') AS created_at,
                o.orderId AS orderId,
                SUM(od.subtotal) AS amount,
                o.orderStatus AS status
            FROM orders o
            JOIN orderdetails od ON o.orderId = od.orderId
            JOIN products p ON od.productId = p.productId
            JOIN users u ON o.userId = u.userId
            WHERE p.vendorId = :vendorId
            And o.orderStatus = :status
            GROUP BY o.orderId, p.name, u.firstName, o.createdAt, o.orderStatus
            ORDER BY o.createdAt DESC
        """,
            nativeQuery = true
    )
    List<Object[]> getAllOrderByStatus(@Param("vendorId") int vendorId, @Param("status") String status);


    @Query(value = """
                SELECT COUNT(DISTINCT o.orderId) AS totalOrders
                FROM orders o
                JOIN orderdetails od ON o.orderId = od.orderId
                JOIN products p ON od.productId = p.productId
                WHERE p.vendorId = :vendorId
                """
                    ,nativeQuery = true)
    long countOrders(@Param("vendorId") int vendorId);

    @Query(value = """
        SELECT
            p.name AS productName,
            SUM(od.subtotal) AS amount,
            SUM(od.subtotal * 0.95) AS profit
        FROM orders o
        JOIN orderdetails od ON o.orderId = od.orderId
        JOIN products p ON od.productId = p.productId
        WHERE p.vendorId = :vendorId
          AND o.orderStatus = 'delivered'
        GROUP BY p.productId, p.name
        ORDER BY amount DESC
        """, nativeQuery = true)
    List<Object[]> getProductSales(@Param("vendorId") int vendorId);



}
