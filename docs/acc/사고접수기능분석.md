# 사고접수(accidentApplyList) 기능 분석 문서

## 1. 개요

사고접수(침해사고 신고) 기능은 사이버 침해대응시스템의 핵심 기능으로, 침해사고를 등록, 조회, 수정, 삭제하고 각 기관별로 사고를 이관 및 처리하는 프로세스를 관리합니다.

### 관련 파일
- **JSP**: `/WEB-INF/view/main/acc/accidentApplyList.jsp`
- **JavaScript**: `/js/main/acc/accidentApplyList.js`
- **Controller**: `AccidentApplyController.java`
- **Service**: `AccidentApplyService.java`, `AccidentApplyServiceImpl.java`
- **Mapper**: `AccidentApplyMapper.xml`

---

## 2. 사용자 등급(권한) 체계

시스템은 4가지 주요 권한 레벨로 구분됩니다:

| 권한 코드 | 권한명 | 설명 |
|----------|--------|------|
| `AUTH_MAIN_1` | 일반 사용자 | 제한된 기능만 사용 가능 |
| `AUTH_MAIN_2` | 개발원(지원센터) | 최상위 관리 권한, 사고 총괄 관리 |
| `AUTH_MAIN_3` | 시도 | 시도 단위 사고 관리 |
| `AUTH_MAIN_4` | 시군구 | 시군구 단위 사고 관리 |

### 세부 권한 (authTbz)

| 권한 | 설명 |
|------|------|
| `authTbz01` | 등록 권한 |
| `authTbz02` | 수정 권한 |
| `authTbz05` | 승인요청 권한 |
| `authTbz06` | 승인 권한 |

---

## 3. 기능별 프로세스 분석

### 3.1 조회 (Search)

#### 프로세스 흐름
```
사용자 → 검색조건 입력 → btnSearch 클릭 → Main.search()
→ HmGrid.updateBoundData() → API 호출
→ /api/main/acc/accidentApply/getAccidentList → 결과 표시
```

#### 권한별 조회 범위

| 권한 | 조회 범위 |
|------|-----------|
| `AUTH_MAIN_2` (개발원) | 모든 사고 조회 가능 (`CT%` 로 시작하는 사고번호) |
| `AUTH_MAIN_3` (시도) | 개발원에서 해당 시로 이관한 사고 + 본인이 등록한 사고 |
| `AUTH_MAIN_4` (시군구) | 시도에서 이관받은 사고만 조회 |

#### 검색 조건
- 날짜 유형: 접수일시, 완료일시, 종결일시
- 기간 설정 (시작일~종료일)
- 통합검색 / 상세검색 모드
- 상세 검색 필드:
  - 제목, 접수번호, 신고기관명, 피해기관명
  - 사고유형, 우선순위, 망구분
  - 공격IP, 사고IP
  - 처리상태 (지원센터/시도/시군구)
  - 사고내용, 조사내용, 시도의견
  - 예외처리, 접수방법

#### 서비스 레이어 검증
```java
// AccidentApplyServiceImpl.java:50-55
String myAuthMain = SessionManager.getUser().getAuthMain();
String paramAuthMain = criterion.getValue("sAuthMain").toString();
if(!myAuthMain.equals(paramAuthMain)){
    throw new CustomException("잘못된 접근입니다.");
}
```

---

### 3.2 등록 (Add)

#### 프로세스 흐름
```
사용자 → btnAdd 클릭 → Main.add() → 팝업 열기 (pAccidentAdd.jsp)
→ 정보 입력 → pbtnAdd 클릭 → validateForm()
→ /api/main/acc/accidentApply/addAccidentApply → 파일 업로드
→ 푸시 발송 → 완료
```

#### 권한별 차이

| 권한 | 차이점 |
|------|--------|
| `AUTH_MAIN_1` | 등록 버튼 숨김 (`authTbz01 == 'N'`) |
| `AUTH_MAIN_2` (개발원) | 국정원 발송 여부 선택 가능 (`gukYn`), 처리상태 직접 접수 |
| `AUTH_MAIN_3` (시도) | 시도처리상태로 등록 (`transInciPrcsStat = 1`) |
| `AUTH_MAIN_4` (시군구) | 제한적 등록 |

#### 등록시 처리 로직
```javascript
// pAccidentAdd.js:480-492
if(dclInstlevel == 1) {
    if (dclInstCd == '1200000' || dclInstCd == '1500000' || ...) {
        params.inciPrcsStat = 1;  // 개발원/중앙기관: 개발원 상태
    } else {
        params.inciPrcsStat = 0;   // 시도: 개발원 상태 0
        params.transInciPrcsStat = 1;  // 시도 상태 '접수'
    }
}
```

#### 등록 데이터
- 기본정보: 사고일시, 제목, 탐지명, 우선순위, 망구분, 접수방법
- 신고기관정보: 기관코드, 담당자, 이메일, 전화번호
- 피해시스템정보: 기관, 담당자, 사고유형, IP 목록
- 공격시스템정보: 국가, IP 목록, 비고
- 사고내용, 조사내용, 시도의견
- 비고 (해킹/취약점탐지) 추가 정보

