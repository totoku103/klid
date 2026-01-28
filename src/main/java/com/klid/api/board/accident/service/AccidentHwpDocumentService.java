package com.klid.api.board.accident.service;

import java.util.Map;

/**
 * 사고신고 HWP 문서 생성 서비스 인터페이스
 */
public interface AccidentHwpDocumentService {

    /**
     * 사고신고 한글(HWP) 문서 생성
     *
     * @param reqMap 문서 생성에 필요한 데이터
     *               - dclInstName: 기관명
     *               - dclDept: 부서
     *               - dclCrgr: 성명
     *               - dclEmail: 이메일
     *               - dclHpNo: 휴대전화번호
     *               - dclTelNo: 전화번호
     *               - inciDt: 사고일시
     *               - dmgIp: 피해IP주소
     *               - osNm: 운영체제
     *               - accdTypName: 사고유형
     *               - inciDclCont: 사고내용
     *               - attIp: 공격자IP
     *               - attNatnNm: 공격자국가
     *               - inciInvsCont: 긴급조치실시사항
     *               - inciBelowCont: 시도의견
     * @return 생성된 문서 정보 (filePath, fileName, fileExt)
     * @throws Exception 문서 생성 실패 시
     */
    Map<String, String> createHwpDocument(Map<String, Object> reqMap) throws Exception;
}
