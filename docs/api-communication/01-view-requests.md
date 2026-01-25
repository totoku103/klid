# 웹뷰 요청 목록 (View Controllers)

## 개요

이 문서는 JSP 페이지를 렌더링하는 View Controller의 목록입니다.

**특징**:
- `@Controller` 어노테이션 사용
- `@ResponseBody` 없음
- 반환 타입: `void`, `String`, 또는 `ModelAndView`

---

## 1. 기본 View Controller

### ViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| root | `/` | GET | 루트 페이지 |
| test | `/test` | GET | 테스트 페이지 |
| login2 | `/login.do` | GET | 로그인 페이지 |
| engineer | `/engineer.do` | REQUEST | 엔지니어 페이지 |
| netisMain | `/main/main.do` | REQUEST | 메인 페이지 |
| errorPage | `/error.do` | REQUEST | 에러 페이지 |

### MainViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| mainMainDo | `/main/main.do` | GET | 메인 대시보드 |

---

## 2. 웹 대시보드 (WebDash)

### WebDashViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| dashView | `/webdash/{path}` | REQUEST | 대시보드 뷰 (동적 경로) |

---

## 3. 환경 설정 (Environment)

### EnvViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| instMgmt | `/main/env/instMgmt` | REQUEST | 기관 관리 |
| instIPMgmt | `/main/env/instIPMgmt` | REQUEST | 기관 IP 관리 |
| nationIPMgmt | `/main/env/nationIPMgmt` | REQUEST | 국가 IP 관리 |
| userConf | `/main/env/userConf` | REQUEST | 사용자 설정 |
| userManagement | `/main/env/user-management` | REQUEST | 사용자 관리 |
| userManagementHistory | `/main/env/user-management/history` | REQUEST | 사용자 관리 이력 |

---

## 4. 게시판 (Board/Sec)

### SecViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| shareBoardList | `/main/sec/shareBoardList` | REQUEST | 공유 게시판 |
| noticeBoardList | `/main/sec/noticeBoardList` | REQUEST | 공지사항 게시판 |
| resourceBoardList | `/main/sec/resourceBoardList` | REQUEST | 자료실 게시판 |
| takeOverBoardList | `/main/sec/takeOverBoardList` | REQUEST | 인수인계 게시판 |
| qnaBoardList | `/main/sec/qnaBoardList` | REQUEST | Q&A 게시판 |

---

## 5. 보고서 (Report)

### RptViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| reportCollection | `/main/rpt/reportCollection` | REQUEST | 보고서 모음 |
| reportDailyState | `/main/rpt/reportDailyState` | REQUEST | 일일 현황 보고서 |
| reportWeeklyState | `/main/rpt/reportWeeklyState` | REQUEST | 주간 현황 보고서 |
| reportInciLocal | `/main/rpt/reportInciLocal` | REQUEST | 지역별 사고 보고서 |
| reportSecurityResult | `/main/rpt/reportSecurityResult` | REQUEST | 보안 결과 보고서 |
| reportInciType | `/main/rpt/reportInciType` | REQUEST | 사고 유형 보고서 |
| reportInciAttNatn | `/main/rpt/reportInciAttNatn` | REQUEST | 공격 국가 보고서 |
| reportDailyInciState | `/main/rpt/reportDailyInciState` | REQUEST | 일일 사고 현황 보고서 |
| reportDaily | `/main/rpt/reportDaily` | REQUEST | 일일 보고서 |
| reportInciPrty | `/main/rpt/reportInciPrty` | REQUEST | 사고 우선순위 보고서 |
| reportInciPrcsStat | `/main/rpt/reportInciPrcsStat` | REQUEST | 사고 처리 상태 보고서 |
| reportInciDetail | `/main/rpt/reportInciDetail` | REQUEST | 사고 상세 보고서 |

---

## 6. 이력 관리 (History)

### HistViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| userInoutHistMgmt | `/main/hist/userInoutHistMgmt` | REQUEST | 사용자 입출력 이력 |
| userActHist | `/main/hist/userActHist` | REQUEST | 사용자 활동 이력 |
| smsEmailHistMgmt | `/main/hist/smsEmailHistMgmt` | REQUEST | SMS/이메일 이력 |

### UserConnectLogViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| getLogList | `/main/hist/userConnectLogMgmt` | REQUEST | 사용자 접속 로그 |

### UserActionLogViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| getUserActionLogMgmtView | `/main/logs/user-action` | REQUEST | 사용자 액션 로그 |

---

## 7. 사고 관리 (Accident)

### AccidentViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| accidentApplyList | `/main/acc/accidentApplyList` | REQUEST | 사고 접수 목록 |

---

## 8. 시스템 관리 (System)

### CodeMgmtViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| codeMgmtList | `/main/sys/codeMgmtList` | REQUEST | 코드 관리 |
| weekMgmt | `/main/sys/weekMgmt` | REQUEST | 주간 관리 |
| boardMgmt | `/main/sys/boardMgmt` | REQUEST | 게시판 관리 |
| custUserMgmt | `/main/sys/custUserMgmt` | REQUEST | 고객 사용자 관리 |

### RiskMgmtViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| getRiskMgmtList | `/main/sys/riskMgmt` | REQUEST | 위험 관리 |

---

## 9. 홈 관리 (Home)

### HomeViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| healthCheckUrlList | `/main/home/healthCheckUrlList` | REQUEST | 헬스체크 URL 관리 |
| forgeryUrlList | `/main/home/forgeryUrlList` | REQUEST | 위변조 URL 관리 |

---

## 10. VMS / CTRS / CTSS

### VmsViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| vmsView | `/main/vms` | REQUEST | VMS 메인 |

### CtrsViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| accidentProcState | `/main/ctrs/accidentProcState` | REQUEST | 사고 처리 상태 |

### CtrsRedirectViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| redirect | `/ctrs/redirect.do` | GET | CTRS 리다이렉트 |

### CtssViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| getSignupPage | `/main/ctss/sign-up` | GET | CTSS 회원가입 |
| getRedirectCtssMainPage | `/main/ctss/page-redirect` | GET | CTSS 메인 리다이렉트 |

---

## 11. MOIS

### MoisViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| dashConfig | `/main/mois/dashConfig` | REQUEST | MOIS 대시보드 설정 |

---

## 12. GPKI 인증

### GpkiController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| error | `/gpki/error` | GET | GPKI 에러 |
| openPopup | `/gpki/sign-in-popup` | GET | GPKI 로그인 팝업 |
| openSignUpPopup | `/gpki/sign-up-popup` | GET | GPKI 회원가입 팝업 |
| requestSecureSession | `/gpki/request-secure-session` | GET | 보안 세션 요청 |
| responseSecureSession | `/gpki/response-secure-session` | POST | 보안 세션 응답 |
| createSecureSession | `/gpki/create-secure-session` | POST | 보안 세션 생성 |
| resultPage | `/gpki/result` | GET | GPKI 결과 페이지 |
| registerPage | `/gpki/register` | POST | GPKI 등록 |

---

## 13. 팝업 View Controller

### PopupViewController (main)

#### 공통 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pGridColsMgr | `/main/popup/comm/pGridColsMgr` | 그리드 컬럼 관리 |
| pNationList | `/main/popup/comm/pNationList` | 국가 목록 |
| pAccDuplList | `/main/popup/comm/pAccDuplList` | 사고 중복 목록 |

#### 사고 관리 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pAccidentAdd | `/main/popup/acc/pAccidentAdd` | 사고 추가 |
| pAccidentCopy | `/main/popup/acc/pAccidentCopy` | 사고 복사 |
| pAccidentDeptList | `/main/popup/acc/pAccidentDeptList` | 부서별 사고 목록 |
| pAccidentDetail | `/main/popup/acc/pAccidentDetail` | 사고 상세 |
| pAccidentEdit | `/main/popup/acc/pAccidentEdit` | 사고 수정 |
| pAccidentConf | `/main/popup/acc/pAccidentProcess` | 사고 처리 확인 |
| pAccidentHistory | `/main/popup/acc/pAccidentHistory` | 사고 이력 |
| pImportEmlCsv | `/main/popup/acc/pImportEmlCsv` | 이메일 CSV 가져오기 |

#### 시스템 관리 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pCodeLv1Add | `/main/popup/sys/pCodeLv1Add` | 1레벨 코드 추가 |
| pCodeLv1Edit | `/main/popup/sys/pCodeLv1Edit` | 1레벨 코드 수정 |
| pCodeLv2Add | `/main/popup/sys/pCodeLv2Add` | 2레벨 코드 추가 |
| pCodeLv2Edit | `/main/popup/sys/pCodeLv2Edit` | 2레벨 코드 수정 |
| pCodeLv3Add | `/main/popup/sys/pCodeLv3Add` | 3레벨 코드 추가 |
| pCodeLv3Edit | `/main/popup/sys/pCodeLv3Edit` | 3레벨 코드 수정 |
| pBoardMgmtEdit | `/main/popup/sys/pBoardMgmtEdit` | 게시판 설정 수정 |
| pCustUserAdd | `/main/popup/sys/pCustUserAdd` | 고객 사용자 추가 |
| pCustUserEdit | `/main/popup/sys/pCustUserEdit` | 고객 사용자 수정 |
| pRiskMgmtEdit | `/main/popup/sys/pRiskMgmtEdit` | 위험 관리 수정 |
| pRiskHistoryWrite | `/main/popup/sys/pRiskHistoryWrite` | 위험 이력 작성 |
| pThreatSet | `/main/popup/sys/pThreatSet` | 위협 설정 |
| pThreatHistList | `/main/popup/sys/pThreatHistList` | 위협 이력 목록 |
| pPeriodSet | `/main/popup/sys/pPeriodSet` | 기간 설정 |
| pPolicyInfo | `/main/popup/sys/pPolicyInfo` | 정책 정보 |
| pSmsGrpAdd | `/main/popup/sys/pSmsGrpAdd` | SMS 그룹 추가 |
| pSmsGrpEdit | `/main/popup/sys/pSmsGrpEdit` | SMS 그룹 수정 |
| pCustUserSms | `/main/popup/sys/pCustUserSms` | 고객 사용자 SMS |

