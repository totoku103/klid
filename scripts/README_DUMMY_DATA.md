# AccidentApply 더미 데이터 생성기 문서

## 1. 개요

`dummy_data_generator.py`는 사고접수(AccidentApply) 관련 테이블에 더미 데이터를 생성하는 Python 스크립트입니다.

- **대상 메소드**: `AccidentApplyController.addAccidentApply()`
- **데이터베이스**: Oracle
- **생성 건수**: 기본 100건 (설정 변경 가능)

---

## 2. INSERT 대상 테이블

| 순번 | 테이블명 | 설명 | INSERT 조건 | 예상 건수 |
|:----:|----------|------|-------------|-----------|
| 1 | TBZLEDGE | 사고접수 메인 테이블 | 항상 | 100건 |
| 2 | TBZDCLIP | 피해기관 IP | 사고당 1~3개 | 약 200건 |
| 3 | TBZATTIP | 공격기관 IP | 사고당 1~2개 | 약 150건 |
| 4 | TBZHACKING | 해킹 상세정보 | remarks='1' | 약 25건 |
| 5 | TBZHOMEPV | 취약점탐지 상세정보 | remarks='2' | 약 25건 |
| 6 | TBHHISTO | 사고처리 히스토리 | 항상 | 100건 |

---

## 3. INSERT 순서 및 흐름도

```
┌─────────────────────────────────────────────────────────────────┐
│                    데이터 INSERT 프로세스                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  1. 사고번호(INCI_NO) 생성     │
              │     형식: CT + YY-MMDD + 순번  │
              │     예: CT25-0121001          │
              └───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  2. TBZLEDGE INSERT           │
              │     (사고접수 메인 테이블)      │
              │     - 57개 컬럼               │
              │     - INCI_ACPN_DT: sysdate   │
              │     - INCI_TRNS_YN: 'N'       │
              │     - WEEK_YN: 자동계산        │
              └───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  3. TBZDCLIP INSERT           │
              │     (피해기관 IP)              │
              │     - 사고당 1~3개 IP          │
              │     - IP_SEQ: 1부터 순번       │
              └───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  4. TBZATTIP INSERT           │
              │     (공격기관 IP)              │
              │     - 사고당 1~2개 IP          │
              │     - IP_SEQ: 1부터 순번       │
              └───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  5. remarks 값 확인            │
              └───────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │ remarks='1' │    │ remarks='2' │    │ remarks='0' │
    │   (해킹)    │    │ (취약점탐지) │    │  or '3'    │
    └─────────────┘    └─────────────┘    └─────────────┘
           │                  │                  │
           ▼                  ▼                  │
    ┌─────────────┐    ┌─────────────┐          │
    │ TBZHACKING  │    │ TBZHOMEPV   │          │
    │   INSERT    │    │   INSERT    │          │
    └─────────────┘    └─────────────┘          │
           │                  │                  │
           └──────────────────┼──────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  6. TBHHISTO INSERT           │
              │     (히스토리)                 │
              │     - HSTY_CLF: 'REG' (등록)   │
              │     - HSTY_NO: 글로벌 순번     │
              └───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │  7. COMMIT                    │
              └───────────────────────────────┘
```

---

## 4. 테이블별 INSERT SQL

### 4.1 TBZLEDGE (사고접수 메인)

