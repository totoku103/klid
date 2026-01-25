/**
 * Program Name	: CustUserMgmtService.java
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
package com.klid.webapp.main.sys.custUserMgmt.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface CustUserMgmtService {

    ReturnData getSmsUserList(Criterion criterion);

    ReturnData getSmsOfUserList(Criterion criterion);

    ReturnData selectUserPhone(Criterion criterion);

    ReturnData getSmsGroup(Criterion criterion);

    ReturnData addSmsGroup(Criterion criterion);

    ReturnData editSmsGroup(Criterion criterion);

    ReturnData delSmsGroup(Criterion criterion);

}

