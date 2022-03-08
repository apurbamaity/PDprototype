package com.apurba.walkover.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.apurba.walkover.model.duebill;
import com.apurba.walkover.model.feedback;

public interface feedbackRepository extends JpaRepository<feedback, Integer> {

}