```sql
INSERT INTO TBZLEDGE (
    -- 사고번호 (자동생성)
    INCI_NO,

    -- 사고유형/접수정보
    ACCD_TYP_CD,              -- 사고유형코드 (3002)
    ACPN_MTHD,                -- 접수방법 (3004)
    INCI_ACPN_CD,             -- 접수구분
    INCI_ACPN_DT,             -- 접수일시 (sysdate)
    INCI_TYP_CD,              -- 사고구분 (3008)
    INCI_TTL,                 -- 사고제목
    INCI_DT,                  -- 사고일시
    INCI_DCL_CONT,            -- 사고신고내용
    INCI_INVS_CONT,           -- 조사내용
    INCI_BELOW_CONT,          -- 시도의견

    -- 신고자 정보
    DCL_CRGR,                 -- 신고자명
    DCL_CRGR_ID,              -- 신고자ID
    DCL_DEPT,                 -- 신고자부서
    DCL_INST_CD,              -- 신고기관코드
    DCL_EMAIL,                -- 신고자이메일
    DCL_TEL_NO,               -- 신고자전화
    DCL_HP_NO,                -- 신고자핸드폰

    -- 피해 정보
    DMG_CRGR,                 -- 피해담당자
    DMG_DEPT,                 -- 피해부서
    DMG_INST_CD,              -- 피해기관코드
    DMG_EMAIL,                -- 피해이메일
    DMG_TEL_NO,               -- 피해전화
    DMG_HP_NO,                -- 피해핸드폰
    DMG_NATN_CD,              -- 피해국가코드
    DMG_SVR_USR_NM,           -- 피해호스트용도

    -- 공격자 정보
    ATT_CRGR,                 -- 공격자명
    ATT_DEPT,                 -- 공격부서
    ATT_INST_NM,              -- 공격기관명
    ATT_EMAIL,                -- 공격이메일
    ATT_NATN_CD,              -- 공격국가코드
    ATT_SVR_NM,               -- 공격호스트명
    ATT_TYP_CD,               -- 공격유형 (3003)
    ATT_VIA,                  -- 공격루트 (3009)
    ATT_DTLS_VIA,             -- 공격세부루트 (3010)

    -- 처리상태
    INCI_PRCS_STAT,           -- 처리상태 (3001) - 기본값 '1'
    INCI_PRTY,                -- 우선순위 (3006)
    TRANS_INCI_PRCS_STAT,     -- 이관처리상태

    -- 기타
    CRGR,                     -- 담당자
    NET_DIV,                  -- 망구분 (4004)
    OS_NM,                    -- 운영체제
    RISK_LEVEL,               -- 침해등급 (2001)
    RISK_VALUE,               -- 침해지수
    RECO_INCI_CD,             -- 인지기관 (4001)
    IPS_IP,                   -- 침해사고시스템IP1
    TMS_IP,                   -- 침해사고시스템IP2
    REMARKS,                  -- 비고 (0:없음, 1:해킹, 2:취약점, 3:유해IP)

    -- 이관정보 (초기값)
    INCI_TRNS_YN,             -- 이관여부 ('N')
    INCI_NO_MULTI,            -- 다중이관번호 (=INCI_NO)

    -- 자동생성
    INCI_UPD_DT,              -- 수정일시 (sysdate)
    WEEK_YN,                  -- 주중/주말 (자동계산)
    HISTO_MODIFIED_YN         -- 히스토리수정여부
) VALUES (
    :inci_no,
    :accd_typ_cd, :acpn_mthd, :inci_acpn_cd,
    TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),  -- 접수일시
    :inci_typ_cd, :inci_ttl, :inci_dt, :inci_dcl_cont,
    :inci_invs_cont, :inci_below_cont,
    :dcl_crgr, :dcl_crgr_id, :dcl_dept, :dcl_inst_cd,
    :dcl_email, :dcl_tel_no, :dcl_hp_no,
    :dmg_crgr, :dmg_dept, :dmg_inst_cd, :dmg_email,
    :dmg_tel_no, :dmg_hp_no, :dmg_natn_cd, :dmg_svr_usr_nm,
    :att_crgr, :att_dept, :att_inst_nm, :att_email,
    :att_natn_cd, :att_svr_nm, :att_typ_cd, :att_via, :att_dtls_via,
    :inci_prcs_stat, :inci_prty, :trans_inci_prcs_stat,
    :crgr, :net_div, :os_nm, :risk_level, :risk_value,
    :reco_inci_cd, :ips_ip, :tms_ip, :remarks,
    'N',                                    -- 이관여부 고정
    :inci_no,                               -- 다중이관번호 = 사고번호
    TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),  -- 수정일시
    (SELECT CASE                            -- 주중/주말 자동계산
        WHEN TO_CHAR(SYSDATE, 'D') IN ('1', '7') THEN '1'
        WHEN EXISTS (SELECT 1 FROM COMM_CODE
                     WHERE COM_CODE1 = '4005'
                     AND COM_CODE2 = TO_CHAR(SYSDATE, 'YYYYMMDD')) THEN '1'
        ELSE '0'
    END FROM DUAL),
    :histo_modified_yn
);
```

### 4.2 TBZDCLIP (피해기관 IP)

```sql
INSERT INTO TBZDCLIP (
    IP_SEQ,      -- IP 순번 (1, 2, 3...)
    INCI_NO,     -- 사고번호 (FK)
    IP_ADDR      -- IP 주소
) VALUES (
    :ip_seq,
    :inci_no,
    :ip_addr
);
```

### 4.3 TBZATTIP (공격기관 IP)

```sql
INSERT INTO TBZATTIP (
    IP_SEQ,      -- IP 순번 (1, 2, 3...)
    INCI_NO,     -- 사고번호 (FK)
    IP_ADDR      -- IP 주소
) VALUES (
    :ip_seq,
    :inci_no,
    :ip_addr
);
```

