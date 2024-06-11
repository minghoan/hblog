package com.hoang.blogH.repositories;

import com.hoang.blogH.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    @Query(value = "SELECT * FROM refresh_token "
            + "WHERE id_person = :id", nativeQuery = true)
    List<RefreshToken> findAllValidTokenByUser(@Param("id") Long id);

    Optional<RefreshToken> findByToken(String token);
}
