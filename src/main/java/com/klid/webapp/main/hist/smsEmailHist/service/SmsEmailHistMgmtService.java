/**
 * Program Name : SmsEmailHistMgmtService.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 *
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */
package com.klid.webapp.main.hist.smsEmailHist.service;


import jakarta.servlet.http.HttpServletResponse;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface SmsEmailHistMgmtService {

    public ReturnData getSmsHist(Criterion criterion);

    public ReturnData getEmailHist(Criterion criterion) ;

	public ReturnData export_sms(HttpServletResponse response, Criterion criterion);

	public ReturnData export_email(HttpServletResponse response, Criterion criterion);

}
