package com.project.backend.services;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.OrderDetailsReqDTO;
import com.project.backend.dtos.OrderDetailsRespDTO;
import com.project.backend.dtos.OrderRespDTO;
import com.project.backend.entities.Order;
import com.project.backend.entities.OrderDetails;
import com.project.backend.entities.Products;
import com.project.backend.entities.User;
import com.project.backend.repository.OrderDetailsRepository;
import com.project.backend.repository.OrderRepository;
import com.project.backend.repository.ProductsRepository;
import com.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    private EntityMapper mapper;


    @Override
    public List<OrderRespDTO> findAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderRespDTO> orderRespDTOList = new ArrayList<>();
        for(Order order : orders) {
            orderRespDTOList.add(mapper.newOrderToOrderRespDTO(order));
        }
        return orderRespDTOList;
    }

    public OrderRespDTO findOrderById(int orderId) {
        return mapper.newOrderToOrderRespDTO(orderRepository.findById(orderId).get());
    }

    @Override
    public OrderRespDTO placeOrder(int userId, List<OrderDetailsReqDTO> orderDetailsReqDTOS) {
        Order order = new Order();
        User user = userRepository.findById(userId).get();
        order.setUser(user);
        order.setOrderStatus("shipped");
        order.setPaymentStatus("paid");
        order.setDeliveryAddress(user.getAddress());
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        double total = 0;
        for(OrderDetailsReqDTO orderDetailsReqDTO : orderDetailsReqDTOS) {
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


}
