package com.project.backend.services;

import com.project.backend.dtos.UpdateVendorReqDTO;
import com.project.backend.dtos.VendorAuthResponseDTO;
import com.project.backend.dtos.VendorDeliveredProductDTO;
import com.project.backend.dtos.VendorRequestDTO;
import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import org.springframework.data.repository.query.Param;

import java.security.Principal;
import java.util.List;

public interface VendorService {

    public List<Vendor> getAllVendors();

    public VendorAuthResponseDTO getVendorById(int vid);

    Vendor updateVendor(UpdateVendorReqDTO updateVendorReqDTO, int vendorId);

    //done  //user
    List<VendorDeliveredProductDTO> getAllDeliveredProductsOfVendor(int vendorId);

    String setOrderStatus(int orderId, String status);

    double getTotalSalesOfVendor(int vendorId);
}
