package com.hoang.blogH.auth;

import com.hoang.blogH.models.Person;
import com.hoang.blogH.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private  AuthService service;
    @Autowired
    private PersonRepository repository;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Person p){
        return service.authenticate(p);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody String jwt){
        return service.refreshToken(jwt);
    }

    @PostMapping("/logout")
    public void Logout(@RequestBody String jwt){
        service.logout(jwt);
    }

    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody Person p){
        return service.register(p);
    }

}
