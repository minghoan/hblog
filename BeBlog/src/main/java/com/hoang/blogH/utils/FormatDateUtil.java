package com.hoang.blogH.utils;

import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class FormatDateUtil {
    public static String stringDate(LocalDateTime dateTime){
        String date;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss a");
        return dateTime.format(formatter);
    }
}
