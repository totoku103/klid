# 데이터 API 요청 목록 (Data Controllers)

## 개요

이 문서는 JSON 데이터를 반환하는 Data Controller의 API 목록입니다.

**특징**:
- `@RestController` 또는 `@ResponseBody` 어노테이션 사용
- 반환 타입: `ReturnData`, `ResponseEntity`, 또는 기타 JSON 객체

---

## 1. 인증/로그인 API

### LoginController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| test | `/api/login/test` | POST | ReturnData | 테스트 |
| logout | `/api/login/logout` | POST | ReturnData | 로그아웃 |

### LoginVmsPrimaryController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| authenticate | `/api/login/vms/authenticate/primary` | POST | ReturnData | VMS 1차 인증 |

### LoginVmsSecondController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| authenticateOtp | `/api/login/vms/authenticate/second/otp` | POST | ReturnData | VMS OTP 인증 |
| sendEmail | `/api/login/vms/authenticate/second/email/send` | POST | ReturnData | VMS 이메일 전송 |
| validateEmailCode | `/api/login/vms/authenticate/second/email/validate` | POST | ReturnData | VMS 이메일 코드 검증 |

### LoginCtssPrimaryController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| authenticate | `/api/login/ctss/authenticate/primary` | POST | ReturnData | CTSS 1차 인증 |
| getAuthenticationStatus | `/api/login/ctss/authenticate/status` | POST | ReturnData | CTSS 인증 상태 |

### LoginCtssSecondController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| authenticateOtp | `/api/login/ctss/authenticate/second/otp` | POST | ReturnData | CTSS OTP 인증 |

### LoginCtrsPrimaryController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| authenticate | `/api/login/ctrs/authenticate/primary` | POST | ReturnData | CTRS 1차 인증 |

### LoginCtrsSecondController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| authenticateOtp | `/api/login/ctrs/authenticate/second/otp` | POST | ReturnData | CTRS OTP 인증 |
| authenticateEmail | `/api/login/ctrs/authenticate/second/email/send` | POST | ReturnData | CTRS 이메일 인증 |

### ThirdPartyOtpController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| sendOtp | `/api/third-party/auth/otp/send` | POST | ThirdPartyBaseResDto | OTP 전송 |
| checkOtp | `/api/third-party/auth/otp/check` | POST | ThirdPartyBaseResDto | OTP 확인 |

### CtrsRedirectController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| redirect | `/api/third-party/auth/redirect` | POST | ResponseEntity | 리다이렉트 처리 |

---

## 2. 공통 API

### GrpController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getGrpList | `/api/common/grp/getGrpList` | REQUEST | ReturnData | 그룹 목록 |
| getSubGrpList | `/api/common/grp/getSubGrpList` | REQUEST | ReturnData | 하위 그룹 목록 |

### CodeController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getAllCode | `/api/common/code/getAllCode` | REQUEST | ReturnData | 전체 코드 |
| getCode | `/api/common/code/getCode` | REQUEST | ReturnData | 코드 조회 |
| getSysCode | `/api/common/code/getSysCode` | REQUEST | ReturnData | 시스템 코드 |

### MenuController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getMenuList | `/api/common/menu/getMenuList` | REQUEST | ReturnData | 메뉴 목록 |

### FileController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| download | `/api/file/download.do` | REQUEST | void | 파일 다운로드 |
| upload | `/api/file/upload.do` | REQUEST | void | 파일 업로드 |
| delete | `/api/file/delete.do` | POST | ReturnData | 파일 삭제 |
| accUpload | `/api/file/accUpload.do` | REQUEST | void | 사고 파일 업로드 |
| saveChart | `/api/file/saveChart.do` | POST | void | 차트 저장 |
| exportGrid | `/api/file/exportGrid.do` | POST | void | 그리드 내보내기 |

### SmsController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| send | `/api/main/sms/send` | POST | ReturnData | SMS 전송 |

---

## 3. 대시보드 API (WebDash)

