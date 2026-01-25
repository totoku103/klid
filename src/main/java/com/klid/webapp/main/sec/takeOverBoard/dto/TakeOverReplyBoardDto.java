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

package com.klid.webapp.main.sec.takeOverBoard.dto;

/**
 * @author kdj
 *
 */
public class TakeOverReplyBoardDto {
	private int bultnTakeReplySeq;		//답글 게시판번호	
	private int bultnTakeSeq;			//게시판번호	
	private String bultnTakeReplyCont;	//내용
	private String regDate;				//작성일	
	private String regUserId;				//게시자Id
	private String regUserName;			//게시자명
	public int getBultnTakeReplySeq() {
		return bultnTakeReplySeq;
	}
	public void setBultnTakeReplySeq(int bultnTakeReplySeq) {
		this.bultnTakeReplySeq = bultnTakeReplySeq;
	}
	public int getBultnTakeSeq() {
		return bultnTakeSeq;
	}
	public void setBultnTakeSeq(int bultnTakeSeq) {
		this.bultnTakeSeq = bultnTakeSeq;
	}
	public String getBultnTakeReplyCont() {
		return bultnTakeReplyCont;
	}
	public void setBultnTakeReplyCont(String bultnTakeReplyCont) {
		this.bultnTakeReplyCont = bultnTakeReplyCont;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	
}
