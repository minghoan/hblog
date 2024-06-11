package com.hoang.blogH.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogDTO{
    private Long idBlog;
    private String title;
    private String avatar;
    private String email;
    private String textHtml;
    private String textMarkdown;
    private Long idTopic;
    private String createdAt;
    private String updateddAt;
    private boolean checked;
    private boolean deleted;
}
