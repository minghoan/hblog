package com.hoang.blogH.config.Exception;

public class CustomFileFormatException extends Exception{
    private String message;

    public CustomFileFormatException (String message){
        this.message = message;
    }

    public String getMessage(){
        return this.message;
    }
}
