package com.apurba.walkover.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class changeusername {
	
	@Autowired
	public memberRepository memrepo;
	
	@PostMapping("/changeUsername")
	public int changeusernameMethod(@RequestBody member member) {
		member m = memrepo.findByuserid(member.getUserid()) ;
		
		m.setUsername(member.getUsername());
		memrepo.save(m);
		return 202;
	}
	
}
