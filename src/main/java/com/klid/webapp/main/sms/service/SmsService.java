package com.klid.webapp.main.sms.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

/**
 * Created by Yuna on 2018-12-20.
 */
public interface SmsService {
    ReturnData addSmsMessage(Criterion criterion) ;
}
