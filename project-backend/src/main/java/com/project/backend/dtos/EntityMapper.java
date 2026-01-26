package com.project.backend.dtos;

import com.project.backend.entities.*;
import com.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.smartcardio.CardTerminal;
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
    private CategoryRepository categoryRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;
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

    public List<SubCategoryByCategoryRespDTO> getSubCatByCat(List<SubCategory> subCategories, int categoryId){
        String categoryName = categoryRepository.findById(categoryId).get().getName();
        List<SubCategoryByCategoryRespDTO> subCategoryByCategoryRespDTOS = new ArrayList<>();
        for (SubCategory subCategory: subCategories){
            SubCategoryByCategoryRespDTO subCategoryByCategoryRespDTO = new SubCategoryByCategoryRespDTO();
            subCategoryByCategoryRespDTO.setCategoryName(categoryName);
            subCategoryByCategoryRespDTO.setCategoryId(categoryId);
            subCategoryByCategoryRespDTO.setSubCategoryId(subCategory.getSubCategoryId());
            subCategoryByCategoryRespDTO.setSubCategoryName(subCategory.getName());
            subCategoryByCategoryRespDTO.setImage(subCategory.getImage());
            subCategoryByCategoryRespDTOS.add(subCategoryByCategoryRespDTO);
        }
        return subCategoryByCategoryRespDTOS;

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
        String categoryName = products.getCategory().getName();
        String subCategoryName = products.getSubCategory().getName();
        productRespDTO.setProductId(products.getProductId());
        productRespDTO.setCategoryId(products.getCategory().getCategoryId());
        productRespDTO.setSubCategoryId(products.getSubCategory().getSubCategoryId());
        productRespDTO.setName(products.getName());
        productRespDTO.setDescription(products.getDescription());
        productRespDTO.setPrice(products.getPrice());
        productRespDTO.setStock(products.getStock());
        productRespDTO.setImages(products.getImages());
        productRespDTO.setCreatedAt(products.getCreatedAt());
        productRespDTO.setCategory(categoryName);
        productRespDTO.setSubCategory(subCategoryName);
        productRespDTO.setStatus(products.getStatus());
//        productRespDTO.setImages(productRespDTO.getImages());
        return productRespDTO;
    }

    public Products productReqToProducts(ProductReqDTO productReqDTO) {
        Products products = productsRepository.findById(productReqDTO.getProductId()).get();
        products.setStatus("continue");
//        products.setVendorId(productReqDTO.getVendorId());
        products.setName(productReqDTO.getName());
        products.setDescription(productReqDTO.getDescription());
        products.setPrice(productReqDTO.getPrice());
        products.setStock(productReqDTO.getStock());
        products.setStatus(productReqDTO.getStatus());
        Vendor vendor = vendorRepository.findById(products.getVendor().getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        Category category = categoryRepository.findById(products.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        SubCategory subCategory = subCategoryRepository.findById(products.getSubCategory().getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
        products.setVendor(vendor);
        products.setCategory(category);
        products.setSubCategory(subCategory);
        return products;
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

    public VendorAuthResponseDTO vendorAuthResponseDTO(Vendor vendor) {
        VendorAuthResponseDTO vendorAuthResponseDTO = new VendorAuthResponseDTO();
        vendorAuthResponseDTO.setVendorId(vendor.getVendorId());
        vendorAuthResponseDTO.setFirstName(vendor.getFirstName());
        vendorAuthResponseDTO.setLastName(vendor.getLastName());
        vendorAuthResponseDTO.setMobile(vendor.getMobile());
        vendorAuthResponseDTO.setEmail(vendor.getEmail());
        return vendorAuthResponseDTO;
    }

    public OrderRespDTO newOrderToOrderRespDTO(Order order) {
        OrderRespDTO orderRespDTO = new OrderRespDTO();
        orderRespDTO.setOrderId(order.getOrderId());
        orderRespDTO.setOrderStatus(order.getOrderStatus());
        orderRespDTO.setPaymentStatus(order.getPaymentStatus());
        orderRespDTO.setTotalAmount(order.getTotalAmount());
        orderRespDTO.setCustomerName(order.getUser().getFirstName()+" "+order.getUser().getLastName());
        orderRespDTO.setCustomerMobile(order.getUser().getMobile());
        orderRespDTO.setDeliveryAddress(order.getDeliveryAddress());

        List<OrderDetails> orderDetails = order.getOrderDetails();
        List<OrderDetailsRespDTO> orderDetailsRespDTOList = getAllOrderDetailsRespDto(orderDetails);
        orderRespDTO.setOrderDetails(orderDetailsRespDTOList);
        return orderRespDTO;
    }

    public List<OrderDetailsRespDTO> getAllOrderDetailsRespDto(List<OrderDetails> orderDetails) {
        List<OrderDetailsRespDTO> orderDetailsRespDTOList = new ArrayList<>();
        for(OrderDetails orderDetail : orderDetails) {
            Products product1 = productsRepository.findById(orderDetail.getProduct().getProductId()).get();
            OrderDetailsRespDTO orderDetailsRespDTO = new OrderDetailsRespDTO();
            orderDetailsRespDTO.setName(product1.getName());
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
