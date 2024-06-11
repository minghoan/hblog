package com.hoang.blogH.services;

import com.hoang.blogH.dto.BlogDTO;
import com.hoang.blogH.dto.BlogProjection;
import com.hoang.blogH.models.Blog;
import com.hoang.blogH.repositories.BlogRepository;
import com.hoang.blogH.utils.FormatDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService{

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<BlogDTO> getAllBlog(boolean check){
        List<BlogProjection> list = check ? blogRepository.findAllBlogChecked() : blogRepository.findAllBlogNoChecked();
        List<BlogDTO> newList = list.stream()
                .map((value) -> BlogDTO.builder()
                        .idBlog(value.getId_blog())
                        .title(value.getTitle())
                        .avatar(value.getAvatar())
                        .email(value.getEmail())
                        .textHtml(value.getText_html())
                        .textMarkdown(value.getText_markdown())
                        .idTopic(value.getId_topic())
                        .createdAt(FormatDateUtil.stringDate(value.getCreated_at()))
                        .updateddAt(FormatDateUtil.stringDate(value.getUpdated_at()))
                        .deleted(value.getDeleted())
                        .checked(value.getChecked())
                        .build()
                )
                .collect(Collectors.toList());
        return  newList;
    }

    @Override
    public BlogDTO getOneBlog(Long id){
        BlogProjection blogProjection = blogRepository.findOneBlog(id);
        return BlogDTO.builder()
                .idBlog(blogProjection.getId_blog())
                .title(blogProjection.getTitle())
                .avatar(blogProjection.getAvatar())
                .email(blogProjection.getEmail())
                .textHtml(blogProjection.getText_html())
                .textMarkdown(blogProjection.getText_markdown())
                .idTopic(blogProjection.getId_topic())
                .createdAt(FormatDateUtil.stringDate(blogProjection.getCreated_at()))
                .updateddAt(FormatDateUtil.stringDate(blogProjection.getUpdated_at()))
                .checked(blogProjection.getChecked())
                .deleted(blogProjection.getDeleted())
                .build();
    }

    @Override
    public void updateChecked(Long id){
        Optional<Blog> blog = blogRepository.findById(id);
        Blog b = blog.orElse(null);
        b.setChecked(true);
        blogRepository.save(b);
    }

    @Override
    public List<BlogDTO> getAllBlogByOneAcc(String email){
        List<BlogProjection> list = blogRepository.findAllBlogByOneAcc(email);
        List<BlogDTO> newList = list.stream()
                .map((value) -> BlogDTO.builder()
                        .idBlog(value.getId_blog())
                        .title(value.getTitle())
                        .avatar(value.getAvatar())
                        .email(value.getEmail())
                        .textHtml(value.getText_html())
                        .textMarkdown(value.getText_markdown())
                        .idTopic(value.getId_topic())
                        .createdAt(FormatDateUtil.stringDate(value.getCreated_at()))
                        .updateddAt(FormatDateUtil.stringDate(value.getUpdated_at()))
                        .checked(value.getChecked())
                        .deleted((value.getDeleted()))
                        .build()
                )
                .collect(Collectors.toList());
        return  newList;
    }

    @Override
    public void deleteBlog(Long id){
        Optional<Blog> blogOptional = blogRepository.findById(id);
        Blog b = blogOptional.orElse(null);
        if(b != null) {
            if (b.isDeleted()) {
                blogRepository.delete(b);
            } else {
                b.setDeleted(true);
                blogRepository.save(b);
            }
        }
    }

    @Override
    public void revokeBlog(Long id){
        Optional<Blog> blogOptional = blogRepository.findById(id);
        Blog b = blogOptional.orElse(null);
        b.setDeleted(false);
        blogRepository.save(b);
    }

    @Override
    public List<BlogDTO> getAllBlogByTopic(Long id){
        List<BlogProjection> list = blogRepository.findAllBlogByTopic(id);
        List<BlogDTO> newList = list.stream()
                .map((value) -> BlogDTO.builder()
                        .idBlog(value.getId_blog())
                        .title(value.getTitle())
                        .avatar(value.getAvatar())
                        .email(value.getEmail())
                        .textHtml(value.getText_html())
                        .textMarkdown(value.getText_markdown())
                        .idTopic(value.getId_topic())
                        .createdAt(FormatDateUtil.stringDate(value.getCreated_at()))
                        .updateddAt(FormatDateUtil.stringDate(value.getUpdated_at()))
                        .checked(value.getChecked())
                        .deleted((value.getDeleted()))
                        .build()
                )
                .collect(Collectors.toList());
        return  newList;
    }
}