### 4.4 TBZHACKING (해킹 상세정보)

> **조건**: `remarks = '1'` (해킹)일 때만 INSERT

```sql
INSERT INTO TBZHACKING (
    INCI_NO,              -- 사고번호 (FK)
    ATTACK_TYPE_CD,       -- 해킹공격유형코드 (4015)
    ATTACK_TYPE_NM_SELF,  -- 직접입력 공격유형명
    DOMAIN_NM,            -- 도메인명
    NET_DIV,              -- 망구분
    HACKING_CONT,         -- 해킹내용
    INCI_TARGET,          -- 공격대상
    USER_ID,              -- 등록자ID
    UPDATE_DT,            -- 수정일시 (sysdate)
    REG_DT                -- 등록일시 (sysdate)
) VALUES (
    :inci_no,
    :attack_type_cd,
    :attack_type_nm_self,
    :domain_nm,
    :net_div,
    :hacking_cont,
    :inci_target,
    :user_id,
    SYSDATE,
    SYSDATE
);
```

### 4.5 TBZHOMEPV (취약점탐지 상세정보)

> **조건**: `remarks = '2'` (취약점탐지)일 때만 INSERT

```sql
INSERT INTO TBZHOMEPV (
    INCI_NO,              -- 사고번호 (FK)
    HOME_CH,              -- 구분 (고정값 '2')
    ATTACK_TYPE_CD,       -- 취약점공격유형코드 (4011)
    ATTACK_TYPE_NM,       -- 공격유형명
    VULNERABILITY_CONT,   -- 취약점내용
    USER_ID,              -- 등록자ID
    UPDATE_DT,            -- 수정일시 (sysdate)
    REG_DT                -- 등록일시 (sysdate)
) VALUES (
    :inci_no,
    '2',                  -- HOME_CH 고정값
    :attack_type_cd,
    :attack_type_nm,
    :vulnerability_cont,
    :user_id,
    SYSDATE,
    SYSDATE
);
```

### 4.6 TBHHISTO (사고처리 히스토리)

```sql
INSERT INTO TBHHISTO (
    HSTY_NO,       -- 히스토리번호 (글로벌 순번)
    INCI_NO,       -- 사고번호 (FK)
    GRP_NO,        -- 그룹번호
    GRP_RANK,      -- 그룹내순번
    DEPTH,         -- 기관깊이 (0:개발원, 1:시도, 2:시군구)
    TTL,           -- 히스토리제목
    HSTY_CLF,      -- 히스토리분류 (REG/MOD/TRNS/END)
    HSTY_CRT_DT,   -- 생성일시 (sysdate)
    HSTY_CONT,     -- 히스토리내용
    CRTR_ID,       -- 생성자ID
    CRTR_NAME,     -- 생성자명
    INST_CD,       -- 기관코드
    TRANS_YN       -- 이관여부
) VALUES (
    :hsty_no,
    :inci_no,
    :grp_no,
    :grp_rank,
    :depth,
    :ttl,
    :hsty_clf,
    SYSDATE,
    :hsty_cont,
    :crtr_id,
    :crtr_name,
    :inst_cd,
    :trans_yn
);
```

---

## 5. 공통코드 참조 테이블

| 필드명 | COM_CODE1 | 설명 | 예시 값 |
|--------|-----------|------|---------|
| ACCD_TYP_CD | 3002 | 사고유형 | 10:해킹, 20:악성코드, 30:DDoS |
| INCI_PRCS_STAT | 3001 | 처리상태 | 1:접수, 11:이관승인, 13:종결 |
| ACPN_MTHD | 3004 | 접수방법 | 001:직접신고, 002:자동탐지 |
| INCI_PRTY | 3006 | 우선순위 | 001:긴급, 002:높음, 003:중간 |
| RISK_LEVEL | 2001 | 침해등급 | 1:심각, 2:높음, 3:중간, 4:낮음 |
| ATT_TYP_CD | 3003 | 공격유형 | 01~05 |
| ATT_VIA | 3009 | 공격루트 | 01~04 |
| ATT_DTLS_VIA | 3010 | 공격세부루트 | 01~03 |
| INCI_TYP_CD | 3008 | 사고구분 | 01~03 |
| NET_DIV | 4004 | 망구분 | public, private, DMZ |
| RECO_INCI_CD | 4001 | 인지기관 | 01~04 |
| REMARKS | 4006 | 비고구분 | 0:없음, 1:해킹, 2:취약점, 3:유해IP |
| HACK_ATT_TYPE_CD | 4015 | 해킹공격유형 | 01:SQL인젝션, 02:XSS |
| VULN_ATT_TYPE_CD | 4011 | 취약점공격유형 | 01:표준미적용, 02:설정오류 |

