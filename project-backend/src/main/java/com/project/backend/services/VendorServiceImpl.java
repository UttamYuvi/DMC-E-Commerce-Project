package com.project.backend.services;

import com.project.backend.dtos.VendorDeliveredProductDTO;
import com.project.backend.entities.Order;
import com.project.backend.entities.User;
import com.project.backend.repository.OrderDetailsRepository;
import com.project.backend.repository.OrderRepository;
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
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor getVendorById(int vid) {
        return vendorRepository.findById(vid).get();
    }

    //done
    public List<VendorDeliveredProductDTO> getAllDeliveredProductsOfVendor(int vendorId) {
        return vendorRepository.getAllDeliveredProductsOfVendor(vendorId);
    }

    //done
    public String setOrderStatus(int orderId, String status) {
        int count = orderRepository.setOrderStatus(orderId,status);
        if(count == 1)
            return "Order Status changed to - "+status.toUpperCase();
        return "something went wrong";
    }

    public double getTotalSalesOfVendor(int vendorId) {
        return orderDetailsRepository.getTotalSalesOfVendor(vendorId);
    }

}
