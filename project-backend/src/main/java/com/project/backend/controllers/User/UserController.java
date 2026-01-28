package com.project.backend.controllers.User;

import com.project.backend.dtos.AddressReqDTO;
import com.project.backend.dtos.Resp;
import com.project.backend.dtos.UpdatePasswordReqDTO;
import com.project.backend.dtos.UserProfileReqDTO;
import com.project.backend.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserProfileReqDTO userProfileReqDTO, Principal principal) {
        userService.updateUser(userProfileReqDTO,principal.getName());
        return ok("User updated");
    }

    @PostMapping("/address")
    public ResponseEntity<?> addAddress(@RequestBody AddressReqDTO addressReqDTO, Principal principal){
        userService.addAddress(addressReqDTO, principal.getName());
        return ok("Address Added with email :"+principal.getName());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Principal principal) {
        return ok(userService.getUserProfile(principal.getName()));
    }

    @GetMapping("/address")
    public ResponseEntity<?> getUserAddress(Principal principal) {
        System.out.println(principal.getName());
        return ok(userService.getUserAddress(principal.getName()));
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<Resp<?>> updatePassword(@RequestBody UpdatePasswordReqDTO updatePasswordReqDTO, Principal principal) {
        return ResponseEntity.ok(Resp.success(userService.updatePassword(updatePasswordReqDTO,principal),"password updated"));
    }


}
