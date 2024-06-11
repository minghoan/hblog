package com.hoang.blogH.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity(name = "refreshToken")
@Table()
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idToken")
    private Long idToken;
    @Column(name = "token")
    private String token;
    @Column(name = "revoked")
    private boolean revoked;
    @Column(name = "expired")
    private boolean expired;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_Person")
    private Person person;

}
