package com.klid.common.http;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.io.HttpClientConnectionManager;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactory;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactoryBuilder;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.HttpHost;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.message.StatusLine;
import org.apache.hc.core5.ssl.SSLContextBuilder;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.net.ssl.SSLContext;
import java.io.InputStream;
import java.security.KeyStore;

import static org.junit.jupiter.api.Assertions.fail;

@DisplayName("Apache HttpClient 5 SSL 테스트")
class SimpleApacheHttpClientTest {

    private static SSLContext loadSslContext() throws Exception {
        // (1) PKCS#12 키스토어 로드
        final char[] password = "fjdksl12".toCharArray();
        final KeyStore keyStore = KeyStore.getInstance("PKCS12");

        try (InputStream ksStream =
                     Thread.currentThread()
                             .getContextClassLoader()
                             .getResourceAsStream("ssl/test-keystore.p12")) {
            if (ksStream == null) {
                throw new IllegalStateException("ssl/test-keystore.p12 not found on classpath");
            }
            keyStore.load(ksStream, password);
        }

        // (2) 키스토어(= client cert) + 동일 파일을 truststore로 함께 사용
        return SSLContextBuilder.create()
                .loadKeyMaterial(keyStore, password)
                .loadTrustMaterial(keyStore, null)
                .build();
    }

    @Test
    @Disabled("테스트 환경에 SSL 인증서 파일이 필요합니다")
    @DisplayName("SSL을 사용한 HTTP 요청 테스트")
    void testHttpsWithClientCertificate() throws Exception {
        final SSLContext sslContext = loadSslContext();

        final SSLConnectionSocketFactory sslSocketFactory = SSLConnectionSocketFactoryBuilder.create()
                .setSslContext(sslContext)
                .setTlsVersions("TLSv1.2", "TLSv1.3")
                .build();

        final HttpClientConnectionManager connectionManager = PoolingHttpClientConnectionManagerBuilder.create()
                .setSSLSocketFactory(sslSocketFactory)
                .build();

        final HttpHost httpHost = new HttpHost("https", "10.1.20.33", 443);
        final HttpGet httpGet = new HttpGet("/simple/1");

        try (final CloseableHttpClient client = HttpClients.custom()
                .setConnectionManager(connectionManager)
                .build()) {

            client.execute(httpHost, httpGet, response -> {
                System.out.println("Status: " + new StatusLine(response));
                final HttpEntity entity = response.getEntity();
                if (entity != null) {
                    String content = EntityUtils.toString(entity);
                    System.out.println("Response: " + content);
                }
                return null;
            });

        } catch (Exception e) {
            e.printStackTrace();
            fail("HttpClient creation failed: " + e.getMessage());
        }
    }
}
