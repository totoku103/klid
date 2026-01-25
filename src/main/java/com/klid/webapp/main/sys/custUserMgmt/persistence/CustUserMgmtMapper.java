/**
 * Program Name	: CustUserMgmtMapper.java
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
package com.klid.webapp.main.sys.custUserMgmt.persistence;

import com.klid.webapp.main.sys.custUserMgmt.dto.CustUserMgmtDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("custUserMgmtMapper")
public interface CustUserMgmtMapper {

    /** SMS 사용자 리스트 받아오기 */
    List<CustUserMgmtDto> getSmsUserList(Map<String, Object> paramMap);

    /** SMS 외부 사용자 리스트 받아오기 */
    List<CustUserMgmtDto> getSmsOfUserList(Map<String, Object> paramMap);

    /** 사용자 폰번호 받아오기 */
    CustUserMgmtDto selectUserPhone(Map<String, Object> paramMap);

    List<Map<String, Object>> selectSmsGroup(Map<String, Object> map);

    void insertSmsGroup(Map<String, Object> paramMap);

    int updateSmsGroup(Map<String, Object> paramMap);

    int deleteSmsGroup(Map<String, Object> paramMap);

    int updateSmsTopGroup(Map<String, Object> paramMap);
}
