/**
 * Program Name : UserInoutHistMgmtMapper.java
 * <p>
 * Version  :  1.0
 * <p>
 * Creation Date : 2018. 08. 17
 * <p>
 * Programmer Name  : devbong
 * <p>
 * Copyright 2018 Hamonsoft. All rights reserved.
 */
package com.klid.webapp.main.hist.userActHist.persistence;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.klid.webapp.main.hist.userActHist.dto.UserActHistDto;

@Repository("userActHistMapper")
public interface UserActHistMapper {

    void addUserActHist(Map<String, Object> paramMap);

    List<UserActHistDto> selectUserActHist(Map<String, Object> paramMap);

    int insertFileDownloadHistory(@Param("userActHistSeq") int userActHistSeq, @Param("reason") String reason, @Param("extraAttr") String extraAttr, @Param("fileName") String fileName);

}