---

### 3.3 수정 (Edit)

#### 프로세스 흐름
```
사용자 → 그리드에서 행 선택 → btnEdit 클릭 → Main.edit()
→ 종결 여부 확인 → 팝업 열기 (pAccidentEdit.jsp)
→ 정보 수정 → p_btnEdit 클릭
→ /api/main/acc/accidentApply/editAccidentApply → 히스토리 기록 → 완료
```

#### 수정 제한 조건
```javascript
// accidentApplyList.js:515-518
if(inciPrcsStat == 13 || transInciPrcsStat == 13 || transSidoPrcsStat == 13){
    alert("종결된 사고는 수정이 불가능 합니다.");
    return;
}
```

#### 권한별 수정 범위

| 권한 | 수정 가능 범위 |
|------|---------------|
| `AUTH_MAIN_2` (개발원) | 접수 상태(1)일 때 피해기관 수정 가능, 이관 이후 제목/탐지명/사고유형 수정 불가 |
| `AUTH_MAIN_3` (시도) | 직접 접수한 사고만 피해기관 수정 가능, 개발원 이관 사고는 제목/탐지명/사고유형 수정 불가 |
| `AUTH_MAIN_4` (시군구) | 제목/탐지명/사고유형 수정 불가 (읽기 전용) |

#### 수정시 히스토리 기록
```java
// AccidentApplyServiceImpl.java:166
mapper.addAccidentHistory(criterion.getCondition());
mapper.editAccidentApply(criterion.getCondition());
```

---

### 3.4 삭제 (Delete)

#### 프로세스 흐름
```
사용자 → 그리드에서 행 선택 → btnDel 클릭 → Main.del()
→ /api/main/acc/accidentApply/deleteAccidentApply → 완료
```

#### 권한별 차이
- **모든 권한**: 삭제 버튼 기본 숨김 처리
```javascript
// accidentApplyList.js:314
$('#btnDel').css('display', 'none');
```

#### 삭제 로직
```java
// AccidentApplyServiceImpl.java:206-209
public ReturnData deleteAccidentApply(Criterion criterion) {
    mapper.deleteAccidentApply(criterion.getCondition());
    return new ReturnData(criterion.getCondition());
}
```

---

## 4. 처리 상태별 워크플로우

### 4.1 처리상태 코드

| 코드 | 상태명 | 설명 |
|------|--------|------|
| 0 | 없음 | 초기 상태 |
| 1 | 접수 | 사고 접수 완료 |
| 2 | 할당 | 담당자 할당 |
| 5 | 반려 | 상위기관 반려 |
| 7 | 이관요청 | 하위기관으로 이관 요청 |
| 8 | 폐기요청 | 폐기 승인 요청 |
| 9 | 종결요청 | 종결 승인 요청 |
| 11 | 이관 | 이관 승인 완료 |
| 12 | 폐기종결 | 폐기 처리 완료 |
| 13 | 종결 | 정상 종결 완료 |
| 14 | 오탐요청 | 오탐 승인 요청 |
| 15 | 오탐종결 | 오탐 처리 완료 |
| 16 | 주의관제요청 | 주의관제 승인 요청 |
| 17 | 주의관제종결 | 주의관제 처리 완료 |
| 99 | 멀티이관대기 | 다중이관 승인 대기 |

### 4.2 상태 전이 다이어그램

```
[접수(1)] → [할당(2)] → [종결요청(9)] → [종결(13)]
    ↓           ↓            ↑
    ↓      [폐기요청(8)] → [폐기종결(12)]
    ↓           ↓
    ↓      [오탐요청(14)] → [오탐종결(15)]
    ↓           ↓
    ↓      [주의관제요청(16)] → [주의관제종결(17)]
    ↓
[이관요청(7)] → [이관(11)] → 하위기관으로 전달
    ↓
[반려(5)] ← 상위기관 반려
```

---

## 5. 권한별 버튼 활성화

### 5.1 개발원 (AUTH_MAIN_2)

| 상태 | 활성화 버튼 |
|------|------------|
| 접수(1) | 할당, 이관요청, 오탐요청, 주의관제요청 |
| 접수/할당/반려(1,2,5) | 폐기, 종결 (승인요청 권한 필요) |
| 이관요청(7) | 이관승인 (승인 권한 필요), 반려 |
| 폐기요청(8) | 폐기승인 (승인 권한 필요), 반려 |
| 종결요청(9) | 종결승인 (승인 권한 필요), 반려 |
| 오탐요청(14) | 오탐종결 (승인 권한 필요), 반려 |
| 주의관제요청(16) | 주의관제종결 (승인 권한 필요), 반려 |
| 시도종결(transInciPrcsStat=13) | 종결요청, 상위기관반려 |

### 5.2 시도 (AUTH_MAIN_3)

