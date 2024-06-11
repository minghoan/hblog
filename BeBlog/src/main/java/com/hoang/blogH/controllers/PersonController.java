package com.hoang.blogH.controllers;

import com.hoang.blogH.config.Exception.CustomFileFormatException;
import com.hoang.blogH.dto.BlogDTO;
import com.hoang.blogH.services.BlogService;
import com.hoang.blogH.services.PersonService;
import com.hoang.blogH.utils.UploadFileImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PersonController {

    @Autowired
    private PersonService personService;
    @Autowired
    private BlogService blogService;

    @PostMapping("/get/info")
    public ResponseEntity<?> getInfo(@RequestBody String jwt) {
        return personService.getInfo(jwt);
    }

    @PostMapping("/post/blog")
    public void postBlog(@RequestBody BlogDTO blog) {
        personService.saveBlog(blog);
    }

    @GetMapping("/get/{id}/blog")
    public ResponseEntity<BlogDTO> getBlog(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getOneBlog(id));
    }

    @GetMapping("/get/blogChecked")
    public ResponseEntity<List<BlogDTO>> getBlog() {
        return ResponseEntity.ok(blogService.getAllBlog(true));
    }

    @GetMapping("/getAll/blog/{email}")
    public ResponseEntity<List<BlogDTO>> getAllBlogByEmail(@PathVariable String email) {
        return ResponseEntity.ok(blogService.getAllBlogByOneAcc(email));
    }

    @GetMapping("/getAll/blog/topic/{id}")
    public ResponseEntity<List<BlogDTO>> getAllBlogByTopic(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getAllBlogByTopic(id));
    }

    @DeleteMapping("/delete/blog/{id}")
    public void deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
    }

    @PatchMapping("/revoke/blog/{id}")
    public void revokeBlog(@PathVariable Long id) {
        blogService.revokeBlog(id);
    }

    @PatchMapping("/update/blog")
    public void updateBlog(@RequestBody BlogDTO blogDTO) {
        personService.updateBlog(blogDTO);
    }

    @PatchMapping(value = "/update/avatar/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updateAvatar(@RequestParam("image") MultipartFile file, @PathVariable Long id) throws IOException, CustomFileFormatException {
        try {
            personService.updateAvatar(UploadFileImage.uploadImage(file), id);
        }catch (CustomFileFormatException ex){
            throw new CustomFileFormatException(ex.getMessage());
        }
    }

    @PatchMapping("/update/accountName/{id}")
    public void updateAccountName(@PathVariable Long id, @RequestBody String newName) {
        personService.updateAccountName(newName, id);
    }

    @PatchMapping("/update/password/{id}")
    public ResponseEntity<?> updatePassword(@RequestBody String req, @PathVariable Long id){
        String[] mang = req.split(",");
        String newPassword = mang[0];
        String password = mang[1];
        return personService.updatePassword(newPassword, password, id);
    }
}
