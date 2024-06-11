package com.hoang.blogH.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity(name = "blog")
@Table()
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idBlog")
    private Long idBlog;
    @Column(name = "title", length = 1000)
    private String title;
    @Column(name = "textMarkdown", length = 10000000)
    private String textMarkdown;
    @Column(name = "textHtml", length = 10000000)
    private String textHtml;
    @Column(name = "checked", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private boolean checked;
    @Column(name = "deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean deleted;
    @Column(name = "createdAt")
    private LocalDateTime createdAt;
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_Person")
    private Person person;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_Topic")
    private Topic topic;
}
