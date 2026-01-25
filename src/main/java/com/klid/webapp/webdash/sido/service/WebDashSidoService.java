/**
 * Program Name	: WebDashSidoService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.webdash.sido.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface WebDashSidoService {

    ReturnData getNoticeList(Criterion criterion) ;

    ReturnData getSecuList(Criterion criterion) ;

    ReturnData getRegionStatusManual(Criterion criterion) ;

    ReturnData getForgeryCheck(Criterion criterion) ;

    ReturnData getHcCheck(Criterion criterion) ;

    ReturnData getProcess(Criterion criterion) ;

    ReturnData getSidoList(Criterion criterion) ;
}
