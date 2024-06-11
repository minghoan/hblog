package com.hoang.blogH.repositories;

import com.hoang.blogH.dto.BlogDTO;
import com.hoang.blogH.dto.BlogProjection;
import com.hoang.blogH.models.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query(value = "SELECT Person.avatar, Person.email,Blog.deleted, Blog.checked, Blog.id_blog, Blog.title, Blog.text_html, Blog.text_markdown, Blog.id_topic, Blog.created_at, Blog.updated_at" +
            " FROM Blog" +
            " INNER JOIN Person ON Blog.id_person = Person.id_person" +
            " WHERE Blog.checked = false" +
            " ORDER BY Blog.created_at DESC", nativeQuery = true)
    List<BlogProjection> findAllBlogNoChecked();

    @Query(value = "SELECT Person.avatar, Person.email,Blog.deleted,  Blog.checked, Blog.id_blog, Blog.title, Blog.text_html, Blog.text_markdown, Blog.id_topic, Blog.created_at, Blog.updated_at" +
            " FROM Blog" +
            " INNER JOIN Person ON Blog.id_person = Person.id_person" +
            " WHERE Blog.checked = true" +
            " ORDER BY Blog.created_at DESC", nativeQuery = true)
    List<BlogProjection> findAllBlogChecked();

    @Query(value = "SELECT Person.avatar, Person.email,Blog.deleted, Blog.checked, Blog.id_blog, Blog.title, Blog.text_html, Blog.text_markdown, Blog.id_topic, Blog.created_at, Blog.updated_at" +
            " FROM Blog" +
            " INNER JOIN Person ON Blog.id_person = Person.id_person" +
            " WHERE Person.email = :email" +
            " ORDER BY Blog.created_at DESC", nativeQuery = true)
    List<BlogProjection> findAllBlogByOneAcc(String email);

    @Query(value = "SELECT Person.avatar, Person.email,Blog.deleted, Blog.checked, Blog.id_blog, Blog.title, Blog.text_html, Blog.text_markdown, Blog.id_topic, Blog.created_at, Blog.updated_at" +
            " FROM Blog" +
            " INNER JOIN Person ON Blog.id_person = Person.id_person" +
            " WHERE Blog.id_topic = :id" +
            " ORDER BY Blog.created_at DESC", nativeQuery = true)
    List<BlogProjection> findAllBlogByTopic(Long id);

    @Query(value = "SELECT Person.avatar, Person.email,Blog.deleted, Blog.checked, Blog.id_blog, Blog.title, Blog.text_html, Blog.text_markdown, Blog.id_topic, Blog.created_at, Blog.updated_at" +
            " FROM Blog" +
            " INNER JOIN Person ON Blog.id_person = Person.id_person" +
            " WHERE Blog.id_blog = :id" +
            " ORDER BY Blog.created_at DESC", nativeQuery = true)
    BlogProjection findOneBlog(@Param("id") Long id);
}
