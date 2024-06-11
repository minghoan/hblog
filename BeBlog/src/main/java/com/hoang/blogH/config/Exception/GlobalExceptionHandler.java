package com.hoang.blogH.config.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleExpiredJwtException(BadCredentialsException ex) {
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên đăng nhập hoặc mật khẩu không đúng");
    }

    @ExceptionHandler(CustomFileFormatException.class)
    public ResponseEntity<String> handleFileFormatException(CustomFileFormatException ex) {
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vui lòng chọn đúng định dạng file ảnh");
    }
}
