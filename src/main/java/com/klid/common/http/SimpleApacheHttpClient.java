package com.klid.common.http;

import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SimpleApacheHttpClient {

    @Bean
    public CloseableHttpClient getHttpClient() {
        return HttpClients.createDefault();
    }
}
