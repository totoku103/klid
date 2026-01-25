package com.klid.config;

import com.klid.common.AppGlobal;
import jakarta.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

@Configuration
@EnableConfigurationProperties({SystemProperties.class, JdbcProperties.class})
public class AppPropertiesConfig {

    private final SystemProperties systemProperties;
    private final JdbcProperties jdbcProperties;

    public AppPropertiesConfig(SystemProperties systemProperties, JdbcProperties jdbcProperties) {
        this.systemProperties = systemProperties;
        this.jdbcProperties = jdbcProperties;
    }

    @PostConstruct
    public void init() {
        loadSystemProperties();
    }

    private void loadSystemProperties() {
        // Set AppGlobal static fields from SystemProperties
        AppGlobal.siteName = StringUtils.defaultString(systemProperties.getSitename());
        AppGlobal.webSiteName = StringUtils.defaultString(systemProperties.getWebSitename());
        AppGlobal.homePath = StringUtils.defaultString(systemProperties.getHomepath());
        AppGlobal.appNetisPopup = systemProperties.isNetisPopup();
        AppGlobal.isPwdEncrypt = systemProperties.isPwdEncrypt();
        AppGlobal.db = StringUtils.defaultIfBlank(systemProperties.getDb(), "ORACLE").toUpperCase();
        AppGlobal.oracleDbVer = StringUtils.defaultIfBlank(systemProperties.getOracleDbVersion(), "standard").toLowerCase();
        AppGlobal.uploadSize = systemProperties.getUploadSize() > 0 ? systemProperties.getUploadSize() : 10485760;
        AppGlobal.ncscUrl = StringUtils.defaultString(systemProperties.getNcscUrl());
        AppGlobal.NOTICE_VERSION = StringUtils.defaultString(systemProperties.getNoticeVersion());

        // File settings
        if (systemProperties.getFile() != null) {
            AppGlobal.uploadPath = StringUtils.defaultString(systemProperties.getFile().getUploadPath());
            AppGlobal.reportTemplate = StringUtils.defaultString(systemProperties.getFile().getReportTemplate());
            AppGlobal.uploadHelpPath = StringUtils.defaultString(systemProperties.getFile().getUploadHelpPath());
        }

        // Conf settings
        if (systemProperties.getConf() != null) {
            AppGlobal.incidentTypeCd = StringUtils.defaultString(systemProperties.getConf().getIncidentTypeCd());
            AppGlobal.incidentNo = StringUtils.defaultString(systemProperties.getConf().getIncidentNo());
            AppGlobal.localCd = StringUtils.defaultIfBlank(systemProperties.getConf().getLocalCd(), "-1");
            AppGlobal.instCd = StringUtils.defaultString(systemProperties.getConf().getInstCd());
            AppGlobal.organCode = StringUtils.defaultString(systemProperties.getConf().getOrganCode());
        }
    }

    /**
     * Decrypt value if it's encrypted with ENC() format
     */
    private String decryptIfEncrypted(String value) {
        if (value == null) {
            return null;
        }
        if (value.startsWith("ENC(") && value.endsWith(")")) {
            try {
                String encStr = value.replace("ENC(", "").replace(")", "");
                String dbKey = "H@m0nsoft\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00";
                Cipher decryptCipher = Cipher.getInstance("AES");
                decryptCipher.init(Cipher.DECRYPT_MODE, generateMySQLAESKey(dbKey));
                return new String(decryptCipher.doFinal(Base64.getDecoder().decode(encStr)));
            } catch (Exception e) {
                return value;
            }
        }
        return value;
    }

    private SecretKeySpec generateMySQLAESKey(final String key) {
        try {
            final byte[] finalKey = new byte[16];
            int i = 0;
            for (byte b : key.getBytes("UTF-8")) {
                finalKey[i++ % 16] ^= b;
            }
            return new SecretKeySpec(finalKey, "AES");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
