/**
 * Program Name	: UserDto.java
 * <p>
 * Version		:  1.0
 * <p>
 * Creation Date	: 2015. 1. 28.
 * <p>
 * Programmer Name 	: Bae Jung Yeo
 * <p>
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 * P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * @author jung
 *
 */
@SuppressWarnings("serial")
public class UserDto implements Serializable {

    int    seq            = 0;    // 일련번호
    String userId        = null; // 사용자 ID
    int    instCd     	  = 0; // 기관코드
    int    pntInstCd    = 0; // 상위기관코드
    String instNm     	  = null; // 기관
    String pntInstNm    = null; // 상위기관
    String userName      = null; // 사용자 이름
    int    localCd       = 0; // 지역코드
    String userPwd       = null; // 패스워드
    String grade          = null; // 직급
    String moblPhnNo    = null; // 휴대폰번호
    String homeTelNo    = null; // 집 전화번호
    String offcTelNo    = null; // 사무실 전화번호
    String offcFaxNo    = null; // 사무실 팩스번호
    String emailAddr     = null; // 이메일 주소
    String smsYn         = null; // SMS 수신여부
    String emailYn       = null; // 이메일 수신여부
    String useYn         = null; // 사용여부
    String centerUserYn = null; // 지원센터 사용자 여부
    String pkiDn         = null; // 인증서 DN
    String regDt         = null; // 등록일자
    String roleCtrs      = null; // 침해분석대응권한 (10:관리자, 20:보안담당자, 30:관제요원, 40:대응요원 )
    String roleIics      = null; // 통합데이터수집권한 (10:관리자, 20:보안담당자, 30:일반사용자)
    String roleRms       = null; // 위험관리권한 (1:총괄관리자, 4:도메인관리자, 5:시스템담당자)
    String roleEws       = null; // 조기경보권한 (1:관리자, 2:일반관리자, 3:사용자)
    String roleSd        = null; // 서비스데스크권한 (10:관리자, 20:중앙관리자, 30:시도사용자,, 40:시군구사용자)
    int    ncategory      = 0;    // 조회 범위 (0:전체, 1:객체그룹, 2:객체) ==> 침해탐지에서 사용
    int    nrefindex      = 0;    // 참조 인덱스 ==> 침해탐지에서 사용
    String lastpwdmodified = null;	// [G-ISMS] 최종passwd변경시간(yyyy-mm-dd hh24:mi:ss.ff6)
    long lastpwdmodifiedtime = 0;	// [G-ISMS] 최종passwd변경시간(GMT+9H 1970년1월1일 09:00 부터 경과된 밀리초)
    private int loginFailCnt;
    private String lockYn;
    private String passResetYn;
    private int instLevel;

	//패키지 DTO
	private int authGrpNo;
	private String authGrpName;
	private String auth;
	
	//클리드용 권한1,2
	private String authMain;
	private String authSub;
	private String ipAddr;
	
	private String roleTbz01 ;
	private String roleTbz02 ;
	private String roleTbz03 ;
	private String roleTbz04 ;
	private String roleTbz05 ;
	private String roleTbz06 ;
	private String roleNot01 ;
	private String roleNot02 ;
	private String roleNot03 ;
	private String roleNot04 ;
	private String roleNot05 ;
	private String roleNot06 ;
	private String roleRes01 ;
	private String roleRes02 ;
	private String roleRes03 ;
	private String roleRes04 ;
	private String roleRes05 ;
	private String roleRes06 ;
	private String roleSha01 ;
	private String roleSha02 ;
	private String roleSha03 ;
	private String roleSha04 ;
	private String roleSha05 ;
	private String roleSha06 ;
	private String roleQna01 ;
	private String roleQna02 ;
	private String roleQna03 ;
	private String roleQna04 ;
	private String roleQna05 ;
	private String roleQna06 ;
	private String otpKey;
    private String gpkiSerialNo;
    private String inactiveYn;

    public String getGpkiSerialNo() {
        return gpkiSerialNo;
    }

