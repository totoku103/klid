package com.klid.webapp.common.service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.PolicyInfoDto;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.login.persistence.LoginMapper;
import com.klid.webapp.common.menu.dto.PageDto;
import com.klid.webapp.common.menu.persistence.MenuMapper;
import com.klid.webapp.common.menu.service.MenuService;
import com.klid.webapp.common.policy.service.PolicyConfService;
import com.klid.webapp.main.env.userConf.service.UserConfService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class PrimaryCtrsService {

    private static final int MAX_LOGIN_FAIL_COUNT = 5;
    private static final int LOCK_THRESHOLD_COUNT = 4;
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final PolicyConfService policyConfService;
    private final LoginMapper loginMapper;
    private final UserConfService userConfService;
    private final MenuService menuService;
    private final MenuMapper menuMapper;

    public PrimaryCtrsService(final PolicyConfService policyConfService,
                              final LoginMapper loginMapper,
                              final UserConfService userConfService,
                              final MenuService menuService,
                              final MenuMapper menuMapper) {
        this.policyConfService = policyConfService;
        this.loginMapper = loginMapper;
        this.userConfService = userConfService;
        this.menuService = menuService;
        this.menuMapper = menuMapper;
    }

    private String encrypt(String plainText) {
        return SEED_KISA256.Encrypt(plainText);
    }

    private Optional<UserDto> getUserInfoByOnlyId(String id, String password) {
        final HashMap<String, Object> map = new HashMap<>();
        map.put("userId", id);
        map.put("password", encrypt(password));
        final List<UserDto> users = loginMapper.selectLogin(map);

        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    public UserDto getUserInfoByOnlyId(String id) throws NotFoundDataByIdException {
        final HashMap<String, Object> map = new HashMap<>();
        map.put("userId", id);

        final UserDto userDto = loginMapper.selectUserInfo(map);
        if (userDto == null || StringUtils.isBlank(userDto.getUserId())) {
            throw new NotFoundDataByIdException();
        }
        return userDto;
    }

    private void setLoginFailCount(UserDto userInfo) {
        log.info("사용자 로그인 실패 처리. 현재 실패수: " + userInfo.getLoginFailCnt());
        if (userInfo.getLoginFailCnt() < MAX_LOGIN_FAIL_COUNT) {
            final Criterion criterion = new Criterion();
            criterion.addParam("userId", userInfo.getUserId());

            userConfService.updateLoginFailCnt(criterion);
            log.info("로그인 실패 카운트 업데이트 완료");
        }
    }

    private void clearFailCount(String userId) {
        final Criterion criterion = new Criterion();
        criterion.addParam("userId", userId);

        userConfService.updateLoginFailCntReset(criterion);
        log.info("로그인 실패 카운트 초기화 완료");
    }

    private void updateUserLock(UserDto userInfo) {
        if ("N".equalsIgnoreCase(userInfo.getLockYn())) {
            if (userInfo.getLoginFailCnt() == LOCK_THRESHOLD_COUNT) {
                log.info("사용자 계정 잠금 처리 시작");

                final Criterion criterion = new Criterion();
                criterion.addParam("userId", userInfo.getUserId());
                userConfService.updateLoginLock(criterion);
                log.info("사용자 계정 잠금 처리 완료");
            }
        }
    }

    private long getPasswordLimitSecond() {
        try {
            final PolicyInfoDto policyInfoDto = (PolicyInfoDto) policyConfService.getPolicyConfInfo().getResultData();
            log.info("패스워드 만료일 정책(주): " + policyInfoDto.getMaxWeeks());
            final long passwordLimitSecond = Long.parseLong(policyInfoDto.getMaxWeeks()) * 7 * 24 * 60 * 60 * 1000;
            log.info("패스워드 만료일 정책(초): " + passwordLimitSecond);
            return passwordLimitSecond;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return 0L;
        }
    }

    public Object getUserMenu(UserDto userInfo) {
        final String userAuth = userInfo.getAuth();
        final String userAuthMain = userInfo.getAuthMain();
        final Criterion criterion = new Criterion();
        criterion.addParam("auth", userAuth);
        criterion.addParam("authGrpNo", userAuthMain);
        log.info("사용자 메뉴 호출: " + criterion);

        final ReturnData siteMenuList = menuService.getSiteMenuList(criterion);
        if (siteMenuList != null) {
            final Object resultData = siteMenuList.getResultData();
            log.debug("사용자 메뉴: " + resultData);
            return resultData;
        } else {
            log.error("사용자 메뉴 호출 데이터 없음.");
            return null;
        }
    }

    public List<PageDto> getSimpleUserMenu(UserDto userInfo) {
        final String userAuth = userInfo.getAuth();
        final String userAuthMain = userInfo.getAuthMain();
        final List<PageDto> menuCollection = menuMapper.selectHierarchicalMenuList(userAuthMain, userAuth);
        log.debug("menu call {}, {}, {}", userAuth, userAuthMain, menuCollection.size());
        return menuCollection;
    }

    private void insertUserHistoryLog(String userId, String clientIp) {
        final Criterion criterion = new Criterion();
        criterion.addParam("userId", userId);
        criterion.addParam("usrIp", clientIp);
        criterion.addParam("logCd", "IN");
        criterion.addParam("menuCd", "로그인");
        criterion.addParam("remark", "로그인");
        loginMapper.insertUserLog(criterion.getCondition());
    }

    public LoginCheckType validateLoginPolicy(UserDto userDto, String clientIp) {
        if ("Y".equalsIgnoreCase(userDto.getInactiveYn())) {
            return LoginCheckType.INACTIVE;
        }

        if ("Y".equalsIgnoreCase(userDto.getLockYn())) {
            return LoginCheckType.LOCK;
        }

        if ("Y".equalsIgnoreCase(userDto.getPassResetYn())) {
            return LoginCheckType.RESET;
        }

        if (getPasswordLimitSecond() != 0) {
            final long passwordLimitSecond = getPasswordLimitSecond();
            final long userLastPasswordChangeSecond = userDto.getLastpwdmodifiedtime();
            final Calendar cal = Calendar.getInstance();
            if (cal.getTimeInMillis() > passwordLimitSecond + userLastPasswordChangeSecond) {
                return LoginCheckType.EXPIRE;
            }
        }

        if (!StringUtils.isBlank(userDto.getIpAddr())) {
            if (!userDto.getIpAddr().equals(clientIp)) {
                log.debug(String.format("---- IP 검증 실패 ---- 사용자 정보 IP: %s, 사용자 접속 IP: %s", userDto.getIpAddr(), clientIp));
                return LoginCheckType.MISS_MATCH_IP;
            }
        }

        return null;
    }

    public LoginCheckType processNormalityLogin(String id, String clientIp) {
        try {
            // 권한, 메뉴 셋팅
            final UserDto sessionUser = getUserInfoByOnlyId(id);
            final List<PageDto> menuCollections = getSimpleUserMenu(sessionUser);
            SessionManager.setUser(sessionUser, menuCollections);
            log.debug("Session ID:" + SessionManager.getSession().getId());
            clearFailCount(id);
            // 사용자 접근 이력 저장
            insertUserHistoryLog(id, clientIp);
            return LoginCheckType.OK;
        } catch (NotFoundDataByIdException e) {
            log.error("1차 인증 정상 로직 완료. 세션에 저장할 유저 정보가 없음.");
            return LoginCheckType.MISS_MATCH_ID_PASSWORD;
        }
    }

    public LoginCheckType check(String id, String password, String clientIp) {
        final Optional<UserDto> userInfo = getUserInfoByOnlyId(id, password);

        if (userInfo.isPresent()) {
            // 사용자 계정 상태 검증
            final UserDto userDto = userInfo.get();
            final LoginCheckType loginCheckType = validateLoginPolicy(userDto, clientIp);
            if (loginCheckType != null) return loginCheckType;

            // 모든 정책 체크 후 정상 로그인 비즈니스 로직
            return processNormalityLogin(id, clientIp);
        } else {
            // 비밀번호 불일치 정책
            UserDto userInfoOnlyId = null;
            try {
                userInfoOnlyId = getUserInfoByOnlyId(id);
            } catch (NotFoundDataByIdException e) {
                return LoginCheckType.MISS_MATCH_ID_PASSWORD;
            }
            setLoginFailCount(userInfoOnlyId);
            updateUserLock(userInfoOnlyId);
            return LoginCheckType.MISS_MATCH_ID_PASSWORD;
        }
    }

    public enum LoginCheckType {
        OK("정상"),
        INACTIVE("장기 미접속자 입니다. 관리자에게 문의해주세요."),
        LOCK("잠긴 계정입니다. 관리자에게 문의해주세요."),
        RESET("비밀번호를 재 설정해주세요."),
        EXPIRE("비밀번호를 변경해주세요."),
        MISS_MATCH_IP("접속하신 IP가 올바르지 않습니다."),
        MISS_MATCH_ID_PASSWORD("ID 또는 비밀번호가 일치하지 않습니다.");

        private final String message;

        LoginCheckType(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class NotFoundDataByIdException extends Exception {
        public NotFoundDataByIdException() {
        }
    }
}
