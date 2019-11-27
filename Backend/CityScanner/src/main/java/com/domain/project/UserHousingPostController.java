package com.domain.project;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserHousingPostEntity;
import com.domain.project.repositories.*;

@RestController
@ComponentScan
public class UserHousingPostController {

	@Autowired
	UserHousingPostRepository userPostRepository;

	@CrossOrigin
	@PostMapping("/savehousepost")
	public void saveUserPost(@RequestBody UserHousingPostEntity userPost) {
		userPostRepository.save(userPost);
	}
	
	@CrossOrigin
	@PostMapping("/gethouseposts")
	public List<UserHousingPostEntity> getUserPost(@RequestBody UserHousingPostEntity userPost) {
		
		return userPostRepository.findByTitle(userPost.getPostsubjectname());
	}
}
