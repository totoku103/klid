package com.klid.webapp.common.file.dto;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class AttachfileDto implements Serializable {
	private String fileName, originalFileName, fileType, athPath;
	private long fileSize, fileNo, boardNo;
	private Date insertDate, updateDate;
	private String memo;

	public String getAthPath() {
		return athPath;
	}

	public void setAthPath(String athPath) {
		this.athPath = athPath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getOriginalFileName() {
		return originalFileName;
	}

	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public long getFileNo() {
		return fileNo;
	}

	public void setFileNo(long fileNo) {
		this.fileNo = fileNo;
	}

	public long getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(long boardNo) {
		this.boardNo = boardNo;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}
