package com.project.backend.dtos;

import com.project.backend.entities.*;
import com.project.backend.repository.CategoryRepository;
import com.project.backend.repository.SubCategoryRepository;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EntityMapper {

    Products product = new Products();

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public ProductRespDTO productToProductRespDTO(Products products) {
        ProductRespDTO productRespDTO = new ProductRespDTO();
        productRespDTO.setName(products.getName());
        productRespDTO.setDescription(products.getDescription());
        productRespDTO.setPrice(products.getPrice());
        productRespDTO.setStock(products.getStock());
        return productRespDTO;
    }

    public Products productReqToProducts(ProductReqDTO productReqDTO) {
        product.setStatus("continue");
//        product.setVendorId(productReqDTO.getVendorId());
        product.setName(productReqDTO.getName());
        product.setDescription(productReqDTO.getDescription());
        product.setPrice(productReqDTO.getPrice());
        product.setStock(productReqDTO.getStock());
        Vendor vendor = vendorRepository.findById(productReqDTO.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        Category category = categoryRepository.findById(productReqDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        SubCategory subCategory = subCategoryRepository.findById(productReqDTO.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
        product.setVendor(vendor);
        product.setCategory(category);
        product.setSubCategory(subCategory);
        return product;
    }

    public Products productReqDtoToUpdatedProduct(ProductReqDTO productReqDTO) {
        if(productReqDTO.getStock() == 0)
            product.setStatus("discontinue");
        else
            product.setStatus("continue");
//        product.setVendorId(productReqDTO.getVendorId());
        product.setName(productReqDTO.getName());
        product.setDescription(productReqDTO.getDescription());
        product.setPrice(productReqDTO.getPrice());
        product.setStock(productReqDTO.getStock());
        Vendor vendor = vendorRepository.findById(productReqDTO.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        Category category = categoryRepository.findById(productReqDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        SubCategory subCategory = subCategoryRepository.findById(productReqDTO.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
        product.setVendor(vendor);
        product.setCategory(category);
        product.setSubCategory(subCategory);
        return product;
    }

    public List<CategoryReqRespDTO> categoriesToCategoriesRespDTO(List<Category> categories) {
        List<CategoryReqRespDTO> categoryReqRespDTOList = new ArrayList<>();
        for(Category category : categories) {
            CategoryReqRespDTO categoryReqRespDTO = new CategoryReqRespDTO();
            categoryReqRespDTO.setName(category.getName());
            categoryReqRespDTOList.add(categoryReqRespDTO);
        }
        return categoryReqRespDTOList;
    }

    public List<SubCategoryRespDTO> subCategoriesToSubCategoriesRespDTO(List<SubCategory> subCategories) {
        List<SubCategoryRespDTO> subCategoryRespDTOList = new ArrayList<>();
        for(SubCategory subCategory : subCategories) {
            SubCategoryRespDTO subCategoryRespDTO = new SubCategoryRespDTO();
            subCategoryRespDTO.setName(subCategory.getName());
            subCategoryRespDTOList.add(subCategoryRespDTO);
        }
        return subCategoryRespDTOList;
    }

    public OrderRespDTO newOrderToOrderRespDTO(Order order) {
        OrderRespDTO orderRespDTO = new OrderRespDTO();
        orderRespDTO.setOrderId(order.getOrderId());
        orderRespDTO.setUserId(order.getUser().getUserId());
        orderRespDTO.setOrderStatus(order.getOrderStatus());
        orderRespDTO.setPaymentStatus(order.getPaymentStatus());
        orderRespDTO.setTotalAmount(order.getTotalAmount());
        orderRespDTO.setDeliveryAddress(order.getDeliveryAddress());

        List<OrderDetails> orderDetails = order.getOrderDetails();
        List<OrderDetailsRespDTO> orderDetailsRespDTOList = getAllOrderDetailsRespDto(orderDetails);
//        orderDetailsRespDTOList = new ArrayList<>();
//        for(OrderDetails orderDetail : orderDetails) {
//            OrderDetailsRespDTO orderDetailsRespDTO = new OrderDetailsRespDTO();
//            orderDetailsRespDTO.setOrderId(orderDetail.getOrder().getOrderId());
//            orderDetailsRespDTO.setOrderDetailId(orderDetail.getOrderDetailId());
//            orderDetailsRespDTO.setProductId(orderDetail.getProduct().getProductId());
//            orderDetailsRespDTO.setPrice(orderDetail.getPrice());
//            orderDetailsRespDTO.setQuantity(orderDetail.getQuantity());
//            orderDetailsRespDTO.setSubtotal(orderDetail.getSubtotal());
//            orderDetailsRespDTOList.add(orderDetailsRespDTO);
//        }
        orderRespDTO.setOrderDetails(orderDetailsRespDTOList);
        return orderRespDTO;
    }

    public List<OrderDetailsRespDTO> getAllOrderDetailsRespDto(List<OrderDetails> orderDetails) {
        List<OrderDetailsRespDTO> orderDetailsRespDTOList = new ArrayList<>();
        for(OrderDetails orderDetail : orderDetails) {
            OrderDetailsRespDTO orderDetailsRespDTO = new OrderDetailsRespDTO();
            orderDetailsRespDTO.setOrderId(orderDetail.getOrder().getOrderId());
            orderDetailsRespDTO.setOrderDetailId(orderDetail.getOrderDetailId());
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
        orderDetailsRespDTO.setOrderId(orderDetail.getOrder().getOrderId());
        orderDetailsRespDTO.setOrderDetailId(orderDetail.getOrderDetailId());
        orderDetailsRespDTO.setProductId(orderDetail.getProduct().getProductId());
        orderDetailsRespDTO.setPrice(orderDetail.getPrice());
        orderDetailsRespDTO.setQuantity(orderDetail.getQuantity());
        orderDetailsRespDTO.setSubtotal(orderDetail.getSubtotal());
        return orderDetailsRespDTO;
    }
}
