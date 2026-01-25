#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AccidentApply (TBZLEDGE) 테이블 더미 데이터 생성기
- addAccidentApply 메소드와 연결된 SQL 분석 기반
- Oracle DB 연결
"""

import random
import string
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import logging

# Oracle DB 연결을 위한 라이브러리 (설치 필요: pip install oracledb)
try:
    import oracledb
except ImportError:
    print("oracledb 패키지가 필요합니다. pip install oracledb 명령으로 설치하세요.")
    oracledb = None

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ============================================================================
# 설정 (Config)
# ============================================================================
class Config:
    """DB 연결 및 생성 설정"""

    # Oracle DB 연결 정보
    DB_HOST = "10.1.2.99"
    DB_PORT = 1521
    DB_SID = "FREE"
    DB_USER = "totoku103"      # 실제 사용자명으로 변경
    DB_PASSWORD = "totoku103"  # 실제 비밀번호로 변경

    # 생성할 데이터 건수
    RECORD_COUNT = 100

    # 기본 기관코드 (개발원)
    DEFAULT_INST_CD = 1100000

    # 사고번호 PREFIX (개발원)
    INCI_NO_PREFIX = "CT"


# ============================================================================
# 공통 코드 매핑 (COMM_CODE 테이블 기반)
# ============================================================================
class CodeMapping:
    """공통 코드 매핑 (실제 DB에서 조회하여 사용 권장)"""

    # 사고유형 (COM_CODE1=3002)
    ACCD_TYP_CD = ['10', '20', '30', '40', '50', '60']
    ACCD_TYP_NAMES = {
        '10': '해킹',
        '20': '악성코드',
        '30': 'DDoS',
        '40': '불법접근',
        '50': '정보유출',
        '60': '기타'
    }

    # 처리상태 (COM_CODE1=3001)
    INCI_PRCS_STAT = ['1', '11', '12', '13']
    INCI_PRCS_STAT_NAMES = {
        '1': '신고/접수',
        '11': '이관승인',
        '12': '반려',
        '13': '종결'
    }

    # 접수방법 (COM_CODE1=3004) - '00' prefix 포함
    ACPN_MTHD = ['001', '002', '003', '004']
    ACPN_MTHD_NAMES = {
        '001': '직접신고',
        '002': '자동탐지',
        '003': '정부기관통보',
        '004': '보안기관통보'
    }

    # 우선순위 (COM_CODE1=3006) - '00' prefix 포함
    INCI_PRTY = ['001', '002', '003', '004']
    INCI_PRTY_NAMES = {
        '001': '긴급',
        '002': '높음',
        '003': '중간',
        '004': '낮음'
    }

    # 침해등급 (COM_CODE1=2001)
    RISK_LEVEL = ['1', '2', '3', '4']
    RISK_LEVEL_NAMES = {
        '1': '심각',
        '2': '높음',
        '3': '중간',
        '4': '낮음'
    }

    # 공격유형 (COM_CODE1=3003)
    ATT_TYP_CD = ['01', '02', '03', '04', '05']

    # 공격루트 (COM_CODE1=3009)
    ATT_VIA = ['01', '02', '03', '04']

    # 공격세부루트 (COM_CODE1=3010)
    ATT_DTLS_VIA = ['01', '02', '03']

    # 사고구분 (COM_CODE1=3008)
    INCI_TYP_CD = ['01', '02', '03']

    # 망구분 (COM_CODE1=4004)
    NET_DIV = ['public', 'private', 'DMZ']

    # 비고 (COM_CODE1=4006)
    REMARKS = ['0', '1', '2', '3']  # 0:없음, 1:해킹, 2:취약점탐지, 3:유해IP

    # 인지기관 (COM_CODE1=4001)
    RECO_INCI_CD = ['01', '02', '03', '04']

    # 해킹 공격유형 (COM_CODE1=4015) - TBZHACKING용
    HACK_ATT_TYPE_CD = ['01', '02', '03', '04', '05']
    HACK_ATT_TYPE_NAMES = {
        '01': 'SQL인젝션',
        '02': 'XSS',
        '03': '원격코드실행',
        '04': '권한상승',
        '05': '파일업로드'
    }

    # 웹취약점 공격유형 (COM_CODE1=4011) - TBZHOMEPV용
    VULN_ATT_TYPE_CD = ['01', '02', '03', '04', '05']
    VULN_ATT_TYPE_NAMES = {
        '01': '표준미적용',
        '02': '설정오류',
        '03': '접근제어미흡',
        '04': '인증우회',
        '05': '정보노출'
    }

    # 히스토리 분류 (HSTY_CLF)
    HSTY_CLF = ['REG', 'MOD', 'TRNS', 'END']
    HSTY_CLF_NAMES = {
        'REG': '등록',
        'MOD': '수정',
        'TRNS': '이관',
        'END': '종결'
    }

    # 샘플 기관코드 (TSMINST 테이블에서 조회)
    INST_CODES = [1100000, 1200000, 1300000, 1400000, 1500000, 1600000]

    # 샘플 국가코드 (TSMNATION 테이블에서 조회)
    NATION_CODES = [82, 1, 86, 81, 44, 49, 33, 7]  # 한국, 미국, 중국, 일본, 영국, 독일, 프랑스, 러시아

    # 운영체제
    OS_NAMES = ['Windows Server 2019', 'Windows Server 2022', 'CentOS 7', 'Ubuntu 22.04', 'RHEL 8', 'Windows 10']


# ============================================================================
# 더미 데이터 생성기
# ============================================================================
class DummyDataGenerator:
    """더미 데이터 생성 유틸리티"""

    # 한국 이름 샘플
    FIRST_NAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임']
    LAST_NAMES = ['민수', '영희', '철수', '지영', '성호', '미경', '동현', '수진', '현우', '지은']

    # 부서명 샘플
    DEPARTMENTS = ['정보보안팀', '시스템운영팀', 'IT기획팀', '개발팀', '인프라팀', '보안관제팀', '네트워크팀']

    # 사고 제목 템플릿
    TITLE_TEMPLATES = [
        '웹서버 해킹 시도 탐지',
        'DDoS 공격 의심 트래픽 발생',
        '악성코드 감염 의심 시스템 발견',
        '비인가 접근 시도 탐지',
        '개인정보 유출 의심 사건',
        '랜섬웨어 감염 사고',
        'SQL 인젝션 공격 탐지',
        'XSS 공격 시도 발견',
        '피싱 메일 수신 보고',
        '내부 시스템 비정상 접근'
    ]

    # 사고 내용 템플릿
    CONTENT_TEMPLATES = [
        '20XX년 XX월 XX일 XX시경 해당 시스템에서 비정상적인 접근 시도가 탐지되었습니다. 공격자는 외부 IP에서 접근을 시도하였으며, 현재 해당 IP는 차단 조치되었습니다.',
        '보안 모니터링 중 이상 트래픽이 발견되어 신고합니다. 해당 시스템의 로그 분석 결과 악성 행위의 흔적이 확인되었습니다.',
        '정기 보안점검 중 발견된 취약점에 대해 신고합니다. 해당 취약점을 통한 공격 시도가 확인되었으며, 긴급 패치가 필요한 상황입니다.',
        '외부로부터 대량의 비정상 패킷이 유입되고 있습니다. DDoS 공격으로 판단되며, 대응 조치가 필요합니다.',
        '내부 사용자 PC에서 악성코드 감염 징후가 발견되었습니다. 해당 PC는 네트워크에서 격리 조치하였습니다.'
    ]

    @staticmethod
    def generate_korean_name() -> str:
        """한국 이름 생성"""
        return random.choice(DummyDataGenerator.FIRST_NAMES) + random.choice(DummyDataGenerator.LAST_NAMES)

    @staticmethod
    def generate_phone_number() -> str:
        """전화번호 생성"""
        area_codes = ['02', '031', '032', '033', '041', '042', '043', '044', '051', '052', '053', '054', '055', '061', '062', '063', '064']
        return f"{random.choice(area_codes)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"

    @staticmethod
    def generate_mobile_number() -> str:
        """휴대폰번호 생성"""
        return f"010-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"

    @staticmethod
    def generate_email(name: str = None) -> str:
        """이메일 생성"""
        domains = ['example.com', 'test.go.kr', 'klid.or.kr', 'gov.kr']
        if name:
            username = name.replace(' ', '').lower()
        else:
            username = ''.join(random.choices(string.ascii_lowercase, k=8))
        return f"{username}@{random.choice(domains)}"

    @staticmethod
    def generate_ip_address(internal: bool = None) -> str:
        """IP 주소 생성"""
        if internal is None:
            internal = random.choice([True, False])

        if internal:
            # 내부망 IP (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
            choice = random.choice([1, 2, 3])
            if choice == 1:
                return f"10.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(1, 254)}"
            elif choice == 2:
                return f"172.{random.randint(16, 31)}.{random.randint(0, 255)}.{random.randint(1, 254)}"
            else:
                return f"192.168.{random.randint(0, 255)}.{random.randint(1, 254)}"
        else:
            # 외부 IP
            return f"{random.randint(1, 223)}.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(1, 254)}"

    @staticmethod
    def generate_datetime(start_days_ago: int = 365, end_days_ago: int = 0) -> str:
        """날짜시간 생성 (YYYYMMDDHH24MISS 형식)"""
        start = datetime.now() - timedelta(days=start_days_ago)
        end = datetime.now() - timedelta(days=end_days_ago)
        random_date = start + timedelta(seconds=random.randint(0, int((end - start).total_seconds())))
        return random_date.strftime('%Y%m%d%H%M%S')

    @staticmethod
    def generate_title() -> str:
        """사고 제목 생성"""
        return random.choice(DummyDataGenerator.TITLE_TEMPLATES)

    @staticmethod
    def generate_content() -> str:
        """사고 내용 생성"""
        return random.choice(DummyDataGenerator.CONTENT_TEMPLATES)

    @staticmethod
    def generate_department() -> str:
        """부서명 생성"""
        return random.choice(DummyDataGenerator.DEPARTMENTS)

    @staticmethod
    def generate_hostname() -> str:
        """호스트명 생성"""
        prefixes = ['WEB', 'DB', 'APP', 'FILE', 'MAIL', 'DNS', 'FW', 'SVR']
        return f"{random.choice(prefixes)}-{random.randint(1, 99):02d}"

    @staticmethod
    def generate_domain() -> str:
        """도메인 생성"""
        prefixes = ['www', 'api', 'admin', 'portal', 'service']
        domains = ['example.go.kr', 'test.or.kr', 'sample.gov.kr', 'demo.ac.kr']
        return f"{random.choice(prefixes)}.{random.choice(domains)}"

    # 해킹 관련 내용 템플릿
    HACKING_CONTENT_TEMPLATES = [
        '웹 애플리케이션에서 SQL 인젝션 취약점이 발견되었습니다. 공격자가 데이터베이스에 비인가 접근을 시도한 흔적이 확인되었습니다.',
        'XSS 공격을 통한 세션 탈취 시도가 탐지되었습니다. 악성 스크립트가 사용자 브라우저에서 실행된 것으로 확인됩니다.',
        '원격 코드 실행 취약점을 이용한 공격이 탐지되었습니다. 서버에서 비인가 명령 실행 흔적이 발견되었습니다.',
        '권한 상승 공격이 탐지되었습니다. 일반 사용자 계정으로 관리자 권한 획득 시도가 확인되었습니다.',
        '파일 업로드 취약점을 통한 웹쉘 업로드 시도가 탐지되었습니다. 악성 파일이 서버에 업로드된 흔적이 있습니다.'
    ]

    # 취약점 관련 내용 템플릿
    VULNERABILITY_CONTENT_TEMPLATES = [
        '웹 보안 표준 미적용으로 인한 취약점이 발견되었습니다. HTTPS 미적용, 보안 헤더 누락 등의 문제가 확인되었습니다.',
        '서버 설정 오류로 인한 보안 취약점이 발견되었습니다. 디렉토리 리스팅, 기본 에러 페이지 노출 등의 문제가 있습니다.',
        '접근 제어 미흡으로 인한 취약점이 발견되었습니다. 비인가 사용자의 관리자 페이지 접근이 가능한 상태입니다.',
        '인증 우회 취약점이 발견되었습니다. 세션 관리 미흡으로 인한 인증 우회가 가능한 상태입니다.',
        '민감 정보 노출 취약점이 발견되었습니다. 개인정보, 시스템 정보 등이 외부에 노출될 수 있는 상태입니다.'
    ]

    @staticmethod
    def generate_hacking_content() -> str:
        """해킹 관련 내용 생성"""
        return random.choice(DummyDataGenerator.HACKING_CONTENT_TEMPLATES)

    @staticmethod
    def generate_vulnerability_content() -> str:
        """취약점 관련 내용 생성"""
        return random.choice(DummyDataGenerator.VULNERABILITY_CONTENT_TEMPLATES)

    @staticmethod
    def generate_history_title(clf: str) -> str:
        """히스토리 제목 생성"""
        titles = {
            'REG': '사고 신고 등록',
            'MOD': '사고 정보 수정',
            'TRNS': '사고 이관 처리',
            'END': '사고 종결 처리'
        }
        return titles.get(clf, '사고 처리')

    @staticmethod
    def generate_history_content(clf: str) -> str:
        """히스토리 내용 생성"""
        contents = {
            'REG': '신규 사고가 접수되었습니다. 담당자 배정 및 초기 대응 조치가 필요합니다.',
            'MOD': '사고 정보가 수정되었습니다. 추가 조사 결과를 반영하였습니다.',
            'TRNS': '해당 기관으로 사고가 이관되었습니다. 이관 기관에서 후속 조치 예정입니다.',
            'END': '사고 처리가 완료되어 종결되었습니다. 최종 보고서가 작성되었습니다.'
        }
        return contents.get(clf, '사고 처리 내역입니다.')


# ============================================================================
# Oracle DB Helper
# ============================================================================
class OracleDBHelper:
    """Oracle DB 연결 및 실행 유틸리티"""

    def __init__(self, config: Config):
        self.config = config
        self.connection = None

    def connect(self):
        """DB 연결"""
        if oracledb is None:
            raise ImportError("oracledb 패키지가 필요합니다.")

        dsn = f"{self.config.DB_HOST}:{self.config.DB_PORT}/{self.config.DB_SID}"
        self.connection = oracledb.connect(
            user=self.config.DB_USER,
            password=self.config.DB_PASSWORD,
            dsn=dsn
        )
        logger.info(f"Oracle DB 연결 성공: {dsn}")
        return self.connection

    def disconnect(self):
        """DB 연결 해제"""
        if self.connection:
            self.connection.close()
            self.connection = None
            logger.info("Oracle DB 연결 해제")

    def execute(self, sql: str, params: Dict = None) -> Any:
        """SQL 실행"""
        cursor = self.connection.cursor()
        try:
            if params:
                cursor.execute(sql, params)
            else:
                cursor.execute(sql)
            return cursor
        except Exception as e:
            logger.error(f"SQL 실행 오류: {e}")
            raise

    def execute_many(self, sql: str, params_list: List[Dict]) -> int:
        """배치 SQL 실행"""
        cursor = self.connection.cursor()
        try:
            cursor.executemany(sql, params_list)
            return cursor.rowcount
        except Exception as e:
            logger.error(f"배치 SQL 실행 오류: {e}")
            raise

    def commit(self):
        """커밋"""
        if self.connection:
            self.connection.commit()
            logger.info("트랜잭션 커밋 완료")

    def rollback(self):
        """롤백"""
        if self.connection:
            self.connection.rollback()
            logger.info("트랜잭션 롤백 완료")

    def fetch_valid_inst_codes(self) -> List[int]:
        """유효한 기관코드 조회"""
        sql = "SELECT INST_CD FROM TSMINST WHERE USE_YN = 'Y'"
        cursor = self.execute(sql)
        return [row[0] for row in cursor.fetchall()]

    def fetch_valid_codes(self, com_code1: str) -> List[str]:
        """공통코드 조회"""
        sql = """
            SELECT COM_CODE2
            FROM COMM_CODE
            WHERE COM_CODE1 = :com_code1
              AND CODE_LVL = 2
              AND USE_YN = 'Y'
        """
        cursor = self.execute(sql, {'com_code1': com_code1})
        return [row[0] for row in cursor.fetchall()]


# ============================================================================
# AccidentApply 더미 데이터 생성기
# ============================================================================
class AccidentApplyGenerator:
    """TBZLEDGE 테이블 더미 데이터 생성기"""

    def __init__(self, db_helper: OracleDBHelper = None, inst_cd: int = None):
        self.db_helper = db_helper
        self.inst_cd = inst_cd or Config.DEFAULT_INST_CD
        self.generator = DummyDataGenerator()
        self.codes = CodeMapping()

    def generate_inci_no(self, date_str: str = None) -> str:
        """
        사고번호 생성
        형식: POS_CD + YY-MMDD + 순번(3자리)
        예: CT25-0121001
        """
        if date_str is None:
            date_str = datetime.now().strftime('%y-%m%d')

        prefix = f"{Config.INCI_NO_PREFIX}{date_str}"

        if self.db_helper:
            # DB에서 다음 순번 조회
            sql = """
                SELECT NVL(MAX(SUBSTR(INCI_NO, 10, 3)), '000') + 1
                FROM TBZLEDGE
                WHERE INCI_NO LIKE :prefix || '%'
            """
            cursor = self.db_helper.execute(sql, {'prefix': prefix})
            seq = cursor.fetchone()[0]
            return f"{prefix}{int(seq):03d}"
        else:
            # DB 없이 랜덤 순번 생성
            return f"{prefix}{random.randint(1, 999):03d}"

    def generate_single_record(self) -> Dict[str, Any]:
        """단일 레코드 생성"""

        # 기본 정보
        dcl_crgr = self.generator.generate_korean_name()
        dmg_crgr = self.generator.generate_korean_name()
        att_crgr = self.generator.generate_korean_name()

        inci_dt = self.generator.generate_datetime(30, 0)  # 최근 30일 내
        date_str = inci_dt[:2] + '-' + inci_dt[4:8]  # YY-MMDD 형식

        record = {
            # 사고번호 (자동생성됨 - INSERT 시 selectKey에서 처리)
            # 'inci_no': self.generate_inci_no(date_str),

            # 사고유형 (필수)
            'accd_typ_cd': random.choice(self.codes.ACCD_TYP_CD),

            # 접수방법
            'acpn_mthd': random.choice(self.codes.ACPN_MTHD),

            # 공격자 정보
            'att_crgr': att_crgr,
            'att_dept': self.generator.generate_department(),
            'att_dtls_via': random.choice(self.codes.ATT_DTLS_VIA),
            'att_email': self.generator.generate_email(att_crgr),
            'att_inst_nm': '알수없음',
            'att_natn_cd': random.choice([c for c in self.codes.NATION_CODES if c != 82]),  # 외국
            'att_svr_nm': self.generator.generate_hostname(),
            'att_typ_cd': random.choice(self.codes.ATT_TYP_CD),
            'att_via': random.choice(self.codes.ATT_VIA),
            'att_remarks': '',

            # 담당자
            'crgr': dcl_crgr,

            # 신고자 정보 (필수)
            'dcl_crgr': dcl_crgr,
            'dcl_crgr_id': f"user{random.randint(100, 999)}",
            'dcl_dept': self.generator.generate_department(),
            'dcl_email': self.generator.generate_email(dcl_crgr),
            'dcl_inst_cd': random.choice(self.codes.INST_CODES),
            'dcl_mail': '',
            'dcl_tel_no': self.generator.generate_phone_number(),
            'dcl_hp_no': self.generator.generate_mobile_number(),

            # 피해 정보 (필수)
            'dmg_cpgr': '',
            'dmg_crgr': dmg_crgr,
            'dmg_dept': self.generator.generate_department(),
            'dmg_email': self.generator.generate_email(dmg_crgr),
            'dmg_inst_cd': random.choice(self.codes.INST_CODES),
            'dmg_natn_cd': 82,  # 한국
            'dmg_svr_usr_nm': '웹서비스',
            'dmg_tel_no': self.generator.generate_phone_number(),
            'dmg_hp_no': self.generator.generate_mobile_number(),

            # 취약점등급
            'dngr_gr': random.choice(self.codes.RISK_LEVEL),

            # 기타 정보
            'histo_modified_yn': 'N',
            'inci_acpn_cd': '01',
            # 'inci_acpn_dt': 자동생성 (sysdate)
            'inci_below_cont': '시도 차원의 대응 조치 필요',
            'inci_bgn_dt': '',
            'inci_dcl_cont': self.generator.generate_content(),  # 필수
            'inci_dt': inci_dt,  # 필수
            'inci_end_cont': '',
            'inci_end_dt': '',
            'inci_invs_cont': '초기 조사 결과, 외부 공격으로 확인됨',
            # 'inci_no_multi': inci_no와 동일하게 자동 설정
            'inci_prcs_stat': '1',  # 신고/접수 상태
            'inci_prty': random.choice(self.codes.INCI_PRTY),
            'inci_trns_cfdt': '',
            'inci_trns_rcpt_inst_cd': None,
            'inci_trns_req_inst_cd': None,
            'inci_trns_rqdt': '',
            'inci_trns_rslt': '',
            # 'inci_trns_yn': 'N' 자동 설정
            'inci_ttl': self.generator.generate_title(),  # 필수
            'inci_dtt_nm': '',
            'inci_typ_cd': random.choice(self.codes.INCI_TYP_CD),
            # 'inci_upd_dt': 자동생성
            'innci_no_before': None,
            'ips_ip': self.generator.generate_ip_address(internal=True),
            'ncsc_no': '',
            'net_div': random.choice(self.codes.NET_DIV),
            'os_nm': random.choice(self.codes.OS_NAMES),
            'packet_key': '',
            'reco_inci_cd': random.choice(self.codes.RECO_INCI_CD),
            'risk_level': random.choice(self.codes.RISK_LEVEL),
            'risk_value': str(random.randint(1, 100)),
            'tms_ip': self.generator.generate_ip_address(internal=True),
            'trans_inci_prcs_stat': '0',
            'trt_mthd_cd': '',
            # 'week_yn': 자동 계산
            'remarks': random.choice(self.codes.REMARKS),
        }

        return record

    def generate_ip_records(self, inci_no: str, is_attack: bool = False, count: int = None) -> List[Dict]:
        """IP 레코드 생성 (피해IP 또는 공격IP)"""
        if count is None:
            count = random.randint(1, 3)

        records = []
        for seq in range(1, count + 1):
            ip = self.generator.generate_ip_address(internal=not is_attack)
            records.append({
                'ip_seq': seq,
                'inci_no': inci_no,
                'ip_addr': ip,
                'natn_cd': 82 if not is_attack else random.choice([c for c in self.codes.NATION_CODES if c != 82])
            })
        return records

    def generate_bulk_records(self, count: int) -> List[Dict]:
        """대량 레코드 생성"""
        records = []
        for i in range(count):
            record = self.generate_single_record()
            records.append(record)
            if (i + 1) % 10 == 0:
                logger.info(f"레코드 생성 진행: {i + 1}/{count}")
        return records

    def generate_hacking_record(self, inci_no: str, user_id: str = 'admin') -> Dict[str, Any]:
        """
        TBZHACKING 테이블 레코드 생성
        remarks = '1' (해킹) 일 때 INSERT
        """
        return {
            'inci_no': inci_no,
            'attack_type_cd': random.choice(self.codes.HACK_ATT_TYPE_CD),
            'attack_type_nm_self': '',  # 직접입력 공격유형명
            'domain_nm': self.generator.generate_domain(),
            'net_div': random.choice(self.codes.NET_DIV),
            'hacking_cont': self.generator.generate_hacking_content(),
            'inci_target': random.choice(['웹서버', '데이터베이스', '파일서버', '메일서버', '내부시스템']),
            'user_id': user_id,
            # UPDATE_DT, REG_DT는 sysdate로 자동 설정
        }

    def generate_homepv_record(self, inci_no: str, user_id: str = 'admin') -> Dict[str, Any]:
        """
        TBZHOMEPV 테이블 레코드 생성
        remarks = '2' (취약점탐지) 일 때 INSERT
        """
        return {
            'inci_no': inci_no,
            'home_ch': '2',  # 고정값
            'attack_type_cd': random.choice(self.codes.VULN_ATT_TYPE_CD),
            'attack_type_nm': self.codes.VULN_ATT_TYPE_NAMES.get(
                random.choice(self.codes.VULN_ATT_TYPE_CD), ''
            ),
            'vulnerability_cont': self.generator.generate_vulnerability_content(),
            'user_id': user_id,
            # UPDATE_DT, REG_DT는 sysdate로 자동 설정
        }

    def generate_history_record(
        self,
        inci_no: str,
        hsty_no: int,
        grp_no: int = 1,
        grp_rank: int = 1,
        depth: int = 0,
        clf: str = 'REG',
        user_id: str = 'admin',
        user_name: str = '관리자',
        inst_cd: int = None
    ) -> Dict[str, Any]:
        """
        TBHHISTO 테이블 레코드 생성
        사고 등록/수정/이관/종결 시 히스토리 기록
        """
        return {
            'hsty_no': hsty_no,
            'inci_no': inci_no,
            'grp_no': grp_no,
            'grp_rank': grp_rank,
            'depth': depth,  # 0: 개발원, 1: 시도, 2: 시군구
            'ttl': self.generator.generate_history_title(clf),
            'hsty_clf': clf,
            # 'hsty_crt_dt': sysdate로 자동 설정
            'hsty_cont': self.generator.generate_history_content(clf),
            'crtr_id': user_id,
            'crtr_name': user_name,
            'inst_cd': inst_cd or self.inst_cd,
            'trans_yn': 'N',
        }


# ============================================================================
# INSERT SQL 템플릿
# ============================================================================
INSERT_TBZLEDGE_SQL = """
INSERT INTO TBZLEDGE (
    INCI_NO,
    ACCD_TYP_CD, ACPN_MTHD, ATT_CRGR, ATT_DEPT, ATT_DTLS_VIA,
    ATT_EMAIL, ATT_INST_NM, ATT_NATN_CD, ATT_SVR_NM, ATT_TYP_CD,
    ATT_VIA, ATT_REMARKS, CRGR, DCL_CRGR, DCL_CRGR_ID,
    DCL_DEPT, DCL_EMAIL, DCL_INST_CD, DCL_MAIL, DCL_TEL_NO,
    DMG_CPGR, DMG_CRGR, DMG_DEPT, DMG_EMAIL, DMG_INST_CD,
    DMG_NATN_CD, DMG_SVR_USR_NM, DMG_TEL_NO, DNGR_GR, HISTO_MODIFIED_YN,
    INCI_ACPN_CD, INCI_ACPN_DT, INCI_BELOW_CONT, INCI_BGN_DT, INCI_DCL_CONT,
    INCI_DT, INCI_END_CONT, INCI_END_DT, INCI_INVS_CONT, INCI_NO_MULTI,
    INCI_PRCS_STAT, INCI_PRTY, INCI_TRNS_CFDT, INCI_TRNS_RCPT_INST_CD, INCI_TRNS_REQ_INST_CD,
    INCI_TRNS_RQDT, INCI_TRNS_RSLT, INCI_TRNS_YN, INCI_TTL, INCI_DTT_NM,
    INCI_TYP_CD, INCI_UPD_DT, INNCI_NO_BEFORE, IPS_IP, NET_DIV,
    OS_NM, PACKET_KEY, RECO_INCI_CD, RISK_LEVEL, RISK_VALUE,
    TMS_IP, TRANS_INCI_PRCS_STAT, TRT_MTHD_CD, WEEK_YN, REMARKS,
    DMG_HP_NO, DCL_HP_NO
) VALUES (
    :inci_no,
    :accd_typ_cd, :acpn_mthd, :att_crgr, :att_dept, :att_dtls_via,
    :att_email, :att_inst_nm, :att_natn_cd, :att_svr_nm, :att_typ_cd,
    :att_via, :att_remarks, :crgr, :dcl_crgr, :dcl_crgr_id,
    :dcl_dept, :dcl_email, :dcl_inst_cd, :dcl_mail, :dcl_tel_no,
    :dmg_cpgr, :dmg_crgr, :dmg_dept, :dmg_email, :dmg_inst_cd,
    :dmg_natn_cd, :dmg_svr_usr_nm, :dmg_tel_no, :dngr_gr, :histo_modified_yn,
    :inci_acpn_cd, TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), :inci_below_cont, :inci_bgn_dt, :inci_dcl_cont,
    :inci_dt, :inci_end_cont, :inci_end_dt, :inci_invs_cont, :inci_no,
    :inci_prcs_stat, :inci_prty, :inci_trns_cfdt, :inci_trns_rcpt_inst_cd, :inci_trns_req_inst_cd,
    :inci_trns_rqdt, :inci_trns_rslt, 'N', :inci_ttl, :inci_dtt_nm,
    :inci_typ_cd, TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), :innci_no_before, :ips_ip, :net_div,
    :os_nm, :packet_key, :reco_inci_cd, :risk_level, :risk_value,
    :tms_ip, :trans_inci_prcs_stat, :trt_mthd_cd,
    (SELECT CASE
        WHEN TO_CHAR(SYSDATE, 'D') IN ('1', '7') THEN '1'
        WHEN EXISTS (SELECT 1 FROM COMM_CODE WHERE COM_CODE1 = '4005' AND COM_CODE2 = TO_CHAR(SYSDATE, 'YYYYMMDD')) THEN '1'
        ELSE '0'
    END FROM DUAL),
    :remarks, :dmg_hp_no, :dcl_hp_no
)
"""

INSERT_TBZDCLIP_SQL = """
INSERT INTO TBZDCLIP (IP_SEQ, INCI_NO, IP_ADDR)
VALUES (:ip_seq, :inci_no, :ip_addr)
"""

INSERT_TBZATTIP_SQL = """
INSERT INTO TBZATTIP (IP_SEQ, INCI_NO, IP_ADDR)
VALUES (:ip_seq, :inci_no, :ip_addr)
"""

# TBZHACKING INSERT SQL (remarks='1' 해킹일 때)
INSERT_TBZHACKING_SQL = """
INSERT INTO TBZHACKING (
    INCI_NO, ATTACK_TYPE_CD, ATTACK_TYPE_NM_SELF, DOMAIN_NM,
    NET_DIV, HACKING_CONT, INCI_TARGET, USER_ID,
    UPDATE_DT, REG_DT
) VALUES (
    :inci_no, :attack_type_cd, :attack_type_nm_self, :domain_nm,
    :net_div, :hacking_cont, :inci_target, :user_id,
    SYSDATE, SYSDATE
)
"""

# TBZHOMEPV INSERT SQL (remarks='2' 취약점탐지일 때)
INSERT_TBZHOMEPV_SQL = """
INSERT INTO TBZHOMEPV (
    INCI_NO, HOME_CH, ATTACK_TYPE_CD, ATTACK_TYPE_NM,
    VULNERABILITY_CONT, USER_ID, UPDATE_DT, REG_DT
) VALUES (
    :inci_no, :home_ch, :attack_type_cd, :attack_type_nm,
    :vulnerability_cont, :user_id, SYSDATE, SYSDATE
)
"""

# TBHHISTO INSERT SQL (히스토리)
INSERT_TBHHISTO_SQL = """
INSERT INTO TBHHISTO (
    HSTY_NO, INCI_NO, GRP_NO, GRP_RANK, DEPTH,
    TTL, HSTY_CLF, HSTY_CRT_DT, HSTY_CONT,
    CRTR_ID, CRTR_NAME, INST_CD, TRANS_YN
) VALUES (
    :hsty_no, :inci_no, :grp_no, :grp_rank, :depth,
    :ttl, :hsty_clf, SYSDATE, :hsty_cont,
    :crtr_id, :crtr_name, :inst_cd, :trans_yn
)
"""

# 다음 히스토리 번호 조회 SQL
SELECT_NEXT_HSTY_NO_SQL = """
SELECT NVL(MAX(HSTY_NO), 0) + 1 FROM TBHHISTO
"""

# 사고번호 생성 SQL
SELECT_NEXT_INCI_NO_SQL = """
WITH SUB AS (
    SELECT (
        SELECT POS_CD FROM TSMINST WHERE INST_CD = :inst_cd
    ) || TO_CHAR(SYSDATE, 'YY-MMDD') AS INCI_PREFIX
    FROM DUAL
)
SELECT
    REPLACE(SUB.INCI_PREFIX || TO_CHAR(NVL(MAX(SUBSTR(L.INCI_NO, 10, 3)), 0) + 1, '000'), ' ', '') AS INCI_NO