### AdminControlController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getIncidentStatus | `/api/webdash/adminControl/incidentStatus` | GET | ReturnData | 사고 현황 |
| getInciCnt | `/api/webdash/adminControl/inciCnt` | GET | ReturnData | 사고 건수 |
| getTbzledgeCnt | `/api/webdash/adminControl/tbzledgeCnt` | GET | ReturnData | 지식 건수 |
| getLocalInciCnt | `/api/webdash/adminControl/localInciCnt` | GET | ReturnData | 지역 사고 건수 |
| getLocalStatus | `/api/webdash/adminControl/localStatus` | GET | ReturnData | 지역 현황 |
| getUrlStatus | `/api/webdash/adminControl/urlStatus` | GET | ReturnData | URL 현황 |
| getSysErrorStatus | `/api/webdash/adminControl/sysErrorStatus` | GET | ReturnData | 시스템 오류 현황 |
| getInciTypeCnt | `/api/webdash/adminControl/inciTypeCnt` | GET | ReturnData | 사고 유형 건수 |

### WebDashCenterController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/webdash/center/list` | POST | ReturnData | 센터 목록 |
| getInstitutionList | `/api/webdash/center/institutionList` | POST | ReturnData | 기관 목록 |

### WebDashMoisController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/webdash/mois/list` | POST | ReturnData | MOIS 목록 |

### WebDashSidoController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/webdash/sido/list` | POST | ReturnData | 시도 목록 |
| getInstList | `/api/webdash/sido/instList` | POST | ReturnData | 기관 목록 |

---

## 4. 게시판 API

### ShareBoardController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sec/shareBoardList/getList` | REQUEST | ReturnData | 목록 조회 |
| getDetail | `/api/main/sec/shareBoardList/getDetail` | REQUEST | ReturnData | 상세 조회 |
| add | `/api/main/sec/shareBoardList/add` | POST | ReturnData | 추가 |
| edit | `/api/main/sec/shareBoardList/edit` | POST | ReturnData | 수정 |
| delete | `/api/main/sec/shareBoardList/delete` | POST | ReturnData | 삭제 |

### NoticeBoardController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sec/noticeBoardList/getList` | REQUEST | ReturnData | 목록 조회 |
| getDetail | `/api/main/sec/noticeBoardList/getDetail` | REQUEST | ReturnData | 상세 조회 |
| add | `/api/main/sec/noticeBoardList/add` | POST | ReturnData | 추가 |
| edit | `/api/main/sec/noticeBoardList/edit` | POST | ReturnData | 수정 |
| delete | `/api/main/sec/noticeBoardList/delete` | POST | ReturnData | 삭제 |

### ResourceBoardController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sec/resourceBoardList/getList` | REQUEST | ReturnData | 목록 조회 |
| getDetail | `/api/main/sec/resourceBoardList/getDetail` | REQUEST | ReturnData | 상세 조회 |
| add | `/api/main/sec/resourceBoardList/add` | POST | ReturnData | 추가 |
| edit | `/api/main/sec/resourceBoardList/edit` | POST | ReturnData | 수정 |
| delete | `/api/main/sec/resourceBoardList/delete` | POST | ReturnData | 삭제 |

### TakeOverBoardController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sec/takeOverBoardList/getList` | REQUEST | ReturnData | 목록 조회 |
| getDetail | `/api/main/sec/takeOverBoardList/getDetail` | REQUEST | ReturnData | 상세 조회 |
| add | `/api/main/sec/takeOverBoardList/add` | POST | ReturnData | 추가 |
| edit | `/api/main/sec/takeOverBoardList/edit` | POST | ReturnData | 수정 |
| delete | `/api/main/sec/takeOverBoardList/delete` | POST | ReturnData | 삭제 |

### QnaBoardController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sec/qnaBoardList/getList` | REQUEST | ReturnData | 목록 조회 |
| getDetail | `/api/main/sec/qnaBoardList/getDetail` | REQUEST | ReturnData | 상세 조회 |
| add | `/api/main/sec/qnaBoardList/add` | POST | ReturnData | 추가 |
| edit | `/api/main/sec/qnaBoardList/edit` | POST | ReturnData | 수정 |
| delete | `/api/main/sec/qnaBoardList/delete` | POST | ReturnData | 삭제 |

