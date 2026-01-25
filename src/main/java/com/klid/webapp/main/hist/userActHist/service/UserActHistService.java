/**
 * Program Name : UserInoutHistMgmtService.java
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


import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface UserActHistService {

    public ReturnData getUserActHist(Criterion criterion);

}
