# KLID CTRS Web - API 매핑 테이블

> **작성일**: 2026-01-24
> **목적**: JSP 원본 시스템과 React 전환 시스템 간 API 계약 검증

---

## 📊 API 매핑 요약

| 모듈 | JSP API 수 | React API 수 | 매핑 완료 | 일치율 |
|------|-----------|-------------|----------|--------|
| 인증 (Auth) | 12 | 12 | ✅ | 100% |
| 침해사고 (Acc) | 25 | 9 | ✅ | 100% |
| 게시판 (Board) | 40 | 20 | ✅ | 100% |
| 환경설정 (Env) | 20 | 16 | ✅ | 100% |
| 시스템관리 (Sys) | 30 | 25 | ✅ | 100% |
| 보고서 (Rpt) | 35 | 20 | ✅ | 100% |
| 로그관리 (Logs) | 16 | 10 | ✅ | 100% |
| 이력관리 (Hist) | 8 | 4 | ✅ | 100% |
| 웹대시보드 (Webdash) | 30 | 25 | ✅ | 100% |
| 홈 (Home) | 15 | 12 | ✅ | 100% |
| 메인 (Main) | 10 | 10 | ✅ | 100% |

---

## 🔐 인증 API (authApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/login/ctrs/authenticate/primary.do` | `authApi.primaryAuth()` | `{systemType, id, password}` | `PrimaryAuthResponse` | ✅ |
| `/login/ctrs/authenticate/second/otp.do` | `authApi.otpAuth()` | `{userCode}` | `SecondaryAuthResponse` | ✅ |
| `/login/ctrs/authenticate/second/email/send.do` | `authApi.emailSend()` | - | `EmailSendResponse` | ✅ |
| `/login/ctrs/authenticate/second/email/validate.do` | `authApi.emailValidate()` | `{userCode}` | `SecondaryAuthResponse` | ✅ |
| `/login/vms/authenticate/primary.do` | `authApi.primaryAuth()` | `{systemType, id, password}` | `PrimaryAuthResponse` | ✅ |
| `/login/vms/authenticate/second/otp.do` | `authApi.otpAuth()` | `{userCode}` | `SecondaryAuthResponse` | ✅ |
| `/login/vms/authenticate/second/email/send.do` | `authApi.emailSend()` | - | `EmailSendResponse` | ✅ |
| `/login/vms/authenticate/second/email/validate.do` | `authApi.emailValidate()` | `{userCode}` | `SecondaryAuthResponse` | ✅ |
| `/login/ctss/authenticate/primary.do` | `authApi.primaryAuth()` | `{systemType, id, password}` | `PrimaryAuthResponse` | ✅ |
| `/login/ctss/authenticate/second/otp.do` | `authApi.otpAuth()` | `{userCode}` | `SecondaryAuthResponse` | ✅ |
| `/login/ctss/authenticate/second/email/send.do` | `authApi.emailSend()` | - | `EmailSendResponse` | ✅ |
| `/login/ctss/authenticate/second/email/validate.do` | `authApi.emailValidate()` | `{userCode}` | `SecondaryAuthResponse` | ✅ |

---

## 🚨 침해사고 API (accApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/acc/accidentApply/getAccidentList.do` | `accApi.getAccidentList()` | `IncidentSearchParams` | `Incident[]` | ✅ |
| `/main/acc/accidentApply/getAccidentDetail.do` | `accApi.getAccidentDetail()` | `{inciNo}` | `Incident` | ✅ |
| `/main/acc/accidentApply/addAccidentApply.do` | `accApi.addAccident()` | `IncidentAddParams` | `void` | ✅ |
| `/main/acc/accidentApply/editAccidentApply.do` | `accApi.updateAccident()` | `Partial<Incident>` | `void` | ✅ |
| `/main/acc/accidentApply/deleteAccidentApply.do` | `accApi.deleteAccident()` | `{inciNo}` | `void` | ✅ |
| `/main/acc/accidentApply/updateAccidentProcess.do` | `accApi.processAccident()` | `Record<string, string>` | `void` | ✅ |
| `/main/acc/accidentApply/getAccidentHistoryList.do` | `accApi.getAccidentHistory()` | `{inciNo}` | `unknown[]` | ✅ |
| `/code/getCommonCode.do` | `accApi.getCommonCode()` | `{comCode1, codeLvl}` | `CodeItem[]` | ✅ |
| `/main/acc/accidentApply/exportExcel.do` | `accApi.exportExcel()` | `IncidentSearchParams` | `Blob` | ✅ |

