# JS 통신 패턴 가이드

## 개요

이 문서는 JS 파일에서 Spring Controller와 통신하는 패턴과 사용 예시를 정리한 것입니다.

---

## 1. 커스텀 래퍼 함수 (Server.get, Server.post)

### 정의 위치
`/src/main/webapp/js/hm/hm.util.js`

### Server.get()

**용도**: GET 요청으로 데이터 조회

**구문**:
```javascript
Server.get(url, params, callback);
```

**예시**:
```javascript
// 단순 조회
Server.get("/main/sys/getThreatNow.do", {}, function(data) {
    console.log(data);
});

// 파라미터 포함
Server.get("/main/acc/accidentApply/getAccidentDetail.do", {
    accdNo: "ACC2024001"
}, function(data) {
    // 상세 정보 처리
});
```

**사용 사례**:
- 코드 목록 조회
- 상세 데이터 조회
- 현황 데이터 조회
- 팝업 HTML 로드

### Server.post()

**용도**: POST 요청으로 데이터 저장/수정/삭제

**구문**:
```javascript
Server.post(url, params, callback);
```

**예시**:
```javascript
// 데이터 저장
Server.post("/main/acc/accidentApply/addAccidentApply.do", {
    accdNm: "사고명",
    accdType: "TYPE01",
    content: "사고 내용"
}, function(data) {
    if (data.result === "success") {
        alert("저장되었습니다.");
    }
});

// 데이터 삭제
Server.post("/main/acc/accidentApply/deleteAccidentApply.do", {
    accdNo: "ACC2024001"
}, function(data) {
    if (data.result === "success") {
        // 그리드 새로고침
        grid.refresh();
    }
});
```

**사용 사례**:
- 폼 데이터 저장
- 레코드 수정
- 레코드 삭제
- 상태 변경

---

## 2. jQuery AJAX

### $.ajax()

**용도**: 복잡한 AJAX 요청 (헤더 설정, 에러 처리 등)

**구문**:
```javascript
$.ajax({
    url: "/path/to/api",
    type: "POST",
    data: JSON.stringify(params),
    contentType: "application/json",
    success: function(data) { },
    error: function(xhr, status, error) { }
});
```

**예시**:
```javascript
// JSON 요청
$.ajax({
    url: "/main/sec/noticeBoard/getMainNoticeList.do",
    type: "POST",
    data: JSON.stringify({
        pageNo: 1,
        pageSize: 10
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response) {
        // 공지사항 목록 렌더링
        renderNoticeList(response.data);
    },
    error: function(xhr, status, error) {
        console.error("Error:", error);
    }
});
```

**사용 파일**:
- `/js/engineer/menuGrpMgmt.js`
- `/js/main/main.js`

### $.get()

**용도**: 간단한 GET 요청 (주로 팝업 HTML 로드)

**구문**:
```javascript
$.get(url, params, callback);
```

**예시**:
```javascript
// 팝업 HTML 로드
$.get("/main/popup/acc/pAccidentAdd.do", {
    mode: "add"
}, function(html) {
    HmUtil.createPopup({
        title: "사고 추가",
        content: html
    });
});

// 코드 조회
$.get("/code/getCodeListByCodeKind.do", {
    codeKind: "WEB_CONF"
}, function(data) {
    // 코드 목록 바인딩
});
```

**사용 파일**:
- `/js/engineer/sysConf.js`
- `/js/engineer/menuMgmt.js`

### $.post()

**용도**: 간단한 POST 요청

**구문**:
```javascript
$.post(url, params, callback);
```

**예시**:
```javascript
// 데이터 저장
$.post("/main/sys/addWeekDay.do", {
    weekDate: "2024-01-15",
    weekName: "월요일"
}, function(data) {
    if (data.result === "success") {
        alert("저장완료");
    }
});
```

---

## 3. Fetch API

**용도**: 현대적인 비동기 요청 (Promise 기반)

**정의 위치**: `/src/main/webapp/js/integration-login.js` 등

**구문**:
```javascript
fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => { })
.catch(error => { });
```

**예시**:
```javascript
// 로그인 인증
fetch("/login/vms/authenticate/primary", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userId: userId,
        password: password
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        // 2차 인증 진행
        startSecondAuth(data.authToken);
    } else {
        alert(data.message);
    }
})
.catch(error => {
    console.error("인증 오류:", error);
});
```

