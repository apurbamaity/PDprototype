package com.apurba.walkover.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class getuserdetails {
	
	
	@Autowired
	public memberRepository memrepo;
	
	@PostMapping("/getuserdetails")
	public member getuserdetailsMethod(@RequestBody member member) {
		member m = memrepo.findByuserid(member.getUserid());
		System.out.println(m.toString());
		return m;
	}
	
	@PostMapping("/getuserwhensignin")
	public member getuserwhensigninMethod(@RequestBody member member) {
		member m = memrepo.findByuserid(member.getUserid());
		System.out.println(m.toString());
		return m;
	}
}
