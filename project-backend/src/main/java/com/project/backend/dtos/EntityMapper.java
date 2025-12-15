package com.project.backend.dtos;

import com.project.backend.entities.*;
import com.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class EntityMapper {

    Products product = new Products();


    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public Vendor emailToId(String email){
        return vendorRepository.getVendorByEmail(email).get();
    }

    public User userEmailToId(String email){
        return userRepository.getUserByEmail(email).get();
    }

    public UserProfileResponseDto userToUserProfileResponse(User user) {
        UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
        userProfileResponseDto.setFirstName(user.getFirstName());
        userProfileResponseDto.setLastName(user.getLastName());
        userProfileResponseDto.setEmail(user.getEmail());
        userProfileResponseDto.setMobile(user.getMobile());
        userProfileResponseDto.setGender(user.getGender());
        List<Address> addressList = user.getAddresses();
        List<AddressReqDTO> addressReqDTOList = new ArrayList<>();
        for(Address address : addressList) {
            AddressReqDTO addressReqDTO = new AddressReqDTO();
            addressReqDTO.setAddressLine(address.getAddressLine());
            addressReqDTO.setCity(address.getCity());
            addressReqDTO.setState(address.getState());
            addressReqDTO.setCountry(address.getCountry());
            addressReqDTO.setPincode(address.getPincode());
            addressReqDTO.setLandmark(address.getLandmark());
            addressReqDTO.setAddressType(address.getAddressType());
            addressReqDTOList.add(addressReqDTO);
        }
        userProfileResponseDto.setAddressList(addressReqDTOList);
        return userProfileResponseDto;

    }

    public Vendor vendorRequestToVendor(VendorRequestDTO vendorRequestDTO) {
        Vendor vendor = new Vendor();
        vendor.setFirstName(vendorRequestDTO.getFirstName());
        vendor.setLastName(vendorRequestDTO.getLastName());
        vendor.setEmail(vendorRequestDTO.getEmail());
        vendor.setPassword(vendorRequestDTO.getPassword());
        vendor.setMobile(vendorRequestDTO.getMobile());
        return vendor;
    }

    public ProductRespDTO productToProductRespDTO(Products products) {
        ProductRespDTO productRespDTO = new ProductRespDTO();
        productRespDTO.setName(products.getName());
        productRespDTO.setDescription(products.getDescription());
        productRespDTO.setPrice(products.getPrice());
        productRespDTO.setStock(products.getStock());
        return productRespDTO;
    }

    public Products productReqToProducts(ProductReqDTO productReqDTO, int vendorId) {
        product.setStatus("continue");
//        product.setVendorId(productReqDTO.getVendorId());
        product.setName(productReqDTO.getName());
        product.setDescription(productReqDTO.getDescription());
        product.setPrice(productReqDTO.getPrice());
        product.setStock(productReqDTO.getStock());
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        product.setVendor(vendor);
        product.setCategoryId(productReqDTO.getCategoryId());
        product.setSubCategoryId(productReqDTO.getSubCategoryId());
        return product;
    }

    public Products productReqDtoToUpdatedProduct(int pid,ProductReqDTO productReqDTO) {
        Products newProduct = productsRepository.findById(pid).get();
        if(productReqDTO.getStock() == 0)
            newProduct.setStatus("discontinue");
        else
            newProduct.setStatus("continue");
        newProduct.setName(productReqDTO.getName());
        newProduct.setDescription(productReqDTO.getDescription());
        newProduct.setPrice(productReqDTO.getPrice());
        newProduct.setStock(productReqDTO.getStock());
        return newProduct;
    }

    public OrderRespDTO newOrderToOrderRespDTO(Order order) {
        OrderRespDTO orderRespDTO = new OrderRespDTO();
        orderRespDTO.setOrderId(order.getOrderId());
        orderRespDTO.setOrderStatus(order.getOrderStatus());
        orderRespDTO.setPaymentStatus(order.getPaymentStatus());
        orderRespDTO.setTotalAmount(order.getTotalAmount());
        orderRespDTO.setDeliveryAddress(order.getDeliveryAddress());

        List<OrderDetails> orderDetails = order.getOrderDetails();
        List<OrderDetailsRespDTO> orderDetailsRespDTOList = getAllOrderDetailsRespDto(orderDetails);
        orderRespDTO.setOrderDetails(orderDetailsRespDTOList);
        return orderRespDTO;
    }

    public List<OrderDetailsRespDTO> getAllOrderDetailsRespDto(List<OrderDetails> orderDetails) {
        List<OrderDetailsRespDTO> orderDetailsRespDTOList = new ArrayList<>();
        for(OrderDetails orderDetail : orderDetails) {
            OrderDetailsRespDTO orderDetailsRespDTO = new OrderDetailsRespDTO();
//            orderDetailsRespDTO.setOrderId(orderDetail.getOrder().getOrderId());
//            orderDetailsRespDTO.setOrderDetailId(orderDetail.getOrderDetailId());
            orderDetailsRespDTO.setProductId(orderDetail.getProduct().getProductId());
            orderDetailsRespDTO.setPrice(orderDetail.getPrice());
            orderDetailsRespDTO.setQuantity(orderDetail.getQuantity());
            orderDetailsRespDTO.setSubtotal(orderDetail.getSubtotal());
            orderDetailsRespDTOList.add(orderDetailsRespDTO);
        }
        return orderDetailsRespDTOList;
    }

    public OrderDetailsRespDTO getOrderDetailByOrderDetailId(OrderDetails orderDetail) {
        OrderDetailsRespDTO orderDetailsRespDTO = new OrderDetailsRespDTO();
//        orderDetailsRespDTO.setOrderId(orderDetail.getOrder().getOrderId());
//        orderDetailsRespDTO.setOrderDetailId(orderDetail.getOrderDetailId());
        orderDetailsRespDTO.setProductId(orderDetail.getProduct().getProductId());
        orderDetailsRespDTO.setPrice(orderDetail.getPrice());
        orderDetailsRespDTO.setQuantity(orderDetail.getQuantity());
        orderDetailsRespDTO.setSubtotal(orderDetail.getSubtotal());
        return orderDetailsRespDTO;
    }

    public User userProfileToUser(UserProfileReqDTO userProfileReqDTO, String email) {
        User user = userRepository.getUserByEmail(email).get();
        user.setFirstName(userProfileReqDTO.getFirstName());
        user.setLastName(userProfileReqDTO.getLastName());
        user.setGender(userProfileReqDTO.getGender());
        user.setMobile(userProfileReqDTO.getMobile());
        return user;
    }
}
