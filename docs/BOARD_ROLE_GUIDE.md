# 게시판 권한 가이드

## 개요

사용자별 게시판 권한은 5개 카테고리로 구분되며, 각 카테고리는 6개의 세부 권한(role01~role06)을 가집니다.

## 권한 흐름

```
로그인 → LoginMapper.xml (DB 조회) → UserDto → SessionManager.setUser()
→ 세션(authTbz, authNot, ...) → header.jsp (hidden input) → JS에서 권한 체크
```

## 카테고리별 권한

### 1. TBZ (사고신고/침해사고)

| 권한 | 의미 | 사용 화면 |
|------|------|----------|
| role01 | 조회 | `accidentApplyList.js` - 목록 조회 |
| role02 | 등록 | `accidentApplyList.js` - 신규 등록 |
| role03 | (미사용) | - |
| role04 | (미사용) | - |
| role05 | 승인요청 | `pAccidentDetail.js` - 승인요청 버튼 |
| role06 | 승인 | `pAccidentDetail.js` - 승인 버튼 |

**화면 경로**: `js/main/acc/`, `js/main/popup/acc/`

---

### 2. Notice (공지사항)

| 권한 | 의미 | 사용 화면 |
|------|------|----------|
| role01 | 조회 | `noticeBoardList.js`, `moisBoardList.js` |
| role02 | 수정 | `pNoticeBoardContents.js` - 수정 버튼 |
| role03 | 삭제 | `pNoticeBoardContents.js` - 삭제 버튼 |
| role04 | (미사용) | - |
| role05 | (미사용) | - |
| role06 | (미사용) | - |

**화면 경로**: `js/main/sec/`, `js/main/board/`

---

### 3. Resource (자료실)

| 권한 | 의미 | 사용 화면 |
|------|------|----------|
| role01 | 조회 | `resourceBoardList.js` |
| role02 | 수정 | `pResourceBoardContents.js`, `pMoisBoardContents.js` |
| role03 | 삭제 | `pResourceBoardContents.js`, `pMoisBoardContents.js` |
| role04 | (미사용) | - |
| role05 | (미사용) | - |
| role06 | (미사용) | - |

**화면 경로**: `js/main/sec/`, `js/main/board/`

---

### 4. Share (정보공유)

| 권한 | 의미 | 사용 화면 |
|------|------|----------|
| role01 | 조회 | `shareBoardList.js` |
| role02 | 수정 | `pShareBoardContents.js` |
| role03 | 삭제 | `pShareBoardContents.js` |
| role04 | (미사용) | - |
| role05 | (미사용) | - |
| role06 | (미사용) | - |

**화면 경로**: `js/main/sec/`, `js/main/board/`

---

### 5. QnA (질문답변)

| 권한 | 의미 | 사용 화면 |
|------|------|----------|
| role01 | 조회 | `qnaBoardList.js` |
| role02 | 수정 | (주석처리됨) |
| role03 | 삭제 | `pQnaBoardContents.js` |
| role04 | 답변 | (주석처리됨) |
| role05 | (미사용) | - |
| role06 | (미사용) | - |

**화면 경로**: `js/main/sec/`, `js/main/board/`

---

## 관련 파일

### Backend
- `UserDto.java` - 사용자 DTO (권한 필드 정의)
- `UserInformationResDto.java` - API 응답 DTO
- `SessionManager.java` - 세션에 권한 정보 저장
- `LoginMapper.xml` - DB에서 권한 정보 조회

### Frontend
- `header.jsp` - 권한 정보를 hidden input으로 전달
- `js/main/acc/` - 사고신고 관련 JS
- `js/main/sec/` - 게시판 목록 JS
- `js/main/board/` - 게시판 상세 JS
- `js/main/popup/acc/` - 사고신고 팝업 JS

---

## JSON 응답 예시

```json
{
  "userId": "user01",
  "userName": "홍길동",
  "instCd": 100,
  "instNm": "기관명",
  "boardRole": {
    "tbz": {
      "role01": "Y",
      "role02": "Y",
      "role03": null,
      "role04": null,
      "role05": "N",
      "role06": "N"
    },
    "notice": {
      "role01": "Y",
      "role02": "N",
      "role03": "N",
      "role04": null,
      "role05": null,
      "role06": null
    },
    "resource": { ... },
    "share": { ... },
    "qna": { ... }
  },
  "authRole": {
    "main": "A",
    "sub": "B",
    "grpNo": 1,
    "grpName": "관리자그룹"
  }
}
```

---

## 권한 값

- `Y`: 권한 있음
- `N`: 권한 없음
- `null`: 해당 권한 미사용