    public void setGpkiSerialNo(final String gpkiSerialNo) {
        this.gpkiSerialNo = gpkiSerialNo;
    }

    public String getInactiveYn() {
        return inactiveYn;
    }

    public void setInactiveYn(final String inactiveYn) {
        this.inactiveYn = inactiveYn;
    }

    public String getOtpKey() {
		return otpKey;
	}

	public void setOtpKey(String otpKey) {
		this.otpKey = otpKey;
	}

	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public int getInstLevel() {
		return instLevel;
	}

	public void setInstLevel(int instLevel) {
		this.instLevel = instLevel;
	}
	
	public String getPassResetYn() {
		return passResetYn;
	}

	public void setPassResetYn(String passResetYn) {
		this.passResetYn = passResetYn;
	}

	public int getLoginFailCnt() {
		return loginFailCnt;
	}

	public void setLoginFailCnt(int loginFailCnt) {
		this.loginFailCnt = loginFailCnt;
	}

	public String getLockYn() {
		return lockYn;
	}

	public void setLockYn(String lockYn) {
		this.lockYn = lockYn;
	}

	public String getRoleTbz01() {
		return roleTbz01;
	}

	public void setRoleTbz01(String roleTbz01) {
		this.roleTbz01 = roleTbz01;
	}

	public String getRoleTbz02() {
		return roleTbz02;
	}

	public void setRoleTbz02(String roleTbz02) {
		this.roleTbz02 = roleTbz02;
	}

	public String getRoleTbz03() {
		return roleTbz03;
	}

	public void setRoleTbz03(String roleTbz03) {
		this.roleTbz03 = roleTbz03;
	}

	public String getRoleTbz04() {
		return roleTbz04;
	}

	public void setRoleTbz04(String roleTbz04) {
		this.roleTbz04 = roleTbz04;
	}

	public String getRoleTbz05() {
		return roleTbz05;
	}

	public void setRoleTbz05(String roleTbz05) {
		this.roleTbz05 = roleTbz05;
	}

	public String getRoleTbz06() {
		return roleTbz06;
	}

	public void setRoleTbz06(String roleTbz06) {
		this.roleTbz06 = roleTbz06;
	}

	public String getRoleNot01() {
		return roleNot01;
	}

	public void setRoleNot01(String roleNot01) {
		this.roleNot01 = roleNot01;
	}

	public String getRoleNot02() {
		return roleNot02;
	}

	public void setRoleNot02(String roleNot02) {
		this.roleNot02 = roleNot02;
	}

	public String getRoleNot03() {
		return roleNot03;
	}

	public void setRoleNot03(String roleNot03) {
		this.roleNot03 = roleNot03;
	}

	public String getRoleNot04() {
		return roleNot04;
	}

	public void setRoleNot04(String roleNot04) {
		this.roleNot04 = roleNot04;
	}

	public String getRoleNot05() {
		return roleNot05;
	}

	public void setRoleNot05(String roleNot05) {
		this.roleNot05 = roleNot05;
	}

	public String getRoleNot06() {
		return roleNot06;
	}

	public void setRoleNot06(String roleNot06) {
		this.roleNot06 = roleNot06;
	}

	public String getRoleRes01() {
		return roleRes01;
	}

	public void setRoleRes01(String roleRes01) {
		this.roleRes01 = roleRes01;
	}

	public String getRoleRes02() {
		return roleRes02;
	}

	public void setRoleRes02(String roleRes02) {
		this.roleRes02 = roleRes02;
	}

	public String getRoleRes03() {
		return roleRes03;
	}

	public void setRoleRes03(String roleRes03) {
		this.roleRes03 = roleRes03;
	}

	public String getRoleRes04() {
		return roleRes04;
	}

	public void setRoleRes04(String roleRes04) {
		this.roleRes04 = roleRes04;
	}

	public String getRoleRes05() {
		return roleRes05;
	}

	public void setRoleRes05(String roleRes05) {
		this.roleRes05 = roleRes05;
	}

