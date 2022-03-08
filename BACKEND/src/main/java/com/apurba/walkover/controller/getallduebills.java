package com.apurba.walkover.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.duebill;
import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.duebillRepository;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class getallduebills {
	
	@Autowired
	public memberRepository memrepo;
	
	@Autowired
	public duebillRepository duebillrepo;
	
	@PostMapping("/getallduebills")
	public List<duebill> getallduebillsMethod(@RequestBody member member) {
		return duebillrepo.findByuserid(member.getUserid());
	}
	

}
