/**
 * Program Name : FaqBoardDto.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2016. 08. 10.
 * 
 * Programmer Name  : Song young wook
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.sec.qnaBoard.dto;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author ywsong
 *
 */
public class QnaBoardDto {
	private int bultnNo;			//게시판번호	
	private String bultnType;		//게시판종류
	private String bultnTitle;		//제목
	private String bultnCont;		//내용
	private int readCnt;			//조회수
	private int rcmdCnt;			//추천수
	private String regDate;			//작성일	
	private String userId;			
	private String organCode;		//기관코드
	private String pntOrganCode;	//상위기관코드
	private String startDt;			//게시시작일자
	private String endDt;			//게시종료일자
	private int groupNo;			//답변그룹번호
	private int levelNo;			//답변레벨번호
	private int orderNo;			//답변순서
	private int cateNo;				//분류번호
	private String openScope;		//공개범위
	private String existFile;		//파일존재여뷰
	private int totalReplyCnt;		//전체응답수
	private int totalRcmdCnt;		//전체주천수
	private String isSecret;		//비밀글
	private String useYn;			//삭제여부
	private String pntUserId;		//상위기관사용자id
	private String htmlYn;			//html 사용여뷰
	private int groupItemNo;		//그룹항목
	private String control;			//권한
	private String userName;		//게시자명
	private int fileCount;			//첨부파일 수
	private String noticeType;		//공지타입(일반/중요)
	private String groupType;		//그룹타입
	private String cateName;		//그룹타입 값
	private String parentUserId;
	private String rum;

	private String sidoNm;			//시도 표시
	private String instNm;			//시군구 표시

	public String getRum() {
		return rum;
	}

	public void setRum(String rum) {
		this.rum = rum;
	}

	public String getParentUserId() {
		return parentUserId;
	}

	public void setParentUserId(String parentUserId) {
		this.parentUserId = parentUserId;
	}

	public int getBultnNo() {
		return bultnNo;
	}
	public void setBultnNo(int bultnNo) {
		this.bultnNo = bultnNo;
	}
	public String getBultnType() {
		return bultnType;
	}
	public void setBultnType(String bultnType) {
		this.bultnType = bultnType;
	}
	public String getBultnTitle() {
		return bultnTitle;
	}
	public void setBultnTitle(String bultnTitle) {
		this.bultnTitle = bultnTitle;
	}
	public String getBultnCont() {
		return bultnCont;
	}
	public void setBultnCont(String bultnCont) {
		this.bultnCont = bultnCont;
	}
	public int getReadCnt() {
		return readCnt;
	}
	public void setReadCnt(int readCnt) {
		this.readCnt = readCnt;
	}
	public int getRcmdCnt() {
		return rcmdCnt;
	}
	public void setRcmdCnt(int rcmdCnt) {
		this.rcmdCnt = rcmdCnt;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getOrganCode() {
		return organCode;
	}
	public void setOrganCode(String organCode) {
		this.organCode = organCode;
	}
	public String getPntOrganCode() {
		return pntOrganCode;
	}
	public void setPntOrganCode(String pntOrganCode) {
		this.pntOrganCode = pntOrganCode;
	}
	public String getStartDt() {
		return startDt;
	}
	public void setStartDt(String startDt) {
		this.startDt = startDt;
	}
	public String getEndDt() {
		return endDt;
	}
	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}
	public int getGroupNo() {
		return groupNo;
	}
	public void setGroupNo(int groupNo) {
		this.groupNo = groupNo;
	}
	public int getLevelNo() {
		return levelNo;
	}
	public void setLevelNo(int levelNo) {
		this.levelNo = levelNo;
	}
	public int getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}
	public int getCateNo() {
		return cateNo;
	}
	public void setCateNo(int cateNo) {
		this.cateNo = cateNo;
	}
	public String getOpenScope() {
		return openScope;
	}
	public void setOpenScope(String openScope) {
		this.openScope = openScope;
	}
	public String getExistFile() {
		return existFile;
	}
	public void setExistFile(String existFile) {
		this.existFile = existFile;
	}
	public int getTotalReplyCnt() {
		return totalReplyCnt;
	}
	public void setTotalReplyCnt(int totalReplyCnt) {
		this.totalReplyCnt = totalReplyCnt;
	}
	public int getTotalRcmdCnt() {
		return totalRcmdCnt;
	}
	public void setTotalRcmdCnt(int totalRcmdCnt) {
		this.totalRcmdCnt = totalRcmdCnt;
	}
	public String getIsSecret() {
		return isSecret;
	}
	public void setIsSecret(String isSecret) {
		this.isSecret = isSecret;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getPntUserId() {
		return pntUserId;
	}
	public void setPntUserId(String pntUserId) {
		this.pntUserId = pntUserId;
	}
	public String getHtmlYn() {
		return htmlYn;
	}
	public void setHtmlYn(String htmlYn) {
		this.htmlYn = htmlYn;
	}
	public int getGroupItemNo() {
		return groupItemNo;
	}
	public void setGroupItemNo(int groupItemNo) {
		this.groupItemNo = groupItemNo;
	}
	public String getControl() {
		return control;
	}
	public void setControl(String control) {
		this.control = control;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getFileCount() {
		return fileCount;
	}
	public void setFileCount(int fileCount) {
		this.fileCount = fileCount;
	}
	public String getNoticeType() {
		return noticeType;
	}
	public void setNoticeType(String noticeType) {
		this.noticeType = noticeType;
	}
	public String getGroupType() {
		return groupType;
	}
	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}
	public String getCateName() {
		return cateName;
	}
	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	public String getSidoNm() {
		return sidoNm;
	}

	public void setSidoNm(String sidoNm) {
		this.sidoNm = sidoNm;
	}

	public String getInstNm() {
		return instNm;
	}

	public void setInstNm(String instNm) {
		this.instNm = instNm;
	}
}
