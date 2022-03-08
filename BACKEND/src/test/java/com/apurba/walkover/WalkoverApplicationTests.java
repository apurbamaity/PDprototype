package com.apurba.walkover;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.apurba.walkover.model.duebill;
import com.apurba.walkover.model.faq;
import com.apurba.walkover.model.member;
import com.apurba.walkover.repository.duebillRepository;
import com.apurba.walkover.repository.faqRepository;
import com.apurba.walkover.repository.memberRepository;

@SpringBootTest
class WalkoverApplicationTests {
	
	
	@Autowired
	faqRepository faqrepo;

	@Test
	void contextLoads() {
		faq f = new faq();
		f.setAnswer("");
		f.setQuestion("what is this website for ?");
		f.setStatus(0);
		faqrepo.save(f);
	}

}
