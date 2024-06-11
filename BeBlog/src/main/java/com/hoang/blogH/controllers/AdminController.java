package com.hoang.blogH.controllers;

import com.hoang.blogH.dto.BlogDTO;
import com.hoang.blogH.dto.BlogProjection;
import com.hoang.blogH.services.BlogService;
import com.hoang.blogH.utils.FormatDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@CrossOrigin
public class AdminController {

    @Autowired
    private BlogService blogService;

    @GetMapping("/get/blog")
    public ResponseEntity<List<BlogDTO>> getBlog(){
        return ResponseEntity.ok(blogService.getAllBlog(false));
    }

    @PatchMapping("/update/blog/{id}")
    public void updateBlog(@PathVariable Long id){
        blogService.updateChecked(id);
    }
}
