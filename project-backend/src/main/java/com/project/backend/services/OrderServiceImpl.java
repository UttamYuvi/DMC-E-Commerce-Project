package com.project.backend.services;

import com.project.backend.dtos.*;
import com.project.backend.entities.*;
import com.project.backend.repository.*;
import org.hibernate.event.spi.PreInsertEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private EntityMapper mapper;


    //done  //user
    public OrderRespDTO findOrderByOrderIdAndUserId(int orderId, int userId) {
        return mapper.newOrderToOrderRespDTO(orderRepository.findOrderByOrderIdAndUserId(orderId,userId));
    }

    //done  //user
    public List<OrderRespDTO> findOrdersByUserId(int userId) {
        List<Order> orders = orderRepository.findOrdersByUserId(userId);
        List<OrderRespDTO> orderRespDTOList = new ArrayList<>();
        for(Order order : orders) {
            orderRespDTOList.add(mapper.newOrderToOrderRespDTO(order));
        }
        return  orderRespDTOList;

    }

    public String cancelOrder(int orderId) {
        int count = orderRepository.cancelOrder(orderId);
        if(count == 1)
            return "Order Cancelled";
        return "Something went wrong";
    }

    //done  //user
    @Override
    public OrderRespDTO placeOrder(User user, OrderReqDTO orderReqDTO) {
        Order order = new Order();
        Address address = addressRepository.findById(orderReqDTO.getAddressId()).get();
        order.setUser(user);

        order.setOrderStatus("placed");
        order.setPaymentStatus("paid");
        order.setDeliveryAddress(address);
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        double total = 0;
        for(OrderDetailsReqDTO orderDetailsReqDTO : orderReqDTO.getOrderDetailsReqDTOList()) {
            Products product = productsRepository.findById(orderDetailsReqDTO.getProductId()).get();

            int quantity = orderDetailsReqDTO.getQuantity();
            double price = product.getPrice();
            double subtotal = price*quantity;
            total += subtotal;

            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setQuantity(quantity);
            orderDetail.setPrice(price);
            orderDetail.setProduct(product);
            orderDetail.setSubtotal(subtotal);
            orderDetail.setOrder(order);

            orderDetailsList.add(orderDetail);
        }
        order.setOrderDetails(orderDetailsList);
        order.setTotalAmount(total);
        orderRepository.save(order);

        return mapper.newOrderToOrderRespDTO(order);
    }

    @Override
    public List<OrderDetailsRespDTO> findOrderDetailsByOrderId(int orderId) {
        Order order = orderRepository.findById(orderId).get();
        List<OrderDetails> orderDetails = order.getOrderDetails();
        return mapper.getAllOrderDetailsRespDto(orderDetails);
    }

    @Override
    public OrderDetailsRespDTO findOrderDetailByOrderDetailId(int orderDetailId) {
        OrderDetails orderDetail = orderDetailsRepository.findById(orderDetailId).get();
        return mapper.getOrderDetailByOrderDetailId(orderDetail);

    }

    public int getVendorAllOrderCount(Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        long count = orderRepository.countOrders(vendorId);
        return (int) count;
    }

    public List<VendorOrderRespDTO> findAllOrderByVendor(Principal principal) {
        Vendor vendor = mapper.emailToId(principal.getName());
//        List<VendorOrderRespDTO> vendorOrderRespDTOs = orderRepository.findRecentOrdersByVendor(vendor.getVendorId());
//        return vendorOrderRespDTOs;
        List<Object[]> rows = orderRepository.findVendorOrders(vendor.getVendorId());

        return rows.stream()
                .map(r -> new VendorOrderRespDTO(
                        (String) r[0],                       // product name
                        (String) r[1],                       // customer name
                        (String) r[2],                       // date
                        ((Number) r[3]).intValue(),
                        ((Number) r[4]).doubleValue(),       // amount
                        (String) r[5]                        // status

                ))
                .collect(Collectors.toList());
    }

    public List<VendorOrderRespDTO> getAllOrderByStatus(String status, Principal principal) {
        Vendor vendor = mapper.emailToId(principal.getName());
        List<Object[]> rows = orderRepository.getAllOrderByStatus(vendor.getVendorId(),status);

        return rows.stream()
                .map(r -> new VendorOrderRespDTO(
                        (String) r[0],                       // product name
                        (String) r[1],                       // customer name
                        (String) r[2],                       // date
                        ((Number) r[3]).intValue(),
                        ((Number) r[4]).doubleValue(),       // amount
                        (String) r[5]                        // status

                ))
                .collect(Collectors.toList());
    }

    public List<ProductSalesRespDTO> getProductWiseSales(int vendorId) {

        List<Object[]> rows = orderRepository.getProductSales(vendorId);
        List<ProductSalesRespDTO> result = new ArrayList<>();

        for (Object[] row : rows) {
            result.add(new ProductSalesRespDTO(
                    (String) row[0],
                    ((Number) row[1]).doubleValue(),
                    ((Number) row[2]).doubleValue()
            ));
        }
        return result;
    }


}
