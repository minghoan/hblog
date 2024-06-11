package com.hoang.blogH.config.Security;

import com.hoang.blogH.models.CustomPersonDetail;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "hoangcute";

    private static final Long JWT_EXPIRATION_AC = (long) (1000 * 60 * 60);

    private static final Long JWT_EXPIRATION_RF = (long) (1000 * 60 * 60 * 24) * 7;

    public String generateAccToken(CustomPersonDetail p){
        return builderToken(new HashMap<>(), p, JWT_EXPIRATION_AC);
    }

    public String generateRfToken(CustomPersonDetail p){
        return builderToken(new HashMap<>(), p, JWT_EXPIRATION_RF);
    }

    public String builderToken(HashMap<String, Object> extraClaims, CustomPersonDetail p, Long expiration){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(p.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        try {
            final Claims claims = extraAllClaims(token);
            return claimsResolver.apply(claims);
        } catch (RuntimeException ex) {
            throw new RuntimeException("Token has expired");
        }
    }

    public Claims extraAllClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException ex) {
            throw new RuntimeException("Token has expired");
        }
    }

    public String extraEmail(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (RuntimeException ex) {
            throw new RuntimeException("Token has expired");
        }
    }

    public Date extractExpiration(String token) throws ExpiredJwtException{
        try {
            return extractClaim(token, Claims::getExpiration);
        } catch (RuntimeException ex) {
            throw new RuntimeException("Token has expired");
        }
    }

    public boolean isTokenValid(String token, CustomPersonDetail customPersonDetail){
        try {
            return (extraEmail(token).equals(customPersonDetail.getUsername()) && !isTokenExpired(token));
        } catch (RuntimeException ex) {
            throw new RuntimeException("Token has expired");
        }
    }

    public boolean isTokenExpired(String token){
        try {
            return extractExpiration(token).before(new Date());
        }catch (RuntimeException ex) {
            throw new RuntimeException("Token has expired");
        }
    }
}
