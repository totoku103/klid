/**
 * Program Name	: LoginServiceImpl.java
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
package com.klid.webapp.common.login.service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import com.klid.common.OtpApi;
import com.klid.webapp.common.*;
import com.klid.webapp.main.env.userConf.service.UserConfService;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.dto.PolicyInfoDto;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.login.persistence.LoginMapper;
import com.klid.webapp.common.menu.service.MenuService;
import com.klid.webapp.common.policy.service.PolicyConfService;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author jung
 */
@Service("loginService")
public class LoginServiceImpl extends MsgService implements LoginService {

    public final static String SESSION_ATTRIBUTE_LEGACY = "SESSION_ATTRIBUTE_LEGACY";

    @Resource(name = "loginMapper")
    private LoginMapper mapper;

    @Resource(name = "policyConfService")

    private PolicyConfService policyConfService;

    @Resource(name = "menuService")
    private MenuService menuService;

    @Resource(name = "userConfService")
    private UserConfService userConfservice;


    @Override
    public ReturnData isUserAccountLocked(Criterion criterion) {
        return null;
    }

    @Override
    public String getLogin(Criterion criterion, HttpServletRequest request) {
        String returnData = "";
        //정책정보 조회

        PolicyInfoDto policyInfoDto = (PolicyInfoDto) policyConfService.getPolicyConfInfo().getResultData();

        //SEED256 비밀번호 암호화
        String pwd = criterion.getValue("password").toString();
        //ID 및 SEED256 암호화 비밀번호로 등록된 유저 검색
        criterion.addParam("password", SEED_KISA256.Encrypt(pwd));

        List<UserDto> getLoginInfo = mapper.selectLogin(criterion.getCondition()); //ID, 비밀번호 사용자 조회

        if (getLoginInfo.size() == 0) {
            //아이디 또는 패스워드가 틀렸습니다.
            returnData = "ID 또는 비밀번호가 일치하지 않습니다.";

            UserDto userDto = mapper.selectUserInfo(criterion.getCondition()); //ID 로만 사용자 조회

            if (userDto != null) {
                if (userDto.getLoginFailCnt() < 5) { //비밀번호 5회 이하 카운트 ++
                    userConfservice.updateLoginFailCnt(criterion);
                }

                if (userDto.getLockYn().equals("N")) { //잠긴계정이 아니고 로그인 5번째 실패시 계정 잠김
                    if (userDto.getLoginFailCnt() == 4) {
                        userConfservice.updateLoginLock(criterion);
                    }
                }
            }
        } else { //아이디, 비밀번호 정상 확인

            //계정이 잠겼을 경우
            if (getLoginInfo.get(0).getLockYn().equals("Y")) {
                returnData = "lock";

                //계정이 비밀번호를 초기화 한 경우
            } else if (getLoginInfo.get(0).getPassResetYn().equals("Y")) {
                returnData = "reset";
            } else {
                //등록한 아이피와 접속한 아이피 동일 여부 체크
                String regLoginIp = StringUtils.isBlank(getLoginInfo.get(0).getIpAddr()) ? "" : getLoginInfo.get(0).getIpAddr();

                String loginIp = request.getHeader("X-FORWARDED-FOR");

                if (loginIp == null || loginIp.equals("")) {
                    loginIp = request.getRemoteAddr();
                }

                //비밀번호 만료 기간(3개월) 확인
                Calendar cal = Calendar.getInstance();
                int ExpiredRemainDay = -1;
                long modifyTime = getLoginInfo.get(0).getLastpwdmodifiedtime() + Long.parseLong(policyInfoDto.getMaxWeeks()) * 7 * 24 * 60 * 60 * 1000;

                if (cal.getTimeInMillis() > modifyTime) {
                    returnData = "expire";
                }/*else if(!loginIp.equals(regLoginIp)){ //등록한 아이피와 로그인 아이피 동일 여부 체크
					returnData = "ipMiss";
				}*/
                //정상 로그인
                else {
                    userConfservice.updateLoginFailCntReset(criterion); //로그인 성공시 실패 카운트 초기화

                    ExpiredRemainDay = (int) Math.floor((Long.parseLong(policyInfoDto.getMaxWeeks()) * 7 * 24 * 60 * 60 * 1000 - (cal.getTimeInMillis() - getLoginInfo.get(0).getLastpwdmodifiedtime())) / 1000 / 60 / 60 / 24);
                    returnData = "OK";

                    //권한,메뉴 세팅
                    UserDto userDto = mapper.selectUserInfo(criterion.getCondition());
                    criterion.addParam("auth", userDto.getAuth());
                    criterion.addParam("authGrpNo", userDto.getAuthMain());
                    SessionManager.setUser(userDto, menuService.getSiteMenuList(criterion).getResultData());

                    // 사용자 접근이력 저장
                    String usrIp = request.getRemoteAddr();
                    criterion.addParam("usrIp", usrIp);
                    criterion.addParam("logCd", "IN");
                    criterion.addParam("menuCd", "로그인");
                    criterion.addParam("remark", "로그인");
                    mapper.insertUserLog(criterion.getCondition());
                }


            }




				/*//권한,메뉴 세팅
				UserDto userDto = mapper.selectUserInfo(criterion.getCondition());
				criterion.addParam("auth", userDto.getAuth());
				criterion.addParam("authGrpNo", userDto.getAuthMain());
				SessionManager.setUser(userDto, menuService.getSiteMenuList(criterion).getResultData());


				// 사용자 접근이력 저장
				String usrIp = request.getRemoteAddr();
				criterion.addParam("usrIp", loginIp);
				criterion.addParam("logCd", "IN");
				criterion.addParam("menuCd", "로그인");
				criterion.addParam("remark", "로그인");
				mapper.insertUserLog(criterion.getCondition());*/
        }

        return returnData;
    }

    @Override
    public void logout(UserDto userDto, HttpServletRequest request) {
        Map<String, Object> map = new HashedMap();
        // 사용자 접근이력 저장
        String usrIp = request.getRemoteAddr();
        String loginIp = request.getHeader("X-FORWARDED-FOR");

        if (loginIp == null || loginIp.equals("")) {
            loginIp = request.getRemoteAddr();
        }

        map.put("userId", userDto.getUserId());
        map.put("usrIp", loginIp);
        map.put("logCd", "OUT");
        map.put("menuCd", "로그아웃");
        map.put("remark", "로그아웃");

        mapper.insertUserLog(map);
    }

    @Override
    public HashMap<String, String> getOtpGenerate(Criterion criterion, HttpServletRequest request) {

        String returnData = "";
        String sUserId = SessionManager.getUser().getUserId();
        returnData = OtpApi.generate(sUserId, "ctrs.go.kr").toString();
        HashMap<String, String> map = new HashMap<String, String>();

        map.put("newKey", returnData);
        map.put("userKey", SessionManager.getUser().getOtpKey());
        //YKS2JS75HYI42XV3
        return map;
    }

    @Override
    public boolean getOtpCheck(Criterion criterion, HttpServletRequest request) {
        boolean otpSuccess = OtpApi.checkCode(criterion.getValue("userCode").toString(), criterion.getValue("otpSetCode").toString());
        if (otpSuccess) {
            ServletRequestAttributes reqAttr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpSession session = reqAttr.getRequest().getSession();
            session.setAttribute("otpSuccess", "Y");
        }

        return otpSuccess;
    }

    @Override
    public ReturnData editOtpKey(Criterion criterion) {
        mapper.editOtpKey(criterion.getCondition());
        return new ReturnData(criterion.getCondition());
    }

}
