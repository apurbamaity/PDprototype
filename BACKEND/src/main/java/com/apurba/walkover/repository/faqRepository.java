package com.apurba.walkover.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apurba.walkover.model.duebill;
import com.apurba.walkover.model.faq;

public interface faqRepository extends JpaRepository<faq, Integer> {

	List<duebill> findByuserid(String userid);

	List<faq> findByStatus(int i);
	
	faq findById(int i);


}