---

## 6. 사고번호(INCI_NO) 생성 규칙

### 형식
```
[POS_CD][YY-MMDD][순번3자리]
```

### 예시
```
CT25-0121001
│ │    │  └── 순번 (001, 002, 003...)
│ │    └───── 월일 (0121 = 1월 21일)
│ └────────── 연도 (25 = 2025년)
└──────────── 기관코드 (CT = 개발원)
```

### 생성 SQL
```sql
WITH SUB AS (
    SELECT (
        SELECT POS_CD FROM TSMINST WHERE INST_CD = :inst_cd
    ) || TO_CHAR(SYSDATE, 'YY-MMDD') AS INCI_PREFIX
    FROM DUAL
)
SELECT
    REPLACE(SUB.INCI_PREFIX ||
            TO_CHAR(NVL(MAX(SUBSTR(L.INCI_NO, 10, 3)), 0) + 1, '000'),
            ' ', '') AS INCI_NO
FROM TBZLEDGE L, SUB
WHERE L.INCI_NO LIKE SUB.INCI_PREFIX || '%';
```

---

## 7. 더미 데이터 생성 값

### 7.1 필수 필드 샘플값

| 필드 | 샘플값 |
|------|--------|
| INCI_TTL | '웹서버 해킹 시도 탐지', 'DDoS 공격 의심 트래픽 발생' |
| DCL_CRGR | '김민수', '이영희', '박철수' |
| DCL_INST_CD | 1100000, 1200000, 1300000 |
| INCI_PRCS_STAT | '1' (신고/접수) |
| ACCD_TYP_CD | '10', '20', '30', '40', '50', '60' |

### 7.2 IP 주소 생성 규칙

| 구분 | IP 범위 |
|------|---------|
| 내부망 | 10.x.x.x, 172.16-31.x.x, 192.168.x.x |
| 외부망 | 1-223.x.x.x |

### 7.3 날짜/시간 형식

| 필드 | 형식 | 예시 |
|------|------|------|
| INCI_DT | YYYYMMDDHH24MISS | 20250121143052 |
| INCI_ACPN_DT | YYYYMMDDHH24MISS | 자동생성 (sysdate) |

---

## 8. 실행 방법

### 8.1 필요 패키지 설치
```bash
pip install oracledb
```

### 8.2 설정 변경
`dummy_data_generator.py`의 Config 클래스 수정:
```python
class Config:
    DB_HOST = "10.1.2.99"
    DB_PORT = 1521
    DB_SID = "FREE"
    DB_USER = "사용자명"
    DB_PASSWORD = "비밀번호"
    RECORD_COUNT = 100  # 생성 건수
```

### 8.3 실행
```bash
cd /Users/totoku103/Totoku103Projects/klid-java-web/scripts
python dummy_data_generator.py
```

### 8.4 실행 옵션
```
[실행 옵션]
  1. 샘플 데이터만 생성 (DB 연결 없음)
  2. DB에 더미 데이터 INSERT

선택 (1 또는 2):
```

---

## 9. 실행 결과 예시

```
============ INSERT 완료 ============
  TBZLEDGE (사고접수):     100건
  TBZDCLIP (피해IP):       약 200건
  TBZATTIP (공격IP):       약 100건
  TBZHACKING (해킹):       25건
  TBZHOMEPV (취약점):      25건
  TBHHISTO (히스토리):     100건
======================================
```

---

## 10. 관련 Java 소스 파일

| 파일 | 경로 |
|------|------|
| Controller | `src/main/java/com/klid/webapp/main/controller/acc/AccidentApplyController.java` |
| Service | `src/main/java/com/klid/webapp/main/acc/accidentApply/service/AccidentApplyServiceImpl.java` |
| Mapper | `src/main/resources/oracle/com/klid/webapp/main/acc/accidentApply/persistence/AccidentApplyMapper.xml` |
| DTO | `src/main/java/com/klid/webapp/main/acc/accidentApply/dto/AccidentApplyDto.java` |

---

## 11. 주의사항

1. **테스트 환경에서만 실행**: 운영 DB에서 실행 금지
2. **기관코드 확인**: TSMINST 테이블에 존재하는 기관코드만 사용
3. **공통코드 확인**: COMM_CODE 테이블의 유효한 코드값 사용
4. **트랜잭션 관리**: 오류 발생 시 자동 롤백
5. **사고번호 중복**: 동일 시간대 실행 시 순번 중복 주의
