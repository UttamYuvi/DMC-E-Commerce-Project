package com.project.backend.repository;

import com.project.backend.entities.Address;
import com.project.backend.entities.User;
import com.project.backend.entities.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.email = :email")
    Optional<User> getUserByEmail(@Param("email") String email);

    User findByEmail(String email);

    @Query( value = """
            SELECT * from addresses where userId = :userId
            """, nativeQuery = true)
    List<Address> getAllAddresses(@Param("userId") int userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName WHERE u.email = :email")
    public int updateUserName(@Param("firstName") String firstName,
                       @Param("lastName") String lastName,
                       @Param("email") String username);

    @Modifying
    @Transactional
    @Query(value = "update users set password = :password where userId = :userId",nativeQuery = true)
    int updatePassword(@Param("password") String password, @Param("userId") int userId);


}
