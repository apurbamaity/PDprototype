package com.apurba.walkover.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="member")
public class member {
	
	

	@Override
	public String toString() {
		return "member [id=" + id + ", username=" + username + ", userid=" + userid + ", teamlist=" + teamlist
				+ ", password=" + password + ", conpass=" + conpass + ", duebill=" + duebill + ", availablebill="
				+ availablebill + ", status=" + status + ", role=" + role + ", secretkey=" + secretkey + "]";
	}


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	
	private String userid;
	private String teamlist;
	private String password;
	private String conpass;
	
	private Integer duebill;
	private Integer availablebill;
	private String status;
	private String role;
	private String secretkey;
	private String carreg;
	
	
	
	public String getCarreg() {
		return carreg;
	}


	public void setCarreg(String carreg) {
		this.carreg = carreg;
	}


	public String getSecretkey() {
		return secretkey;
	}


	public void setSecretkey(String secretkey) {
		this.secretkey = secretkey;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public Integer getDuebill() {
		return duebill;
	}


	public Integer getAvailablebill() {
		return availablebill;
	}


	public String getStatus() {
		return status;
	}


	public void setDuebill(Integer duebill) {
		this.duebill = duebill;
	}


	public void setAvailablebill(Integer availablebill) {
		this.availablebill = availablebill;
	}


	public void setStatus(String status) {
		this.status = status;
	}



	public int getId() {
		return id;
	}


	public String getUsername() {
		return username;
	}


	public String getUserid() {
		return userid;
	}


	public String getTeamlist() {
		return teamlist;
	}


	public String getPassword() {
		return password;
	}


	public String getConpass() {
		return conpass;
	}


	public void setId(int id) {
		this.id = id;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public void setUserid(String userid) {
		this.userid = userid;
	}


	public void setTeamlist(String teamlist) {
		this.teamlist = teamlist;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public void setConpass(String conpass) {
		this.conpass = conpass;
	}


	
	

}
