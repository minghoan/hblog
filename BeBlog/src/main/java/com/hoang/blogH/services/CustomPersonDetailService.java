package com.hoang.blogH.services;

import com.hoang.blogH.models.CustomPersonDetail;
import com.hoang.blogH.models.Person;
import com.hoang.blogH.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomPersonDetailService implements UserDetailsService {

    @Autowired
    private PersonRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person p = repository.findByEmail(email);
        if(p == null) throw new UsernameNotFoundException(email);
        return new CustomPersonDetail(p);
    }
}
