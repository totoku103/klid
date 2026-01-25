package com.klid.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.system")
public class SystemProperties {

    private String sitename;
    private String webSitename;
    private String homepath;
    private Topo topo = new Topo();
    private Dash dash = new Dash();
    private boolean pwdEncrypt;
    private boolean netisPopup;
    private long uploadSize = 10485760;
    private String db = "oracle";
    private Delegate delegate = new Delegate();
    private boolean starcellUse;
    private Avf avf = new Avf();
    private Conf conf = new Conf();
    private String ncscUrl;
    private String oracleDbVersion = "standard";
    private String itmonSvcUrl;
    private File file = new File();
    private String noticeVersion;
    private Log log = new Log();

    // Getters and Setters
    public String getSitename() {
        return sitename;
    }

    public void setSitename(String sitename) {
        this.sitename = sitename;
    }

    public String getWebSitename() {
        return webSitename;
    }

    public void setWebSitename(String webSitename) {
        this.webSitename = webSitename;
    }

    public String getHomepath() {
        return homepath;
    }

    public void setHomepath(String homepath) {
        this.homepath = homepath;
    }

    public Topo getTopo() {
        return topo;
    }

    public void setTopo(Topo topo) {
        this.topo = topo;
    }

    public Dash getDash() {
        return dash;
    }

    public void setDash(Dash dash) {
        this.dash = dash;
    }

    public boolean isPwdEncrypt() {
        return pwdEncrypt;
    }

    public void setPwdEncrypt(boolean pwdEncrypt) {
        this.pwdEncrypt = pwdEncrypt;
    }

    public boolean isNetisPopup() {
        return netisPopup;
    }

    public void setNetisPopup(boolean netisPopup) {
        this.netisPopup = netisPopup;
    }

    public long getUploadSize() {
        return uploadSize;
    }

    public void setUploadSize(long uploadSize) {
        this.uploadSize = uploadSize;
    }

    public String getDb() {
        return db;
    }

    public void setDb(String db) {
        this.db = db;
    }

    public Delegate getDelegate() {
        return delegate;
    }

    public void setDelegate(Delegate delegate) {
        this.delegate = delegate;
    }

    public boolean isStarcellUse() {
        return starcellUse;
    }

    public void setStarcellUse(boolean starcellUse) {
        this.starcellUse = starcellUse;
    }

    public Avf getAvf() {
        return avf;
    }

    public void setAvf(Avf avf) {
        this.avf = avf;
    }

    public Conf getConf() {
        return conf;
    }

    public void setConf(Conf conf) {
        this.conf = conf;
    }

    public String getNcscUrl() {
        return ncscUrl;
    }

    public void setNcscUrl(String ncscUrl) {
        this.ncscUrl = ncscUrl;
    }

    public String getOracleDbVersion() {
        return oracleDbVersion;
    }

    public void setOracleDbVersion(String oracleDbVersion) {
        this.oracleDbVersion = oracleDbVersion;
    }

    public String getItmonSvcUrl() {
        return itmonSvcUrl;
    }

    public void setItmonSvcUrl(String itmonSvcUrl) {
        this.itmonSvcUrl = itmonSvcUrl;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public String getNoticeVersion() {
        return noticeVersion;
    }

    public void setNoticeVersion(String noticeVersion) {
        this.noticeVersion = noticeVersion;
    }

    public Log getLog() {
        return log;
    }

    public void setLog(Log log) {
        this.log = log;
    }

    // Nested classes
    public static class Topo {
        private boolean authUse;
        private String authTable;

        public boolean isAuthUse() {
            return authUse;
        }

        public void setAuthUse(boolean authUse) {
            this.authUse = authUse;
        }

        public String getAuthTable() {
            return authTable;
        }

        public void setAuthTable(String authTable) {
            this.authTable = authTable;
        }
    }

    public static class Dash {
        private String ip;
        private int port;
        private String url;
        private boolean defaultValue;

        public String getIp() {
            return ip;
        }

        public void setIp(String ip) {
            this.ip = ip;
        }

        public int getPort() {
            return port;
        }

        public void setPort(int port) {
            this.port = port;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public boolean isDefault() {
            return defaultValue;
        }

        public void setDefault(boolean defaultValue) {
            this.defaultValue = defaultValue;
        }
    }

    public static class Delegate {
        private String engIp;
        private int engPort;
        private String engOs;
        private String engLangType;

        public String getEngIp() {
            return engIp;
        }

        public void setEngIp(String engIp) {
            this.engIp = engIp;
        }

        public int getEngPort() {
            return engPort;
        }

        public void setEngPort(int engPort) {
            this.engPort = engPort;
        }

        public String getEngOs() {
            return engOs;
        }

        public void setEngOs(String engOs) {
            this.engOs = engOs;
        }

        public String getEngLangType() {
            return engLangType;
        }

        public void setEngLangType(String engLangType) {
            this.engLangType = engLangType;
        }
    }

    public static class Avf {
        private String uploadIp;
        private int uploadPort;

        public String getUploadIp() {
            return uploadIp;
        }

        public void setUploadIp(String uploadIp) {
            this.uploadIp = uploadIp;
        }

        public int getUploadPort() {
            return uploadPort;
        }

        public void setUploadPort(int uploadPort) {
            this.uploadPort = uploadPort;
        }
    }

    public static class Conf {
        private String incidentTypeCd;
        private String incidentNo;
        private String localCd = "-1";
        private String instCd;
        private String organCode;

        public String getIncidentTypeCd() {
            return incidentTypeCd;
        }

        public void setIncidentTypeCd(String incidentTypeCd) {
            this.incidentTypeCd = incidentTypeCd;
        }

        public String getIncidentNo() {
            return incidentNo;
        }

        public void setIncidentNo(String incidentNo) {
            this.incidentNo = incidentNo;
        }

        public String getLocalCd() {
            return localCd;
        }

        public void setLocalCd(String localCd) {
            this.localCd = localCd;
        }

        public String getInstCd() {
            return instCd;
        }

        public void setInstCd(String instCd) {
            this.instCd = instCd;
        }

        public String getOrganCode() {
            return organCode;
        }

        public void setOrganCode(String organCode) {
            this.organCode = organCode;
        }
    }

    public static class File {
        private String uploadPath;
        private String reportTemplate;
        private String uploadHelpPath;

        public String getUploadPath() {
            return uploadPath;
        }

        public void setUploadPath(String uploadPath) {
            this.uploadPath = uploadPath;
        }

        public String getReportTemplate() {
            return reportTemplate;
        }

        public void setReportTemplate(String reportTemplate) {
            this.reportTemplate = reportTemplate;
        }

        public String getUploadHelpPath() {
            return uploadHelpPath;
        }

        public void setUploadHelpPath(String uploadHelpPath) {
            this.uploadHelpPath = uploadHelpPath;
        }
    }

    public static class Log {
        private String name;
        private String path;
        private String level;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getLevel() {
            return level;
        }

        public void setLevel(String level) {
            this.level = level;
        }
    }
}
