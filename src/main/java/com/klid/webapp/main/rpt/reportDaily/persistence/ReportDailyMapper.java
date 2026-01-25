/**
 * Program Name	: NoticeBoardMapper.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.rpt.reportDaily.persistence;



import com.klid.webapp.main.rpt.reportDaily.dto.ReportDailyDto;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository("reportDailyMapper")
public interface ReportDailyMapper {

//	/** 게시판 최근리스트 받아오기 */
//	List<ReportCtrsDailyDetailDto> getPostBoardList(Map<String, Object> paramMap);

	/**일일 실적 사고처리*/
	ReportDailyDto getReportDayStat(Map<String, Object> paramMap);

	/**일일 실적 사고처리 현황  누계 조회*/
	void getReportSumStat(Map<String, Object> paramMap);

	/**일일 실적 사고처리 현황 조회 */
	void getReportEndCnt(Map<String, Object> paramMap);

	/**유형별 사고내역  일일 조회 */
	void getReportDayType(Map<String, Object> paramMap);

	/**유형별 사고내역  누계 조회 */
	void getReportSumType(Map<String, Object> paramMap);

	/**탐지정책 일자 계산 - TMS.CENTER_RULE_INFO 필요*/
	void getReportTmsDate(Map<String, Object> paramMap);

	/**탐지정책 현황  일일 조회 - TMS.CENTER_RULE_INFO 필요*/
	void getReportDayTms(Map<String, Object> paramMap);

	/**시도별 일일 사고처리 현황  일일 조회 */
	void getReportDayInciSum(Map<String, Object> paramMap);

	/**시도별 일일 사고처리 현황 누계 조회 */
	void getReportSumInci(Map<String, Object> paramMap);

	/**일주 실적 사고처리 현황  누계 조회 */
	void getReportYearSumStat(Map<String, Object> paramMap);

	/**일일 일주 사고처리 현황 조회*/
	void getReportWeekEndCnt(Map<String, Object> paramMap);

	/**유형별 사고내역  일주 조회*/
	void getReportWeekType(Map<String, Object> paramMap);

	/**일일 보안관제결과 통보양식 - 통계*/
	void getReportResultTotal(Map<String, Object> paramMap);

	/**일일 보안관제결과 통보양식 - 악성코드 리스트*/
	void getReportResultList(Map<String, Object> paramMap);

	/**일일 보안관제결과 통보양식 - 악성코드외 리스트*/
	void getReportResultExceptlist(Map<String, Object> paramMap);

	/**탐지정책 현황  일주 조회 - TMS.CENTER_RULE_INFO 필요*/
	void getReportWeekTms(Map<String, Object> paramMap);

	/**시도별 일일 사고처리 현황  일일 조회 처리*/
	void getReportDayInciProc(Map<String, Object> paramMap);
}