---

## 5. 보고서 API

### ReportCollectionController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportCollection/getList` | REQUEST | ReturnData | 보고서 모음 |

### ReportDailyStateController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportDailyState/getList` | REQUEST | ReturnData | 일일 현황 |

### ReportWeeklyStateController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportWeeklyState/getList` | REQUEST | ReturnData | 주간 현황 |

### ReportInciLocalController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportInciLocal/getList` | REQUEST | ReturnData | 지역별 사고 |

### ReportSecurityResultController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getReportExcelList | `/api/main/rpt/reportSecurityResult/getReportExcelList` | REQUEST | ReturnData | 보안 결과 엑셀 |

### ReportInciTypeController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportInciType/getList` | REQUEST | ReturnData | 사고 유형 |

### ReportInciAttNatnController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportInciAttNatn/getList` | REQUEST | ReturnData | 공격 국가별 |

### ReportDailyInciStateController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportDailyInciState/getList` | REQUEST | ReturnData | 일일 사고 현황 |

### ReportDailyController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getReportExcelList | `/api/main/rpt/reportDaily/getReportExcelList` | REQUEST | ReturnData | 일일 보고서 엑셀 |

### ReportInciPrtyController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportInciPrty/getList` | REQUEST | ReturnData | 우선순위별 사고 |

### ReportInciPrcsStatController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportInciPrcsStat/getList` | REQUEST | ReturnData | 처리 상태별 사고 |

### ReportInciDetailController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/rpt/reportInciDetail/getList` | REQUEST | ReturnData | 사고 상세 |

---

## 6. 환경 설정 API

### InstMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/env/instMgmt/getList` | REQUEST | ReturnData | 기관 목록 |
| add | `/api/main/env/instMgmt/add` | POST | ReturnData | 기관 추가 |
| edit | `/api/main/env/instMgmt/edit` | POST | ReturnData | 기관 수정 |
| delete | `/api/main/env/instMgmt/delete` | POST | ReturnData | 기관 삭제 |
| getInstUpperList | `/api/main/env/instMgmt/getInstUpperList` | REQUEST | ReturnData | 상위 기관 목록 |
| checkInstCd | `/api/main/env/instMgmt/checkInstCd` | POST | ReturnData | 기관코드 중복 확인 |

### InstIPMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/env/instIPMgmt/getList` | REQUEST | ReturnData | 기관 IP 목록 |
| add | `/api/main/env/instIPMgmt/add` | POST | ReturnData | 기관 IP 추가 |
| edit | `/api/main/env/instIPMgmt/edit` | POST | ReturnData | 기관 IP 수정 |
| delete | `/api/main/env/instIPMgmt/delete` | POST | ReturnData | 기관 IP 삭제 |

### NationIPMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/env/nationIPMgmt/getList` | REQUEST | ReturnData | 국가 IP 목록 |
| importExcel | `/api/main/env/nationIPMgmt/importExcel` | REQUEST | ReturnData | 엑셀 가져오기 |
| delete | `/api/main/env/nationIPMgmt/delete` | POST | ReturnData | 국가 IP 삭제 |
| getNationList | `/api/main/env/nationIPMgmt/getNationList` | REQUEST | ReturnData | 국가 목록 |
| editNationNm | `/api/main/env/nationIPMgmt/editNationNm` | POST | ReturnData | 국가명 수정 |

### UserConfController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/env/userConf/getList` | REQUEST | ReturnData | 사용자 목록 |
| add | `/api/main/env/userConf/add` | POST | ReturnData | 사용자 추가 |
| edit | `/api/main/env/userConf/edit` | POST | ReturnData | 사용자 수정 |
| delete | `/api/main/env/userConf/delete` | POST | ReturnData | 사용자 삭제 |
| getUserDetail | `/api/main/env/userConf/getUserDetail` | REQUEST | ReturnData | 사용자 상세 |
| checkUserId | `/api/main/env/userConf/checkUserId` | POST | ReturnData | 사용자ID 중복 확인 |
| getUserAuthList | `/api/main/env/userConf/getUserAuthList` | REQUEST | ReturnData | 사용자 권한 목록 |
| editUserSelf | `/api/main/env/userConf/editUserSelf` | POST | ReturnData | 본인 정보 수정 |
| editUserPassword | `/api/main/env/userConf/editUserPassword` | POST | ReturnData | 비밀번호 변경 |
| resetUserPassExpire | `/api/main/env/userConf/resetUserPassExpire` | POST | ReturnData | 비밀번호 만료 초기화 |