	public String getRoleRes06() {
		return roleRes06;
	}

	public void setRoleRes06(String roleRes06) {
		this.roleRes06 = roleRes06;
	}

	public String getRoleSha01() {
		return roleSha01;
	}

	public void setRoleSha01(String roleSha01) {
		this.roleSha01 = roleSha01;
	}

	public String getRoleSha02() {
		return roleSha02;
	}

	public void setRoleSha02(String roleSha02) {
		this.roleSha02 = roleSha02;
	}

	public String getRoleSha03() {
		return roleSha03;
	}

	public void setRoleSha03(String roleSha03) {
		this.roleSha03 = roleSha03;
	}

	public String getRoleSha04() {
		return roleSha04;
	}

	public void setRoleSha04(String roleSha04) {
		this.roleSha04 = roleSha04;
	}

	public String getRoleSha05() {
		return roleSha05;
	}

	public void setRoleSha05(String roleSha05) {
		this.roleSha05 = roleSha05;
	}

	public String getRoleSha06() {
		return roleSha06;
	}

	public void setRoleSha06(String roleSha06) {
		this.roleSha06 = roleSha06;
	}

	public String getRoleQna01() {
		return roleQna01;
	}

	public void setRoleQna01(String roleQna01) {
		this.roleQna01 = roleQna01;
	}

	public String getRoleQna02() {
		return roleQna02;
	}

	public void setRoleQna02(String roleQna02) {
		this.roleQna02 = roleQna02;
	}

	public String getRoleQna03() {
		return roleQna03;
	}

	public void setRoleQna03(String roleQna03) {
		this.roleQna03 = roleQna03;
	}

	public String getRoleQna04() {
		return roleQna04;
	}

	public void setRoleQna04(String roleQna04) {
		this.roleQna04 = roleQna04;
	}

	public String getRoleQna05() {
		return roleQna05;
	}

	public void setRoleQna05(String roleQna05) {
		this.roleQna05 = roleQna05;
	}

	public String getRoleQna06() {
		return roleQna06;
	}

	public void setRoleQna06(String roleQna06) {
		this.roleQna06 = roleQna06;
	}

	public String getAuthMain() {
		return authMain;
	}

	public void setAuthMain(String authMain) {
		this.authMain = authMain;
	}

	public String getAuthSub() {
		return authSub;
	}

	public void setAuthSub(String authSub) {
		this.authSub = authSub;
	}

	public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getInstCd() {
        return instCd;
    }

    public void setInstCd(int instCd) {
        this.instCd = instCd;
    }

    public int getPntInstCd() {
        return pntInstCd;
    }

    public void setPntInstCd(int pntInstCd) {
        this.pntInstCd = pntInstCd;
    }

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getPntInstNm() {
        return pntInstNm;
    }

