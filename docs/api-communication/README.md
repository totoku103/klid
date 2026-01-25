# JSP/JS - Spring Controller 통신 API 문서

## 개요

이 문서는 KLID 웹 애플리케이션에서 JSP/JS 파일과 Spring Controller 간의 통신 구조를 분석하고 정리한 것입니다.

## 프로젝트 구조

| 구분 | 경로 | 파일 수 |
|------|------|--------|
| JSP | `/src/main/webapp/WEB-INF/view/` | 100+ |
| JS | `/src/main/webapp/js/` | 93+ |
| Controller | `/src/main/java/com/klid/webapp/` | 87 |

## 요청 분류 기준

| 분류 | 설명 | Controller 특징 |
|------|------|----------------|
| **웹뷰 요청** | JSP 페이지 렌더링 | `@Controller`, `void` 또는 `String` 반환 |
| **데이터 요청** | JSON 데이터 반환 | `@ResponseBody` 또는 `@RestController`, `ReturnData`/`ResponseEntity` 반환 |

## 문서 목록

| 파일명 | 설명 |
|--------|------|
| [01-view-requests.md](./01-view-requests.md) | 웹뷰 요청 목록 (JSP 렌더링 Controller) |
| [02-data-requests.md](./02-data-requests.md) | 데이터 API 요청 목록 (JSON 응답 Controller) |
| [03-communication-patterns.md](./03-communication-patterns.md) | JS 통신 패턴 가이드 |

## 통신 패턴 요약

### jQuery 기반
- `$.ajax()` - POST JSON 요청
- `$.get()` - 팝업 HTML 로드
- `$.post()` - 간단한 POST 요청
- `Server.get()`, `Server.post()` - 커스텀 래퍼 함수 (`/js/hm/hm.util.js`)
- jqxGrid dataAdapter - 그리드 데이터 조회

### 최신 패턴
- `fetch()` API - `/js/integration-login.js` 등

### 페이지 이동
- `location.href` - 페이지 전환
- `HmUtil.createPopup()` - 팝업 창 호출

## 핵심 참조 파일

| 파일 | 설명 |
|------|------|
| `/src/main/webapp/js/hm/hm.util.js` | Server 래퍼 함수 정의 |
| `/src/main/java/com/klid/webapp/common/ReturnData.java` | API 응답 포맷 |
| `/src/main/java/com/klid/webapp/main/controller/PopupViewController.java` | View Controller 예시 |
| `/src/main/java/com/klid/webapp/main/controller/sec/NoticeBoardController.java` | Data Controller 예시 |

## 통계

- **총 Controller 수**: 87개
- **View Controller**: 26개 (약 130+ 엔드포인트)
- **Data Controller**: 61개 (약 280+ API 엔드포인트)
- **JS 파일**: 93+개

## URI 패턴

- 모든 URI는 `.do` 확장자를 사용하는 전통적인 Spring MVC 패턴
- View 요청: `/main/{module}/{page}` 형태
- Data API 요청: `/main/{module}/{resource}/{action}` 형태
- 팝업 요청: `/main/popup/{module}/{popupName}` 형태

## 사용법

1. View 요청 확인: [01-view-requests.md](./01-view-requests.md) 참조
2. Data API 요청 확인: [02-data-requests.md](./02-data-requests.md) 참조
3. JS 통신 패턴 이해: [03-communication-patterns.md](./03-communication-patterns.md) 참조

## 최종 수정일

2026-01-20
