package com.apurba.walkover.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
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
public class tryautopay {
	
	@Autowired
	public memberRepository memrepo;
	
	@Autowired
	public transactionRepository tranrepo;
	
	@Autowired
	public duebillRepository duebillrepo;
	
	@PostMapping("/tryautopay")
	public int tryautopayMethod(@RequestBody member member) {
		member m = memrepo.findBysecretkey(member.getSecretkey()) ;
		if(m.getAvailablebill() >= member.getId()) {
			m.setAvailablebill(m.getAvailablebill() - member.getId());
			
			transaction t = new transaction();
			t.setUserid(m.getUserid());
			t.setAmmount(member.getId());
			Date d = new Date();  
		    SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");  
		    String strDate = formatter.format(d);  
		    t.setDate(strDate);
		    Random rand = new Random();
		    int resRandom = rand.nextInt((999999 - 100) + 1) + 10;
		    t.setBillid(resRandom);
		    tranrepo.save(t);
		    return 202;
		}else {
			duebill d = new duebill();
			d.setAmmount(member.getId());
			d.setUserid(m.getUserid());
			duebillrepo.save(d);
			m.setDuebill(m.getDuebill()+member.getId());
			memrepo.save(m);
			return 405;
			
		}
	}
	
}
