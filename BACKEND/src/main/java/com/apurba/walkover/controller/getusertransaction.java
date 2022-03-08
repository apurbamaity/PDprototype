package com.apurba.walkover.controller;


import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.duebill;
import com.apurba.walkover.model.member;
import com.apurba.walkover.model.transaction;
import com.apurba.walkover.repository.duebillRepository;
import com.apurba.walkover.repository.memberRepository;
import com.apurba.walkover.repository.transactionRepository;

@RestController
public class getusertransaction {
	
	@Autowired
	public transactionRepository tranrepo;
	
	@PostMapping("/getusertransaction")
	public List<transaction> paywholebillMethod(@RequestBody member member) {
		List<transaction> t = tranrepo.findByuserid(member.getUserid());
		Collections.reverse(t);
		return t;
	}
	
}