### UserManagementController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| postUserManagementRequest | `/api/main/env/user-management/request` | POST | ResponseEntity | 사용자 관리 요청 |
| resetOtp | `/api/main/env/user-management/reset-otp` | POST | ResponseEntity | OTP 초기화 |
| resetGpki | `/api/main/env/user-management/reset-gpki` | POST | ResponseEntity | GPKI 초기화 |
| resetPassword | `/api/main/env/user-management/reset-password` | POST | ResponseEntity | 비밀번호 초기화 |
| resetAccountLock | `/api/main/env/user-management/reset-account-lock` | POST | ResponseEntity | 계정 잠금 해제 |

### UserManagementHistoryController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getGridList | `/api/main/env/user-management/history/grid` | POST | ResponseEntity | 이력 그리드 |
| getCompareUserInfo | `/api/main/env/user-management/history/compare/user-info` | POST | ResponseEntity | 사용자 정보 비교 |
| cancelRequest | `/api/main/env/user-management/history/request/cancel` | POST | ResponseEntity | 요청 취소 |
| approveUserManagementHistory | `/api/main/env/user-management/history/request/approve` | POST | ResponseEntity | 요청 승인 |
| downloadExcel | `/api/main/env/user-management/history/download/excel` | POST | ResponseEntity | 엑셀 다운로드 |
| checkUser | `/api/main/env/user-management/history/check/user-id/{userId}` | GET | ResponseEntity | 사용자 확인 |

### UserManagementHistoryExcelDownloadController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| downloadExcel | `/api/main/env/user-management/history/download` | GET | void | 엑셀 다운로드 |

---

## 7. 시스템 관리 API

### CodeMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getCodeList | `/api/main/sys/codeMgmt/getCodeList` | REQUEST | ReturnData | 코드 목록 |
| addCode | `/api/main/sys/codeMgmt/addCode` | POST | ReturnData | 코드 추가 |
| editCode | `/api/main/sys/codeMgmt/editCode` | POST | ReturnData | 코드 수정 |
| getWeekList | `/api/main/sys/codeMgmt/getWeekList` | REQUEST | ReturnData | 주간 목록 |
| addWeek | `/api/main/sys/codeMgmt/addWeek` | POST | ReturnData | 주간 추가 |
| deleteWeek | `/api/main/sys/codeMgmt/deleteWeek` | POST | ReturnData | 주간 삭제 |
| getBoardList | `/api/main/sys/codeMgmt/getBoardList` | REQUEST | ReturnData | 게시판 목록 |
| editBoard | `/api/main/sys/codeMgmt/editBoard` | POST | ReturnData | 게시판 수정 |

### CustUserMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sys/custUserMgmt/getList` | REQUEST | ReturnData | 고객 사용자 목록 |
| add | `/api/main/sys/custUserMgmt/add` | POST | ReturnData | 고객 사용자 추가 |
| edit | `/api/main/sys/custUserMgmt/edit` | POST | ReturnData | 고객 사용자 수정 |
| delete | `/api/main/sys/custUserMgmt/delete` | POST | ReturnData | 고객 사용자 삭제 |
| getSmsGroupList | `/api/main/sys/custUserMgmt/getSmsGroupList` | REQUEST | ReturnData | SMS 그룹 목록 |
| addSmsGroup | `/api/main/sys/custUserMgmt/addSmsGroup` | POST | ReturnData | SMS 그룹 추가 |
| editSmsGroup | `/api/main/sys/custUserMgmt/editSmsGroup` | POST | ReturnData | SMS 그룹 수정 |
| deleteSmsGroup | `/api/main/sys/custUserMgmt/deleteSmsGroup` | POST | ReturnData | SMS 그룹 삭제 |
| getSmsSendList | `/api/main/sys/custUserMgmt/getSmsSendList` | REQUEST | ReturnData | SMS 전송 목록 |

### RiskMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/sys/riskMgmt/getList` | REQUEST | ReturnData | 위험 관리 목록 |
| edit | `/api/main/sys/riskMgmt/edit` | POST | ReturnData | 위험 관리 수정 |
| getRiskHistoryList | `/api/main/sys/riskMgmt/getRiskHistoryList` | REQUEST | ReturnData | 위험 이력 목록 |
| addRiskHistory | `/api/main/sys/riskMgmt/addRiskHistory` | POST | ReturnData | 위험 이력 추가 |
| editRiskLevel | `/api/main/sys/riskMgmt/editRiskLevel` | POST | ReturnData | 위험 레벨 수정 |

---

## 8. 로그/이력 API

### UserConnectLogController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getUserConnectLogList | `/api/main/logs/user-connect-log/getUserConnectLogList` | REQUEST | ReturnData | 접속 로그 목록 |
| getUserConnectIpList | `/api/main/logs/user-connect-log/getUserConnectIpList` | REQUEST | ReturnData | 접속 IP 목록 |

### UserActionLogController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getUserActionLogList | `/api/main/logs/user-action-log/getUserActionLogList` | REQUEST | ReturnData | 액션 로그 목록 |

### InstitutionCodeController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getInstitutionCodeList | `/api/main/logs/institution-code/getInstitutionCodeList` | REQUEST | ReturnData | 기관 코드 목록 |

### LogsCsvDownloadController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| downloadUserConnectLog | `/api/main/logs/csv/download/user-connect-log` | GET | void | 접속 로그 CSV |
| downloadUserActionLog | `/api/main/logs/csv/download/user-action-log` | GET | void | 액션 로그 CSV |

### UserConnectLogDailyController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getData | `/api/main/logs/user-connect/daily/data` | POST | ReturnData | 일일 접속 로그 |

### UserConnectLogPeriodController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getData | `/api/main/logs/user-connect/period/data` | POST | ReturnData | 기간별 접속 로그 |

### UserConnectLogInstitutionController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getData | `/api/main/logs/user-connect/institution/grid/data` | POST | ReturnData | 기관별 접속 로그 |
| getChartData | `/api/main/logs/user-connect/institution/chart/data` | POST | ReturnData | 기관별 차트 |

### UserActionLogDailyController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getData | `/api/main/logs/user-action/daily/data` | POST | ReturnData | 일일 액션 로그 |

### UserActionLogPeriodController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getData | `/api/main/logs/user-action/period/data` | POST | ReturnData | 기간별 액션 로그 |

### UserActionLogInstitutionController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getData | `/api/main/logs/user-action/institution/grid/data` | POST | ReturnData | 기관별 액션 로그 |
| getChartData | `/api/main/logs/user-action/institution/chart/data` | POST | ReturnData | 기관별 차트 |

### UserInoutHistMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/hist/userInoutHistMgmt/getList` | REQUEST | ReturnData | 입출력 이력 목록 |
| getDetail | `/api/main/hist/userInoutHistMgmt/getDetail` | REQUEST | ReturnData | 입출력 이력 상세 |

### UserActHistController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/hist/userActHist/getList` | REQUEST | ReturnData | 활동 이력 목록 |

### SmsEmailHistMgmtController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/hist/smsEmailHistMgmt/getList` | REQUEST | ReturnData | SMS/이메일 이력 |

---

## 9. 사고 관리 API

