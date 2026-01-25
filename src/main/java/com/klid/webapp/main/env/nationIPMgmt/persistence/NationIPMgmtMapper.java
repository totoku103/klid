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
package com.klid.webapp.main.env.nationIPMgmt.persistence;



import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.main.env.nationIPMgmt.dto.NationIPMgmtDto;

@Repository("nationIPMgmtMapper")
public interface NationIPMgmtMapper {

	/** 국가 리스트 조회 */
	public List<NationIPMgmtDto> selectNationMgmtList(Map<String, Object> paramMap);

	/** 국가정보 조회 */
	public List<NationIPMgmtDto> selectNationMgmtInfo(Map<String, Object> paramMap);

	/** 국가 도메인 리스트 조회  */
	public List<NationIPMgmtDto> selectNationList_domain();

	/** IP대역에 해당하는 국가코드 조회  */
	public List<NationIPMgmtDto> selectNationIP_nationCd(Map<String, Object> paramMap);

	/** 국가별 IP대역 리스트 조회  */
	public List<NationIPMgmtDto> selectNationIPList(Map<String, Object> paramMap);
	
	/** 국가 추가 */
	public void insertNation(Map<String, Object> paramMap);

	/** 국가IP 추가 */
	public void insertNationIp(Map<String, Object> paramMap);

	/** 국가IP 추가 */
	public void insertNationIp_list(Map<String, Object> paramMap);
	
	/** 국가IP 전체 삭제 */
	public void deleteNationIP_all();

	/** 국가정보 조회  */
	public NationIPMgmtDto selectNationDetail(Map<String, Object> paramMap);

	/** 국가정보 수정 */
	public int editNation(Map<String, Object> paramMap);

	
}
