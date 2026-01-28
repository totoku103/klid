package com.klid.api.board.accident.client;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * NCI API 연결 설정
 * application.yml 또는 application.properties에서 설정 가능
 *
 * 예시:
 * accident:
 *   nci:
 *     ip: 10.46.126.53
 *     port: 8080
 */
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "accident.nci")
public class NciApiProperties {

    /**
     * NCI API 서버 IP 주소
     */
    private String ip = "10.46.126.53";

    /**
     * NCI API 서버 포트
     */
    private String port = "8080";

    /**
     * API 기본 URL 생성
     */
    public String getBaseUrl() {
        return "http://" + ip + ":" + port;
    }

    /**
     * API 키 엔드포인트 URL
     */
    public String getKeyUrl() {
        return getBaseUrl() + "/api/inci/key";
    }

    /**
     * API 업로드 엔드포인트 URL
     */
    public String getUploadUrl() {
        return getBaseUrl() + "/api/inci/upload";
    }
}
