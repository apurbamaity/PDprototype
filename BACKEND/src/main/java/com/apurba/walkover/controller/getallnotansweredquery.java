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
public class getallnotansweredquery {
	
	@Autowired
	public faqRepository faqrepo;
	
	@GetMapping("/getallnotansweredquery")
	public List<faq> getallnotansweredqueryMethod() {
		return faqrepo.findByStatus(0);
	}
	
	@PostMapping("/answerquestion")
	public int answerquestionMethod(@RequestBody faq faq) {
		faq f = faqrepo.findById(faq.getId()) ;
		f.setAnswer(faq.getAnswer());
		f.setStatus(1);
		faqrepo.save(f);
		return 202;
	}
	
	
}
