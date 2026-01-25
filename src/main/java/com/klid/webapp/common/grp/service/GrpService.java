/**
 * Program Name	: GrpService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 29.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.grp.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

/**
 * @author jung
 *
 */
public interface GrpService {

	ReturnData getGrpDuplCnt(Criterion criterion);

	/** 권한그룹 */
	ReturnData getAuthGrpList(Criterion criterion);

	ReturnData addAuthGrp(Criterion criterion);

	ReturnData saveAuthGrp(Criterion criterion);

	ReturnData delAuthGrp(Criterion criterion);

	/** 기본그룹 */
	ReturnData getAuthConfDefaultGrpTreeListAll(Criterion criterion);

	ReturnData getDefaultGrpTreeListAll(Criterion criterion);

	ReturnData addDefaultGrp(Criterion criterion);
	
	ReturnData editDefaultGrp(Criterion criterion);

	ReturnData delDefaultGrp(Criterion criterion);

	ReturnData getDefaultGrpTreeList(Criterion criterion);

	ReturnData getVmSvrGrpTreeList(Criterion criterion);

	ReturnData getL4DefaultGrpTreeList(Criterion criterion);
	
	ReturnData getApDefaultGrpTreeList(Criterion criterion);
	
	/** 조회그룹 */
	ReturnData getSearchGrpTreeList(Criterion criterion);

	ReturnData addSearchGrp(Criterion criterion);

	ReturnData editSearchGrp(Criterion criterion);

	ReturnData delSearchGrp(Criterion criterion);

	/** 회선그룹 */
	ReturnData getIfGrpTreeList(Criterion criterion);

	ReturnData addIfGrp(Criterion criterion);

	ReturnData editIfGrp(Criterion criterion);

	ReturnData delIfGrp(Criterion criterion);

	/** 서버그룹 */
	ReturnData getServerGrpTreeList(Criterion criterion);

	ReturnData addSvrGrp(Criterion criterion);

	ReturnData editSvrGrp(Criterion criterion);

	ReturnData delSvrGrp(Criterion criterion);

	/** 망그룹 */
	ReturnData getMangGrpTreeList(Criterion criterion);

	ReturnData addMangGrp(Criterion criterion);

	ReturnData editMangGrp(Criterion criterion);
	
	ReturnData delMangGrp(Criterion criterion);

	/** 망흐름그룹 */
	ReturnData getMangFlowGrpTreeList(Criterion criterion);
	
	ReturnData addMangFlowGrp(Criterion criterion);

	ReturnData editMangFlowGrp(Criterion criterion);
	
	ReturnData delMangFlowGrp(Criterion criterion);

	/** 서비스그룹 */
	ReturnData getServiceGrpTreeList(Criterion criterion);

	ReturnData addServiceGrp(Criterion criterion);

	ReturnData editServiceGrp(Criterion criterion);

	ReturnData delServiceGrp(Criterion criterion);



	/** 서비스포트그룹 */
	ReturnData getSvcPortGrpList(Criterion criterion);

	ReturnData addSvcPortGrp(Criterion criterion);

	ReturnData editSvcPortGrp(Criterion criterion);

	ReturnData delSvcPortGrp(Criterion criterion);
	
	/** As그룹 */
	ReturnData getAsGrpTreeList(Criterion criterion);
	
	ReturnData addAsGrp(Criterion criterion);

	ReturnData editAsGrp(Criterion criterion);

	ReturnData delAsGrp(Criterion criterion);
	
	/** App그룹 */
	ReturnData getAppGrpTreeList(Criterion criterion);
	
	ReturnData addAppGrp(Criterion criterion);

	ReturnData delAppGrp(Criterion criterion);

	ReturnData editAppGrp(Criterion criterion);
	
	/** 기관그룹 */
	ReturnData getInstGrpTreeList(Criterion criterion);

}
