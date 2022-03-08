package com.apurba.walkover.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.walkover.model.faq;
import com.apurba.walkover.repository.faqRepository;

@RestController
public class faqcontroller {
	
	@Autowired
	public faqRepository faqrepo;
	
	@PostMapping("/askquestion")
	public int askquestionMethod(@RequestBody faq faq) {
		faq.setAnswer("not_answered");
		faq.setStatus(0);
		faqrepo.save(faq);
		return 202;
	}
	
	@GetMapping("/getallfaq")
	public List<faq> getallfaqMethod() {
		return faqrepo.findByStatus(1);
	}
	
}
