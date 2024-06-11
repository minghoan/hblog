package com.hoang.blogH.controllers;

import com.hoang.blogH.models.Person;
import com.hoang.blogH.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/mail/api")
@CrossOrigin
public class MailController {

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private PersonRepository personRepository;

    @PostMapping("/send/newpassword")
    public ResponseEntity<String> sendNewPassword(@RequestBody String email){
        System.out.println(email);
        Person p = personRepository.findByEmail(email);
        if(p != null) {
            Random random = new Random();
            int randomNumber = random.nextInt(9999999);
            String newPassword = Integer.toHexString(randomNumber);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Cập nhật lại mật khẩu");
            message.setText("Mật khẩu mới là: " + newPassword + '\n' + "Sử dụng mật khẩu mới này để đăng nhập và thay đổi để tránh quên.");

            p.setPassword(passwordEncoder.encode(newPassword));
            personRepository.save(p);
            emailSender.send(message);
            return ResponseEntity.ok("Thay đổi mật khẩu thành công");
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Email đăng nhập không tồn tại");
    }
}
