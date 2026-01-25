package com.klid.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("SystemProperties 테스트")
class SystemPropertiesTest {

    @Nested
    @DisplayName("단위 테스트 - Getter/Setter")
    class UnitTest {

        @Test
        @DisplayName("기본값이 올바르게 설정되어야 한다")
        void defaultValues() {
            SystemProperties props = new SystemProperties();

            assertEquals(10485760, props.getUploadSize());
            assertEquals("oracle", props.getDb());
            assertEquals("standard", props.getOracleDbVersion());
            assertNotNull(props.getTopo());
            assertNotNull(props.getDash());
            assertNotNull(props.getDelegate());
            assertNotNull(props.getAvf());
            assertNotNull(props.getConf());
            assertNotNull(props.getFile());
            assertNotNull(props.getLog());
        }

        @Test
        @DisplayName("Sitename 설정이 동작해야 한다")
        void setSitename() {
            SystemProperties props = new SystemProperties();
            props.setSitename("TestSite");

            assertEquals("TestSite", props.getSitename());
        }

        @Test
        @DisplayName("WebSitename 설정이 동작해야 한다")
        void setWebSitename() {
            SystemProperties props = new SystemProperties();
            props.setWebSitename("TestWebSite");

            assertEquals("TestWebSite", props.getWebSitename());
        }

        @Test
        @DisplayName("Homepath 설정이 동작해야 한다")
        void setHomepath() {
            SystemProperties props = new SystemProperties();
            props.setHomepath("/home/test");

            assertEquals("/home/test", props.getHomepath());
        }

        @Test
        @DisplayName("boolean 속성들이 동작해야 한다")
        void booleanProperties() {
            SystemProperties props = new SystemProperties();

            assertFalse(props.isPwdEncrypt());
            props.setPwdEncrypt(true);
            assertTrue(props.isPwdEncrypt());

            assertFalse(props.isNetisPopup());
            props.setNetisPopup(true);
            assertTrue(props.isNetisPopup());

            assertFalse(props.isStarcellUse());
            props.setStarcellUse(true);
            assertTrue(props.isStarcellUse());
        }

        @Test
        @DisplayName("uploadSize 설정이 동작해야 한다")
        void setUploadSize() {
            SystemProperties props = new SystemProperties();
            props.setUploadSize(2048000);

            assertEquals(2048000, props.getUploadSize());
        }

        @Test
        @DisplayName("DB 설정이 동작해야 한다")
        void setDb() {
            SystemProperties props = new SystemProperties();
            props.setDb("mysql");

            assertEquals("mysql", props.getDb());
        }

        @Test
        @DisplayName("OracleDbVersion 설정이 동작해야 한다")
        void setOracleDbVersion() {
            SystemProperties props = new SystemProperties();
            props.setOracleDbVersion("enterprise");

            assertEquals("enterprise", props.getOracleDbVersion());
        }

        @Test
        @DisplayName("URL 속성들이 동작해야 한다")
        void urlProperties() {
            SystemProperties props = new SystemProperties();

            props.setNcscUrl("http://ncsc.example.com");
            assertEquals("http://ncsc.example.com", props.getNcscUrl());

            props.setItmonSvcUrl("http://itmon.example.com");
            assertEquals("http://itmon.example.com", props.getItmonSvcUrl());
        }

