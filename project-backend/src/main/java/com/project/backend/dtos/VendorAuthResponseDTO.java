package com.project.backend.dtos;

import com.project.backend.entities.Vendor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorAuthResponseDTO{

    private String token;
    private int vendorId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String subscriptionStatus;
    private double commissionRate;
    private String password;
    private String role = "VENDOR";

//    public String getToken() {
//        return token;
//    }
//
//    public void setToken(String token) {
//        this.token = token;
//    }
//
//    public int getVendorId() {
//        return vendorId;
//    }
//
//    public void setVendorId(int vendorId) {
//        this.vendorId = vendorId;
//    }
//
//    public String getVendorName() {
//        return vendorName;
//    }
//
//    public void setVendorName(String vendorName) {
//        this.vendorName = vendorName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getMobile() {
//        return mobile;
//    }
//
//    public void setMobile(String mobile) {
//        this.mobile = mobile;
//    }
//
//    public String getSubscriptionStatus() {
//        return subscriptionStatus;
//    }
//
//    public void setSubscriptionStatus(String subscriptionStatus) {
//        this.subscriptionStatus = subscriptionStatus;
//    }
//
//    public double getCommissionRate() {
//        return commissionRate;
//    }
//
//    public void setCommissionRate(double commissionRate) {
//        this.commissionRate = commissionRate;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
}
