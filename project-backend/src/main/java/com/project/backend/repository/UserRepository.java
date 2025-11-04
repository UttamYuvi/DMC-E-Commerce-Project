package com.project.backend.repository;

import com.project.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.email = :email")
    public User getUserByEmail(@Param("email") String email);

//    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName WHERE u.userId = :userId")
//    public User findUserByName(String firstName,String lastName,int userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName WHERE u.userId = :userId")
    public int updateUserName(@Param("firstName") String firstName,
                       @Param("lastName") String lastName,
                       @Param("userId") int userId);

//    List<User> findUserByVendorId(int uid);


}
