package com.apurba.walkover.controller;


import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class getallusersuspend {
	
	@Autowired
	public memberRepository memrepo;
	
	@GetMapping("/getallusersuspend")
	public List<member> getallusersuspendMethod() {
		List<member> m = memrepo.findByduebillGreaterThan(500) ;
		List<member> m1 = m.stream().filter(o -> o.getStatus().equals("active")).collect(java.util.stream.Collectors.toList());
		return m1;
	}
	
}
