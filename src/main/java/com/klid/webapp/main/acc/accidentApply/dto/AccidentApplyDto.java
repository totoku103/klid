package com.klid.webapp.main.acc.accidentApply.dto;

/**
 * @author imhojong
 *
 */
public class AccidentApplyDto {
	private String accdTypCd;	//사고유형코드  3002
	private String acpnMthd;	//접수방법   3004
	private String attCrgr;		//공격자명
	private String attDept;		//공격부서
	private String attDtlsVia;	//공격세부루트   3010
	private String attEmail;	//공격 이메일
	private String attInstNm;	//공격기관
	private int attNatnCd;	//공격국가
	private String attSvrNm;	//공격호스트명
	private String attTelNo; 
	private String attTypCd;	//공격유형   3003
	private String attVia;		//공격루트 3009
	private String crgr;   		//사고처리담당자? 신고자?
	private String inciDttNm;	//탐지명

	private String dclCrgr;		//신고자명
	private String dclCrgrId;   //신고자아이디
	private String dclDept;		//신고자부서
	private String dclEmail; 
	private String dclHpNo;   	//신고자 핸폰	
	private int dclInstCd; 		//신고기관코드
	private String dclMail;   	//신고자 메일
	private String dclTelNo;  	//신고자 전번

	private String dmgCrgr;		//피해담당자
	private String dmgCpgr;
	private String dmgDept;		//피해부서
	private String dmgEmail;	
	private String dmgHpNo; 
	private int dmgInstCd; 	//피해기관		
	private int dmgNatnCd;  	//피해국가
	private String dmgSvrNm;	//피해호스트명
	private String dmgSvrUsrNm; //피해호스트용도
	private String dmgTelNo; 
	private String dngrGr;		//취약점등급  3007

	private String histoModifiedYn; 
	private String inciAcpnCd;  //사고접수 구분
	private String inciAcpnDt;  // 사고접수일자
	private String inciBelowCont;  //시도의견
	private String inciBgnDt;  	//사고열람일
	private String inciDclCont; //사고신고내용
	private String inciDt;		//사고일시
	private String inciEndCont; //사고내용(사유)
	private String inciEndDt; 
	private String inciInvsCont; //조사내용
	private String inciNo;		//사고접수번호
	private String inciNoMulti; 
	private String inciPrcsStat;  //처리상태  3001
	private String inciPrty;	//우선순위   3006
	private String inciTrnsCfdt; 
	private int inciTrnsRcptInstCd; //접수지역
	private int inciTrnsRcptSidoInstCd; //접수지역
	private int inciTrnsReqInstCd;  
	private String inciTrnsRqdt; 
	private String inciTrnsRslt; 
	private String inciTrnsYn; 
	private String inciTtl;	 	//사고제목
	private String inciTypCd;	//사고구분    3008
	private String inciUpdDt; 
	private int innciNoBefore; 
	private String ipsIp;   	// 침해사고시스템키1
	private String ncscNo; 
	private String netDiv;		// 망구분 
	private String osNm;		//운영체제
	private String packetKey;   //침해사고탐지시스템3
	private String recoInciCd;	//인지기관 4001
	private String riskLevel;	//침해등급   2001
	private String riskValue;	//침해지수
	private String tmsIp; 
	private String transInciPrcsStat;
	private String transSidoPrcsStat;
	private String trtMthdCd;

	
	private String multiTransYn; //다중이관여부 (개발원이나 상위기관에서 접수: N, 시군구에서 접수: Y)

	///////////서브쿼리 NAME/////////
	private String recoInciName; //인지기관명
	private String dclInstName;	 //신기관명
	private String dmgInstName;	 //접수(피해)기관명
	private String accdTypName;	 //사고유형명
	private String inciPrcsStatName;	//처리상태명
	private String inciPrtyName; 		//우순순위명
	private String acpnMthdName;		//접수방법먕
	private String riskLevelName;		//침해등급명
	private String netDivName;			//망구분명
	private String attTypName;	//공격유형먕
	private String attViaName;	//공격루트명
	private String attDtlsViaName;	//세부루트명
	private String transInciPrcsStatName; //이관처리상태명
	private String transSidoPrcsStatName; //시도이관처리상태명
	
