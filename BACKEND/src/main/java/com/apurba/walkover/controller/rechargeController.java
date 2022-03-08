package com.apurba.walkover.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class rechargeController {
	
	@Autowired
	public memberRepository memrepo;
	
	@PostMapping("/recharge")
	public int rechargeMethod(@RequestBody member member) {
		member m = memrepo.findByuserid(member.getUserid()) ;
		System.out.println(member.toString());
		
		m.setAvailablebill( m.getAvailablebill() + Integer.valueOf( member.getAvailablebill()));
		memrepo.save(m);
		return 202;
	}
	
}
