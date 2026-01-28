package com.klid.api.board.accident.client;

import java.util.Map;

/**
 * NCI API 클라이언트 인터페이스
 * 국정원 연동 API 호출을 담당
 */
public interface NciApiClient {

    /**
     * NCI API 호출 - 사고 조치완료 정보 전송
     *
     * @param reqMap 요청 데이터
     *               - incidentId: 사고 ID
     *               - responseDateTime: 조치 일시
     *               - institutionName: 기관명
     *               - name: 담당자명
     *               - email: 담당자 이메일 (암호화된 상태)
     *               - responseContent: 조치 내용
     * @return API 응답 문자열
     */
    String callNciApi(Map<String, Object> reqMap);

    /**
     * HTTP GET 요청 수행
     *
     * @param url 요청 URL
     * @return 응답 문자열
     */
    String get(String url);
}
