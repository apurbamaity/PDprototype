package com.apurba.walkover.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="duebill")
public class duebill {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String userid;
	private Integer billid;
	private String date;
	private Integer ammount;
	
	
	
	@Override
	public String toString() {
		return "duebill [id=" + id + ", userid=" + userid + ", billid=" + billid + ", date=" + date + ", ammount="
				+ ammount + "]";
	}
	
	
	public int getId() {
		return id;
	}
	public String getUserid() {
		return userid;
	}
	public Integer getBillid() {
		return billid;
	}
	public String getDate() {
		return date;
	}
	public Integer getAmmount() {
		return ammount;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public void setBillid(Integer billid) {
		this.billid = billid;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public void setAmmount(Integer ammount) {
		this.ammount = ammount;
	}
	
	
}