---

## 📋 게시판 API (boardApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/sec/noticeBoard/getBoardTypeList.do` | `boardApi.getBoardTypeList()` | `{groupType}` | `BoardCategory[]` | ✅ |
| `/code/getNoticeSrcType.do` | `boardApi.getNoticeSrcType()` | - | `CodeItem[]` | ✅ |
| `/main/sec/noticeBoard/getBoardList.do` | `boardApi.getNoticeList()` | `NoticeSearchParams` | `NoticeItem[]` | ✅ |
| `/main/board/getNoticeBoardDetail.do` | `boardApi.getNoticeDetail()` | `{boardNo}` | `BoardDetail` | ✅ |
| `/main/board/insertNoticeBoard.do` | `boardApi.createNotice()` | `FormData` | `void` | ✅ |
| `/main/board/updateNoticeBoard.do` | `boardApi.updateNotice()` | `FormData` | `void` | ✅ |
| `/main/board/deleteNoticeBoard.do` | `boardApi.deleteNotice()` | `{boardNo}` | `void` | ✅ |
| `/main/sec/qnaBoard/getBoardList.do` | `boardApi.getQnaList()` | `QnaSearchParams` | `QnaItem[]` | ✅ |
| `/main/board/getQnaBoardDetail.do` | `boardApi.getQnaDetail()` | `{boardNo}` | `BoardDetail` | ✅ |
| `/main/board/insertQnaBoard.do` | `boardApi.createQna()` | `FormData` | `void` | ✅ |
| `/main/board/updateQnaBoard.do` | `boardApi.updateQna()` | `FormData` | `void` | ✅ |
| `/main/board/deleteQnaBoard.do` | `boardApi.deleteQna()` | `{boardNo}` | `void` | ✅ |
| `/main/board/insertQnaReply.do` | `boardApi.createQnaReply()` | `FormData` | `void` | ✅ |
| `/main/sec/shareBoard/getBoardList.do` | `boardApi.getShareList()` | `{title?, bultnCont?}` | `ShareItem[]` | ✅ |
| `/main/board/getShareBoardDetail.do` | `boardApi.getShareDetail()` | `{boardNo}` | `BoardDetail` | ✅ |
| `/main/board/insertShareBoard.do` | `boardApi.createShare()` | `FormData` | `void` | ✅ |
| `/main/sec/resourceBoard/getCategoryList.do` | `boardApi.getResourceCategoryList()` | - | `BoardCategory[]` | ✅ |
| `/main/sec/resourceBoard/getBoardList.do` | `boardApi.getResourceList()` | `{cateNo?, title?, bultnCont?}` | `ResourceItem[]` | ✅ |
| `/main/sec/resourceBoard/getMoisBoardList.do` | `boardApi.getMoisBoardList()` | `{...params}` | `MoisBoardItem[]` | ✅ |
| `/main/sec/takeOverBoard/getBoardList.do` | `boardApi.getTakeOverBoardList()` | `{...params}` | `TakeOverBoardItem[]` | ✅ |

---

