package com.klid.config;

import com.klid.webapp.common.DataSourceType;
import com.klid.webapp.common.RoutingDataSource;
import jakarta.annotation.Nullable;
import org.apache.commons.dbcp2.BasicDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.sql.DataSource;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = {"com.klid.webapp.**.persistence", "com.klid.api.**.persistence"})
public class DataSourceConfig {

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Nullable
    @Autowired(required = false)
    private P6SpyConfig p6SpyConfig;


    @Bean
    public BasicDataSource masterDataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(jdbcUrl);

        final String usern = getPropertiesValue(username);
        dataSource.setUsername(usern);
        dataSource.setPassword(getPropertiesValue(password));
        dataSource.setValidationQuery("select 1 from dual");
        dataSource.setTestOnBorrow(true);
        return dataSource;
    }

    private SecretKeySpec generateMySQLAESKey(final String key) {
        try {
            final byte[] finalKey = new byte[16];
            int i = 0;
            for (byte b : key.getBytes("UTF-8"))
                finalKey[i++ % 16] ^= b;
            return new SecretKeySpec(finalKey, "AES");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    private String getPropertiesValue(String _value) {

        if (_value.startsWith("ENC(") && _value.endsWith(")")) {
            try {
                String _encStr = _value.replace("ENC(", "").replace(")", "");
                String dbKey = "H@m0nsoft\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00";
                Cipher decryptCipher = Cipher.getInstance("AES");
                decryptCipher.init(Cipher.DECRYPT_MODE, generateMySQLAESKey(dbKey));
                String _decryptStr = new String(decryptCipher.doFinal(Base64.getDecoder().decode(_encStr)));

                return _decryptStr;
            } catch (Exception e) {
                return _value;
            }
        } else {
            return _value;
        }
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(DataSourceType.MASTER, masterDataSource());
        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.setDefaultTargetDataSource(masterDataSource());

        // RoutingDataSource 초기화 (P6Spy 래핑 전에 반드시 호출)
        routingDataSource.afterPropertiesSet();

        // P6Spy 래핑 (local, dev 프로파일에서만 활성화)
        if (p6SpyConfig != null) {
            return p6SpyConfig.wrapDataSource(routingDataSource);
        }
        return routingDataSource;
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());

        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        org.springframework.core.io.Resource[] webappResources = resolver.getResources("classpath:oracle/com/klid/webapp/**/*.xml");
        org.springframework.core.io.Resource[] apiResources = resolver.getResources("classpath:sql/com/klid/api/**/*.xml");

        org.springframework.core.io.Resource[] allResources = new org.springframework.core.io.Resource[webappResources.length + apiResources.length];
        System.arraycopy(webappResources, 0, allResources, 0, webappResources.length);
        System.arraycopy(apiResources, 0, allResources, webappResources.length, apiResources.length);

        sessionFactory.setMapperLocations(allResources);
        sessionFactory.setConfigLocation(
                resolver.getResource("classpath:config/mybatis-config.xml")
        );

        return sessionFactory;
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate() throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory().getObject());
    }
}