### AccidentApplyController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getAccidentList | `/api/main/acc/accidentApply/getAccidentList` | REQUEST | ReturnData | 사고 목록 |
| addAccidentApply | `/api/main/acc/accidentApply/addAccidentApply` | POST | ReturnData | 사고 접수 추가 |
| editAccidentApply | `/api/main/acc/accidentApply/editAccidentApply` | POST | ReturnData | 사고 접수 수정 |
| deleteAccidentApply | `/api/main/acc/accidentApply/deleteAccidentApply` | POST | ReturnData | 사고 접수 삭제 |
| getAccidenDeptList | `/api/main/acc/accidentApply/getAccidenDeptList` | REQUEST | ReturnData | 부서별 사고 목록 |
| getAccidentDetail | `/api/main/acc/accidentApply/getAccidentDetail` | REQUEST | ReturnData | 사고 상세 |
| updateAccidentProcess | `/api/main/acc/accidentApply/updateAccidentProcess` | POST | ReturnData | 사고 처리 업데이트 |
| updateMultiAccidentProcess | `/api/main/acc/accidentApply/updateMultiAccidentProcess` | POST | ReturnData | 다중 사고 처리 |
| getAccidentHistoryList | `/api/main/acc/accidentApply/getAccidentHistoryList` | REQUEST | ReturnData | 사고 이력 목록 |
| getLocalList | `/api/main/acc/accidentApply/getLocalList` | REQUEST | ReturnData | 지역 목록 |
| getPntInst | `/api/main/acc/accidentApply/getPntInst` | REQUEST | ReturnData | 상위 기관 |
| makeAcciHwpDownload | `/api/main/acc/accidentApply/makeAcciHwpDownload` | POST | ReturnData | HWP 다운로드 |
| importExcel | `/api/main/acc/accidentApply/importExcel` | REQUEST | ReturnData | 엑셀 가져오기 |
| importEml | `/api/main/acc/accidentApply/importEml` | REQUEST | ReturnData | 이메일 가져오기 |
| getTbzHomepv | `/api/main/acc/accidentApply/getTbzHomepv` | REQUEST | ReturnData | TBZ 홈페이지 |
| getTbzHacking | `/api/main/acc/accidentApply/getTbzHacking` | REQUEST | ReturnData | TBZ 해킹 |
| getDmgIpList | `/api/main/acc/accidentApply/getDmgIpList` | REQUEST | ReturnData | 피해 IP 목록 |
| getAttIpList | `/api/main/acc/accidentApply/getAttIpList` | REQUEST | ReturnData | 공격 IP 목록 |
| getTodayStatus | `/api/main/acc/accidentApply/getTodayStatus` | REQUEST | ReturnData | 오늘 현황 |
| getYearStatus | `/api/main/acc/accidentApply/getYearStatus` | REQUEST | ReturnData | 연간 현황 |
| getPeriodStatus | `/api/main/acc/accidentApply/getPeriodStatus` | REQUEST | ReturnData | 기간 현황 |
| getInstStatus | `/api/main/acc/accidentApply/getInstStatus` | REQUEST | ReturnData | 기관 현황 |
| getAccdTypeStatus | `/api/main/acc/accidentApply/getAccdTypeStatus` | REQUEST | ReturnData | 사고 유형 현황 |
| checkIp | `/api/main/acc/accidentApply/getIpByNationNm` | POST | ReturnData | IP 확인 |
| getInstByIP | `/api/main/acc/accidentApply/getInstByIP` | POST | ReturnData | IP별 기관 |
| getEncrySyncList | `/api/main/acc/accidentApply/getEncrySyncList` | REQUEST | ReturnData | 암호화 동기화 목록 |
| updateEncrySync | `/api/main/acc/accidentApply/updateEncrySync` | POST | ReturnData | 암호화 동기화 업데이트 |
| getNcscInfo | `/api/main/acc/accidentApply/getNcscInfo` | REQUEST | ReturnData | NCSC 정보 |
| checkEncryText | `/api/main/acc/accidentApply/checkEncryText` | POST | ReturnData | 암호화 문자열 확인 |
| getAccDuplList | `/api/main/acc/accidentApply/getAccDuplList` | REQUEST | ReturnData | 중복 사고 목록 |
| getInciMutiEndYn | `/api/main/acc/accidentApply/getInciMutiEndYn` | REQUEST | ReturnData | 다중 종료 여부 |
| getNciApi | `/api/main/acc/accidentApply/getNciApi` | REQUEST | String | NCI API |

