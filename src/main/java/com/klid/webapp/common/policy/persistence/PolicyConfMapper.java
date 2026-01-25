/**
 * Program Name		: PolicyConfMapper.java
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
package com.klid.webapp.common.policy.persistence;


import com.klid.webapp.common.dto.PolicyDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author jjung
 *
 */
@Repository("policyConfMapper")
public interface PolicyConfMapper {

	
	// 정책 조회
	List<PolicyDto> selectPolicyConfInfo(Map<String, Object> paramMap);
	
	//정책 저장
	void updatePolicyConfig(Map<String, Object> paramMap);

}