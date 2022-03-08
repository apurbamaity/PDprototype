package com.apurba.walkover.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.apurba.walkover.model.member;

public interface memberRepository extends JpaRepository<member, Integer> {

	member findByuserid(String userid);
	member findByid(Integer i);
	List<member> findByduebillGreaterThan(int i);
	member findBysecretkey(String secretkey);
	member findBycarreg(String carreg);
	
	


}
