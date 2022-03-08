package com.apurba.walkover.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="faq")
public class faq {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String userid;
	private String question;
	private String answer;
	private Integer status;
	
	
	
	
	@Override
	public String toString() {
		return "faq [id=" + id + ", userid=" + userid + ", question=" + question + ", answer=" + answer + ", status="
				+ status + "]";
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public int getId() {
		return id;
	}
	public String getUserid() {
		return userid;
	}
	public String getQuestion() {
		return question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	
	
	
	
	
	
	
	
}
