package com.apurba.walkover.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
public class getalltransaction {
	
	@Autowired
	public transactionRepository tranrepo;
	
	@GetMapping("/getalltransaction")
	public List<transaction> getalltransactionMethod() {
		List<transaction> list = tranrepo.findAll();
		Collections.reverse(list);
		return list;
	}
	

}