**사용 파일**:
- `/js/integration-login.js`
- `/js/vms-login.js`
- `/js/ctss-login.js`

---

## 4. jqxGrid DataAdapter

**용도**: 그리드 컴포넌트의 데이터 소스

**구문**:
```javascript
var source = {
    datatype: "json",
    datafields: [ ... ],
    url: "/path/to/api",
    type: "POST",
    data: { }
};
var dataAdapter = new $.jqx.dataAdapter(source);
```

**예시**:
```javascript
// 사고 목록 그리드
var source = {
    datatype: "json",
    datafields: [
        { name: "accdNo", type: "string" },
        { name: "accdNm", type: "string" },
        { name: "accdType", type: "string" },
        { name: "regDt", type: "date" }
    ],
    url: "/main/acc/accidentApply/getAccidentList.do",
    type: "POST",
    data: {
        startDate: startDate,
        endDate: endDate,
        searchType: searchType
    },
    root: "data",
    beforeprocessing: function(data) {
        source.totalrecords = data.totalCount;
    }
};

var dataAdapter = new $.jqx.dataAdapter(source);

$("#accidentGrid").jqxGrid({
    source: dataAdapter,
    columns: [
        { text: "사고번호", datafield: "accdNo", width: 100 },
        { text: "사고명", datafield: "accdNm", width: 200 },
        { text: "유형", datafield: "accdType", width: 100 },
        { text: "등록일", datafield: "regDt", width: 120, cellsformat: "yyyy-MM-dd" }
    ]
});
```

**주요 URL**:
| JS 파일 | URL | 설명 |
|---------|-----|------|
| main/env/userConf.js | /main/env/userConf/getUserConfList.do | 사용자 목록 |
| main/env/instMgmt.js | /main/env/instMgmt/getInstMgmtList.do | 기관 목록 |
| main/acc/accidentApplyList.js | /main/acc/accidentApply/getAccidentList.do | 사고 목록 |
| engineer/menuMgmt.js | /engineer/menuMgmt/getPageList.do | 페이지 목록 |

---

## 5. 팝업 호출 (HmUtil.createPopup)

**용도**: 모달 팝업 창 생성

**정의 위치**: `/src/main/webapp/js/hm/hm.util.js`

**구문**:
```javascript
HmUtil.createPopup({
    url: "/popup/path",
    title: "팝업 제목",
    width: 800,
    height: 600,
    params: { },
    callback: function(result) { }
});
```

**예시**:
```javascript
// 사고 상세 팝업
HmUtil.createPopup({
    url: "/main/popup/acc/pAccidentDetail.do",
    title: "사고 상세",
    width: 900,
    height: 700,
    params: {
        accdNo: selectedAccdNo
    },
    callback: function(result) {
        if (result && result.updated) {
            grid.refresh();
        }
    }
});

// 사용자 추가 팝업
HmUtil.createPopup({
    url: "/main/popup/env/pUserConfAdd.do",
    title: "사용자 추가",
    width: 600,
    height: 500,
    callback: function(result) {
        if (result.success) {
            alert("사용자가 추가되었습니다.");
            reloadUserList();
        }
    }
});
```

**주요 팝업 URL**:
| URL | 설명 |
|-----|------|
| /main/popup/acc/pAccidentAdd.do | 사고 추가 |
| /main/popup/acc/pAccidentEdit.do | 사고 수정 |
| /main/popup/acc/pAccidentDetail.do | 사고 상세 |
| /main/popup/env/pUserConfAdd.do | 사용자 추가 |
| /main/popup/env/pInstAdd.do | 기관 추가 |
| /main/popup/sys/pCodeLv1Add.do | 코드 추가 |

---

## 6. 페이지 이동 (location.href)

**용도**: 페이지 전환

**예시**:
```javascript
// 로그인 페이지로 이동
location.href = "/login.do";

// 메인 페이지로 이동
location.href = "/main/main.do";

// 목록 페이지로 이동
location.href = "/main/sec/noticeBoardList.do";

// CTSS 페이지 리다이렉트
location.href = "/main/ctss/page-redirect.do";
```

**주요 페이지 URL**:
| URL | 설명 |
|-----|------|
| /login.do | 로그인 페이지 |
| /main/main.do | 메인 대시보드 |
| /main/acc/accidentApplyList.do | 사고 접수 목록 |
| /main/sec/noticeBoardList.do | 공지사항 목록 |
| /main/env/userConf.do | 사용자 설정 |