#### 환경 설정 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pInstAdd | `/main/popup/env/pInstAdd` | 기관 추가 |
| pInstEdit | `/main/popup/env/pInstEdit` | 기관 수정 |
| pInstIPAdd | `/main/popup/env/pInstIPAdd` | 기관 IP 추가 |
| pInstIPEdit | `/main/popup/env/pInstIPEdit` | 기관 IP 수정 |
| pNationIPImport | `/main/popup/env/pNationIPImport` | 국가 IP 가져오기 |
| pNationIPList | `/main/popup/env/pNationIPList` | 국가 IP 목록 |
| userConfPasswordEdit | `/main/popup/env/pUserConfPasswordEdit` | 비밀번호 변경 |
| pUserConfAdd | `/main/popup/env/pUserConfAdd` | 사용자 추가 |
| pUserManagementAdd | `/main/popup/env/pUserManagementAdd` | 사용자 관리 추가 |
| pUserConfEdit | `/main/popup/env/pUserConfEdit` | 사용자 수정 |
| pUserManagementEdit | `/main/popup/env/pUserManagementEdit` | 사용자 관리 수정 |
| pUserManagementRequestConfirm | `/main/popup/env/pUserManagementRequestConfirm` | 사용자 요청 확인 |
| pUserConfDetail | `/main/popup/env/pUserConfDetail` | 사용자 상세 |
| pUserSelfConfEdit | `/main/popup/env/pUserSelfConfEdit` | 본인 정보 수정 |
| pUserConfPasswordEditByPre | `/main/popup/env/expire/pUserPassExpireReset` | 만료 비밀번호 재설정 |
| pUserPasswordChange | `/main/popup/env/expire/pUserPasswordChange` | 비밀번호 변경 |
| pUserHistoryExcelDownload | `/main/popup/env/pUserHistoryExcelDownload` | 사용자 이력 엑셀 |
| pNationEdit | `/main/popup/env/pNationEdit` | 국가 수정 |

#### 홈 관리 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pHomeAlert | `/main/popup/home/pHomeAlert` | 홈 알림 |
| pImportXls | `/main/popup/home/pImportXls` | 엑셀 가져오기 |
| pHealthCheckUrlAdd | `/main/popup/home/pHealthCheckUrlAdd` | 헬스체크 URL 추가 |
| pHealthCheckUrlEdit | `/main/popup/home/pHealthCheckUrlEdit` | 헬스체크 URL 수정 |

#### 게시판 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pTakeOverBoardListAdd | `/main/popup/sec/pTakeOverBoardListAdd` | 인수인계 추가 |
| pTakeOverBoardListEdit | `/main/popup/sec/pTakeOverBoardListEdit` | 인수인계 수정 |

#### 보고서 팝업

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pNcscAlert | `/main/popup/rpt/pNcscAlert` | NCSC 알림 |

### PrivatePolicyPopupViewController

| 메소드명 | URI | 설명 |
|---------|-----|------|
| getComparePolicy | `/main/popup/compare-privacy-policy/{version}` | 개인정보처리방침 비교 |
| getPrivatePolicy | `/main/popup/privacy-policy/{version}` | 개인정보처리방침 |

---

## 14. 엔지니어 View Controller

### EngineerViewController

| 메소드명 | URI | HTTP Method | 설명 |
|---------|-----|-------------|------|
| menuMgmt | `/engineer/menuMgmt` | REQUEST | 메뉴 관리 |
| menuGrpMgmt | `/engineer/menuGrpMgmt` | REQUEST | 메뉴 그룹 관리 |
| defGrpConf | `/engineer/defGrpConf` | REQUEST | 기본 그룹 설정 |
| authGrpConf | `/engineer/authGrpConf` | REQUEST | 권한 그룹 설정 |
| encrySync | `/engineer/encrySync` | REQUEST | 암호화 동기화 |
| passReset | `/engineer/passReset` | REQUEST | 비밀번호 초기화 |

### PopupViewController (engineer)

| 메소드명 | URI | 설명 |
|---------|-----|------|
| pPageAdd | `/engineer/popup/pPageAdd` | 페이지 추가 |
| pPageGroupAdd | `/engineer/popup/pPageGroupAdd` | 페이지 그룹 추가 |
| pMenuAdd | `/engineer/popup/pMenuAdd` | 메뉴 추가 |

---

## 통계 요약

- **총 View Controller 수**: 26개 클래스
- **총 View 엔드포인트 수**: 약 130+ 개
- **팝업 엔드포인트 수**: 약 60+ 개
