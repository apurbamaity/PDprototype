package com.apurba.walkover.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.feedback;
import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.feedbackRepository;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class postcomment {
	
	@Autowired
	public feedbackRepository feedrepo;
	
	@PostMapping("/postcomment")
	public int changeusernameMethod(@RequestBody feedback feedback) {
		feedrepo.save(feedback);
		return 203;
	}
	
}