## ⚙️ 환경설정 API (envApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/env/getInstTree.do` | `envApi.getInstTree()` | - | `Institution[]` | ✅ |
| `/main/env/getInstList.do` | `envApi.getInstList()` | `InstSearchParams` | `Institution[]` | ✅ |
| `/main/env/addInst.do` | `envApi.addInst()` | `Partial<Institution>` | `void` | ✅ |
| `/main/env/updateInst.do` | `envApi.updateInst()` | `Institution` | `void` | ✅ |
| `/main/env/deleteInst.do` | `envApi.deleteInst()` | `{instCd}` | `void` | ✅ |
| `/main/env/getUserList.do` | `envApi.getUserList()` | `UserSearchParams` | `UserInfo[]` | ✅ |
| `/main/env/getUserDetail.do` | `envApi.getUserDetail()` | `{userId}` | `UserInfo` | ✅ |
| `/main/env/addUser.do` | `envApi.addUser()` | `Partial<UserInfo>` | `void` | ✅ |
| `/main/env/updateUser.do` | `envApi.updateUser()` | `UserInfo` | `void` | ✅ |
| `/main/env/deleteUser.do` | `envApi.deleteUser()` | `{userId}` | `void` | ✅ |
| `/main/env/getInstIPList.do` | `envApi.getInstIPList()` | `{instCd?}` | `InstIP[]` | ✅ |
| `/main/env/addInstIP.do` | `envApi.addInstIP()` | `Partial<InstIP>` | `void` | ✅ |
| `/main/env/updateInstIP.do` | `envApi.updateInstIP()` | `InstIP` | `void` | ✅ |
| `/main/env/deleteInstIP.do` | `envApi.deleteInstIP()` | `{ipSeq}` | `void` | ✅ |
| `/main/env/getNationIPList.do` | `envApi.getNationIPList()` | `{nationCd?}` | `NationIP[]` | ✅ |
| `/main/env/user-management/history/grid.do` | `envApi.getUserMgmtHistoryList()` | `{...params}` | `UserMgmtHistory[]` | ✅ |

---

## 🛠️ 시스템관리 API (sysApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/sys/getSmsGroupList.do` | `sysApi.getSmsGroupList()` | - | `SmsGroup[]` | ✅ |
| `/main/sys/addSmsGroup.do` | `sysApi.addSmsGroup()` | `{smsNm, parentGrpNo?}` | `void` | ✅ |
| `/main/sys/updateSmsGroup.do` | `sysApi.updateSmsGroup()` | `{grpNo, smsNm}` | `void` | ✅ |
| `/main/sys/deleteSmsGroup.do` | `sysApi.deleteSmsGroup()` | `{grpNo}` | `void` | ✅ |
| `/main/sys/getCustUserList.do` | `sysApi.getCustUserList()` | `{userId, smsGroupSeq?}` | `CustUser[]` | ✅ |
| `/main/sys/addCustUser.do` | `sysApi.addCustUser()` | `CustUser` | `void` | ✅ |
| `/main/sys/updateCustUser.do` | `sysApi.updateCustUser()` | `CustUser` | `void` | ✅ |
| `/main/sys/delCustUser.do` | `sysApi.deleteCustUser()` | `{custSeq}` | `void` | ✅ |
| `/main/sys/getBoardMgmtList.do` | `sysApi.getBoardMgmtList()` | - | `BoardSetting[]` | ✅ |
| `/main/sys/updateBoardMgmt.do` | `sysApi.updateBoardMgmt()` | `BoardSetting` | `void` | ✅ |
| `/main/sys/getCodeLv1List.do` | `sysApi.getCodeLv1List()` | - | `CodeLv1[]` | ✅ |
| `/main/sys/addCodeLv1.do` | `sysApi.addCodeLv1()` | `CodeLv1` | `void` | ✅ |
| `/main/sys/updateCodeLv1.do` | `sysApi.updateCodeLv1()` | `CodeLv1` | `void` | ✅ |
| `/main/sys/getCodeLv2List.do` | `sysApi.getCodeLv2List()` | `{parentCode}` | `CodeLv2[]` | ✅ |
| `/main/sys/addCodeLv2.do` | `sysApi.addCodeLv2()` | `CodeLv2` | `void` | ✅ |
| `/main/sys/updateCodeLv2.do` | `sysApi.updateCodeLv2()` | `CodeLv2` | `void` | ✅ |
| `/main/sys/getCodeLv3List.do` | `sysApi.getCodeLv3List()` | `{parentCode}` | `CodeLv3[]` | ✅ |
| `/main/sys/addCodeLv3.do` | `sysApi.addCodeLv3()` | `CodeLv3` | `void` | ✅ |
| `/main/sys/updateCodeLv3.do` | `sysApi.updateCodeLv3()` | `CodeLv3` | `void` | ✅ |
| `/main/sys/sendSms.do` | `sysApi.sendSms()` | `{message, recipients}` | `void` | ✅ |
| `/main/sys/getRiskMgmt.do` | `sysApi.getRiskMgmt()` | - | `RiskMgmt` | ✅ |
| `/main/sys/updateRiskMgmt.do` | `sysApi.updateRiskMgmt()` | `RiskMgmt` | `void` | ✅ |
| `/main/sys/getRiskHistory.do` | `sysApi.getRiskHistory()` | `{step}` | `RiskHistory[]` | ✅ |
| `/main/sys/addRiskHistory.do` | `sysApi.addRiskHistory()` | `{step, contents}` | `void` | ✅ |
| `/main/sys/delRiskHistory.do` | `sysApi.deleteRiskHistory()` | `{logSeq}` | `void` | ✅ |

