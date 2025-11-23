package com.project.backend.repository;

import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor,Integer> {

//    Optional<Vendor> getVendorByEmail(String email);
    Optional<Vendor> findByEmail(String email);

    @Query("select v from Vendor v where v.email = :email")
    Optional<Vendor> getVendorByEmail(@Param("email") String email);

}
