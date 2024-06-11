package com.hoang.blogH.utils;

import com.hoang.blogH.config.Exception.CustomFileFormatException;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

public class UploadFileImage {
    public static String uploadImage(MultipartFile file) throws IOException, CustomFileFormatException {
        String imageUploadDirectory = "target/classes/static/images";
        if(ImageIO.read(file.getInputStream()) == null){
          throw new CustomFileFormatException("Sai định dang file ảnh");
        }
        else {
            if (!file.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + StringUtils.cleanPath(file.getOriginalFilename());
                String filePath = imageUploadDirectory + "/" + fileName;
                try (OutputStream outputStream = new FileOutputStream(filePath)) {
                    IOUtils.copy(file.getInputStream(), outputStream);
                } catch (IOException e) {

                }
                return "/images/" + fileName;
            }
        }
        return null;
    }
}
