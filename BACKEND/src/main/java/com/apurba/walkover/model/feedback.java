package com.apurba.walkover.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="feedback")
public class feedback {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String userid;
	private String comment;
	private Integer rating;
	
	
	
	@Override
	public String toString() {
		return "feedback [id=" + id + ", userid=" + userid + ", comment=" + comment + ", rating=" + rating + "]";
	}
	public int getId() {
		return id;
	}
	public String getUserid() {
		return userid;
	}
	public String getComment() {
		return comment;
	}
	public Integer getRating() {
		return rating;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	
	
	
	
	
}
