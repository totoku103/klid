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
package com.klid.webapp.main.hist.userInoutHist.service;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.hist.userInoutHist.persistence.UserInoutHistMgmtMapper;

@Service("userInoutHistMgmtService")
public class UserInoutHistMgmtServiceImpl extends MsgService implements UserInoutHistMgmtService {

    @Resource(name = "userInoutHistMgmtMapper")
    private UserInoutHistMgmtMapper mapper;

	@Override
	public ReturnData getLogUserList(Criterion criterion){
		return new ReturnData(mapper.selectLogUserList(criterion.getCondition()));
	}

	@Override
	public ReturnData getUserInoutHist(Criterion criterion){
		return new ReturnData(mapper.selectUserInoutHist(criterion.getCondition()));
	}
}