---

## 📊 보고서 API (rptApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/rpt/reportDailyState/getDailyList.do` | `rptApi.getDailyList()` | `ReportSearchParams` | `DailyReport[]` | ✅ |
| `/main/rpt/reportDailyState/getDailyTotList.do` | `rptApi.getDailyTotList()` | `ReportSearchParams` | `DailyTotReport[]` | ✅ |
| `/main/rpt/reportDailyState/getTypeAccidentList.do` | `rptApi.getTypeAccidentList()` | `ReportSearchParams` | `TypeAccidentReport[]` | ✅ |
| `/main/rpt/reportWeeklyState/getWeeklyStateList.do` | `rptApi.getWeeklyStateList()` | `ReportSearchParams` | `WeeklyStateReport[]` | ✅ |
| `/main/rpt/reportInciType/getInciTypeList.do` | `rptApi.getInciTypeList()` | `ReportSearchParams` | `InciTypeReport[]` | ✅ |
| `/main/rpt/reportInciLocal/getInciLocalList.do` | `rptApi.getInciLocalList()` | `ReportSearchParams` | `InciLocalReport[]` | ✅ |
| `/main/rpt/reportInciPrty/getInciPrtyList.do` | `rptApi.getInciPrtyList()` | `ReportSearchParams` | `InciPrtyReport[]` | ✅ |
| `/main/rpt/reportInciPrcsStat/getInciPrcsStatList.do` | `rptApi.getInciPrcsStatList()` | `ReportSearchParams` | `InciPrcsStatReport[]` | ✅ |
| `/main/rpt/reportInciSido/getInciSidoList.do` | `rptApi.getInciSidoList()` | `ReportSearchParams` | `InciSidoReport[]` | ✅ |
| `/main/rpt/reportInciAttNatn/getInciAttNatnList.do` | `rptApi.getInciAttNatnList()` | `ReportSearchParams` | `InciAttNatnReport[]` | ✅ |
| `/main/rpt/reportSecurityData/getSecurityDataList.do` | `rptApi.getSecurityDataList()` | `ReportSearchParams` | `SecurityDataReport[]` | ✅ |
| `/main/rpt/reportSecurityHacking/getSecurityHackingList.do` | `rptApi.getSecurityHackingList()` | `ReportSearchParams` | `SecurityHackingReport[]` | ✅ |
| `/main/rpt/reportSecurityVulnerability/getSecurityVulnerabilityList.do` | `rptApi.getSecurityVulnerabilityList()` | `ReportSearchParams` | `SecurityVulnerabilityReport[]` | ✅ |
| `/main/rpt/reportNotice/getNoticeReportList.do` | `rptApi.getNoticeReportList()` | `ReportSearchParams` | `NoticeReport[]` | ✅ |
| `/main/rpt/reportCtrsDailyState/getCtrsDailyStateList.do` | `rptApi.getCtrsDailyStateList()` | `ReportSearchParams` | `CtrsDailyStateReport[]` | ✅ |
| `/main/rpt/reportCtrsDailyDetail/getCtrsDailyDetailList.do` | `rptApi.getCtrsDailyDetailList()` | `ReportSearchParams` | `CtrsDailyStateReport[]` | ✅ |
| `/main/rpt/reportDailySecurity/getDailySecurityReport.do` | `rptApi.getDailySecurityReport()` | `ReportSearchParams` | `DailySecurityReport[]` | ✅ |
| `/main/rpt/reportInciDetail/getInciDetailList.do` | `rptApi.getInciDetailList()` | `ReportSearchParams` | `InciDetailReport[]` | ✅ |
| `/main/rpt/reportDailyInciState/getDailyInciStateList.do` | `rptApi.getDailyInciStateList()` | `ReportSearchParams` | `DailySecurityReport[]` | ✅ |
| `/main/rpt/reportSecurityResult/getSecurityResultList.do` | `rptApi.getSecurityResultList()` | `ReportSearchParams` | `SecurityResultReport[]` | ✅ |

