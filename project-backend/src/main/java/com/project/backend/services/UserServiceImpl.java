package com.project.backend.services;

import com.project.backend.dtos.AddressReqDTO;
import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.UserProfileReqDTO;
import com.project.backend.dtos.UserProfileResponseDto;
import com.project.backend.entities.Address;
import com.project.backend.repository.AddressRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private EntityMapper mapper;

    public void getAllCategories(){
    }

    public void updateUser(UserProfileReqDTO userProfileReqDTO, String email) {
        User user = mapper.userProfileToUser(userProfileReqDTO, email);
        userRepository.save(user);
    }

    @Override
    public UserProfileResponseDto getUserProfile(String email) {
        User user = userRepository.getUserByEmail(email).get();
        return mapper.userToUserProfileResponse(user);
    }

    public void addAddress(AddressReqDTO addressReqDTO, String email) {
        User user = mapper.userEmailToId(email);
        Address address = new Address();
        address.setAddressLine(addressReqDTO.getAddressLine());
        address.setUser(user);
        address.setCity(addressReqDTO.getCity());
        address.setState(addressReqDTO.getState());
        address.setCountry(addressReqDTO.getCountry());
        address.setPincode(addressReqDTO.getPincode());
        address.setLandmark(addressReqDTO.getLandmark());
        address.setAddressType(addressReqDTO.getAddressType());
        addressRepository.save(address);

    }


    @Override
    public List<Address> getUserAddress(String email) {
        int userId = mapper.userEmailToId(email).getUserId();
        return userRepository.getAllAddresses(userId);
    }
}
