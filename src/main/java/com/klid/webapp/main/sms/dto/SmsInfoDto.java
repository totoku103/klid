/**
 * Program Name : TakeOverBoardDto.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.sms.dto;

/**
 * @author kdj
 *
 */
public class SmsInfoDto {
	private String sms_ip	;
	private String sms_port;
	private String sms_user;
	private String sms_pwd	;
	private String sms_sid	;

	public String getSms_ip() {
		return sms_ip;
	}

	public void setSms_ip(String sms_ip) {
		this.sms_ip = sms_ip;
	}

	public String getSms_port() {
		return sms_port;
	}

	public void setSms_port(String sms_port) {
		this.sms_port = sms_port;
	}

	public String getSms_user() {
		return sms_user;
	}

	public void setSms_user(String sms_user) {
		this.sms_user = sms_user;
	}

	public String getSms_pwd() {
		return sms_pwd;
	}

	public void setSms_pwd(String sms_pwd) {
		this.sms_pwd = sms_pwd;
	}

	public String getSms_sid() {
		return sms_sid;
	}

	public void setSms_sid(String sms_sid) {
		this.sms_sid = sms_sid;
	}
}
