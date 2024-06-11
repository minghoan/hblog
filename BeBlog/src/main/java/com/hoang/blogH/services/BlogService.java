package com.hoang.blogH.services;

import com.hoang.blogH.dto.BlogDTO;

import java.util.List;

public interface BlogService {
    List<BlogDTO> getAllBlog(boolean check);
    List<BlogDTO> getAllBlogByOneAcc(String email);
    List<BlogDTO> getAllBlogByTopic(Long id);
    BlogDTO getOneBlog(Long id);
    void updateChecked(Long id);
    void deleteBlog(Long id);
    void revokeBlog(Long id);
}

