package com.klid.webapp.webdash.adminControl.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface AdminControlService {

    public ReturnData getIncidentStatus(Criterion criterion);

    public ReturnData getInciCnt(Criterion criterion);

    public ReturnData getTbzledgeCnt(Criterion criterion);

    public ReturnData getLocalInciCnt(Criterion criterion);

    public ReturnData getLocalStatus(Criterion criterion);

    public ReturnData getUrlStatus(Criterion criterion);

    public ReturnData getSysErrorStatus(Criterion criterion);

    public ReturnData getInciTypeCnt(Criterion criterion);

}
