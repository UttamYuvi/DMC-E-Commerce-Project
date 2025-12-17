package com.project.backend.repository;

import com.project.backend.dtos.VendorDeliveredProductDTO;
import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor,Integer> {

//    Optional<Vendor> getVendorByEmail(String email);
    Optional<Vendor> findByEmail(String email);

    @Query("select v from Vendor v where v.email = :email")
    Optional<Vendor> getVendorByEmail(@Param("email") String email);

    //done  //vendor
    @Query("""
        SELECT new com.project.backend.dtos.VendorDeliveredProductDTO
        (o.orderId, p.productId, p.name, p.description, oi.quantity, oi.price, o.totalAmount)
        FROM OrderDetails oi
        JOIN oi.order o JOIN oi.product p JOIN p.vendor v
        WHERE v.vendorId = :vendorId AND o.orderStatus = 'delivered'
        """)

    //done
    List<VendorDeliveredProductDTO> getAllDeliveredProductsOfVendor(
            @Param("vendorId") int vendorId
    );




}
