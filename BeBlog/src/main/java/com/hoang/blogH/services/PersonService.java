package com.hoang.blogH.services;

import com.hoang.blogH.dto.BlogDTO;
import org.springframework.http.ResponseEntity;

public interface PersonService {
    public ResponseEntity<?> getInfo(String jwt);
    public void saveBlog(BlogDTO blogDTO);
    public void updateBlog(BlogDTO blogDTO);
    public void updateAvatar(String avatar, Long id);
    public void updateAccountName(String accountName, Long id);
    public ResponseEntity<?> updatePassword(String newPassword, String password, Long id);
}