	private String applyMultiYn;
	private String transMultiYn;
	private String weekYn; //주중 , 주말
	private String remarks;  // 1:해킹, 2:취약점탐지, 3:유해IP, 0:없음
	private String dmgNatnNm; //피해국가명
	private String attNatnNm; //공격국가명
	private String dmgInstNm; //피해기관명


	private int instCd;
	private int nationCd;
	private String comCode2;
	private String codeNm;
	private String dmgInstDepth; //피해기관 레벨
	private int remarksCd;
	private String attIp;			//공격기관 IP
	private String dmgIp;			//피해기관 IP
	private String attRemarks;		//공격기관 비고

	private int apply;
	private int ing;
	private int end;
	private int cnt1;
	private int cnt2;
	private int cnt3;
	private int cnt;
	private String name;
	
	private String attackTypeName; //비고 - 취약점 - 사고유형
	private String homepvCont;     //비고 - 취약점 - 조치내용
	
	private String hackAttTypeCd; //비고 - 해킹-사고유형 코드
	private String hackTypeNmSelf; //비고 - 해킹-사고유형 직접입력값
	private String hackTypeNm; //비고 - 해킹-사고유형 공통코드 값
	private String hackDomainNm; //비고 - 해킹-도메인
	private String hackNetDiv; //비고 - 해킹-망구분
	private String hackCont; //비고 - 해킹-조치내용
	private String inciTarget; //비고 - 해킹-사고대상

	private String userName;
	private String moblPhnNo;
	private String offcTelNo;
	private String offcFaxNo;
	private String emailAddr;
	private String instNm;
	private String hstyCont;
	private String hstyCrtDt;
	private String crtrId;

	private String inciTtlDtt;
	private int num;

	private String krNm;

	private int prcsStat;

	//시군구 이관 기관명
	private String tranSigunName;

	//시도 종결시간c
	private String siEndDt;

	public String getSiEndDt() {
		return siEndDt;
	}

	public void setSiEndDt(String siEndDt) {
		this.siEndDt = siEndDt;
	}

	public String getTranSigunName() {
		return tranSigunName;
	}

	public void setTranSigunName(String tranSigunName) {
		this.tranSigunName = tranSigunName;
	}

	public int getPrcsStat() {
		return prcsStat;
	}