---

## 7. 엑셀 내보내기 (HmUtil.exportExcel)

**용도**: 그리드 데이터 엑셀 다운로드

**정의 위치**: `/src/main/webapp/js/hm/hm.util.js`

**구문**:
```javascript
HmUtil.exportExcel({
    url: "/export/path",
    params: { },
    filename: "파일명"
});
```

**예시**:
```javascript
// 기관 목록 엑셀 다운로드
HmUtil.exportExcel({
    url: "/main/env/instMgmt/export.do",
    params: {
        searchType: searchType,
        searchKeyword: searchKeyword
    },
    filename: "기관목록"
});

// SMS 이력 엑셀 다운로드
HmUtil.exportExcel({
    url: "/main/hist/smsEmailHist/export_sms.do",
    params: {
        startDate: startDate,
        endDate: endDate
    },
    filename: "SMS이력"
});
```

**주요 엑셀 URL**:
| URL | 설명 |
|-----|------|
| /main/env/instMgmt/export.do | 기관 목록 |
| /main/env/instIPMgmt/export.do | 기관 IP 목록 |
| /main/env/nationIPMgmt/export.do | 국가 IP 목록 |
| /main/hist/smsEmailHist/export_sms.do | SMS 이력 |

---

## 8. 파일 업로드

**용도**: 파일 첨부

**예시**:
```javascript
// FormData를 사용한 파일 업로드
var formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("boardNo", boardNo);

$.ajax({
    url: "/file/upload.do",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
        if (response.result === "success") {
            alert("업로드 완료");
            // 파일 목록 갱신
            loadFileList();
        }
    }
});
```

**파일 관련 URL**:
| URL | HTTP Method | 설명 |
|-----|-------------|------|
| /file/upload.do | POST | 파일 업로드 |
| /file/download.do | GET | 파일 다운로드 |
| /file/delete.do | POST | 파일 삭제 |
| /file/accUpload.do | POST | 사고 파일 업로드 |

---

## 9. 차트 이미지 저장

**용도**: Highcharts 차트 이미지 서버 저장

**예시**:
```javascript
// 차트 이미지 저장
var svg = chart.getSVG();
var canvas = document.createElement("canvas");
// ... canvas 처리 ...
var imageData = canvas.toDataURL("image/png");

Server.post("/file/saveHighchart.do", {
    imageData: imageData,
    fileName: "chart_" + new Date().getTime()
}, function(data) {
    if (data.result === "success") {
        console.log("차트 이미지 저장 완료:", data.filePath);
    }
});
```

---

## 10. 응답 데이터 구조 (ReturnData)

### 정의 위치
`/src/main/java/com/klid/webapp/common/ReturnData.java`

### 기본 구조
```json
{
    "result": "success",    // 결과 상태: success, fail, error
    "message": "처리 완료", // 메시지
    "data": { },           // 응답 데이터
    "totalCount": 100      // 총 레코드 수 (목록 조회 시)
}
```

### 예시

**목록 조회 응답**:
```json
{
    "result": "success",
    "message": "",
    "data": [
        { "accdNo": "ACC001", "accdNm": "사고1" },
        { "accdNo": "ACC002", "accdNm": "사고2" }
    ],
    "totalCount": 150
}
```

**저장 응답**:
```json
{
    "result": "success",
    "message": "저장되었습니다.",
    "data": {
        "accdNo": "ACC003"
    }
}
```

**에러 응답**:
```json
{
    "result": "fail",
    "message": "필수 항목을 입력해주세요.",
    "data": null
}
```

---

## 통신 패턴 선택 가이드

| 상황 | 권장 패턴 |
|------|----------|
| 단순 데이터 조회 | Server.get() |
| 데이터 저장/수정/삭제 | Server.post() |
| 복잡한 요청 (헤더, 에러 처리) | $.ajax() |
| 팝업 HTML 로드 | $.get() |
| 그리드 데이터 로드 | jqxGrid DataAdapter |
| 모달 팝업 | HmUtil.createPopup() |
| 페이지 전환 | location.href |
| 엑셀 다운로드 | HmUtil.exportExcel() |
| 최신 비동기 패턴 | fetch() API |
