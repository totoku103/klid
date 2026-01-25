/**
 * Program Name : NoticeDto.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 14.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.sec.noticeBoard.dto;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author kdj
 *
 */
public class NoticeDto {
	private int boardNo;
	private String userId;
	private String boardTitle;
	private String boardContent;
	private int boardHits;
	private int boardType;
	private Date boardRegDate;
	private int boardParentNo;
	private int fileCount;
	private String userName;
	private String mdfId;
	private String mdfName;
	private String mdfDate;
	private String grpName;

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getBoardTitle() {
		return boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public String getBoardContent() {
		return boardContent;
	}

	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
	}

	public int getBoardHits() {
		return boardHits;
	}

	public void setBoardHits(int boardHits) {
		this.boardHits = boardHits;
	}

	public int getBoardType() {
		return boardType;
	}

	public void setBoardType(int boardType) {
		this.boardType = boardType;
	}

	public Date getBoardRegDate() {
		return boardRegDate;
	}

	public void setBoardRegDate(Date boardRegDate) {
		this.boardRegDate = boardRegDate;
	}

	public int getBoardParentNo() {
		return boardParentNo;
	}

	public void setBoardParentNo(int boardParentNo) {
		this.boardParentNo = boardParentNo;
	}

	public int getFileCount() {
		return fileCount;
	}

	public void setFileCount(int fileCount) {
		this.fileCount = fileCount;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * 년-월-일 시:분:초 로 시간 출력
	 */
	public String getFullTimeFormat() {
		SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
		return format.format(boardRegDate);
	}

	/**
	 * 오늘 날짜면 시:분:초 아니면 년-월-일
	 */
	public String getPrintTime() {
		SimpleDateFormat format = null;
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		if (boardRegDate.after(cal.getTime())) {
			format = new SimpleDateFormat("HH:mm:ss");
		} else {
			format = new SimpleDateFormat("YYYY-MM-dd");
		}
		return format.format(boardRegDate);
	}

	public String getMdfId() {
		return mdfId;
	}

	public void setMdfId(String mdfId) {
		this.mdfId = mdfId;
	}

	public String getMdfName() {
		return mdfName;
	}

	public void setMdfName(String mdfName) {
		this.mdfName = mdfName;
	}

	public String getMdfDate() {
		return mdfDate;
	}

	public void setMdfDate(String mdfDate) {
		this.mdfDate = mdfDate;
	}

	public String getGrpName() {
		return grpName;
	}

	public void setGrpName(String grpName) {
		this.grpName = grpName;
	}
}
