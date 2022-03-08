package com.apurba.walkover.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apurba.walkover.model.duebill;
import com.apurba.walkover.model.transaction;

public interface transactionRepository extends JpaRepository<transaction, Integer> {

	List<transaction> findByuserid(String userid);

}
