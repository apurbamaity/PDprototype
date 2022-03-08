package com.apurba.walkover.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.apurba.walkover.model.duebill;

public interface duebillRepository extends JpaRepository<duebill, Integer> {

	List<duebill> findByuserid(String userid);
	duebill findById(int id);
	
	@Transactional
	@Modifying
	void deleteAllByuserid(String userid);

}
