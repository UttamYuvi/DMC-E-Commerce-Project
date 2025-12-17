package com.project.backend.repository;

import com.project.backend.entities.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Integer> {

    @Query("""
        SELECT COALESCE(SUM(od.subtotal), 0)
        FROM OrderDetails od
        JOIN od.order o
        JOIN od.product p
        JOIN p.vendor v
        WHERE v.vendorId = :vendorId
          AND o.orderStatus = 'delivered'
    """)
    double getTotalSalesOfVendor(@Param("vendorId") int vendorId);

}