        @Test
        @DisplayName("noticeVersion 설정이 동작해야 한다")
        void setNoticeVersion() {
            SystemProperties props = new SystemProperties();
            props.setNoticeVersion("20251112s");

            assertEquals("20251112s", props.getNoticeVersion());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - Topo")
    class TopoTest {

        @Test
        @DisplayName("Topo 속성들이 동작해야 한다")
        void topoProperties() {
            SystemProperties.Topo topo = new SystemProperties.Topo();

            assertFalse(topo.isAuthUse());
            topo.setAuthUse(true);
            assertTrue(topo.isAuthUse());

            assertNull(topo.getAuthTable());
            topo.setAuthTable("topo_table");
            assertEquals("topo_table", topo.getAuthTable());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - Dash")
    class DashTest {

        @Test
        @DisplayName("Dash 속성들이 동작해야 한다")
        void dashProperties() {
            SystemProperties.Dash dash = new SystemProperties.Dash();

            dash.setIp("192.168.1.1");
            assertEquals("192.168.1.1", dash.getIp());

            dash.setPort(8080);
            assertEquals(8080, dash.getPort());

            dash.setUrl("/dashboard");
            assertEquals("/dashboard", dash.getUrl());

            assertFalse(dash.isDefault());
            dash.setDefault(true);
            assertTrue(dash.isDefault());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - Delegate")
    class DelegateTest {

        @Test
        @DisplayName("Delegate 속성들이 동작해야 한다")
        void delegateProperties() {
            SystemProperties.Delegate delegate = new SystemProperties.Delegate();

            delegate.setEngIp("10.0.0.1");
            assertEquals("10.0.0.1", delegate.getEngIp());

            delegate.setEngPort(8500);
            assertEquals(8500, delegate.getEngPort());

            delegate.setEngOs("lin");
            assertEquals("lin", delegate.getEngOs());

            delegate.setEngLangType("c");
            assertEquals("c", delegate.getEngLangType());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - Avf")
    class AvfTest {

        @Test
        @DisplayName("Avf 속성들이 동작해야 한다")
        void avfProperties() {
            SystemProperties.Avf avf = new SystemProperties.Avf();

            avf.setUploadIp("10.1.3.210");
            assertEquals("10.1.3.210", avf.getUploadIp());

            avf.setUploadPort(8080);
            assertEquals(8080, avf.getUploadPort());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - Conf")
    class ConfTest {

        @Test
        @DisplayName("Conf 기본값이 올바르게 설정되어야 한다")
        void confDefaultValues() {
            SystemProperties.Conf conf = new SystemProperties.Conf();

            assertEquals("-1", conf.getLocalCd());
        }

        @Test
        @DisplayName("Conf 속성들이 동작해야 한다")
        void confProperties() {
            SystemProperties.Conf conf = new SystemProperties.Conf();

            conf.setIncidentTypeCd("0010");
            assertEquals("0010", conf.getIncidentTypeCd());

            conf.setIncidentNo("CT");
            assertEquals("CT", conf.getIncidentNo());

            conf.setLocalCd("100");
            assertEquals("100", conf.getLocalCd());

            conf.setInstCd("1100000");
            assertEquals("1100000", conf.getInstCd());

            conf.setOrganCode("6260000");
            assertEquals("6260000", conf.getOrganCode());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - File")
    class FileTest {

        @Test
        @DisplayName("File 속성들이 동작해야 한다")
        void fileProperties() {
            SystemProperties.File file = new SystemProperties.File();

            file.setUploadPath("/upload/path");
            assertEquals("/upload/path", file.getUploadPath());

            file.setReportTemplate("/template/path");
            assertEquals("/template/path", file.getReportTemplate());

            file.setUploadHelpPath("/help/path");
            assertEquals("/help/path", file.getUploadHelpPath());
        }
    }

    @Nested
    @DisplayName("중첩 클래스 테스트 - Log")
    class LogTest {

        @Test
        @DisplayName("Log 속성들이 동작해야 한다")
        void logProperties() {
            SystemProperties.Log log = new SystemProperties.Log();

            log.setName("klid-web");
            assertEquals("klid-web", log.getName());

            log.setPath("./log");
            assertEquals("./log", log.getPath());

            log.setLevel("DEBUG");
            assertEquals("DEBUG", log.getLevel());
        }
    }

    @Nested
    @DisplayName("통합 테스트 - Properties 바인딩")
    @ExtendWith(org.springframework.test.context.junit.jupiter.SpringExtension.class)
    @EnableConfigurationProperties(SystemProperties.class)
    @TestPropertySource(properties = {
            "app.system.sitename=TestKlid",
            "app.system.web-sitename=TestWebKlid",
            "app.system.homepath=/test/home",
            "app.system.topo.auth-use=true",
            "app.system.topo.auth-table=test_topo",
            "app.system.dash.ip=127.0.0.1",
            "app.system.dash.port=9090",
            "app.system.dash.url=/test.do",
            "app.system.dash.default=true",
            "app.system.pwd-encrypt=true",
            "app.system.netis-popup=true",
            "app.system.upload-size=2048000",
            "app.system.db=mysql",
            "app.system.delegate.eng-ip=10.0.0.1",
            "app.system.delegate.eng-port=9500",
            "app.system.delegate.eng-os=win",
            "app.system.delegate.eng-lang-type=pyt",
            "app.system.starcell-use=true",
            "app.system.avf.upload-ip=192.168.1.100",
            "app.system.avf.upload-port=9080",
            "app.system.conf.incident-type-cd=0020",
            "app.system.conf.incident-no=DG",
            "app.system.conf.local-cd=100",
            "app.system.conf.inst-cd=2200000",
            "app.system.conf.organ-code=7370000",
            "app.system.ncsc-url=http://test.ncsc.com",
            "app.system.oracle-db-version=enterprise",
            "app.system.itmon-svc-url=http://test.itmon.com",
            "app.system.file.upload-path=/test/upload",
            "app.system.file.report-template=/test/template",
            "app.system.file.upload-help-path=/test/help",
            "app.system.notice-version=20260101",
            "app.system.log.name=test-log",
            "app.system.log.path=/var/log/test",
            "app.system.log.level=INFO"
    })
    @ContextConfiguration(classes = SystemProperties.class)
    class IntegrationTest {

        @Autowired
        private SystemProperties systemProperties;

        @Test
        @DisplayName("Properties 설정이 올바르게 바인딩되어야 한다")
        void propertiesBindingTest() {
            assertNotNull(systemProperties);

            // 기본 속성
            assertEquals("TestKlid", systemProperties.getSitename());
            assertEquals("TestWebKlid", systemProperties.getWebSitename());
            assertEquals("/test/home", systemProperties.getHomepath());
            assertTrue(systemProperties.isPwdEncrypt());
            assertTrue(systemProperties.isNetisPopup());
            assertEquals(2048000, systemProperties.getUploadSize());
            assertEquals("mysql", systemProperties.getDb());
            assertTrue(systemProperties.isStarcellUse());
            assertEquals("http://test.ncsc.com", systemProperties.getNcscUrl());
            assertEquals("enterprise", systemProperties.getOracleDbVersion());
            assertEquals("http://test.itmon.com", systemProperties.getItmonSvcUrl());
            assertEquals("20260101", systemProperties.getNoticeVersion());

            // Topo
            assertTrue(systemProperties.getTopo().isAuthUse());
            assertEquals("test_topo", systemProperties.getTopo().getAuthTable());

            // Dash
            assertEquals("127.0.0.1", systemProperties.getDash().getIp());
            assertEquals(9090, systemProperties.getDash().getPort());
            assertEquals("/test.do", systemProperties.getDash().getUrl());
            assertTrue(systemProperties.getDash().isDefault());

            // Delegate
            assertEquals("10.0.0.1", systemProperties.getDelegate().getEngIp());
            assertEquals(9500, systemProperties.getDelegate().getEngPort());
            assertEquals("win", systemProperties.getDelegate().getEngOs());
            assertEquals("pyt", systemProperties.getDelegate().getEngLangType());

            // Avf
            assertEquals("192.168.1.100", systemProperties.getAvf().getUploadIp());
            assertEquals(9080, systemProperties.getAvf().getUploadPort());

            // Conf
            assertEquals("0020", systemProperties.getConf().getIncidentTypeCd());
            assertEquals("DG", systemProperties.getConf().getIncidentNo());
            assertEquals("100", systemProperties.getConf().getLocalCd());
            assertEquals("2200000", systemProperties.getConf().getInstCd());
            assertEquals("7370000", systemProperties.getConf().getOrganCode());

            // File
            assertEquals("/test/upload", systemProperties.getFile().getUploadPath());
            assertEquals("/test/template", systemProperties.getFile().getReportTemplate());
            assertEquals("/test/help", systemProperties.getFile().getUploadHelpPath());

            // Log
            assertEquals("test-log", systemProperties.getLog().getName());
            assertEquals("/var/log/test", systemProperties.getLog().getPath());
            assertEquals("INFO", systemProperties.getLog().getLevel());
        }
    }
}
