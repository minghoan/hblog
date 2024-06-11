package com.hoang.blogH.services;

import com.hoang.blogH.config.Security.JwtService;
import com.hoang.blogH.dto.BlogDTO;
import com.hoang.blogH.dto.PersonDTO;
import com.hoang.blogH.models.Blog;
import com.hoang.blogH.models.Person;
import com.hoang.blogH.models.Role;
import com.hoang.blogH.models.Topic;
import com.hoang.blogH.repositories.BlogRepository;
import com.hoang.blogH.repositories.PersonRepository;
import com.hoang.blogH.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService{

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> getInfo(String jwt){
        String email = jwtService.extraEmail(jwt);
        if (email != null) {
            Person p = personRepository.findByEmail(email);
            return ResponseEntity.ok(
                    PersonDTO.builder()
                            .idPerson(p.getIdPerson())
                            .accountName(p.getAccountName())
                            .avatar(p.getAvatar())
                            .role(p.getRole())
                            .email(p.getEmail())
                            .build()
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not implement yet");
    }


    @Override
    public void saveBlog(BlogDTO blog){
        Person person = personRepository.findByEmail(blog.getEmail());
        Optional<Topic> topicOptional = topicRepository.findById(blog.getIdTopic());
        Topic topic = topicOptional.orElse(null);
        Blog b =  Blog.builder()
                .person(person)
                .topic(topic)
                .textHtml(blog.getTextHtml())
                .textMarkdown(blog.getTextMarkdown())
                .title(blog.getTitle())
                .checked(person.getRole() == Role.USER ? false : true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        blogRepository.save(b);
    }

    @Override
    public void updateBlog(BlogDTO blogDTO){
        Optional<Blog> blog = blogRepository.findById(blogDTO.getIdBlog());
        Optional<Topic> topicOptional = topicRepository.findById(blogDTO.getIdTopic());
        Topic topic = topicOptional.orElse(null);
        Blog b = blog.orElse(null);
        b.setTextHtml(blogDTO.getTextHtml());
        b.setTextMarkdown(blogDTO.getTextMarkdown());
        b.setTitle(blogDTO.getTitle());
        b.setTopic(topic);
        b.setCreatedAt(LocalDateTime.now());
        blogRepository.save(b);
    }

    @Override
    public void updateAvatar(String avatar, Long id){
        Optional<Person> personOptional = personRepository.findById(id);
        Person p = personOptional.orElse(null);
        p.setAvatar(avatar);
        personRepository.save(p);
    }

    @Override
    public void updateAccountName(String accountName, Long id){
        Optional<Person> personOptional = personRepository.findById(id);
        Person p = personOptional.orElse(null);
        p.setAccountName(accountName);
        personRepository.save(p);
    }

    @Override
    public ResponseEntity<?> updatePassword(String newPassword, String password, Long id) {
        Optional<Person> personOptional = personRepository.findById(id);
        Person p = personOptional.orElse(null);
        if(passwordEncoder.matches(password, p.getPassword())){
            p.setPassword(passwordEncoder.encode(newPassword));
            personRepository.save(p);
            return ResponseEntity.ok("Thay đổi mật khẩu thành công");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu không khớp");
    }
}
