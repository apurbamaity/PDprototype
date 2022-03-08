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
public class paywholebill {
	
	@Autowired
	public memberRepository memrepo;
	
	@Autowired
	public duebillRepository duebillrepo;
	
	@Autowired
	public transactionRepository tranrepo;
	
	@PostMapping("/paywholebill")
	public int paywholebillMethod(@RequestBody member member) {
		member m = memrepo.findByuserid(member.getUserid()) ;
		
		transaction t = new transaction();
		t.setUserid(member.getUserid());
		t.setAmmount(m.getDuebill());
		Date d = new Date();  
	    SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");  
	    String strDate = formatter.format(d);  
	    t.setDate(strDate);
	    Random rand = new Random();
	    int resRandom = rand.nextInt((999999 - 100) + 1) + 10;
	    t.setBillid(resRandom);
	    tranrepo.save(t);
	    
	    
	    
		m.setAvailablebill(m.getAvailablebill() - m.getDuebill());
		m.setDuebill( 0);
		m.setStatus("active");
		duebillrepo.deleteAllByuserid(member.getUserid());
		memrepo.save(m);
		return 202;
	}
	
	@PostMapping("/paysinglebill")
	public int paysinglebillMethod(@RequestBody duebill duebill) {
		duebill d = duebillrepo.findById(duebill.getId()) ;
		
		//handle the transaction table
		transaction t = new transaction();
		t.setUserid(duebill.getUserid());
		t.setAmmount(d.getAmmount());
		Date d1 = new Date();  
	    SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");  
	    String strDate = formatter.format(d1);  
	    t.setDate(strDate);
	    Random rand = new Random();
	    int resRandom = rand.nextInt((999999 - 100) + 1) + 10;
	    t.setBillid(resRandom);
	    tranrepo.save(t);
	    
		member m = memrepo.findByuserid(duebill.getUserid()) ;
		m.setAvailablebill( m.getAvailablebill() - d.getAmmount());
		m.setDuebill(m.getDuebill() - d.getAmmount());
		if(m.getDuebill() < 500 && m.getStatus().equals("suspended")) {
			m.setStatus("active");
		}
		memrepo.save(m);
		duebillrepo.delete(d);
		//System.out.println(m.toString());
		return 202;
	}
}
