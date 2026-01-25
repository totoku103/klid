/**
 * Program Name		: PolicyConfService.java
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
import com.klid.webapp.common.ReturnData;

/**
 * @author jjung
 *
 */
public interface PolicyConfService {

	// 정책 조회
	ReturnData getPolicyConfInfo();

	// 정책 저장
	ReturnData savePolicyConf(Criterion criterion);

}
