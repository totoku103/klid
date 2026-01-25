/**
 * Program Name : UserInoutHistMgmtDto.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 * 
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */

package com.klid.webapp.main.hist.userInoutHist.dto;

public class UserInoutHistMgmtDto {
	private long no;
	private String usrId;
    private String usrName;
    private String logDt;
    private String logCd;
    private String remark;
    private String usrIp;
    private String label;
    private String value;
    private String instNm;

	public String getInstNm() {
		return instNm;
	}
	public void setInstNm(String instNm) {
		this.instNm = instNm;
	}
	public long getNo() {
		return no;
	}
	public void setNo(long no) {
		this.no = no;
	}
	public String getUsrId() {
		return usrId;
	}
	public void setUsrId(String usrId) {
		this.usrId = usrId;
	}
	public String getUsrName() {
		return usrName;
	}
	public void setUsrName(String usrName) {
		this.usrName = usrName;
	}
	public String getLogDt() {
		return logDt;
	}
	public void setLogDt(String logDt) {
		this.logDt = logDt;
	}
	public String getLogCd() {
		return logCd;
	}
	public void setLogCd(String logCd) {
		this.logCd = logCd;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUsrIp() {
		return usrIp;
	}
	public void setUsrIp(String usrIp) {
		this.usrIp = usrIp;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
