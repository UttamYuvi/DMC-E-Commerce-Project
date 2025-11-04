package com.project.backend.repository;

import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor,Integer> {

}
