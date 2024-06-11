package com.hoang.blogH.controllers;


import com.hoang.blogH.config.Exception.CustomFileFormatException;
import com.hoang.blogH.utils.UploadFileImage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload-image")
@CrossOrigin
public class ImageUploadController {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadImage(@RequestParam("image")MultipartFile file) throws IOException, CustomFileFormatException {
        try{
            return UploadFileImage.uploadImage(file);
        } catch (CustomFileFormatException ex){
            throw new CustomFileFormatException(ex.getMessage());
        }
    }
}