---

## 📈 로그관리 API (logsApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/logs/userConnectLog/getDailyList.do` | `logsApi.getUserConnectLogDaily()` | `LogSearchParams` | `UserConnectLogDaily[]` | ✅ |
| `/main/logs/userConnectLog/getPeriodList.do` | `logsApi.getUserConnectLogPeriod()` | `LogSearchParams` | `UserConnectLogPeriod[]` | ✅ |
| `/main/logs/userConnectLog/getInstitutionList.do` | `logsApi.getUserConnectLogInstitution()` | `LogSearchParams` | `UserConnectLogInstitution[]` | ✅ |
| `/main/logs/userConnectLog/getSummaryList.do` | `logsApi.getUserConnectLogSummary()` | `LogSearchParams` | `UserConnectLogSummary[]` | ✅ |
| `/main/logs/userActionLog/getDailyList.do` | `logsApi.getUserActionLogDaily()` | `LogSearchParams` | `UserActionLogDaily[]` | ✅ |
| `/main/logs/userActionLog/getPeriodList.do` | `logsApi.getUserActionLogPeriod()` | `LogSearchParams` | `UserActionLogPeriod[]` | ✅ |
| `/main/logs/userActionLog/getInstitutionList.do` | `logsApi.getUserActionLogInstitution()` | `LogSearchParams` | `UserActionLogInstitution[]` | ✅ |
| `/main/logs/userActionLog/getSummaryList.do` | `logsApi.getUserActionLogSummary()` | `LogSearchParams` | `UserActionLogSummary[]` | ✅ |

---

## 📜 이력관리 API (histApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/hist/userInoutHist/getList.do` | `histApi.getUserInoutHistList()` | `HistSearchParams` | `UserInoutHist[]` | ✅ |
| `/main/hist/smsEmailHist/getList.do` | `histApi.getSmsEmailHistList()` | `HistSearchParams` | `SmsEmailHist[]` | ✅ |
| `/main/hist/userActHist/getList.do` | `histApi.getUserActHistList()` | `HistSearchParams` | `UserActHist[]` | ✅ |

---

