package com.klid.common;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Properties;

public class AppGlobal {
    final public static String ariaKey = "HamonSoft_SecurityProgramModule#";

    public static String siteName;
    public static String webSiteName;
    public static String homePath;
    public static boolean appNetisPopup;

    //암호화 정책
    public static String MINWEEKS;
    public static String MAXWEEKS;
    public static String HISTORY;
    public static String WHITESPACE;
    public static String RETRIES;
    public static String RELEASETIME;
    public static String POLICY_MSG;
    public static String ALARM;
    public static String ALARM_MSG_HEAD;
    public static String ALARM_MSG_FOOT;

    public static String db;
    public static String oracleDbVer;

    // File Upload Type
    public static String uploadPath;
    public static String reportTemplate;
    public static long uploadSize;

    public static boolean isPwdEncrypt;

    // 기존 Klid 설정
    public static String incidentTypeCd;
    public static String incidentNo;
    public static String localCd;
    public static String instCd;
    public static String organCode;

    public static String ncscUrl;

    public static String uploadHelpPath ;

    public static String APP_VMS_REST_URL = StringUtils.EMPTY;
    public static String APP_VMS_REST_HOST = StringUtils.EMPTY;
    public static Integer APP_VMS_REST_PORT = null;
    public static String APP_VMS_REST_PROTOCOL = StringUtils.EMPTY;

    public static String NOTICE_VERSION = StringUtils.EMPTY;

    private final static Logger log = org.slf4j.LoggerFactory.getLogger(AppGlobal.class);

    /**
     * @Method setSystemProperties
     * @Return void
     * @Discript system.properties 셋팅
     */
    public void setSystemProperties(Properties props) {
    	AppGlobal.siteName = StringUtils.trim(props.getProperty("app.sitename"));
    	// webSiteName
        // default : ""
        try {
            AppGlobal.webSiteName = StringUtils.trim(props.getProperty("app.web.sitename"));
        } catch (NullPointerException e) {
            AppGlobal.webSiteName = StringUtils.EMPTY;
        }catch (Exception e) {
            AppGlobal.webSiteName = StringUtils.EMPTY;
        }

        AppGlobal.homePath = props.getProperty("app.homepath");

        // 로그인 후 전환 페이지 팝업 여부
        // default : false
        final String _appNetisPopup = StringUtils.trim(props.getProperty("app.netis.popup", "false").toLowerCase());
        AppGlobal.appNetisPopup = StringUtils.isBlank(_appNetisPopup) ? false : Boolean.parseBoolean(_appNetisPopup);


        // 업로드 경로 Klid 용 :: /ctrslogs/upload_dir/file
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            Calendar c1 = Calendar.getInstance();
            String todayPath = sdf.format(c1.getTime());

            //AppGlobal.uploadPath = getProjectPath();
            AppGlobal.uploadPath = StringUtils.trim(props.getProperty("app.file.uploadPath"));
        } catch (NullPointerException npe) {
            AppGlobal.uploadPath = StringUtils.EMPTY;
        } catch (Exception e) {
            AppGlobal.uploadPath = StringUtils.EMPTY;
        }

        // 업로드 경로 Klid 용 (사고유형)
        try {
            AppGlobal.uploadHelpPath = StringUtils.trim(props.getProperty("app.file.uploadHelpPath"));
        } catch (NullPointerException npe) {
            AppGlobal.uploadHelpPath = StringUtils.EMPTY;
        } catch (Exception e) {
            AppGlobal.uploadHelpPath = StringUtils.EMPTY;
        }

        try{
            AppGlobal.reportTemplate = StringUtils.trim(props.getProperty("app.file.reportTemplate"));
        }catch (Exception e){
            AppGlobal.reportTemplate = StringUtils.EMPTY;
        }

        try{
            AppGlobal.ncscUrl = StringUtils.trim(props.getProperty("app.ncsc.url"));
        }catch (Exception e){
            AppGlobal.ncscUrl = StringUtils.EMPTY;
        }
        
        // 업로드 사이즈
        // default : 10485760
      try {
          final long _uploadSize = Long.parseLong(props.getProperty("app.uploadSize").toString());
          AppGlobal.uploadSize = _uploadSize > 0 ? _uploadSize : 10485760;
      }catch (NumberFormatException e){
          AppGlobal.uploadSize =10485760;
      }catch (Exception e){
          AppGlobal.uploadSize =10485760;
      }

        
        // 패스워드 암호화
        // default : false
        try {
            final boolean _isPwdEncrypt = Boolean.parseBoolean(props.getProperty("app.pwd.encrypt", "false"));
            AppGlobal.isPwdEncrypt = _isPwdEncrypt;
        } catch (NullPointerException npe) {
            AppGlobal.isPwdEncrypt = false;
        } catch (Exception e) {
            AppGlobal.isPwdEncrypt = false;
        }

