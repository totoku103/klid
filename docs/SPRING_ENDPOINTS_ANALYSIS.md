# KLID Java Web - Spring Endpoint 분석 문서

> 생성일: 2026-01-22
> 총 컨트롤러: 82개
> 총 Endpoint: 약 500개+

---

## 목차
1. [Common Controllers](#1-common-controllers)
2. [Main View Controllers](#2-main-view-controllers)
3. [Report Controllers](#3-report-controllers)
4. [Environment/System Controllers](#4-environmentsystem-controllers)
5. [Board Controllers](#5-board-controllers)
6. [Third Party REST Controllers](#6-third-party-rest-controllers)
7. [Web Dashboard Controllers](#7-web-dashboard-controllers)
8. [Engineer Controllers](#8-engineer-controllers)
9. [기타 Controllers](#9-기타-controllers)

---

## 1. Common Controllers

### 1.1 LoginController (`/api/login`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /isUserAccountLocked | isUserAccountLocked | 사용자 계정 잠금 여부 확인 |
| POST | /getLogin | getLogin | 로그인 처리 |
| POST | /prcsLogout.do | prcsLogout | 로그아웃 처리 |
| POST | /getOtpGenerate | getOtpGenerate | OTP 생성 |
| POST | /getOtpCheck | getOtpCheck | OTP 검증 |
| POST | /editOtpKey | editUser | OTP 키 편집 |

### 1.2 ViewController (`/`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | / | root | 루트 페이지 (login.do로 리다이렉트) |
| GET | /test | test | 테스트 페이지 |
| GET | /login.do | login2 | 로그인 페이지 |
| POST/GET | /engineer.do | engineer | 엔지니어 페이지 |
| POST/GET | /main/main.do | netisMain | 메인 페이지 |
| POST/GET | /error.do | errorPage | 에러 페이지 |

### 1.3 LoginVmsPrimaryController (`/api/login/vms/authenticate`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /primary | authenticatePrimary | VMS 1차 인증 |

### 1.4 LoginVmsSecondController (`/api/login/vms/authenticate/second`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /otp | authenticateOtp | VMS OTP 2차 인증 |
| POST | /email/send | sendEmail | VMS 이메일 인증 발송 |
| POST | /email/validate | validateEmailCode | VMS 이메일 인증 검증 |

### 1.5 LoginCtssPrimaryController (`/api/login/ctss/authenticate`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /primary | authenticatePrimary | CTSS 1차 인증 |

### 1.6 LoginCtssSecondController (`/api/login/ctss/authenticate/second`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /otp | authenticateOtp | CTSS OTP 2차 인증 |

### 1.7 LoginCtrsPrimaryController (`/api/login/ctrs/authenticate`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /primary | authenticatePrimary | CTRS 1차 인증 |

### 1.8 LoginCtrsSecondController (`/api/login/ctrs/authenticate/second`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /otp | authenticateOtp | CTRS OTP 2차 인증 |
| POST | /email/send | authenticateEmail | CTRS 이메일 인증 발송 |

### 1.9 CtrsRedirectController (`/api/third-party/auth`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /redirect | generateRedirectToken | 타 시스템 리다이렉트 토큰 생성 |

### 1.10 ThirdPartyOtpController (`/api/third-party/auth/otp`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /initialize | initialize | OTP 초기화 (타 시스템 요청) |

### 1.11 FileController (`/api/file`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST/GET | /download | fileDownload | 파일 다운로드 |
| POST/GET | /upload | fileUpload | 파일 업로드 |
| POST | /delete | fileDelete | 파일 삭제 |
| POST/GET | /saveChart.do | saveChart | 차트 이미지 저장 |
| POST/GET | /fileDown.do | fileDown | 파일 다운로드 페이지 |
| POST/GET | /docDown.do | docDown | 문서 다운로드 |
| POST/GET | /ozFileDown.do | ozFileDown | OZ 파일 다운로드 |
| POST/GET | /exportChart.do | exportChart | 차트 내보내기 |
| POST | /exportGrid.do | exportGrid | 그리드 데이터 내보내기 |
| POST | /exportImage.do | exportImage | 이미지 내보내기 |
| POST | /saveHighchart.do | saveHighchart | Highchart 저장 |
| POST/GET | /exportHighchart.do | exportHighchart | Highchart 내보내기 |
| POST/GET | /accUpload | fileAccUpload | 사고접수 파일 업로드 |
| POST/GET | /accEmlCsvUpload | fileEmlAccUpload | 사고접수 EML/CSV 파일 업로드 |
| POST | /accEmlCsvDownload | fileEmlAccDownload | 사고접수 양식파일 다운로드 |
| POST | /accDelete | fileAccDelete | 사고접수 파일 삭제 |
| POST/GET | /accDownload | fileAddDownload | 사고접수 파일 다운로드 |
| POST/GET | /codeUpload | codeUpload | 코드 도움말 파일 업로드 |
| POST/GET | /codeDownload | codeDownload | 코드 도움말 파일 다운로드 |
| POST/GET | /homeURLUpload | homeURLUpload | 홈페이지 모니터링 엑셀 업로드 |
| POST | /homeXlsDownload | homeXlsDownload | 홈페이지 양식 파일 다운로드 |

### 1.12 MenuController (`/api/common/menu`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getMenuTag | getMenuTag | 메뉴 태그 조회 |
| GET | /getSimpleMenuList | getSimpleMenuList | 단순 메뉴 목록 조회 |
| POST | /getExcludeMenuList | getExcludeMenuList | 제외 메뉴 목록 조회 |
| POST | /saveExcludeMenuList | saveExcludeMenuList | 제외 메뉴 목록 저장 |

### 1.13 CodeController (`/api/common/code`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST/GET | /getCommonCode | getCommonCode | 공통 코드 조회 |
| POST/GET | /getLocalCode | getLocalCode | 지역 코드 조회 |
| POST/GET | /getSurveyType | getSurveyType | 설문 타입 조회 |
| POST/GET | /getCodeFilePath | getCodeFilePath | 코드 파일 경로 조회 |
| POST/GET | /getDashTextCode | getDashTextCode | 대시보드 텍스트 코드 조회 |
| POST/GET | /getNoticeSrcType | getNoticeSrcType | 공지사항 소스 타입 조회 |

### 1.14 GrpController (`/api/common/grp`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getGrpDuplCnt | getGrpDuplCnt | 그룹 중복 개수 조회 |
| POST/GET | /getAuthConfDefaultGrpTreeListAll | getAuthConfDefaultGrpTreeListAll | 권한 그룹 트리 목록 조회 (전체) |
| POST/GET | /getAuthGrpList | getAuthGrpList | 권한 그룹 목록 조회 |
| POST | /addAuthGrp | addAuthGrp | 권한 그룹 추가 |
| POST | /saveAuthGrp | saveAuthGrp | 권한 그룹 저장 |
| POST | /delAuthGrp | delAuthGrp | 권한 그룹 삭제 |
| POST/GET | /getDefaultGrpTreeListAll | getDefaultGrpTreeListAll | 기본 그룹 트리 목록 조회 (전체) |
| POST/GET | /getDefaultGrpTreeList | getDefaultGrpTreeList | 기본 그룹 트리 목록 조회 |
| POST/GET | /getVmSvrGrpTreeList | getVmSvrGrpTreeList | VM 서버 그룹 트리 목록 조회 |
| POST/GET | /getL4DefaultGrpTreeList | getL4DefaultGrpTreeList | L4 기본 그룹 트리 목록 조회 |
| POST/GET | /getApDefaultGrpTreeList | getApDefaultGrpTreeList | AP 기본 그룹 트리 목록 조회 |
| POST | /addDefaultGrp | addDefaultGrp | 기본 그룹 추가 |
| POST | /editDefaultGrp | editDefaultGrp | 기본 그룹 편집 |
| POST | /delDefaultGrp | delDefaultGrp | 기본 그룹 삭제 |
| POST/GET | /getSearchGrpTreeList | getSearchGrpTreeList | 검색 그룹 트리 목록 조회 |
| POST | /addSearchGrp | addSearchGrp | 검색 그룹 추가 |
| POST | /editSearchGrp | editSearchGrp | 검색 그룹 편집 |
| POST | /delSearchGrp | delSearchGrp | 검색 그룹 삭제 |
| POST/GET | /getIfGrpTreeList | getIfGrpTreeList | 회선 그룹 트리 목록 조회 |
| POST | /addIfGrp | addIfGrp | 회선 그룹 추가 |
| POST | /editIfGrp | editIfGrp | 회선 그룹 편집 |
| POST | /delIfGrp | delIfGrp | 회선 그룹 삭제 |
| POST/GET | /getServerGrpTreeList | getServerGrpTreeList | 서버 그룹 트리 목록 조회 |
| POST | /addSvrGrp | addSvrGrp | 서버 그룹 추가 |
| POST | /editSvrGrp | editSvrGrp | 서버 그룹 편집 |
| POST | /delSvrGrp | delSvrGrp | 서버 그룹 삭제 |
| POST/GET | /getMangGrpTreeList | getMangGrpTreeList | 망 그룹 트리 목록 조회 |
| POST | /addMangGrp | addMangGrp | 망 그룹 추가 |
| POST | /editMangGrp | editMangGrp | 망 그룹 편집 |
| POST | /delMangGrp | delMangGrp | 망 그룹 삭제 |
| POST/GET | /getMangFlowGrpTreeList | getMangFlowGrpTreeList | 망 흐름 그룹 트리 목록 조회 |
| POST | /addMangFlowGrp | addMangFlowGrp | 망 흐름 그룹 추가 |
| POST | /editMangFlowGrp | editMangFlowGrp | 망 흐름 그룹 편집 |
| POST | /delMangFlowGrp | delMangFlowGrp | 망 흐름 그룹 삭제 |
| POST/GET | /getServiceGrpTreeList | getServiceGrpTreeList | 서비스 그룹 트리 목록 조회 |
| POST | /addServiceGrp | addServiceGrp | 서비스 그룹 추가 |
| POST | /editServiceGrp | editServiceGrp | 서비스 그룹 편집 |
| POST | /delServiceGrp | delServiceGrp | 서비스 그룹 삭제 |
| POST/GET | /getSvcPortGrpList | getSvcPortGrpList | 서비스 포트 그룹 목록 조회 |
| POST | /addSvcPortGrp | addSvcPortGrp | 서비스 포트 그룹 추가 |
| POST | /editSvcPortGrp | editSvcPortGrp | 서비스 포트 그룹 편집 |
| POST | /delSvcPortGrp | delSvcPortGrp | 서비스 포트 그룹 삭제 |
| POST/GET | /getAppGrpTreeList | getAppGrpTreeList | App 그룹 트리 목록 조회 |
| POST | /addAppGrp | addAppGrp | App 그룹 추가 |
| POST/GET | /delAppGrp | delAppGrp | App 그룹 삭제 |
| POST/GET | /editAppGrp | editAppGrp | App 그룹 편집 |
| POST/GET | /getAsGrpTreeList | getAsGrpTreeList | AS 그룹 트리 목록 조회 |
| POST | /addAsGrp | addAsGrp | AS 그룹 추가 |
| POST | /editAsGrp | editAsGrp | AS 그룹 편집 |
| POST | /delAsGrp | delAsGrp | AS 그룹 삭제 |
| POST/GET | /getInstGrpTreeList | getInstGrpTreeList | 기관 그룹 트리 목록 조회 |

### 1.15 GpkiController (`/gpki`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /error | error | GPKI 에러 페이지 |
| GET | /sign-in-popup | openPopup | GPKI 로그인 팝업 오픈 |
| GET | /sign-up-popup | openSignUpPopup | GPKI 회원가입 팝업 오픈 |
| GET | /request-secure-session | requestSecureSession | GPKI 보안 세션 요청 |
| POST | /response-secure-session | responseSecureSession | GPKI 보안 세션 응답 |
| POST | /create-secure-session | createSecureSession | GPKI 보안 세션 생성 (현재 비활성화) |
| GET | /result | resultPage | GPKI 결과 페이지 |
| POST | /register | registerPage | GPKI 등록 (현재 비활성화) |

---

## 2. Main View Controllers

### 2.1 MainViewController (`/main/board`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| RequestMapping | /pNoticeBoardList.do | pNoticeBoardList | 공지게시판 목록 |
| RequestMapping | /pNoticeBoardContents.do | pNoticeBoardContents | 공지게시판 상세 |
| RequestMapping | /pNoticeBoardWrite.do | pNoticeBoardWrite | 공지게시판 작성 |
| RequestMapping | /pNoticeBoardEdit.do | pNoticeBoardEdit | 공지게시판 수정 |
| RequestMapping | /pResourceBoardList.do | pResourceBoardList | 보안자료실 목록 |
| RequestMapping | /pResourceBoardContents.do | pResourceBoardContents | 보안자료실 상세 |
| RequestMapping | /pResourceBoardWrite.do | pResourceBoardWrite | 보안자료실 작성 |
| RequestMapping | /pResourceBoardEdit.do | pResourceBoardEdit | 보안자료실 수정 |
| RequestMapping | /pShareBoardBoardList.do | pShareBoardBoardList | 침해대응 정보공유 목록 |
| RequestMapping | /pShareBoardContents.do | pShareBoardContents | 침해대응 정보공유 상세 |
| RequestMapping | /pShareBoardWrite.do | pShareBoardWrite | 침해대응 정보공유 작성 |
| RequestMapping | /pShareBoardEdit.do | pShareBoardEdit | 침해대응 정보공유 수정 |
| RequestMapping | /pQnaBoardList.do | pQnaBoardList | 문의/의견 목록 |
| RequestMapping | /pQnaBoardContents.do | pQnaBoardContents | 문의/의견 상세 |
| RequestMapping | /pQnaBoardWrite.do | pQnaBoardWrite | 문의/의견 작성 |
| RequestMapping | /pQnaBoardComment.do | pQnaBoardComment | 문의/의견 댓글 |
| RequestMapping | /pQnaBoardEdit.do | pQnaBoardEdit | 문의/의견 수정 |

### 2.2 HomeViewController (`/main/home`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| RequestMapping | /forgeryUrl.do | userConf | 위변조 URL |
| RequestMapping | /forgeryUrlHist.do | forgeryUrlHist | 위변조 URL 이력 |
| RequestMapping | /healthCheckUrl.do | healthCheckUrl | 헬스체크 URL |
| RequestMapping | /healthCheckHist.do | healthCheckHist | 헬스체크 장애이력 |
| RequestMapping | /healthCheckStat.do | healthCheckStat | 헬스체크 현황조회 |

### 2.3 PopupViewController (`/main/popup`)
총 54개 팝업 엔드포인트 (상세 목록 생략)

주요 팝업:
- 그리드 컬럼 관리, 비밀번호 변경
- 사고접수 등록/수정/상세/이력
- 코드 관리 (레벨1,2,3)
- 기관 관리, 기관 IP 관리
- 사용자 관리, 사용자 설정

### 2.4 RptViewController (`/main/rpt`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| RequestMapping | /reportInciType.do | reportInciType | 유형별 보고서 |
| RequestMapping | /reportInciAttNatn.do | reportInciAttNatn | 공격국가별 보고서 |
| RequestMapping | /reportInciPrty.do | reportInciPrty | 우선순위별 보고서 |
| RequestMapping | /reportInciPrcsStat.do | reportInciPrcsStat | 처리상태별 보고서 |
| RequestMapping | /reportInciLocal.do | reportInciLocal | 지역별 보고서 |
| RequestMapping | /reportInciSido | reportInciSido | 시도별 보고서 |
| RequestMapping | /reportDailyInciState.do | reportDailyInciState | 일일사고 현황 보고서 |
| RequestMapping | /reportDailyState.do | reportDailyState | 일일 상태 보고서 |
| RequestMapping | /reportWeeklyState.do | reportWeeklyState | 주간 상태 보고서 |
| RequestMapping | /reportSecurityResult.do | reportSecurityResult | 보안 결과 보고서 |
| RequestMapping | /reportInciDetail.do | reportInciDetail | 상세 보고서 |
| RequestMapping | /reportCtrsDailyState.do | reportCtrsDailyState | 운영 일일 상태 보고서 |
| RequestMapping | /reportCtrsDailyDetail.do | reportCtrsDailyDetail | 운영 일일 상세 보고서 |

### 2.5 SecViewController (`/main/sec`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| RequestMapping | /noticeBoardList.do | noticeBoardList | 공지사항 |
| RequestMapping | /resourceBoardList.do | resourceBoardList | 보안자료실 |
| RequestMapping | /shareBoardList.do | shareBoardList | 침해대응정보공유 |
| RequestMapping | /qnaBoardList.do | qnaBoardList | 문의/의견 |
| RequestMapping | /takeOverBoardList.do | takeOverBoardList | 인수인계 |
| RequestMapping | /moisBoardList.do | moisBoardList | 행안부 게시판 |

### 2.6 EnvViewController (`/main/env`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| RequestMapping | /userConf.do | userConf | 사용자 관리 |
| RequestMapping | /userManagement.do | userManagement | 사용자 관리 - 승인 |
| RequestMapping | /userManagementHistory.do | userManagementHistory | 사용자 관리 요청 내역 |
| RequestMapping | /instMgmt.do | instMgmt | 기관 관리 |
| RequestMapping | /instIPMgmt.do | instIPMgmt | 기관별 IP대역 관리 |
| RequestMapping | /nationIPMgmt.do | nationIPMgmt | 국가별 IP대역 관리 |
| RequestMapping | /userAddrList.do | userAddrList | 담당자 연락처 |

### 2.7 기타 View Controllers
- **MoisViewController**: `/main/mois/dashConfig.do`
- **CtrsViewController**: `/main/ctrs/accidentProcState.do`
- **CtssViewController**: VMS/CTSS 회원가입, 페이지 리다이렉트
- **VmsViewController**: VMS 회원가입, 페이지 리다이렉트
- **UserActionLogViewController**: 사용자 행동 로그 (요약/일일/기간/기관별)
- **UserConnectLogViewController**: 사용자 연결 로그 (요약/일일/기간/기관별)

---

## 3. Report Controllers

### 3.1 ReportInciDetailController (`/api/main/rpt/reportInciDetail`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getDetailList | getDetailList | 사건 상세 목록 조회 |
| GET | /exportReportDailyDownload | exportReportDailyDownload | 일일 보고서 다운로드 |

### 3.2 ReportInciTypeController (`/api/main/rpt/reportInciType`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getTypeList | getTypeList | 사고유형 목록 조회 |
| POST | /saveHighChartImg | saveHighChartImg | HighChart 이미지 저장 |
| POST | /exportReportInciType | exportReportInciType | 사고유형 보고서 내보내기 |

### 3.3 ReportInciPrcsStatController (`/api/main/rpt/reportInciPrcsStat`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getPrcsStatList | getPrcsStatList | 처리상태 목록 조회 |
| POST | /saveHighChartImg | saveHighChartImg | HighChart 이미지 저장 |
| POST | /exportReportInciPrcsStat | exportReportInciPrcsStat | 처리상태 보고서 내보내기 |

### 3.4 ReportInciPrtyController (`/api/main/rpt/reportInciPrty`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getPrtyList | getPrtyList | 우선순위 목록 조회 |
| POST | /saveHighChartImg | saveHighChartImg | HighChart 이미지 저장 |
| POST | /exportReportInciPrty | exportReportInciPrty | 우선순위 보고서 내보내기 |

### 3.5 ReportInciLocalController (`/api/main/rpt/reportInciLocal`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getLocalList | getLocalList | 지역 목록 조회 |
| GET | /getInciSidoList | getInciSidoList | 사건 시도 목록 조회 |
| POST | /saveHighChartImg | saveHighChartImg | HighChart 이미지 저장 |
| POST | /exportReportInciLocal | exportReportInciLocal | 지역별 보고서 내보내기 |

### 3.6 ReportInciAttNatnController (`/api/main/rpt/reportInciAttNatn`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getAttList | getAttList | 공격국가 목록 조회 |
| POST | /saveHighChartImg | saveHighChartImg | HighChart 이미지 저장 |
| POST | /exportReportAttNatn | exportReportAttNatn | 공격국가 보고서 내보내기 |

### 3.7 ReportSecurityResultController (`/api/main/rpt/reportSecurityResult`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getResultTotal | getResultTotal | 보안결과 총계 조회 |
| GET | /getResultList | getResultList | 보안결과 목록 조회 |
| GET | /getResultExceptlist | getResultExceptlist | 보안결과 예외 목록 조회 |
| POST | /makeReportSecurityDownload | makeReportDownload | 보안 보고서 다운로드 생성 |

### 3.8 ReportDailyController (`/api/main/rpt/reportDaily`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getReportDayStat | getReportDayStat | 일일 보고서 통계 조회 |
| GET | /getReportDailyDownload | getReportDailyDownload | 일일 보고서 다운로드 |

### 3.9 ReportDailyStateController (`/api/main/rpt/reportDailyState`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getRotationList | getRotationList | 순환 목록 조회 |
| GET | /getDailyList | getDailyList | 일일 목록 조회 |
| GET | /getDailyTotList | getDailyTotList | 일일 총계 목록 조회 |
| GET | /getTypeAccidentList | getTypeAccidentList | 유형별 사고 목록 조회 |
| GET | /getDetectionList | getDetectionList | 탐지 목록 조회 |
| POST | /makeReportDailyStateDownload | makeReportDailyStateDownload | 일일 상태 보고서 다운로드 |

### 3.10 ReportWeeklyStateController (`/api/main/rpt/reportWeeklyState`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getRotationList | getRotationList | 순환 목록 조회 |
| GET | /getWeeklyList | getWeeklyList | 주간 목록 조회 |
| GET | /getWeeklyTotList | getWeeklyTotList | 주간 총계 목록 조회 |
| GET | /getTypeAccidentList | getTypeAccidentList | 유형별 사고 목록 조회 |
| GET | /getDetectionList | getDetectionList | 탐지 목록 조회 |
| POST | /makeReportWeeklyDownload | makeReportWeeklyDownload | 주간 보고서 다운로드 |

### 3.11 ReportCollectionController (`/api/main/rpt/reportCollection`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getRetrieveSecurityHackingDetail | getRetrieveSecurityHackingDetail | 해킹 관리대장 상세 조회 |
| GET | /getSecuListDetail | getSecuListDetail | 보안자료실 상세 조회 |
| GET | /getNoticeListDetail | getNoticeListDetail | 공지사항 상세 조회 |
| GET | /getRetrieveSecurityVulnerabilityDetail | getRetrieveSecurityVulnerabilityDetail | 취약점 관리대장 상세 조회 |
| POST | /exportNoticeList | exportNoticeList | 공지사항 현황 엑셀 출력 |
| GET | /getRetrieveIncidentDetail | getRetrieveIncidentDetail | 처리중 사건 상세 조회 |
| POST | /exportSecuList | exportSecuList | 보안자료실 현황 엑셀 출력 |
| POST | /exportRetrieveSecurityHacking | exportRetrieveSecurityHacking | 해킹관리대장 엑셀 출력 |
| POST | /exportRetrieveSecurityVulnerability | exportRetrieveSecurityVulnerability | 취약점관리대장 엑셀 출력 |
| POST | /exportRetrieveIncidentDetail | exportRetrieveIncidentDetail | 처리중현황 엑셀 출력 |
| POST | /exportReportCtrsDaily | exportReportCtrsDaily | 일일운영현황 엑셀 출력 |

---

## 4. Environment/System Controllers

### 4.1 UserManagementController (`/api/main/env/user-management/request`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /users | getUserConfList | 사용자 목록 조회 |
| POST | /register | registerNewUser | 사용자 등록 요청 |
| POST | /modify | modifyExistingUser | 사용자 수정 요청 |
| POST | /reset/password | requestPasswordReset | 비밀번호 초기화 요청 |
| POST | /reset/otp | requestOtpReset | OTP 초기화 요청 |
| POST | /reset/gpki | requestGpkiReset | GPKI 초기화 요청 |
| POST | /reset/account-lock | requestAccountLockReset | 계정 잠김 초기화 요청 |
| POST | /reset/inactive | requestInactiveReset | 장기 미접속자 초기화 요청 |
| POST | /delete | requestUserDeletion | 계정 삭제 요청 |

### 4.2 UserManagementHistoryController (`/api/main/env/user-management/history`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /grid | getGridList | 사용자 관리 이력 그리드 목록 조회 |
| POST | /compare/user-info | getCompareUserInfo | 사용자 정보 비교 |
| POST | /request/cancel | cancelRequest | 요청 취소 |
| POST | /request/approve | approveUserManagementHistory | 요청 승인 |
| POST | /download/excel | downloadExcel | 엑셀 다운로드 |
| GET | /check/user-id/{userId} | checkUser | 사용자 ID 가용성 확인 |

### 4.3 UserConfController (`/api/main/env/userConf`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getUserAddrList | getUserAddrList | 사용자 연락처 목록 |
| GET | /getUserConfList | getUserConfList | 사용자 목록 |
| POST | /addUser | addUser | 사용자 추가 |
| POST | /editUser | editUser | 사용자 수정 |
| POST | /editSelfUser | editSelfUser | 사용자 직접 수정 |
| POST | /editUserPassword | editUserPassword | 사용자 패스워드 수정 |
| GET | /getUserIdDuplicateCnt | getUserIdDuplicateCnt | 사용자 ID 중복확인 |
| GET | /getDetailUser | getDetailUser | 사용자 상세정보 |
| GET | /getAuthList | getAuthList | 권한 콤보 목록 |
| POST | /userPassReset | userPassReset | 비밀번호 초기화 |
| POST | /userLockReset | userLockReset | 계정 잠김 해제 |
| POST | /expire/passwordCheck | passwordCheck | 이전 비밀번호 확인 |
| POST | /expire/editUserPassword | editUserExpirePassword | 비밀번호 만료 수정 |
| POST | /delUser | delUser | 사용자 삭제 |
| GET | /getPushUsers | getPushUsers | 푸시알림사용자 목록 |
| POST | /getAllUserPassReset | getAllUserPassReset | 전체 비밀번호 초기화 |
| GET | /checkMyId | checkMyId | 내 ID 확인 |
| POST | /getUserInfo | getUserInfo | 사용자 정보 조회 |
| GET | /checkUserAuth | checkUserAuth | 사용자 권한 확인 |

### 4.4 InstMgmtController (`/api/main/env/instMgmt`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getInstMgmtList | getInstMgmtList | 기관 리스트 조회 |
| POST | /getInstMgmtInfo | getInstMgmtInfo | 기관 조회 |
| POST | /getInstCdChk | getInstCdChk | 기관 코드 중복 조회 |
| POST | /addInstMgmt | addInstMgmt | 기관 추가 |
| POST | /saveInstMgmt | saveInstMgmt | 기관 수정 |
| POST | /delInstMgmt | delInstMgmt | 기관 삭제 |
| POST | /export | export | 엑셀 출력 |

### 4.5 InstIPMgmtController (`/api/main/env/instIPMgmt`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getInstIPMgmtList | getInstIPMgmtList | 기관IP대역 리스트 조회 |
| POST | /getInstIPMgmtList_instCd | getInstIPMgmtList_instCd | 기관별 IP정보 리스트 조회 |
| POST | /addInstIPMgmt | addInstIPMgmt | 기관IP 추가 |
| POST | /saveInstIPMgmt | saveInstIPMgmt | 기관IP 수정 |
| POST | /delInstIPMgmt | delInstIPMgmt | 기관IP 삭제 |
| POST | /export | export | 엑셀 출력 |

### 4.6 NationIPMgmtController (`/api/main/env/nationIPMgmt`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getNationMgmtList | getNationMgmtList | 국가 리스트 조회 |
| POST | /getNationMgmtInfo | getNationMgmtInfo | 국가정보 조회 |
| POST | /getNationList_domain | getNationList_domain | 국가 도메인 리스트 조회 |
| POST | /getNationIP_nationCd | getNationIP_nationCd | IP대역 국가코드 조회 |
| GET | /getNationIPList | getNationIPList | 국가별 IP대역 리스트 조회 |
| POST | /addNationIPMgmt | addNationIPMgmt | 국가IP 추가 |
| POST | /delNationIPMgmt | delNationIPMgmt | 국가IP 삭제 |
| POST | /export | export | 엑셀 출력 |
| POST | /export_ip | export_ip | 엑셀 출력 (IP) |
| POST | /getNationDetail | getNationDetail | 국가정보 조회 |
| POST | /editNation | editNation | 국가정보 수정 |

### 4.7 CodeMgmtController (`/api/main/sys`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getCodeList | getCodeList | 코드관리 목록 |
| POST | /addCode | addCode | 코드 등록 |
| POST | /editCode | editCode | 코드 수정 |
| GET | /getCodeDuplCnt | getCodeDuplCnt | 코드 중복 확인 |
| POST | /addWeekDay | addWeekDay | 공휴일 등록 |
| POST | /delWeekDay | delWeekDay | 공휴일 삭제 |
| GET | /getCustUserList | getCustUserList | 외부사용자 조회 |
| POST | /addCustUser | addCustUser | 외부사용자 등록 |
| POST | /editCustUser | editCustUser | 외부사용자 수정 |
| POST | /delCustUser | delCustUser | 외부사용자 삭제 |
| GET | /getBoardMgmtList | getBoardMgmtList | 게시판 관리 조회 |
| GET | /getBoardMgmt | getBoardMgmt | 게시판 관리 상세 |
| POST | /editBoardMgmt | editBoardMgmt | 게시판관리 수정 |
| GET | /getDetailBoardMgmtList | getDetailBoardMgmtList | 게시판관리 상세설정 |

### 4.8 RiskMgmtController (`/api/main/sys`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getRiskMgmt | getRiskMgmt | 위험 관리 조회 |
| POST | /editRiskMgmt | editAccidentApply | 위험 관리 수정 |
| GET | /getRiskHistory | getRiskHistory | 위험 이력 조회 |
| POST | /addRiskHistory | addRiskHistory | 위험 이력 추가 |
| POST | /delRiskHistory | delRiskHistory | 위험 이력 삭제 |
| GET | /getThreatLevel | getThreatLevel | 위협 수준 조회 |
| GET | /getThreatNow | getThreatNow | 현재 위협 조회 |
| GET | /getThreatHist | getThreatHist | 위협 이력 조회 |
| POST | /editThreat | editThreat | 위협 수정 |
| GET | /getPeriodNow | getPeriodNow | 현재 기간 조회 |
| POST | /editPeriod | editPeriod | 기간 수정 |

### 4.9 CustUserMgmtController (`/api/main/sys/custUserMgmt`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getSmsUserList | getSmsUserList | SMS 사용자 목록 조회 |
| POST | /getSmsOfUserList | getSmsOfUserList | SMS 외부 사용자 목록 조회 |
| POST | /getUserPhone | getUserPhone | 사용자 폰번호 조회 |
| GET | /getSmsGroup | getSmsGroup | SMS 그룹 조회 |
| POST | /addSmsGroup | addSmsGroup | SMS 그룹 추가 |
| POST | /editSmsGroup | editSmsGroup | SMS 그룹 수정 |
| POST | /delSmsGroup | delSmsGroup | SMS 그룹 삭제 |

---

## 5. Board Controllers

### 5.1 NoticeBoardController (`/api/main/sec/noticeBoard`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getPostBoardList | getPostBoardList | 게시판 최근리스트 |
| GET | /getBoardList | getBoardList | 게시판 리스트 |
| GET | /getBoardContents | getBoardContentsByNo | 게시판 컨텐츠 보기 |
| POST | /addBoard | addBoard | 게시판 글 작성 |
| POST | /editBoard | editBoard | 게시판 글 수정 |
| GET | /delBoard | delBoard | 게시판 글 삭제 |
| GET | /getBoardTypeList | getBoardTypeList | 게시판 그룹타입 리스트 |
| POST | /addNoticeSurvey | addNoticeSurvey | 설문 제출 |
| GET | /getSurveyAnsweCnt | getSurveyAnsweCnt | 설문 응시 여부 체크 |
| GET | /getSurveyChart | getSurveyChart | 설문 차트 |
| GET | /getSurveyGrid | getSurveyGrid | 설문 주관식 응답 그리드 |
| POST | /getMainNoticeList | getMainNoticeList | 메인 공지사항 리스트 |
| GET | /checkAuth | checkId | 권한 확인 |
| POST | /addNoticeConfirm | addNoticeConfirm | 실시간 공지 알림확인 |
| POST | /editNoticeConfirm | editNoticeConfirm | 실시간 공지 확인내용 입력 |
| GET | /getConfirmList | getConfirmList | 실시간 공지 확인내용 리스트 |
| GET | /getConfirmCheck | getConfirmCheck | 실시간 공지 확인 여부 |
| GET | /getConfirmReplyCheck | getConfirmReplyCheck | 실시간 공지 확인내용 입력 여부 |
| POST | /delNoticeConfirm | delNoticeConfirm | 실시간 공지 확인 삭제 |

### 5.2 QnaBoardController (`/api/main/sec/qnaBoard`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getPostBoardList | getPostBoardList | 게시판 최근리스트 |
| GET | /getBoardList | getBoardList | 게시판 리스트 |
| GET | /getBoardContents | getBoardContentsByNo | 게시판 컨텐츠 보기 |
| POST | /addBoard | addBoard | 게시판 글 작성 |
| POST | /addComment | addComment | 코멘트 작성 |
| POST | /editBoard | editBoard | 게시판 글 수정 |
| GET | /delBoard | delBoard | 게시판 글 삭제 |
| POST | /getMainQnaList | getMainQnaList | 메인 문의/의견 리스트 |
| GET | /checkAuth | checkId | 권한 확인 |

### 5.3 ShareBoardController (`/api/main/sec/shareBoard`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getBoardList | getBoardList | 게시판 리스트 |
| GET | /getBoardContents | getBoardContentsByNo | 게시판 컨텐츠 보기 |
| POST | /addBoard | addBoard | 게시판 글 작성 |
| POST | /editBoard | editBoard | 게시판 글 수정 |
| GET | /delBoard | delBoard | 게시판 글 삭제 |
| GET | /getShareBoardSidoCnt | getShareBoardSidoCnt | 시도별 카운트 |
| GET | /checkAuth | checkId | 권한 확인 |

### 5.4 TakeOverBoardController (`/api/main/sec/takeOverBoard`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getBoardList | getBoardList | 게시판 리스트 |
| GET | /getBoardInfo | getBoardInfo | 게시판 컨텐츠 보기 |
| POST | /addBoard | addBoard | 게시판 글 추가 |
| POST | /editBoard | editBoard | 인수인계 수정 |
| POST | /addBoardConfirm | addBoardConfirm | 확인상태로 변경 |
| POST | /editBoard_finish | editBoard_finish | 종결상태로 변경 |
| GET | /getAnsBoardList | getAnsBoardList | 답글 리스트 조회 |
| POST | /addAnsBoard | addAnsBoard | 답글 추가 |

### 5.5 ResourceBoardController (`/api/main/sec/resourceBoard`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getBoardList | getBoardList | 게시판 리스트 |
| GET | /getBoardContents | getBoardContentsByNo | 게시판 컨텐츠 보기 |
| POST | /addBoard | addBoard | 게시판 글 작성 |
| POST | /editBoard | editBoard | 게시판 글 수정 |
| GET | /delBoard | delBoard | 게시판 글 삭제 |
| GET | /checkAuth | checkId | 권한 확인 |
| GET | /getMoisBoardList | getMoisBoardList | 행안부 게시판 리스트 |
| GET | /getMoisBoardContents | getMoisBoardContents | 행안부 게시판 컨텐츠 |
| POST | /addMoisBoard | addMoisBoard | 행안부 게시판 글 추가 |
| POST | /editMoisBoard | editMoisBoard | 행안부 게시판 글 수정 |
| GET | /delMoisBoard | delMoisBoard | 행안부 게시판 글 삭제 |

---

## 6. Third Party REST Controllers

### 6.1 VmsRestController (`/api/main/vms`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /privacy-policy | getPrivacyPolicy | VMS 개인정보 처리방침 URL |
| GET | /redirect/auth | getAuthRedirect | VMS 리다이렉트 주소 요청 |

### 6.2 CtssRestController (`/api/main/ctss`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /privacy-policy | getPrivacyPolicy | CTSS 개인정보 처리방침 URL |
| GET | /redirect/auth | getAuthRedirect | CTSS 리다이렉트 주소 요청 |

---

## 7. Web Dashboard Controllers

### 7.1 WebDashViewController (`/webdash`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /{path} | dashView | 웹 대시보드 동적 뷰 렌더링 |

### 7.2 AdminControlController (`/api/webdash/adminControl`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getIncidentStatus | getIncidentStatus | 사건 상태 조회 |
| POST | /getInciCnt | getInciCnt | 사건 건수 조회 |
| POST | /getTbzledgeCnt | getTbzledgeCnt | TBZ 원장 건수 조회 |
| POST | /getLocalInciCnt | getLocalInciCnt | 지역 사건 건수 조회 |
| POST | /getLocalStatus | getLocalStatus | 지역 상태 조회 |
| POST | /getUrlStatus | getUrlStatus | URL 상태 조회 |
| POST | /getSysErrorStatus | getSysErrorStatus | 시스템 에러 상태 조회 |
| POST | /getInciTypeCnt | getInciTypeCnt | 사건 유형별 건수 조회 |

### 7.3 WebDashSidoController (`/api/webdash/sido/webDashSido`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getNoticeList | getNoticeList | 공지사항 리스트 |
| POST | /getSecuList | getSecuList | 보안 리스트 |
| POST | /getRegionStatusManual | getRegionStatusManual | 지역 상태 (수동차단) |
| POST | /getForgeryCheck | getForgeryCheck | 위변조 확인 |
| POST | /getHcCheck | getHcCheck | 헬스체크 조회 |
| POST | /getProcess | getProcess | 처리 현황 조회 |
| POST | /getSidoList | getSidoList | 시도 리스트 |

### 7.4 WebDashMoisController (`/api/webdash/mois/webDashMois`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getThreatNow | getThreatNow | 행안부 사이버 위기경보 |
| POST | /getHmHcUrlCenter | getHmHcUrlCenter | 홈페이지 모니터링 (중앙행정기관) |
| POST | /getHmHcUrlRegion | getHmHcUrlRegion | 홈페이지 모니터링 (지방자치단체) |
| POST | /getForgeryRegion | getForgeryRegion | 홈페이지 위변조 (지방자치단체) |
| POST | /getRegionStatus | getRegionStatus | 지방자치단체 사이버위협 대응현황 (지도) |
| POST | /getRegionStatusAuto | getRegionStatusAuto | 지방자치단체 사이버위협 대응현황 (자동차단) |
| POST | /getRegionStatusManual | getRegionStatusManual | 지방자치단체 사이버위협 대응현황 (수동차단) |
| POST | /getDashConfigList | getDashConfigList | 행안부 리스트 조회 |
| POST | /getDashChartSum | getDashChartSum | 행안부 중앙/지방 차트 합계 |

### 7.5 WebDashCenterController (`/api/webdash/center/webDashCenter`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /getAttNationTop5 | getIncidentStatus | 공격국가 TOP5 |
| POST | /getTypeChart | getTypeChart | 유형별 차트 |
| POST | /getEvtChart | getEvtChart | 이벤트 차트 |
| POST | /getEvtAllChart | getEvtAllChart | 전체 이벤트 차트 |

---

## 8. Engineer Controllers

### 8.1 EngineerViewController (`/engineer`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /menuMgmt | menuMgmt | 메뉴설정 |
| GET | /menuGrpMgmt | menuGrpMgmt | 메뉴권한설정 |
| GET | /defGrpConf | defGrpConf | 기본그룹관리 |
| GET | /authGrpConf | authGrpConf | 권한그룹관리 |
| GET | /encrySync | encrySync | 사고접수 이메일 암호화 설정 |
| GET | /passReset | passReset | 비밀번호 전체 초기화 |

### 8.2 PopupViewController (`/engineer/popup`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /pPageAdd | pPageAdd | 페이지 추가 팝업 |
| GET | /pPageGroupAdd | pPageGroupAdd | 페이지 그룹 추가 팝업 |
| GET | /pMenuAdd | pMenuAdd | 메뉴 추가 팝업 |

### 8.3 PopupController (`/api/engineer/popup`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /addPage | addPage | 페이지 추가 |
| POST | /delPage | delPage | 페이지 삭제 |
| POST | /savePage | savePage | 페이지 저장 |
| POST | /addPageGroup | addPageGroup | 페이지 그룹 추가 |
| POST | /delPageGroup | delPageGroup | 페이지 그룹 삭제 |
| POST | /savePageGroup | savePageGroup | 페이지 그룹 저장 |
| POST | /addMenu | addMenu | 메뉴 추가 |
| POST | /delMenu | delMenu | 메뉴 삭제 |
| POST | /saveMenu | saveMenu | 메뉴 저장 |
| GET | /getDefineMenuList | getDefineMenuList | 정의된 메뉴 목록 |

### 8.4 MenuMgmtController (`/api/engineer/menuMgmt`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getPageList | getPageList | 페이지 목록 |
| GET | /getPageGroupList | getPageGroupList | 페이지 그룹 목록 |
| GET | /getMenuList | getMenuList | 메뉴 목록 |

---

## 9. 기타 Controllers

### 9.1 AccidentApplyController (`/api/main/acc/accidentApply`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getAccidentList | getAccidentList | 신고 리스트 조회 |
| POST | /addAccidentApply | addAccidentApply | 신고 등록 |
| POST | /editAccidentApply | editAccidentApply | 신고 수정 |
| POST | /deleteAccidentApply | deleteAccidentApply | 신고 삭제 |
| GET | /getAccidenDeptList | getAccidenDeptList | 기관 리스트 조회 |
| GET | /getAccidentDetail | getAccidentDetail | 신고 상세 조회 |
| POST | /updateAccidentProcess | updateAccidentProcess | 신고접수 처리상태 변경 |
| POST | /updateMultiAccidentProcess | updateMultiAccidentProcess | 다중 이관처리 |
| GET | /getAccidentHistoryList | getAccidentHistoryList | 신고 히스토리 리스트 |
| GET | /getLocalList | getLocalList | 이관 지역 리스트 |
| GET | /getPntInst | getPntInst | 개발원 지역 리스트 |
| POST | /makeAcciHwpDownload | makeAcciHwpDownload | 사고신고 한글 문서 생성 |
| GET | /importExcel | importExcel | 엑셀 사고신고 import |
| GET | /importEml | importEml | eml 사고신고 import |
| GET | /getTbzHomepv | getTbzHomepv | 비고(취약점탐지) 세부내용 |
| GET | /getTbzHacking | getTbzHacking | 비고(해킹) 세부내용 |
| GET | /getDmgIpList | getDmgIpList | 피해 아이피 리스트 |
| GET | /getAttIpList | getAttIpList | 공격 아이피 리스트 |
| GET | /getTodayStatus | getTodayStatus | 금일 상태 조회 |
| GET | /getYearStatus | getYearStatus | 연간 상태 조회 |
| GET | /getPeriodStatus | getPeriodStatus | 기간별 상태 조회 |
| GET | /getInstStatus | getInstStatus | 기관별 상태 조회 |
| GET | /getAccdTypeStatus | getAccdTypeStatus | 사고유형별 상태 조회 |
| POST | /getIpByNationNm | checkIp | 입력아이피 국가 검색 |
| POST | /getInstByIP | getInstByIP | 입력아이피 기관 검색 |
| GET | /getEncrySyncList | getEncrySyncList | 비암호화(이메일) 목록 |
| POST | /updateEncrySync | updateEncrySync | SEED256 암호화 적용 |
| GET | /getNcscInfo | getNcscInfo | 국정원 마지막 처리자 정보 |
| POST | /checkEncryText | checkEncryText | 암호화 텍스트 검증 |
| GET | /getAccDuplList | getAccDuplList | 중복 신고 목록 |
| GET | /getInciMutiEndYn | getInciMutiEndYn | 멀티이관 사고 종결 여부 |
| GET | /getNciApi | getNciApi | NCI API 호출 |

### 9.2 AccidentProcController (`/api/main/ctrs/accidentProc`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getReportDayStat | getReportDayStat | 일일 보고 통계 조회 |

### 9.3 SmsController (`/api/main/sms`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| POST | /addSmsMessage | addSmsMessage | SMS 메시지 등록 |

### 9.4 HealthCheckUrlController (`/api/main/home/healthCheckUrl`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getHealthCheckUrl | getHealthCheckUrl | 헬스체크 URL 목록 |
| POST | /addHealthCheckUrl | HealthCheckUrl | 헬스체크 URL 등록 |
| POST | /editHealthCheckUrl | editHealthCheckUrl | 헬스체크 URL 수정 |
| POST | /editWatchOn | editWatchOn | 집중관리 등록 |
| POST | /editWatchOff | editWatchOff | 집중관리 해제 |
| GET | /getDetailHealthCheckUrl | getDetailHealthCheckUrl | 헬스체크 URL 상세 |
| POST | /delHealthCheckUrl | delHealthCheckUrl | 헬스체크 URL 삭제 |
| GET | /getHealthCheckHist | getHealthCheckHist | 헬스체크 장애이력 목록 |
| GET | /getHealthCheckStat | getHealthCheckStat | 헬스체크 상태 조회 |
| POST | /export | export | 엑셀 출력 |
| GET | /importXls | importXls | 엑셀 Import |

### 9.5 ForgeryUrlController (`/api/main/home/forgeryUrl`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getForgeryUrl | getForgeryUrl | 위변조 URL 목록 |
| GET | /getForgeryUrlHist | getForgeryUrlHist | 위변조 URL 이력 목록 |
| POST | /getMainForgeryHm | getMainForgeryHm | 메인 홈페이지 모니터링 |
| POST | /getMainForgeryCnt | getMainForgeryCnt | 메인 홈페이지 모니터링 통계 |
| GET | /getByInstNm | getByInstNm | 기관명으로 조회 |

### 9.6 DashConfigController (`/api/main/mois/dashConfig`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getDashConfigList | getDashConfigList | 행안부 리스트 조회 |
| POST | /addDashConfig | addDashConfig | 행안부 대시보드 등록 |
| POST | /editDashConfig | editDashConfig | 행안부 대시보드 수정 |

### 9.7 SmsEmailHistMgmtController (`/api/main/hist/smsEmailHist`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getSmsHist | getSmsHist | SMS 이력 조회 |
| GET | /getEmailHist | getEmailHist | 이메일 이력 조회 |
| POST | /export_sms | export_sms | 엑셀 출력 (SMS) |
| POST | /export_email | export_email | 엑셀 출력 (E-MAIL) |

### 9.8 UserActHistController (`/api/main/hist/userActHist`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getUserActHistList | getUserActHistList | 사용자 활동 이력 리스트 |

### 9.9 UserInoutHistMgmtController (`/api/main/hist/userInoutHist`)
| HTTP Method | URL 패턴 | 메서드명 | 설명 |
|-------------|---------|---------|------|
| GET | /getLogUserList | getLogUserList | 접근이력 유저 리스트 |
| GET | /getUserInoutHist | getUserInoutHist | 접근이력 리스트 |

---

## 종합 통계

| 분류 | 컨트롤러 수 | 예상 Endpoint 수 |
|-----|-----------|-----------------|
| Common Controllers | 16 | ~170 |
| Main View Controllers | 17 | ~150 |
| Report Controllers | 12 | ~47 |
| Environment/System Controllers | 10 | ~97 |
| Board Controllers | 5 | ~59 |
| Third Party REST Controllers | 2 | 4 |
| Web Dashboard Controllers | 5 | ~34 |
| Engineer Controllers | 4 | ~22 |
| 기타 Controllers | 9 | ~71 |
| **합계** | **80+** | **~650+** |

### HTTP Method 분포
- **GET**: 약 60%
- **POST**: 약 38%
- **기타 (RequestMapping)**: 약 2%

### 주요 특징
1. 대부분의 API 컨트롤러는 `/api/` 접두어 사용
2. View 컨트롤러는 `.do` 확장자 패턴 사용
3. 모든 응답은 `@ResponseBody`를 통해 JSON 형태 반환
4. `Criterion` 객체를 통한 파라미터 래핑 패턴 사용
5. `ReturnData` 객체를 통한 표준화된 응답 형식 사용
