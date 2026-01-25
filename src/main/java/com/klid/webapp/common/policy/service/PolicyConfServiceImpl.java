/**
 * Program Name		: PolicyConfServiceImpl.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 10. 2.
 * 
 * Programmer Name  : jjung
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */
package com.klid.webapp.common.policy.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.dto.PolicyDto;
import com.klid.webapp.common.dto.PolicyInfoDto;
import com.klid.webapp.common.policy.persistence.PolicyConfMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * @author jjung
 *
 */
@Service("policyConfService")
public class PolicyConfServiceImpl extends MsgService implements PolicyConfService {
	
	@Resource(name = "policyConfMapper")
	private PolicyConfMapper mapper;
	
	/* 정책 조회  */
	@Override
	public ReturnData getPolicyConfInfo() {
		ReturnData returnData = new ReturnData();
			PolicyInfoDto infoDto = new PolicyInfoDto();
			List<PolicyDto> list = mapper.selectPolicyConfInfo(new HashMap<>());
			if(list != null && list.size() > 0) {
				for(PolicyDto dto : list) {
					switch(dto.getPolicyName()) {
						case "MAXWEEKS":
							infoDto.setMaxWeeks(dto.getVal1());
							break;
						case "RETRIES":
							infoDto.setRetries(dto.getVal1());
							break;
						case "RELEASETIME":
							infoDto.setReleaseTime(dto.getVal1());
							break;
						case "ALARM":
							infoDto.setAlarm(dto.getVal1());
							break;
						case "ALARM_MSG_HEAD":
							infoDto.setAlarmMsgHead(dto.getVal1());
							break;
						case "ALARM_MSG_FOOT":
							infoDto.setAlarmMsgFoot(dto.getVal1());
							break;
					}
				}
			}
			returnData.setResultData(infoDto);
		return returnData;
	}

	/*  정책 저장 */
	@Override
	public ReturnData savePolicyConf(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.updatePolicyConfig(criterion.getCondition());
		returnData.setResultData(getSaveOkMessage());
		return returnData;
	}

}
