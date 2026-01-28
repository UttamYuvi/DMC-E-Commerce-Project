package com.project.backend.services;

import com.project.backend.dtos.*;
import com.project.backend.entities.Address;
import com.project.backend.repository.AddressRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
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

    public String updatePassword(UpdatePasswordReqDTO updatePasswordReqDTO, Principal principal) {
        int userId = mapper.userEmailToId(principal.getName()).getUserId();
        String getUserOldPassword = userRepository.findById(userId).get().getPassword();
        String newPassword = passwordEncoder.encode(updatePasswordReqDTO.getNewPassword());
        int count = userRepository.updatePassword(newPassword,userId);
        if(count == 1)
            return "yess";
        return null;
    }

    @Override
    public List<Address> getUserAddress(String email) {
        int userId = mapper.userEmailToId(email).getUserId();
        return userRepository.getAllAddresses(userId);
    }
}