| 상태 | 활성화 버튼 |
|------|------------|
| 시도접수(transInciPrcsStat=1) | 할당, 종결요청, 오탐요청, 주의관제요청, 시군구이관요청 |
| 시도접수/할당/반려 | 폐기 |
| 시도이관요청(7) | 이관승인 (승인 권한 필요) |
| 시도폐기요청(8) | 폐기승인, 반려 |
| 시도종결요청(9) | 종결승인, 반려 |
| 시군구종결(transSidoPrcsStat=13) | 종결요청, 상위기관반려 |

### 5.3 시군구 (AUTH_MAIN_4)

| 상태 | 활성화 버튼 |
|------|------------|
| 시군구접수(transSidoPrcsStat=1) | 할당, 종결요청, 오탐요청, 주의관제요청, 폐기 |
| 시군구폐기요청(8) | 폐기승인, 반려 |
| 시군구종결요청(9) | 종결승인, 반려 |
| 시군구오탐요청(14) | 오탐종결, 반려 |
| 시군구주의관제요청(16) | 주의관제종결, 반려 |

---

## 6. 특수 기능

### 6.1 다중이관 (Multi Transfer)

개발원 또는 시도에서 여러 시군구로 동시에 이관할 수 있는 기능입니다.

- 다중이관 사고번호: `원사고번호-1`, `원사고번호-2`, ...
- 다중이관 승인시 원사고와 이관사고 모두 히스토리 기록
- 모든 이관사고가 종결되어야 상위기관 종결 가능

### 6.2 국정원 연동 (AUTH_MAIN_2 전용)

```javascript
// pAccidentAdd.js:64-66
if(_sAuthMain != 'AUTH_MAIN_2'){
    $("#gukYn").jqxDropDownList({ disabled: true });
}
```

- 국정원 발송 여부 선택 가능 (`gukYn`)
- 국정원 발송시 `NCSC_NO` 컬럼에 사고번호 설정
- 종결시 국정원 API 호출하여 조치완료 전송

### 6.3 사고복사 (AUTH_MAIN_2 전용 숨김)

```javascript
// accidentApplyList.js:310-312
if($("#sAuthMain").val()=='AUTH_MAIN_1'){
    $('#btnAccCopy').css('display', 'none');
}
```

### 6.4 한글(HWP) 보고서 생성

상세조회 화면에서 HWP 형식의 사고신고서를 다운로드할 수 있습니다.

### 6.5 엑셀/EML 가져오기

- CSV/XLS/XLSX 파일에서 사고정보 자동 파싱
- EML(이메일) 파일에서 사고정보 추출

---

## 7. API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/main/acc/accidentApply/getAccidentList` | 사고 목록 조회 |
| POST | `/api/main/acc/accidentApply/addAccidentApply` | 사고 등록 |
| POST | `/api/main/acc/accidentApply/editAccidentApply` | 사고 수정 |
| POST | `/api/main/acc/accidentApply/deleteAccidentApply` | 사고 삭제 |
| GET | `/api/main/acc/accidentApply/getAccidentDetail` | 사고 상세 조회 |
| POST | `/api/main/acc/accidentApply/updateAccidentProcess` | 처리상태 변경 |
| POST | `/api/main/acc/accidentApply/updateMultiAccidentProcess` | 다중이관 처리 |
| GET | `/api/main/acc/accidentApply/getAccidentHistoryList` | 히스토리 조회 |
| GET | `/api/main/acc/accidentApply/getDmgIpList` | 피해IP 목록 |
| GET | `/api/main/acc/accidentApply/getAttIpList` | 공격IP 목록 |
| POST | `/api/main/acc/accidentApply/makeAcciHwpDownload` | HWP 보고서 생성 |
| GET | `/api/main/acc/accidentApply/importExcel` | 엑셀 가져오기 |
| GET | `/api/main/acc/accidentApply/importEml` | EML 가져오기 |

---

## 8. 데이터베이스 테이블

| 테이블명 | 설명 |
|---------|------|
| TBZLEDGE | 사고접수 메인 테이블 |
| TBZDCLIP | 피해IP 테이블 |
| TBZATTIP | 공격IP 테이블 |
| TBHHISTO | 히스토리 테이블 |
| TBZHACKING | 비고-해킹 상세정보 |
| TBZVULNER (TBZHOMEPV) | 비고-취약점탐지 상세정보 |
| TSMINST | 기관 정보 테이블 |
| COMM_CODE | 공통코드 테이블 |

---

## 9. 요약

### 권한별 주요 기능 요약표

| 기능 | AUTH_MAIN_1 | AUTH_MAIN_2 | AUTH_MAIN_3 | AUTH_MAIN_4 |
|------|:-----------:|:-----------:|:-----------:|:-----------:|
| 조회 | 제한적 | 전체 | 해당 시도 | 해당 시군구 |
| 등록 | X | O | O | 제한적 |
| 수정 | X | O | 제한적 | 제한적 |
| 삭제 | X | 숨김 | 숨김 | 숨김 |
| 이관요청 | X | O | O | X |
| 이관승인 | X | O | O | X |
| 종결 | X | O | O | O |
| 국정원 연동 | X | O | X | X |
| 사고복사 | X | O | O | O |

---

*문서 작성일: 2026-01-21*
*시스템: 사이버 침해대응시스템 (KLID)*
