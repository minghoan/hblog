package com.hoang.blogH.dto;

import java.time.LocalDateTime;

public interface BlogProjection {
    Long getId_blog();
    String getTitle();
    String getEmail();
    String getText_html();
    String getText_markdown();
    String getAvatar();
    Long getId_topic();
    LocalDateTime getCreated_at();
    LocalDateTime getUpdated_at();
    Boolean getChecked();
    Boolean getDeleted();

}
