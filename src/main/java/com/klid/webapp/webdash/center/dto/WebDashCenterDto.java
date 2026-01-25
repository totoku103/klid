package com.klid.webapp.webdash.center.dto;

import com.klid.webapp.webdash.adminControl.dto.InciCntDto;

import java.util.List;

public class WebDashCenterDto {
	private String nationNm;
	private int nationCd;
	private int attCnt;
	private String regHh;
	private String sumJson;
	private String dayType;
	private List<InciCntDto> jsonList;

	public List<InciCntDto> getJsonList() {
		return jsonList;
	}

	public void setJsonList(List<InciCntDto> jsonList) {
		this.jsonList = jsonList;
	}

	public String getDayType() {
		return dayType;
	}
	public void setDayType(String dayType) {
		this.dayType = dayType;
	}
	public int getAttCnt() {
		return attCnt;
	}
	public void setAttCnt(int attCnt) {
		this.attCnt = attCnt;
	}
	public String getNationNm() {
		return nationNm;
	}
	public void setNationNm(String nationNm) {
		this.nationNm = nationNm;
	}
	public int getNationCd() {
		return nationCd;
	}
	public void setNationCd(int nationCd) {
		this.nationCd = nationCd;
	}

	public String getRegHh() {
		return regHh;
	}

	public void setRegHh(String regHh) {
		this.regHh = regHh;
	}

	public String getSumJson() {
		return sumJson;
	}

	public void setSumJson(String sumJson) {
		this.sumJson = sumJson;
	}
}


