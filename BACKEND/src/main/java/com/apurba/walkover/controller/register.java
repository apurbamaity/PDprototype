package com.apurba.walkover.controller;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.memberRepository;

@RestController
public class register {
	
	@Autowired
	public memberRepository memrepo;
	
	@PostMapping("/register")
	public int registerNow(@RequestBody member member) {
		
		//System.out.print(member.toString());
		try {
			member m = memrepo.findByuserid(member.getUserid());
			member car = memrepo.findBycarreg(member.getCarreg());
			if(car != null) {
				return 406;
			}
			if(m== null) {
				member.setDuebill(0);
				member.setStatus("active");
				member.setAvailablebill(0);
				member.setRole("user");
				
				String sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				
				String secretkey = "";
				for(int i=0;i<16;i++) {
					int randomNum = ThreadLocalRandom.current().nextInt(0, sample.length());
					secretkey = secretkey + sample.charAt(randomNum);
				}
				member.setSecretkey(secretkey);
				memrepo.save(member);
				return 202;
			}else {
				return 405;
			}
		}catch(Exception e) {
			return 405;
		}
		
		
		
	}
	
	@GetMapping("/")
	public String home() {
		return "walkover";
		
	}
	
	@PostMapping("/signin")
	public int signin(@RequestBody member member) {
		
		
		member m = memrepo.findByuserid(member.getUserid());
		if(m==null) {
			return 401;
		}else if(m.getPassword().equals(member.getPassword())) {
			return m.getId();
		}else {
			return 402;
		}
	}
	
	
	

}
