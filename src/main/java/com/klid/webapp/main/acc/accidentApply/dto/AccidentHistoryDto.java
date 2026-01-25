package com.klid.webapp.main.acc.accidentApply.dto;

/**
 * @author imhojong
 *
 */
public class AccidentHistoryDto {
	private int histNo;
	private int grpNo;
	private int grpRank;
	private int depth;
	private String ttl;
	private String hstyClf;
	private String hstyCrtDt;
	private String inciNo;
	private String crtrId;
	private String instCd;
	private String trnsYn;
	private String hstyCont;
	private String userName;
	private String instNm;

	public String getInstNm() {
		return instNm;
	}

	public void setInstNm(String instNm) {
		this.instNm = instNm;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getHistNo() {
		return histNo;
	}
	public void setHistNo(int histNo) {
		this.histNo = histNo;
	}
	public int getGrpNo() {
		return grpNo;
	}
	public void setGrpNo(int grpNo) {
		this.grpNo = grpNo;
	}
	public int getGrpRank() {
		return grpRank;
	}
	public void setGrpRank(int grpRank) {
		this.grpRank = grpRank;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	public String getTtl() {
		return ttl;
	}
	public void setTtl(String ttl) {
		this.ttl = ttl;
	}
	public String getHstyClf() {
		return hstyClf;
	}
	public void setHstyClf(String hstyClf) {
		this.hstyClf = hstyClf;
	}
	public String getHstyCrtDt() {
		return hstyCrtDt;
	}
	public void setHstyCrtDt(String hstyCrtDt) {
		this.hstyCrtDt = hstyCrtDt;
	}
	public String getInciNo() {
		return inciNo;
	}
	public void setInciNo(String inciNo) {
		this.inciNo = inciNo;
	}
	public String getCrtrId() {
		return crtrId;
	}
	public void setCrtrId(String crtrId) {
		this.crtrId = crtrId;
	}
	public String getInstCd() {
		return instCd;
	}
	public void setInstCd(String instCd) {
		this.instCd = instCd;
	}
	public String getTrnsYn() {
		return trnsYn;
	}
	public void setTrnsYn(String trnsYn) {
		this.trnsYn = trnsYn;
	}
	public String getHstyCont() {
		return hstyCont;
	}
	public void setHstyCont(String hstyCont) {
		this.hstyCont = hstyCont;
	}
	
}
