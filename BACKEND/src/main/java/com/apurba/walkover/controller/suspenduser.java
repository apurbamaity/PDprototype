package com.apurba.walkover.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.faq;
import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.faqRepository;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class suspenduser {
	
	@Autowired
	public memberRepository memrepo;
	
	@PostMapping("/suspenduser")
	public int suspenduserMethod(@RequestBody member member) {
		member m = memrepo.findByuserid(member.getUserid());
		m.setStatus("suspended");
		memrepo.save(m);
		return 205;
	}
}
