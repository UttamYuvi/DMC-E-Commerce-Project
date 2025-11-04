package com.project.backend.services;

import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;

import java.util.List;

public interface VendorService {

    public List<Vendor> getAllVendors();

    public Vendor getVendorById(int vid);

//    public List<User> getAllUsersByVendorId(int vid);

}
