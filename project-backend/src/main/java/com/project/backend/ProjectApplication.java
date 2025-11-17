package com.project.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}


//    @Bean
//    public CommandLineRunner passwordEncoderLogger() {
//        return args -> {
//            String plainPassword = "test"; // Choose your desired password
//            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//            String hashedPassword = encoder.encode(plainPassword);
//            System.out.println("------------------------------------------------------");
//            System.out.println("USE THIS HASH IN YOUR DATABASE: " + hashedPassword);
//            System.out.println("------------------------------------------------------");
//        };
//    }

}
