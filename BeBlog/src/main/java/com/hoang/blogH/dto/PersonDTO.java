package com.hoang.blogH.dto;

import com.hoang.blogH.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonDTO {
    private Long idPerson;
    private String accountName;
    private String avatar;
    private Role role;
    private String email;
}
