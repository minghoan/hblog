package com.hoang.blogH.repositories;

import com.hoang.blogH.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