	public void setPrcsStat(int prcsStat) {
		this.prcsStat = prcsStat;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public String getHackAttTypeCd() {
		return hackAttTypeCd;
	}
	public void setHackAttTypeCd(String hackAttTypeCd) {
		this.hackAttTypeCd = hackAttTypeCd;
	}
	public String getHackTypeNmSelf() {
		return hackTypeNmSelf;
	}
	public void setHackTypeNmSelf(String hackTypeNmSelf) {
		this.hackTypeNmSelf = hackTypeNmSelf;
	}
	public String getHackTypeNm() {
		return hackTypeNm;
	}
	public void setHackTypeNm(String hackTypeNm) {
		this.hackTypeNm = hackTypeNm;
	}
	public String getHackDomainNm() {
		return hackDomainNm;
	}
	public void setHackDomainNm(String hackDomainNm) {
		this.hackDomainNm = hackDomainNm;
	}
	public String getHackNetDiv() {
		return hackNetDiv;
	}
	public void setHackNetDiv(String hackNetDiv) {
		this.hackNetDiv = hackNetDiv;
	}
	public String getHackCont() {
		return hackCont;
	}
	public void setHackCont(String hackCont) {
		this.hackCont = hackCont;
	}
	public String getInciTarget() {
		return inciTarget;
	}
	public void setInciTarget(String inciTarget) {
		this.inciTarget = inciTarget;
	}
	public String getAttackTypeName() {
		return attackTypeName;
	}
	public void setAttackTypeName(String attackTypeName) {
		this.attackTypeName = attackTypeName;
	}
	public String getHomepvCont() {
		return homepvCont;
	}
	public void setHomepvCont(String homepvCont) {
		this.homepvCont = homepvCont;
	}
	public String getAttRemarks() {
		return attRemarks;
	}
	public void setAttRemarks(String attRemarks) {
		this.attRemarks = attRemarks;
	}
	public String getAttIp() {
		return attIp;
	}
	public void setAttIp(String attIp) {
		this.attIp = attIp;
	}
	public String getDmgIp() {
		return dmgIp;
	}
	public void setDmgIp(String dmgIp) {
		this.dmgIp = dmgIp;
	}
	public int getRemarksCd() {
		return remarksCd;
	}
	public void setRemarksCd(int remarksCd) {
		this.remarksCd = remarksCd;
	}
	public String getDmgInstDepth() {
		return dmgInstDepth;
	}
	public void setDmgInstDepth(String dmgInstDepth) {
		this.dmgInstDepth = dmgInstDepth;
	}
	public String getDmgNatnNm() {
		return dmgNatnNm;
	}
	public void setDmgNatnNm(String dmgNatnNm) {
		this.dmgNatnNm = dmgNatnNm;
	}
	public String getAttNatnNm() {
		return attNatnNm;
	}
	public void setAttNatnNm(String attNatnNm) {
		this.attNatnNm = attNatnNm;
	}
	public String getApplyMultiYn() {
		return applyMultiYn;
	}
	public void setApplyMultiYn(String applyMultiYn) {
		this.applyMultiYn = applyMultiYn;
	}
	public String getTransMultiYn() {
		return transMultiYn;
	}
	public void setTransMultiYn(String transMultiYn) {
		this.transMultiYn = transMultiYn;
	}
	public String getTransInciPrcsStatName() {
		return transInciPrcsStatName;
	}
	public void setTransInciPrcsStatName(String transInciPrcsStatName) {
		this.transInciPrcsStatName = transInciPrcsStatName;
	}
	public String getAccdTypCd() {
		return accdTypCd;
	}
	public void setAccdTypCd(String accdTypCd) {
		this.accdTypCd = accdTypCd;
	}
	public String getAcpnMthd() {
		return acpnMthd;
	}
	public void setAcpnMthd(String acpnMthd) {
		this.acpnMthd = acpnMthd;
	}
	public String getAttCrgr() {
		return attCrgr;
	}
	public void setAttCrgr(String attCrgr) {
		this.attCrgr = attCrgr;
	}
	public String getAttDept() {
		return attDept;
	}
	public void setAttDept(String attDept) {
		this.attDept = attDept;
	}
	public String getAttDtlsVia() {
		return attDtlsVia;
	}
	public void setAttDtlsVia(String attDtlsVia) {
		this.attDtlsVia = attDtlsVia;
	}
	public String getAttEmail() {
		return attEmail;
	}
	public void setAttEmail(String attEmail) {
		this.attEmail = attEmail;
	}
	public String getAttInstNm() {
		return attInstNm;
	}
	public void setAttInstNm(String attInstNm) {
		this.attInstNm = attInstNm;
	}
	public int getAttNatnCd() {
		return attNatnCd;
	}
	public void setAttNatnCd(int attNatnCd) {
		this.attNatnCd = attNatnCd;
	}
	public String getAttSvrNm() {
		return attSvrNm;
	}
	public void setAttSvrNm(String attSvrNm) {
		this.attSvrNm = attSvrNm;
	}
	public String getAttTelNo() {
		return attTelNo;
	}
	public void setAttTelNo(String attTelNo) {
		this.attTelNo = attTelNo;
	}
	public String getAttTypCd() {
		return attTypCd;
	}
	public void setAttTypCd(String attTypCd) {
		this.attTypCd = attTypCd;
	}
	public String getAttVia() {
		return attVia;
	}
	public void setAttVia(String attVia) {
		this.attVia = attVia;
	}
	public String getCrgr() {
		return crgr;
	}
	public void setCrgr(String crgr) {
		this.crgr = crgr;
	}
	public String getDclCrgr() {
		return dclCrgr;
	}
	public void setDclCrgr(String dclCrgr) {
		this.dclCrgr = dclCrgr;
	}
	public String getDclCrgrId() {
		return dclCrgrId;
	}
	public void setDclCrgrId(String dclCrgrId) {
		this.dclCrgrId = dclCrgrId;
	}
	public String getDclDept() {
		return dclDept;
	}
	public void setDclDept(String dclDept) {
		this.dclDept = dclDept;
	}
	public String getDclEmail() {
		return dclEmail;
	}
	public void setDclEmail(String dclEmail) {
		this.dclEmail = dclEmail;
	}
	public String getDclHpNo() {
		return dclHpNo;
	}
	public void setDclHpNo(String dclHpNo) {
		this.dclHpNo = dclHpNo;
	}
	public int getDclInstCd() {
		return dclInstCd;
	}
	public void setDclInstCd(int dclInstCd) {
		this.dclInstCd = dclInstCd;
	}
	public String getDclMail() {
		return dclMail;
	}
	public void setDclMail(String dclMail) {
		this.dclMail = dclMail;
	}
	public String getDclTelNo() {
		return dclTelNo;
	}
	public void setDclTelNo(String dclTelNo) {
		this.dclTelNo = dclTelNo;
	}
	public String getDmgCrgr() {
		return dmgCrgr;
	}
	public void setDmgCrgr(String dmgCrgr) {
		this.dmgCrgr = dmgCrgr;
	}
	public String getDmgCpgr() {
		return dmgCpgr;
	}
	public void setDmgCpgr(String dmgCpgr) {
		this.dmgCpgr = dmgCpgr;
	}
	public String getDmgDept() {
		return dmgDept;
	}
	public void setDmgDept(String dmgDept) {
		this.dmgDept = dmgDept;
	}
	public String getDmgEmail() {
		return dmgEmail;
	}
	public void setDmgEmail(String dmgEmail) {
		this.dmgEmail = dmgEmail;
	}
	public String getDmgHpNo() {
		return dmgHpNo;
	}
	public void setDmgHpNo(String dmgHpNo) {
		this.dmgHpNo = dmgHpNo;
	}
	public int getDmgInstCd() {
		return dmgInstCd;
	}
	public void setDmgInstCd(int dmgInstCd) {
		this.dmgInstCd = dmgInstCd;
	}
	public int getDmgNatnCd() {
		return dmgNatnCd;
	}
	public void setDmgNatnCd(int dmgNatnCd) {
		this.dmgNatnCd = dmgNatnCd;
	}
	public String getDmgSvrNm() {
		return dmgSvrNm;
	}
	public void setDmgSvrNm(String dmgSvrNm) {
		this.dmgSvrNm = dmgSvrNm;
	}
	public String getDmgSvrUsrNm() {
		return dmgSvrUsrNm;
	}
	public void setDmgSvrUsrNm(String dmgSvrUsrNm) {
		this.dmgSvrUsrNm = dmgSvrUsrNm;
	}
	public String getDmgTelNo() {
		return dmgTelNo;
	}
	public void setDmgTelNo(String dmgTelNo) {
		this.dmgTelNo = dmgTelNo;
	}
	public String getDngrGr() {
		return dngrGr;
	}
	public void setDngrGr(String dngrGr) {
		this.dngrGr = dngrGr;
	}
	public String getHistoModifiedYn() {
		return histoModifiedYn;
	}
	public void setHistoModifiedYn(String histoModifiedYn) {
		this.histoModifiedYn = histoModifiedYn;
	}
	public String getInciAcpnCd() {
		return inciAcpnCd;
	}
	public void setInciAcpnCd(String inciAcpnCd) {
		this.inciAcpnCd = inciAcpnCd;
	}
	public String getInciAcpnDt() {
		return inciAcpnDt;
	}
	public void setInciAcpnDt(String inciAcpnDt) {
		this.inciAcpnDt = inciAcpnDt;
	}
	public String getInciBelowCont() {
		return inciBelowCont;
	}
	public void setInciBelowCont(String inciBelowCont) {
		this.inciBelowCont = inciBelowCont;
	}
	public String getInciBgnDt() {
		return inciBgnDt;
	}
	public void setInciBgnDt(String inciBgnDt) {
		this.inciBgnDt = inciBgnDt;
	}
	public String getInciDclCont() {
		return inciDclCont;
	}
	public void setInciDclCont(String inciDclCont) {
		this.inciDclCont = inciDclCont;
	}
	public String getInciDt() {
		return inciDt;
	}
	public void setInciDt(String inciDt) {
		this.inciDt = inciDt;
	}
	public String getInciEndCont() {
		return inciEndCont;
	}
	public void setInciEndCont(String inciEndCont) {
		this.inciEndCont = inciEndCont;
	}
	public String getInciEndDt() {
		return inciEndDt;
	}
	public void setInciEndDt(String inciEndDt) {
		this.inciEndDt = inciEndDt;
	}
	public String getInciInvsCont() {
		return inciInvsCont;
	}
	public void setInciInvsCont(String inciInvsCont) {
		this.inciInvsCont = inciInvsCont;
	}
	public String getInciNo() {
		return inciNo;
	}
	public void setInciNo(String inciNo) {
		this.inciNo = inciNo;
	}
	public String getInciNoMulti() {
		return inciNoMulti;
	}
	public void setInciNoMulti(String inciNoMulti) {
		this.inciNoMulti = inciNoMulti;
	}
	public String getInciPrcsStat() {
		return inciPrcsStat;
	}
	public void setInciPrcsStat(String inciPrcsStat) {
		this.inciPrcsStat = inciPrcsStat;
	}
	public String getInciPrty() {
		return inciPrty;
	}
	public void setInciPrty(String inciPrty) {
		this.inciPrty = inciPrty;
	}
	public String getInciTrnsCfdt() {
		return inciTrnsCfdt;
	}
	public void setInciTrnsCfdt(String inciTrnsCfdt) {
		this.inciTrnsCfdt = inciTrnsCfdt;
	}
	public int getInciTrnsRcptInstCd() {
		return inciTrnsRcptInstCd;
	}
	public void setInciTrnsRcptInstCd(int inciTrnsRcptInstCd) {
		this.inciTrnsRcptInstCd = inciTrnsRcptInstCd;
	}
	public int getInciTrnsReqInstCd() {
		return inciTrnsReqInstCd;
	}
	public void setInciTrnsReqInstCd(int inciTrnsReqInstCd) {
		this.inciTrnsReqInstCd = inciTrnsReqInstCd;
	}
	public String getInciTrnsRqdt() {
		return inciTrnsRqdt;
	}
	public void setInciTrnsRqdt(String inciTrnsRqdt) {
		this.inciTrnsRqdt = inciTrnsRqdt;
	}
	public String getInciTrnsRslt() {
		return inciTrnsRslt;
	}
	public void setInciTrnsRslt(String inciTrnsRslt) {
		this.inciTrnsRslt = inciTrnsRslt;
	}
	public String getInciTrnsYn() {
		return inciTrnsYn;
	}
	public void setInciTrnsYn(String inciTrnsYn) {
		this.inciTrnsYn = inciTrnsYn;
	}
	public String getInciTtl() {
		return inciTtl;
	}
	public void setInciTtl(String inciTtl) {
		this.inciTtl = inciTtl;
	}
	public String getInciTypCd() {
		return inciTypCd;
	}
	public void setInciTypCd(String inciTypCd) {
		this.inciTypCd = inciTypCd;
	}
	public String getInciUpdDt() {
		return inciUpdDt;
	}
	public void setInciUpdDt(String inciUpdDt) {
		this.inciUpdDt = inciUpdDt;
	}
	public int getInnciNoBefore() {
		return innciNoBefore;
	}
	public void setInnciNoBefore(int innciNoBefore) {
		this.innciNoBefore = innciNoBefore;
	}
	public String getIpsIp() {
		return ipsIp;
	}
	public void setIpsIp(String ipsIp) {
		this.ipsIp = ipsIp;
	}
	public String getNcscNo() {
		return ncscNo;
	}
	public void setNcscNo(String ncscNo) {
		this.ncscNo = ncscNo;
	}
	public String getNetDiv() {
		return netDiv;
	}
	public void setNetDiv(String netDiv) {
		this.netDiv = netDiv;
	}
	public String getOsNm() {
		return osNm;
	}
	public void setOsNm(String osNm) {
		this.osNm = osNm;
	}
	public String getPacketKey() {
		return packetKey;
	}
	public void setPacketKey(String packetKey) {
		this.packetKey = packetKey;
	}
	public String getRecoInciCd() {
		return recoInciCd;
	}
	public void setRecoInciCd(String recoInciCd) {
		this.recoInciCd = recoInciCd;
	}
	public String getRiskLevel() {
		return riskLevel;
	}
	public void setRiskLevel(String riskLevel) {
		this.riskLevel = riskLevel;
	}
	public String getRiskValue() {
		return riskValue;
	}
	public void setRiskValue(String riskValue) {
		this.riskValue = riskValue;
	}
	public String getTmsIp() {
		return tmsIp;
	}
	public void setTmsIp(String tmsIp) {
		this.tmsIp = tmsIp;
	}
	public String getTransInciPrcsStat() {
		return transInciPrcsStat;
	}
	public void setTransInciPrcsStat(String transInciPrcsStat) {
		this.transInciPrcsStat = transInciPrcsStat;
	}
	public String getTrtMthdCd() {
		return trtMthdCd;
	}
	public void setTrtMthdCd(String trtMthdCd) {
		this.trtMthdCd = trtMthdCd;
	}
	public String getRecoInciName() {
		return recoInciName;
	}
	public void setRecoInciName(String recoInciName) {
		this.recoInciName = recoInciName;
	}
	public String getDclInstName() {
		return dclInstName;
	}
	public void setDclInstName(String dclInstName) {
		this.dclInstName = dclInstName;
	}
	public String getDmgInstName() {
		return dmgInstName;
	}
	public void setDmgInstName(String dmgInstName) {
		this.dmgInstName = dmgInstName;
	}
	public String getAccdTypName() {
		return accdTypName;
	}
	public void setAccdTypName(String accdTypName) {
		this.accdTypName = accdTypName;
	}
	public String getInciPrcsStatName() {
		return inciPrcsStatName;
	}
	public void setInciPrcsStatName(String inciPrcsStatName) {
		this.inciPrcsStatName = inciPrcsStatName;
	}
	public String getInciPrtyName() {
		return inciPrtyName;
	}
	public void setInciPrtyName(String inciPrtyName) {
		this.inciPrtyName = inciPrtyName;
	}
	public String getAcpnMthdName() {
		return acpnMthdName;
	}
	public void setAcpnMthdName(String acpnMthdName) {
		this.acpnMthdName = acpnMthdName;
	}
	public String getRiskLevelName() {
		return riskLevelName;
	}
	public void setRiskLevelName(String riskLevelName) {
		this.riskLevelName = riskLevelName;
	}
	public String getNetDivName() {
		return netDivName;
	}
	public void setNetDivName(String netDivName) {
		this.netDivName = netDivName;
	}

	public String getInciDttNm() {
		return inciDttNm;
	}

	public void setInciDttNm(String inciDttNm) {
		this.inciDttNm = inciDttNm;
	}
	public String getMultiTransYn() {
		return multiTransYn;
	}
	public void setMultiTransYn(String multiTransYn) {
		this.multiTransYn = multiTransYn;
	}
	public String getAttTypName() {
		return attTypName;
	}
	public void setAttTypName(String attTypName) {
		this.attTypName = attTypName;
	}
	public String getAttViaName() {
		return attViaName;
	}
	public void setAttViaName(String attViaName) {
		this.attViaName = attViaName;
	}
	public String getAttDtlsViaName() {
		return attDtlsViaName;
	}
	public void setAttDtlsViaName(String attDtlsViaName) {
		this.attDtlsViaName = attDtlsViaName;
	}

	public String getDmgInstNm() {
		return dmgInstNm;
	}

	public void setDmgInstNm(String dmgInstNm) {
		this.dmgInstNm = dmgInstNm;
	}

	public String getWeekYn() {
		return weekYn;
	}

	public void setWeekYn(String weekYn) {
		this.weekYn = weekYn;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getTransSidoPrcsStat() {
		return transSidoPrcsStat;
	}

	public void setTransSidoPrcsStat(String transSidoPrcsStat) {
		this.transSidoPrcsStat = transSidoPrcsStat;
	}

	public String getTransSidoPrcsStatName() {
		return transSidoPrcsStatName;
	}

	public void setTransSidoPrcsStatName(String transSidoPrcsStatName) {
		this.transSidoPrcsStatName = transSidoPrcsStatName;
	}

	public int getInstCd() {
		return instCd;
	}

	public void setInstCd(int instCd) {
		this.instCd = instCd;
	}

	public int getNationCd() {
		return nationCd;
	}

	public void setNationCd(int nationCd) {
		this.nationCd = nationCd;
	}

	public String getComCode2() {
		return comCode2;
	}

	public void setComCode2(String comCode2) {
		this.comCode2 = comCode2;
	}

	public int getApply() {
		return apply;
	}

	public void setApply(int apply) {
		this.apply = apply;
	}

	public int getIng() {
		return ing;
	}

	public void setIng(int ing) {
		this.ing = ing;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public int getCnt1() {
		return cnt1;
	}

	public void setCnt1(int cnt1) {
		this.cnt1 = cnt1;
	}

	public int getCnt2() {
		return cnt2;
	}

	public void setCnt2(int cnt2) {
		this.cnt2 = cnt2;
	}

	public int getCnt3() {
		return cnt3;
	}

	public void setCnt3(int cnt3) {
		this.cnt3 = cnt3;
	}

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCodeNm() {
		return codeNm;
	}

	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMoblPhnNo() {
		return moblPhnNo;
	}

	public void setMoblPhnNo(String moblPhnNo) {
		this.moblPhnNo = moblPhnNo;
	}

	public String getOffcTelNo() {
		return offcTelNo;
	}

	public void setOffcTelNo(String offcTelNo) {
		this.offcTelNo = offcTelNo;
	}

	public String getOffcFaxNo() {
		return offcFaxNo;
	}

	public void setOffcFaxNo(String offcFaxNo) {
		this.offcFaxNo = offcFaxNo;
	}

	public String getEmailAddr() {
		return emailAddr;
	}

	public void setEmailAddr(String emailAddr) {
		this.emailAddr = emailAddr;
	}

	public String getInstNm() {
		return instNm;
	}

	public void setInstNm(String instNm) {
		this.instNm = instNm;
	}

	public String getHstyCont() {
		return hstyCont;
	}

	public void setHstyCont(String hstyCont) {
		this.hstyCont = hstyCont;
	}

	public String getHstyCrtDt() {
		return hstyCrtDt;
	}

	public void setHstyCrtDt(String hstyCrtDt) {
		this.hstyCrtDt = hstyCrtDt;
	}

	public String getCrtrId() {
		return crtrId;
	}

	public void setCrtrId(String crtrId) {
		this.crtrId = crtrId;
	}

	public String getInciTtlDtt() {
		return inciTtlDtt;
	}

	public void setInciTtlDtt(String inciTtlDtt) {
		this.inciTtlDtt = inciTtlDtt;
	}

	public String getKrNm() {
		return krNm;
	}

	public void setKrNm(String krNm) {
		this.krNm = krNm;
	}

	public int getInciTrnsRcptSidoInstCd() {
		return inciTrnsRcptSidoInstCd;
	}

	public void setInciTrnsRcptSidoInstCd(int inciTrnsRcptSidoInstCd) {
		this.inciTrnsRcptSidoInstCd = inciTrnsRcptSidoInstCd;
	}
}
