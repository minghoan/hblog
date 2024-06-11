package com.hoang.blogH.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "topic")
@Table()
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Topic {
    @Id
    @Column(name = "idTopic")
    private Long idTopic;
    @Column(name = "nameTopic")
    private String nameTopic;

    @JsonIgnore
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Blog> blogList = new ArrayList<>();
}
