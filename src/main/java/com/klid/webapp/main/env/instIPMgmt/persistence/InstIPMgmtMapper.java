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
package com.klid.webapp.main.env.instIPMgmt.persistence;



import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.main.env.instIPMgmt.dto.InstIPMgmtDto;

@Repository("instIPMgmtMapper")
public interface InstIPMgmtMapper {

	/** 기관IP대역 리스트 조회 */
	public List<InstIPMgmtDto> selectInstIPMgmtList(Map<String, Object> paramMap);

	/** 기관별 IP정보 리스트 조회  */
	public List<InstIPMgmtDto> selectInstIPList_instCd(Map<String, Object> paramMap);

	/** 기관IP정보 추가 */
	public void insertInstIP(Map<String, Object> paramMap);
	
	/** 기관IP정보 수정 */
	public void updateInstIP(Map<String, Object> paramMap);
	
	/** 기관IP정보 삭제 */
	public void deleteInstIP(Map<String, Object> paramMap);
}