FROM TBZLEDGE L, SUB
WHERE L.INCI_NO LIKE SUB.INCI_PREFIX || '%'
"""


# ============================================================================
# 메인 실행
# ============================================================================
def main():
    """메인 실행 함수"""

    print("=" * 60)
    print("AccidentApply (TBZLEDGE) 더미 데이터 생성기")
    print("=" * 60)

    # 설정 확인
    print(f"\n[설정 정보]")
    print(f"  - DB Host: {Config.DB_HOST}:{Config.DB_PORT}/{Config.DB_SID}")
    print(f"  - 생성 건수: {Config.RECORD_COUNT}")
    print(f"  - 기본 기관코드: {Config.DEFAULT_INST_CD}")

    # 생성기 초기화
    generator = AccidentApplyGenerator()

    # 샘플 레코드 출력 (DB 연결 없이)
    print(f"\n[샘플 레코드 미리보기]")
    sample = generator.generate_single_record()
    print(f"  - 사고제목: {sample['inci_ttl']}")
    print(f"  - 사고유형: {sample['accd_typ_cd']}")
    print(f"  - 신고자: {sample['dcl_crgr']}")
    print(f"  - 신고기관: {sample['dcl_inst_cd']}")
    print(f"  - 처리상태: {sample['inci_prcs_stat']}")
    print(f"  - 우선순위: {sample['inci_prty']}")
    print(f"  - 사고일시: {sample['inci_dt']}")

    # DB 연결 및 실행 여부 확인
    print(f"\n[실행 옵션]")
    print("  1. 샘플 데이터만 생성 (DB 연결 없음)")
    print("  2. DB에 더미 데이터 INSERT")

    choice = input("\n선택 (1 또는 2): ").strip()

    if choice == "1":
        # 샘플 데이터만 생성
        print(f"\n{Config.RECORD_COUNT}개의 샘플 레코드 생성 중...")
        records = generator.generate_bulk_records(Config.RECORD_COUNT)
        print(f"\n생성 완료: {len(records)}건")

        # 일부 샘플 출력
        print(f"\n[생성된 레코드 샘플 (처음 3건)]")
        for i, rec in enumerate(records[:3]):
            print(f"\n--- 레코드 {i+1} ---")
            print(f"  제목: {rec['inci_ttl']}")
            print(f"  신고자: {rec['dcl_crgr']} ({rec['dcl_inst_cd']})")
            print(f"  피해담당자: {rec['dmg_crgr']}")
            print(f"  공격자IP국가: {rec['att_natn_cd']}")

    elif choice == "2":
        # DB 연결 및 INSERT
        if oracledb is None:
            print("\n오류: oracledb 패키지가 설치되어 있지 않습니다.")
            print("pip install oracledb 명령으로 설치 후 다시 시도하세요.")
            return

        db_helper = OracleDBHelper(Config)

        try:
            # DB 연결
            db_helper.connect()

            # 유효한 기관코드 조회 시도
            try:
                valid_inst_codes = db_helper.fetch_valid_inst_codes()
                if valid_inst_codes:
                    CodeMapping.INST_CODES = valid_inst_codes[:20]  # 최대 20개
                    print(f"  유효한 기관코드 {len(valid_inst_codes)}개 조회됨")
            except Exception as e:
                logger.warning(f"기관코드 조회 실패, 기본값 사용: {e}")

            # 생성기 초기화 (DB 연결 포함)
            generator = AccidentApplyGenerator(db_helper)

            # 레코드 생성
            print(f"\n{Config.RECORD_COUNT}개의 레코드 생성 중...")
            records = generator.generate_bulk_records(Config.RECORD_COUNT)

            # 사고번호 할당 및 INSERT
            print(f"\nDB INSERT 시작...")
            inserted_count = 0
            hacking_count = 0
            homepv_count = 0
            history_count = 0

            # 히스토리 번호 초기값 조회
            try:
                cursor = db_helper.execute(SELECT_NEXT_HSTY_NO_SQL)
                hsty_no = cursor.fetchone()[0]
            except Exception:
                hsty_no = 1

            for i, record in enumerate(records):
                try:
                    # 사고번호 생성
                    inci_no = generator.generate_inci_no()
                    record['inci_no'] = inci_no

                    # 1. TBZLEDGE INSERT (메인 테이블)
                    db_helper.execute(INSERT_TBZLEDGE_SQL, record)

                    # 2. TBZDCLIP INSERT (피해IP, 1~3개)
                    dmg_ips = generator.generate_ip_records(inci_no, is_attack=False)
                    for ip_rec in dmg_ips:
                        db_helper.execute(INSERT_TBZDCLIP_SQL, ip_rec)

                    # 3. TBZATTIP INSERT (공격IP, 1~2개)
                    att_ips = generator.generate_ip_records(inci_no, is_attack=True, count=random.randint(1, 2))
                    for ip_rec in att_ips:
                        db_helper.execute(INSERT_TBZATTIP_SQL, ip_rec)

                    # 4. remarks 값에 따른 추가 테이블 INSERT
                    remarks = record.get('remarks', '0')

                    if remarks == '1':
                        # TBZHACKING INSERT (해킹)
                        hacking_rec = generator.generate_hacking_record(inci_no)
                        db_helper.execute(INSERT_TBZHACKING_SQL, hacking_rec)
                        hacking_count += 1

                    elif remarks == '2':
                        # TBZHOMEPV INSERT (취약점탐지)
                        homepv_rec = generator.generate_homepv_record(inci_no)
                        db_helper.execute(INSERT_TBZHOMEPV_SQL, homepv_rec)
                        homepv_count += 1

                    # 5. TBHHISTO INSERT (히스토리 - 등록)
                    history_rec = generator.generate_history_record(
                        inci_no=inci_no,
                        hsty_no=hsty_no,
                        clf='REG',
                        user_id=record.get('dcl_crgr_id', 'admin'),
                        user_name=record.get('dcl_crgr', '관리자'),
                        inst_cd=record.get('dcl_inst_cd')
                    )
                    db_helper.execute(INSERT_TBHHISTO_SQL, history_rec)
                    hsty_no += 1
                    history_count += 1

                    inserted_count += 1

                    if (i + 1) % 10 == 0:
                        logger.info(f"INSERT 진행: {i + 1}/{len(records)}")

                except Exception as e:
                    logger.error(f"레코드 {i+1} INSERT 실패: {e}")
                    continue

            # 커밋
            db_helper.commit()
            print(f"\n============ INSERT 완료 ============")
            print(f"  TBZLEDGE (사고접수):     {inserted_count}건")
            print(f"  TBZDCLIP (피해IP):       약 {inserted_count * 2}건")
            print(f"  TBZATTIP (공격IP):       약 {inserted_count * 1}건")
            print(f"  TBZHACKING (해킹):       {hacking_count}건")
            print(f"  TBZHOMEPV (취약점):      {homepv_count}건")
            print(f"  TBHHISTO (히스토리):     {history_count}건")
            print(f"======================================")

        except Exception as e:
            logger.error(f"오류 발생: {e}")
            db_helper.rollback()
        finally:
            db_helper.disconnect()

    else:
        print("잘못된 선택입니다.")

    print("\n" + "=" * 60)
    print("프로그램 종료")
    print("=" * 60)


if __name__ == "__main__":
    main()
