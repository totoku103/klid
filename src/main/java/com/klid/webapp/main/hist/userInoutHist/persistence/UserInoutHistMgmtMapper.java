/**
 * Program Name : UserInoutHistMgmtMapper.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 *
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */
package com.klid.webapp.main.hist.userInoutHist.persistence;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.main.hist.userInoutHist.dto.UserInoutHistMgmtDto;

@Repository("userInoutHistMgmtMapper")
public interface UserInoutHistMgmtMapper {

    List<UserInoutHistMgmtDto> selectLogUserList(Map<String, Object> paramMap);

    List<UserInoutHistMgmtDto> selectUserInoutHist(Map<String, Object> paramMap);

}
