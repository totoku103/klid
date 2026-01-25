package com.klid.config;

import com.p6spy.engine.spy.P6DataSource;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

/**
 * P6Spy 설정 클래스
 * local, dev 프로파일에서만 활성화됨
 */
@Configuration
@Profile({"local", "dev"})
public class P6SpyConfig {

    @PostConstruct
    public void init() {
        // P6Spy 옵션 설정
        com.p6spy.engine.spy.P6SpyOptions.getActiveInstance().setLogMessageFormat(
                P6SpySqlFormatter.class.getName()
        );
    }

    /**
     * DataSource를 P6SpyDataSource로 래핑
     */
    public DataSource wrapDataSource(DataSource dataSource) {
        return new P6DataSource(dataSource);
    }
}
