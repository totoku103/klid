/**
 * Program Name : UserInoutHistMgmtServiceImpl.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 *
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */
package com.klid.webapp.main.hist.userActHist.service;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;

@Service("userActHistService")
public class UserActHistServiceImpl extends MsgService implements UserActHistService {

    @Resource(name = "userActHistMapper")
    private UserActHistMapper mapper;

	@Override
	public ReturnData getUserActHist(Criterion criterion){
		return new ReturnData(mapper.selectUserActHist(criterion.getCondition()));
	}
}
