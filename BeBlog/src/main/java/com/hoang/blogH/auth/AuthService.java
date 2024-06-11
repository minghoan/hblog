package com.hoang.blogH.auth;

import com.hoang.blogH.config.Security.JwtService;
import com.hoang.blogH.models.CustomPersonDetail;
import com.hoang.blogH.models.Person;
import com.hoang.blogH.models.RefreshToken;
import com.hoang.blogH.models.Role;
import com.hoang.blogH.repositories.PersonRepository;
import com.hoang.blogH.repositories.RefreshTokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService personDetailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?> authenticate(Person p) throws BadCredentialsException {
        Authentication authentication;
        authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        p.getEmail(),
                        p.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomPersonDetail customPersonDetail = (CustomPersonDetail) personDetailService.loadUserByUsername(p.getEmail());
        String accessToken = jwtService.generateAccToken(customPersonDetail);
        String refreshToken = jwtService.generateRfToken(customPersonDetail);
        Person newU = personRepository.findByEmail(p.getEmail());
        revokeRefreshToken(newU);
        saveRefreshToken(newU, refreshToken);
        return ResponseEntity.ok(AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build());
    }

    public void saveRefreshToken(Person person, String jwt) {
        RefreshToken token = RefreshToken.builder()
                .token(jwt)
                .person(person)
                .expired(false)
                .revoked(false)
                .build();
        refreshTokenRepository.save(token);
    }

    public void revokeRefreshToken(Person person) {
        List<RefreshToken> list = refreshTokenRepository.findAllValidTokenByUser(person.getIdPerson());
        if (list.isEmpty()) return;
        list.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
            refreshTokenRepository.save(token);
        });
    }

    public ResponseEntity<?> refreshToken(String token) throws RuntimeException {
        String email = null;
        try {
            email = jwtService.extraEmail(token);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired");
        }
        Person p;
        AuthResponse authResponse = null;
        if (email != null) {
            p = personRepository.findByEmail(email);
            if (jwtService.isTokenValid(token, new CustomPersonDetail(p))) {
                String accessToken = jwtService.generateAccToken(new CustomPersonDetail(p));
                String refreshToken = jwtService.generateRfToken(new CustomPersonDetail(p));
                revokeRefreshToken(p);
                saveRefreshToken(p, refreshToken);
                authResponse = AuthResponse.builder()
                        .refreshToken(refreshToken)
                        .accessToken(accessToken)
                        .build();
                return ResponseEntity.ok(authResponse);
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null);

    }

    public void logout(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token).orElse(null);
        if (refreshToken != null) {
            refreshToken.setExpired(true);
            refreshToken.setRevoked(true);
            refreshTokenRepository.save(refreshToken);
            SecurityContextHolder.clearContext();
        }
    }

    public ResponseEntity<String> register(Person p) {
        Person person = personRepository.findByEmail(p.getEmail());
        if (person == null) {
            p.setPassword(passwordEncoder.encode(p.getPassword()));
            p.setRole(Role.USER);
            p.setAvatar("/images/579e593d-7a53-4c6c-b56e-726d0f1dae7eavatar-default.jpg");
            personRepository.save(p);
            return ResponseEntity.ok("Đăng kí thành công");
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Tài khoản đã tồn tại");
    }
}