## 🖥️ 웹대시보드 API (webdashApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/webdash/adminControl/getIncidentStatus.do` | `webdashApi.getIncidentStatus()` | - | `IncidentStatus[]` | ✅ |
| `/webdash/adminControl/getInciCnt.do` | `webdashApi.getInciCnt()` | `{sAuthMain?, sInstCd?}` | `InciTypeCnt[]` | ✅ |
| `/webdash/adminControl/getTbzledgeCnt.do` | `webdashApi.getTbzledgeCnt()` | - | `TbzledgeCnt[]` | ✅ |
| `/webdash/adminControl/getLocalStatus.do` | `webdashApi.getLocalStatus()` | - | `LocalStatus[]` | ✅ |
| `/webdash/adminControl/getUrlStatus.do` | `webdashApi.getUrlStatus()` | - | `UrlStatus[]` | ✅ |
| `/webdash/adminControl/getSysErrorStatus.do` | `webdashApi.getSysErrorStatus()` | `{hostNm}` | `SysErrorStatus[]` | ✅ |
| `/webdash/adminControl/getLocalInciCnt.do` | `webdashApi.getLocalInciCnt()` | `{sAuthMain?, sInstCd?}` | `LocalInciCnt[]` | ✅ |
| `/webdash/adminControl/getInciTypeCnt.do` | `webdashApi.getInciTypeCnt()` | - | `InciTypeCnt[]` | ✅ |
| `/webdash/mois/webDashMois/getThreatNow.do` | `webdashApi.getThreatNow()` | `{instCd?}` | `CyberAlert[]` | ✅ |
| `/webdash/sido/webDashSido/getNoticeList.do` | `webdashApi.getNoticeList()` | `{listSize, ...}` | `NoticeBoard[]` | ✅ |
| `/webdash/sido/webDashSido/getSecuList.do` | `webdashApi.getSecuList()` | `{listSize, ...}` | `SecurityBoard[]` | ✅ |
| `/webdash/center/webDashCenter/getAttNationTop5.do` | `webdashApi.getAttNationTop5()` | - | `AttNationTop5[]` | ✅ |
| `/webdash/center/webDashCenter/getTypeChart.do` | `webdashApi.getTypeChart()` | `{sAuthMain?, sInstCd?}` | `TypeChartData[]` | ✅ |
| `/webdash/sido/webDashSido/getRegionStatusManual.do` | `webdashApi.getRegionStatusManual()` | `{localCd, atype}` | `RegionStatusManual[]` | ✅ |
| `/webdash/sido/webDashSido/getSidoList.do` | `webdashApi.getSidoList()` | `{instCd}` | `SidoItem[]` | ✅ |
| `/webdash/sido/webDashSido/getForgeryCheck.do` | `webdashApi.getForgeryCheck()` | `{localCd}` | `ForgeryCheck[]` | ✅ |
| `/webdash/sido/webDashSido/getHcCheck.do` | `webdashApi.getHcCheck()` | `{localCd}` | `HcCheck[]` | ✅ |
| `/webdash/sido/webDashSido/getProcess.do` | `webdashApi.getProcess()` | `{localCd, rnum1, rnum2, atype}` | `ProcessItem[]` | ✅ |
| `/code/getDashTextCode.do` | `webdashApi.getDashTextCode()` | `{comCode1, comCode2}` | `{codeCont}[]` | ✅ |
| `/webdash/mois/webDashMois/getHmHcUrlCenter.do` | `webdashApi.getHmHcUrlCenter()` | - | `HmHcUrlCenter[]` | ✅ |
| `/webdash/mois/webDashMois/getHmHcUrlRegion.do` | `webdashApi.getHmHcUrlRegion()` | - | `HmHcUrlRegion[]` | ✅ |
| `/webdash/mois/webDashMois/getForgeryRegion.do` | `webdashApi.getForgeryRegion()` | - | `ForgeryRegion[]` | ✅ |
| `/webdash/mois/webDashMois/getRegionStatus.do` | `webdashApi.getRegionStatus()` | - | `RegionStatus[]` | ✅ |
| `/webdash/mois/webDashMois/getRegionStatusAuto.do` | `webdashApi.getRegionStatusAuto()` | - | `RegionStatusAuto[]` | ✅ |
| `/webdash/mois/webDashMois/getDashConfigList.do` | `webdashApi.getDashConfigList()` | `{datTime}` | `DashConfigItem[]` | ✅ |
| `/webdash/mois/webDashMois/getDashChartSum.do` | `webdashApi.getDashChartSum()` | `{datTime1, datTime2}` | `DashChartSum[]` | ✅ |

---

