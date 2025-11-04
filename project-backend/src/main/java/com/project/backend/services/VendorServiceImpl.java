package com.project.backend.services;

import com.project.backend.entities.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.repository.VendorRepository;
import com.project.backend.entities.Vendor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorServiceImpl implements VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor getVendorById(int vid) {
        return vendorRepository.findById(vid).get();
    }

//    public List<User> getAllUsersByVendorId(int vid) {
//        return userRepository.findUserByVendorId(vid);
//    }
}
