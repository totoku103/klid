package com.klid.webapp.main.acc.accidentApply.service;

import java.net.UnknownHostException;
import java.util.Map;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

/**
 * @author imhojong
 *
 */
public interface AccidentApplyService {
	
	/** 신고 목록	 */
	ReturnData getAccidentApplyList(Criterion criterion);

	ReturnData getAccDuplList(Criterion criterion);

	/** 신고 등록	 */
	ReturnData addAccidentApply(Criterion criterion) ;
	
	ReturnData getAccidenDeptList(Criterion criterion);

	ReturnData getAccidentDetail(Criterion criterion);

	ReturnData editAccidentApply(Criterion criterion);

	ReturnData deleteAccidentApply(Criterion criterion) ;
	
	ReturnData updateAccidentProcess(Criterion criterion);
	
	ReturnData updateMultiAccidentProcess(Criterion criterion);
	
	ReturnData getAccidentHistoryList(Criterion criterion);
	
	ReturnData getLocalList(Criterion criterion);

	ReturnData getPntInst(Criterion criterion);

	ReturnData importExcel(Criterion criterion);

	ReturnData importEml(Criterion criterion);

	ReturnData getTbzHomepv(Criterion criterion);

	ReturnData getTbzHacking(Criterion criterion);

	ReturnData getDmgIpList(Criterion criterion);

	ReturnData getAttIpList(Criterion criterion) ;

	ReturnData getTodayStatus(Criterion criterion);

	ReturnData getYearStatus(Criterion criterion);

	ReturnData getPeriodStatus(Criterion criterion);

	ReturnData getInstStatus(Criterion criterion);

	ReturnData getAccdTypeStatus(Criterion criterion);

	ReturnData getIpByNationNm(Criterion criterion) throws UnknownHostException;

	ReturnData getInstByIP(Criterion criterion) throws UnknownHostException;

	ReturnData getEncrySyncList(Criterion criterion) ;

	ReturnData updateEncrySync(Criterion criterion);

	ReturnData getNcscInfo(Criterion criterion) throws Exception;

	ReturnData checkEncryText(Criterion criterion);

	ReturnData getInciMutiEndYn(Criterion criterion);

}