        // DB type (MARIA)
        try {
            final String _db = props.getProperty("app.db", "MARIA").toUpperCase();
            AppGlobal.db = StringUtils.isBlank(_db) ? "MARIA" : _db;
        } catch (NullPointerException npe) {
            AppGlobal.db = "MARIA";
        } catch (Exception e) {
            AppGlobal.db = "MARIA";
        }
        // DB type (ORACLE)
        try {
            final String _db = props.getProperty("app.db", "ORACLE").toUpperCase();
            AppGlobal.db = StringUtils.isBlank(_db) ? "ORACLE" : _db;
        } catch (NullPointerException npe) {
            AppGlobal.db = "ORACLE";
        }catch (Exception e) {
            AppGlobal.db = "ORACLE";
        }
        // DB 버전 (standard, enterprise)
        // default : standard
        try {
            final String _oracleDbVer = props.getProperty("oracle.db.version", "standard").toLowerCase();
            AppGlobal.oracleDbVer = StringUtils.isBlank(_oracleDbVer) ? "standard" : _oracleDbVer;
        } catch (Exception e) {
            AppGlobal.oracleDbVer = "standard";
        }
        // INCIDENT_TYPE_CD
        final String _incidentTypeCd = props.getProperty("app.conf.incidentTypeCd", "");
           AppGlobal.incidentTypeCd = StringUtils.isBlank(_incidentTypeCd) ? "" : _incidentTypeCd;

        // INCIDENT_NO
        try {
            final String _incidentNo = props.getProperty("app.conf.incidentNo", "");
            AppGlobal.incidentNo = StringUtils.isBlank(_incidentNo) ? "" : _incidentNo;
        }catch (NullPointerException e) {
            AppGlobal.incidentNo = "";
        }catch (Exception e) {
            AppGlobal.incidentNo = "";
        }
        // LOCAL_CD
        // default : -1
        final String _localCd = props.getProperty("app.conf.localCd", "-1");
        AppGlobal.localCd = StringUtils.isBlank(_localCd) ? "-1" : _localCd;

        // INST_CD
        try {
            final String _instCd = props.getProperty("app.conf.instCd", "");
            AppGlobal.instCd = StringUtils.isBlank(_instCd) ? "" : _instCd;
        } catch (NullPointerException npe) {
            AppGlobal.instCd = "";
        } catch (Exception e) {
            AppGlobal.instCd = "";
        }
        // ORGAN_CODE
        try {
            final String _organCode = props.getProperty("app.conf.organCode", "");
            AppGlobal.organCode = StringUtils.isBlank(_organCode) ? "" : _organCode;
        } catch (NullPointerException e) {
            AppGlobal.organCode = "";
        }catch (Exception e) {
            AppGlobal.organCode = "";
        }

        //app.notice.version
        try {
            final String noticeVersion = props.getProperty("app.notice.version", "");
            AppGlobal.NOTICE_VERSION = StringUtils.isBlank(noticeVersion) ? "" : noticeVersion;
        } catch (Exception e) {
            AppGlobal.NOTICE_VERSION = StringUtils.EMPTY;
        }
    }

    /**
     * ContextPath 리턴
     */
    public static String getCtxPath() {
        ServletRequestAttributes reqAttr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return reqAttr.getRequest().getContextPath();
    }

    /**
     * @Method getLogicalPath
     * @Date 2017. 7. 5.
     * @Writter Suhong
     * @Return String
     * @Discript 프로젝트 돌고 있는 경로 가져오기
     */
    public static String getProjectPath() {
        final String path = AppGlobal.class.getResource(StringUtils.EMPTY).getPath();

        String[] pathSplit = path.split("/");
        int temp = 0;
        if (pathSplit[0].equals("")) temp ++;
        int splitCnt = pathSplit.length - 6 + temp;
        String returhPath = StringUtils.EMPTY;
        for (int i = 0 + temp; i < splitCnt; i++) {
            returhPath += pathSplit[i] + File.separator;
        }
        return returhPath;
    }
}
