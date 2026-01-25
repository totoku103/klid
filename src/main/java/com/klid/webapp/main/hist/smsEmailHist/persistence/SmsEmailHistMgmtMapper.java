/**
 * Program Name : SmsEmailHistMgmtMapper.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 *
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */
package com.klid.webapp.main.hist.smsEmailHist.persistence;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.main.hist.smsEmailHist.dto.SmsEmailHistMgmtDto;

@Repository("smsEmailHistMgmtMapper")
public interface SmsEmailHistMgmtMapper {

    List<SmsEmailHistMgmtDto> selectSmsHist(Map<String, Object> paramMap);

    List<SmsEmailHistMgmtDto> selectEmailHist(Map<String, Object> paramMap);

}
