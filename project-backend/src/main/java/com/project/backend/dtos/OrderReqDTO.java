package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderReqDTO {

    private int addressId;
    private List<OrderDetailsReqDTO> orderDetailsReqDTOList;

}
