package com.klid.webapp.common;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.config.ConnectionConfig;
import org.apache.hc.client5.http.config.RequestConfig;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.io.HttpClientConnectionManager;
import org.apache.hc.client5.http.ssl.NoopHostnameVerifier;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactory;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactoryBuilder;
import org.apache.hc.core5.http.io.SocketConfig;
import org.apache.hc.core5.util.TimeValue;
import org.apache.hc.core5.util.Timeout;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpMethod;

@Configuration
public class RestTemplateConfig {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Bean(destroyMethod = "close")
    public PoolingHttpClientConnectionManager connectionManager() throws NoSuchAlgorithmException, KeyManagementException {
        SSLConnectionSocketFactory sslSocketFactory = SSLConnectionSocketFactoryBuilder.create()
                .setSslContext(createSslContext())
                .setHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                .setTlsVersions(org.apache.hc.core5.http.ssl.TLS.V_1_2)
                .build();

        return PoolingHttpClientConnectionManagerBuilder.create()
                .setSSLSocketFactory(sslSocketFactory)
                .setMaxConnTotal(200)
                .setMaxConnPerRoute(50)
                .setDefaultConnectionConfig(ConnectionConfig.custom()
                        .setConnectTimeout(Timeout.ofSeconds(5))
                        .setSocketTimeout(Timeout.ofSeconds(5))
                        .setValidateAfterInactivity(TimeValue.ofSeconds(30))
                        .build())
                .setDefaultSocketConfig(SocketConfig.custom()
                        .setSoTimeout(Timeout.ofSeconds(5))
                        .build())
                .build();
    }

    private SSLContext createSslContext() throws NoSuchAlgorithmException, KeyManagementException {
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, new TrustManager[]{
                new X509TrustManager() {
                    public void checkClientTrusted(X509Certificate[] chain, String authType) {
                    }

                    public void checkServerTrusted(X509Certificate[] chain, String authType) {
                    }

                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                }
        }, new java.security.SecureRandom());
        return sslContext;
    }

    @Bean(destroyMethod = "close")
    public CloseableHttpClient httpClient(PoolingHttpClientConnectionManager cm) throws NoSuchAlgorithmException, KeyManagementException {
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectionRequestTimeout(Timeout.ofSeconds(2))
                .setResponseTimeout(Timeout.ofSeconds(5))
                .build();

        return HttpClients.custom()
                .setConnectionManager(cm)
                .setDefaultRequestConfig(requestConfig)
                .evictExpiredConnections()
                .evictIdleConnections(TimeValue.ofSeconds(60))
                .disableCookieManagement()
                .build();
    }

    @Bean
    public ResponseErrorHandler errorHandler() {
        return new ResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {
                return !response.getStatusCode().is2xxSuccessful()
                        && !response.getStatusCode().is3xxRedirection();
            }

            @Override
            public void handleError(URI url, HttpMethod method, ClientHttpResponse response) throws IOException {
                String body;
                try (BufferedReader br = new BufferedReader(new InputStreamReader(response.getBody(), StandardCharsets.UTF_8))) {
                    final StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) sb.append(line);
                    body = sb.toString();
                }
                throw new RemoteApiException(
                        "Remote API error: " + response.getStatusCode().value(),
                        response.getStatusCode().value(),
                        body
                );
            }
        };
    }

    public MappingJackson2HttpMessageConverter jacksonConverter() {
        final ObjectMapper om = new ObjectMapper();
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        om.configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

        final MappingJackson2HttpMessageConverter conv = new MappingJackson2HttpMessageConverter();
        conv.setObjectMapper(om);
        return conv;
    }

    @Bean
    public ClientHttpRequestInterceptor loggingInterceptor() {
        return (request, body, execution) -> {
            final String uri = request.getURI().toString();
            final String method = request.getMethod().name();

            final HttpHeaders masked = new HttpHeaders();
            masked.putAll(request.getHeaders());
            if (masked.containsHeader("API_SECRET")) masked.set("API_SECRET", "***");

            String reqBody = new String(body, StandardCharsets.UTF_8);
            if (reqBody.length() > 2048) reqBody = reqBody.substring(0, 2048) + "...(truncated)";
            log.info(String.format("[REST] -> %s %s headers=%s body=%s%n", method, uri, masked, reqBody));

            ClientHttpResponse response = execution.execute(request, body);

            String respBody;
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(response.getBody(), StandardCharsets.UTF_8))) {
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) sb.append(line);
                respBody = sb.toString();
            }
            if (respBody.length() > 4096) respBody = respBody.substring(0, 4096) + "...(truncated)";
            log.info(String.format("[REST] <- %s %s status=%d body=%s%n", method, uri, response.getStatusCode().value(), respBody));

            return response;
        };
    }

    @Bean
    public RestTemplate restTemplate(CloseableHttpClient httpClient,
                                     ResponseErrorHandler errorHandler,
                                     ClientHttpRequestInterceptor logging) {

        final HttpComponentsClientHttpRequestFactory baseFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        final ClientHttpRequestFactory requestFactory = new BufferingClientHttpRequestFactory(baseFactory);
        final RestTemplate rt = new RestTemplate(requestFactory);

        final List<HttpMessageConverter<?>> converters = new ArrayList<>(rt.getMessageConverters());
        converters.removeIf(c -> c instanceof MappingJackson2HttpMessageConverter);
        converters.add(0, jacksonConverter());
        rt.setMessageConverters(converters);

        rt.setErrorHandler(errorHandler);
        rt.getInterceptors().add(logging);
        return rt;
    }

    public static class RemoteApiException extends RuntimeException {
        public final int status;
        public final String responseBody;

        public RemoteApiException(String message, int status, String body) {
            super(message);
            this.status = status;
            this.responseBody = body;
        }
    }
}