### AccidentProcController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/ctrs/accidentProcState/getList` | REQUEST | ReturnData | 처리 상태 목록 |
| getProcessState | `/api/main/ctrs/accidentProcState/getProcessState` | REQUEST | ReturnData | 처리 상태 |
| getSystemType | `/api/main/ctrs/accidentProcState/getSystemType` | REQUEST | ReturnData | 시스템 유형 |

---

## 10. 홈 관리 API

### ForgeryUrlController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/home/forgeryUrlList/getList` | REQUEST | ReturnData | 위변조 URL 목록 |
| add | `/api/main/home/forgeryUrlList/add` | POST | ReturnData | 위변조 URL 추가 |
| edit | `/api/main/home/forgeryUrlList/edit` | POST | ReturnData | 위변조 URL 수정 |
| delete | `/api/main/home/forgeryUrlList/delete` | POST | ReturnData | 위변조 URL 삭제 |

### HealthCheckUrlController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/home/healthCheckUrlList/getList` | REQUEST | ReturnData | 헬스체크 URL 목록 |
| add | `/api/main/home/healthCheckUrlList/add` | POST | ReturnData | 헬스체크 URL 추가 |
| edit | `/api/main/home/healthCheckUrlList/edit` | POST | ReturnData | 헬스체크 URL 수정 |
| delete | `/api/main/home/healthCheckUrlList/delete` | POST | ReturnData | 헬스체크 URL 삭제 |

---

## 11. MOIS/VMS/CTSS API

### DashConfigController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getList | `/api/main/mois/dashConfig/getList` | REQUEST | ReturnData | 대시보드 설정 목록 |
| edit | `/api/main/mois/dashConfig/edit` | POST | ReturnData | 대시보드 설정 수정 |

### CtssRestController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getPrivacyPolicy | `/api/main/ctss/privacy-policy` | GET | String | 개인정보처리방침 |
| getAuthRedirect | `/api/main/ctss/redirect/auth` | GET | ReturnData | 인증 리다이렉트 |

### VmsRestController

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getPrivacyPolicy | `/api/main/vms/privacy-policy` | GET | String | 개인정보처리방침 |
| getAuthRedirect | `/api/main/vms/redirect/auth` | GET | ReturnData | 인증 리다이렉트 |

---

## 12. 엔지니어 API

### MenuMgmtController (engineer)

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| getPageList | `/api/engineer/menuMgmt/getPageList` | REQUEST | ReturnData | 페이지 목록 |
| getPageGroupList | `/api/engineer/menuMgmt/getPageGroupList` | REQUEST | ReturnData | 페이지 그룹 목록 |
| getMenuList | `/api/engineer/menuMgmt/getMenuList` | REQUEST | ReturnData | 메뉴 목록 |

### PopupController (engineer)

| 메소드명 | URI | HTTP Method | 반환 타입 | 설명 |
|---------|-----|-------------|----------|------|
| addPage | `/api/engineer/popup/addPage` | POST | ReturnData | 페이지 추가 |
| delPage | `/api/engineer/popup/delPage` | POST | ReturnData | 페이지 삭제 |
| savePage | `/api/engineer/popup/savePage` | POST | ReturnData | 페이지 저장 |
| addPageGroup | `/api/engineer/popup/addPageGroup` | POST | ReturnData | 페이지 그룹 추가 |
| delPageGroup | `/api/engineer/popup/delPageGroup` | POST | ReturnData | 페이지 그룹 삭제 |
| savePageGroup | `/api/engineer/popup/savePageGroup` | POST | ReturnData | 페이지 그룹 저장 |
| addMenu | `/api/engineer/popup/addMenu` | POST | ReturnData | 메뉴 추가 |
| delMenu | `/api/engineer/popup/delMenu` | POST | ReturnData | 메뉴 삭제 |
| saveMenu | `/api/engineer/popup/saveMenu` | POST | ReturnData | 메뉴 저장 |
| getDefineMenuList | `/api/engineer/popup/getDefineMenuList` | REQUEST | ReturnData | 정의 메뉴 목록 |

---

## 통계 요약

- **총 Data Controller 수**: 61개 클래스
- **총 API 엔드포인트 수**: 약 280+ 개
- **주요 반환 타입**: `ReturnData`, `ResponseEntity`