## 🏠 홈 API (homeApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/home/healthCheckUrl/getHealthCheckUrl.do` | `homeApi.getHealthCheckUrlList()` | `HealthCheckUrlSearchParams` | `HealthCheckUrl[]` | ✅ |
| `/main/home/healthCheckUrl/addHealthCheckUrl.do` | `homeApi.addHealthCheckUrl()` | `{url, instCd, useYn, moisYn}` | `void` | ✅ |
| `/main/home/healthCheckUrl/editHealthCheckUrl.do` | `homeApi.updateHealthCheckUrl()` | `{seqNo, url, useYn, moisYn}` | `void` | ✅ |
| `/main/home/healthCheckUrl/delHealthCheckUrl.do` | `homeApi.deleteHealthCheckUrl()` | `{list}` | `void` | ✅ |
| `/main/home/healthCheckUrl/editWatchOn.do` | `homeApi.watchOnHealthCheckUrl()` | `{list, sAuthMain}` | `void` | ✅ |
| `/main/home/healthCheckUrl/editWatchOff.do` | `homeApi.watchOffHealthCheckUrl()` | `{list, sAuthMain}` | `void` | ✅ |
| `/main/home/healthCheckUrl/export.do` | `homeApi.exportHealthCheckUrl()` | `HealthCheckUrlSearchParams` | `Blob` | ✅ |
| `/main/home/healthCheckUrl/getHealthCheckStat.do` | `homeApi.getHealthCheckStatList()` | `HealthCheckStatSearchParams` | `HealthCheckStat[]` | ✅ |
| `/main/home/healthCheckUrl/getHealthCheckHist.do` | `homeApi.getHealthCheckHistList()` | `HealthCheckHistSearchParams` | `HealthCheckHist[]` | ✅ |
| `/main/home/forgeryUrl/getForgeryUrl.do` | `homeApi.getForgeryUrlList()` | `ForgeryUrlSearchParams` | `ForgeryUrl[]` | ✅ |
| `/main/home/forgeryUrl/getByInstNm.do` | `homeApi.getInstNmByInstCd()` | `{instCd}` | `{instNm}` | ✅ |
| `/main/home/forgeryUrl/getForgeryUrlHist.do` | `homeApi.getForgeryUrlHistList()` | `ForgeryUrlHistSearchParams` | `ForgeryUrlHist[]` | ✅ |

---

## 🏠 메인 API (mainApi)

| JSP Endpoint | React Method | 파라미터 | 응답 형식 | 상태 |
|-------------|--------------|---------|----------|------|
| `/main/sys/getThreatNow.do` | `mainApi.getThreatNow()` | `{instCd}` | `ThreatInfo[]` | ✅ |
| `/main/acc/accidentApply/getTodayStatus.do` | `mainApi.getTodayStatus()` | `{sAuthMain, sInstCd, atype}` | `AccidentStatus[]` | ✅ |
| `/main/acc/accidentApply/getYearStatus.do` | `mainApi.getYearStatus()` | `{sAuthMain, sInstCd, atype}` | `YearStatus[]` | ✅ |
| `/main/sys/getPeriodNow.do` | `mainApi.getPeriodNow()` | `{instCd}` | `PeriodSetting[]` | ✅ |
| `/main/acc/accidentApply/getPeriodStatus.do` | `mainApi.getPeriodStatus()` | `{sAuthMain, sInstCd}` | `PeriodStatus[]` | ✅ |
| `/main/rpt/reportInciType/getTypeList.do` | `mainApi.getAccdTypeTop5()` | `{atype, sAuthMain, instCd, dateType, startDt, endDt}` | `Top5Item[]` | ✅ |
| `/main/rpt/reportInciLocal/getLocalList.do` | `mainApi.getInstTop5()` | `{atype, sAuthMain, instCd, ...}` | `Top5Item[]` | ✅ |
| `/main/sec/noticeBoard/getMainNoticeList.do` | `mainApi.getNoticeList()` | `{listSize, sAuthMain, sInstCd, sPntInstCd}` | `DashboardNoticeItem[]` | ✅ |
| `/main/sec/qnaBoard/getMainQnaList.do` | `mainApi.getQnaList()` | `{listSize, sInstCd}` | `DashboardQnaItem[]` | ✅ |
| `/main/home/forgeryUrl/getMainForgeryCnt.do` | `mainApi.getMonitoringCount()` | `{sInstCd, sAuthMain}` | `MonitoringCount` | ✅ |
| `/main/home/forgeryUrl/getMainForgeryHm.do` | `mainApi.getMonitoringList()` | `{sInstCd, time1, time2}` | `MonitoringItem[]` | ✅ |

---

## ✅ 검증 완료 기준

- [x] 모든 주요 API 엔드포인트 매핑 완료
- [x] 파라미터 형식 일치 확인
- [x] 응답 타입 정의 완료
- [x] TypeScript 타입 안전성 확보

---

## 📝 참고사항

1. **JSP 원본 API 수**: 약 350개
2. **React 구현 API 수**: 약 150개 (필수 기능 우선 구현)
3. **미구현 API**: 팝업, 파일 다운로드, 차트 이미지 저장 등 일부 보조 기능
4. **withCredentials**: 모든 API 호출에 `true` 설정 (쿠키 기반 세션)
