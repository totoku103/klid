/**
 * Program Name	: NoticeBoardMapper.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.env.instMgmt.persistence;



import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.main.env.instMgmt.dto.InstMgmtDto;

@Repository("instMgmtMapper")
public interface InstMgmtMapper {

	/** 기관관리 리스트 조회 */
	public List<InstMgmtDto> selectInstMgmtList(Map<String, Object> paramMap);

	/** 기관정보 조회 */
	public List<InstMgmtDto> selectInstMgmtInfo(Map<String, Object> paramMap);

	/** 기관정보 추가 */
	public void insertInst(Map<String, Object> paramMap);
	
	/** 기관정보 수정 */
	public void updateInst(Map<String, Object> paramMap);
	
	/** 기관정보 삭제 */
	public void deleteInst(Map<String, Object> paramMap);
}