    public void setPntInstNm(String pntInstNm) {
        this.pntInstNm = pntInstNm;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getLocalCd() {
        return localCd;
    }

    public void setLocalCd(int localCd) {
        this.localCd = localCd;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getMoblPhnNo() {
        return moblPhnNo;
    }

    public void setMoblPhnNo(String moblPhnNo) {
        this.moblPhnNo = moblPhnNo;
    }

    public String getHomeTelNo() {
        return homeTelNo;
    }

    public void setHomeTelNo(String homeTelNo) {
        this.homeTelNo = homeTelNo;
    }

    public String getOffcTelNo() {
        return offcTelNo;
    }

    public void setOffcTelNo(String offcTelNo) {
        this.offcTelNo = offcTelNo;
    }

    public String getOffcFaxNo() {
        return offcFaxNo;
    }

    public void setOffcFaxNo(String offcFaxNo) {
        this.offcFaxNo = offcFaxNo;
    }

    public String getEmailAddr() {
        return emailAddr;
    }

    public void setEmailAddr(String emailAddr) {
        this.emailAddr = emailAddr;
    }

    public String getSmsYn() {
        return smsYn;
    }

    public void setSmsYn(String smsYn) {
        this.smsYn = smsYn;
    }

    public String getEmailYn() {
        return emailYn;
    }

    public void setEmailYn(String emailYn) {
        this.emailYn = emailYn;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getCenterUserYn() {
        return centerUserYn;
    }

    public void setCenterUserYn(String centerUserYn) {
        this.centerUserYn = centerUserYn;
    }

    public String getPkiDn() {
        return pkiDn;
    }

    public void setPkiDn(String pkiDn) {
        this.pkiDn = pkiDn;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getRoleCtrs() {
        return roleCtrs;
    }

    public void setRoleCtrs(String roleCtrs) {
        this.roleCtrs = roleCtrs;
    }

    public String getRoleIics() {
        return roleIics;
    }

    public void setRoleIics(String roleIics) {
        this.roleIics = roleIics;
    }

    public String getRoleRms() {
        return roleRms;
    }

    public void setRoleRms(String roleRms) {
        this.roleRms = roleRms;
    }

    public String getRoleEws() {
        return roleEws;
    }

    public void setRoleEws(String roleEws) {
        this.roleEws = roleEws;
    }

    public String getRoleSd() {
        return roleSd;
    }

    public void setRoleSd(String roleSd) {
        this.roleSd = roleSd;
    }

    public int getNcategory() {
        return ncategory;
    }

    public void setNcategory(int ncategory) {
        this.ncategory = ncategory;
    }

    public int getNrefindex() {
        return nrefindex;
    }

    public void setNrefindex(int nrefindex) {
        this.nrefindex = nrefindex;
    }

    public String getLastpwdmodified() {
        return lastpwdmodified;
    }

    public void setLastpwdmodified(String lastpwdmodified) {
        this.lastpwdmodified = lastpwdmodified;
    }

    public long getLastpwdmodifiedtime() {
        return lastpwdmodifiedtime;
    }

    public void setLastpwdmodifiedtime(long lastpwdmodifiedtime) {
        this.lastpwdmodifiedtime = lastpwdmodifiedtime;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "seq=" + seq +
                ", userId='" + userId + '\'' +
                ", instCd=" + instCd +
                ", pntInstCd=" + pntInstCd +
                ", instNm='" + instNm + '\'' +
                ", pntInstNm='" + pntInstNm + '\'' +
                ", userName='" + userName + '\'' +
                ", localCd=" + localCd +
                ", userPwd='" + userPwd + '\'' +
                ", grade='" + grade + '\'' +
                ", moblPhnNo='" + moblPhnNo + '\'' +
                ", homeTelNo='" + homeTelNo + '\'' +
                ", offcTelNo='" + offcTelNo + '\'' +
                ", offcFaxNo='" + offcFaxNo + '\'' +
                ", emailAddr='" + emailAddr + '\'' +
                ", smsYn='" + smsYn + '\'' +
                ", emailYn='" + emailYn + '\'' +
                ", useYn='" + useYn + '\'' +
                ", centerUserYn='" + centerUserYn + '\'' +
                ", pkiDn='" + pkiDn + '\'' +
                ", regDt='" + regDt + '\'' +
                ", roleCtrs='" + roleCtrs + '\'' +
                ", roleIics='" + roleIics + '\'' +
                ", roleRms='" + roleRms + '\'' +
                ", roleEws='" + roleEws + '\'' +
                ", roleSd='" + roleSd + '\'' +
                ", ncategory=" + ncategory +
                ", nrefindex=" + nrefindex +
                ", lastpwdmodified='" + lastpwdmodified + '\'' +
                ", lastpwdmodifiedtime=" + lastpwdmodifiedtime +
                '}';
    }

	public int getAuthGrpNo() {
		return authGrpNo;
	}

	public void setAuthGrpNo(int authGrpNo) {
		this.authGrpNo = authGrpNo;
	}

	public String getAuthGrpName() {
		return authGrpName;
	}

	public void setAuthGrpName(String authGrpName) {
		this.authGrpName = authGrpName;
	}

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

    
}
