package com.project.backend.repository;

import com.project.backend.entities.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Integer> {

    @Query("select u from UserCredentials u where u.email = :email")
    Optional<UserCredentials> getUserByEmail(@Param("email") String email);
}
