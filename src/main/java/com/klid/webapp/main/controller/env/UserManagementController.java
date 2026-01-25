
package com.klid.webapp.main.controller.env;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.main.env.userConf.service.UserConfService;
import com.klid.webapp.main.env.userManagement.dto.*;
import com.klid.webapp.main.env.userManagement.service.UserManagementSaveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/main/env/user-management/request")
public class UserManagementController {

    private final static Logger log = LoggerFactory.getLogger(UserManagementController.class);
    private final UserManagementSaveService userManagementSaveService;
    private final UserConfService userConfService;

    public UserManagementController(final UserManagementSaveService userManagementSaveService,
                                    final UserConfService userConfService) {
        this.userManagementSaveService = userManagementSaveService;
        this.userConfService = userConfService;
    }

    public static void validateUserAuthorization() {
        log.debug("사용자 권한 검증 시작");
        final UserDto user = SessionManager.getUser();
        if (user == null) {
            log.error("접속자 정보를 찾을 수 없습니다.");
            throw new CustomException("접속자 정보를 찾을 수 없습니다.");
        }
        final String authMain = user.getAuthMain();
        final String authSub = user.getAuthSub();
        log.debug("접속자 정보 확인: userSeq=" + user.getSeq() + ", authMain=" + authMain + ", authSub=" + authSub);

//        메인권한 개발원
        final boolean isNotKlid = !"AUTH_MAIN_2".equalsIgnoreCase(user.getAuthMain());
//        서브권한 운영자
        final boolean isNotOperator = !"AUTH_SUB_3".equalsIgnoreCase(user.getAuthSub());

        if (isNotKlid && isNotOperator) {
            log.error("요청 권한이 없습니다. userSeq=" + user.getSeq() + ", authMain=" + user.getAuthMain());
            throw new CustomException("요청 권한이 없습니다.");
        }
        log.debug("사용자 권한 검증 완료: userSeq=" + user.getSeq());
    }

    public static void validateOperatorAndAdminAuthorization() {
        log.debug("사용자 권한 검증 시작");
        final UserDto user = SessionManager.getUser();
        if (user == null) {
            log.error("접속자 정보를 찾을 수 없습니다.");
            throw new CustomException("접속자 정보를 찾을 수 없습니다.");
        }
        final String authMain = user.getAuthMain();
        final String authSub = user.getAuthSub();
        log.debug("접속자 정보 확인: userSeq=" + user.getSeq() + ", authMain=" + authMain + ", authSub=" + authSub);
//        메인권한 관리자
        final boolean isAdmin = "AUTH_MAIN_1".equalsIgnoreCase(user.getAuthMain());
//        메인권한 개발원
        final boolean isKlid = "AUTH_MAIN_2".equalsIgnoreCase(user.getAuthMain());
//        서브권한 운영자
        final boolean isOperator = "AUTH_SUB_3".equalsIgnoreCase(user.getAuthSub());

        if (isAdmin || (isKlid && isOperator)) {
            log.info("허용 인원. isAdmin=" + isAdmin + ", isKlid=" + isKlid + ", isOperator=" + isOperator);
        } else {
            log.error("요청 권한이 없습니다. userSeq=" + user.getSeq() + ", authMain=" + user.getAuthMain());
            throw new CustomException("요청 권한이 없습니다.");
        }
        log.debug("사용자 권한 검증 완료: userSeq=" + user.getSeq());
    }

    @GetMapping(value = "users")
    public @ResponseBody ReturnData getUserConfList(@RequestParam Map<String, Object> reqMap) {
        validateOperatorAndAdminAuthorization();
        return userConfService.getUserConfList(new Criterion(reqMap));
    }

    @PostMapping("/register")
    public ResponseEntity<AddUserReqDto> registerNewUser(@RequestBody AddUserReqDto reqDto) {
        log.info("사용자 등록 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", targetUserId=" + (reqDto.getUserInfo() != null ? reqDto.getUserInfo().getUserId() : "null"));
        reqDto.validate();
        log.debug("사용자 등록 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveRequest(reqDto.getUserInfo(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 등록 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", targetUserId=" + (reqDto.getUserInfo() != null ? reqDto.getUserInfo().getUserId() : "null"));
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("사용자 등록 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/modify")
    public ResponseEntity<EditUserReqDto> modifyExistingUser(@RequestBody EditUserReqDto reqDto) {
        log.info("사용자 수정 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", targetUserId=" + (reqDto.getUserInfo() != null ? reqDto.getUserInfo().getUserId() : "null"));
        reqDto.validate();
        log.debug("사용자 수정 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveRequest(reqDto.getUserInfo(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 수정 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", targetUserId=" + (reqDto.getUserInfo() != null ? reqDto.getUserInfo().getUserId() : "null"));
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("사용자 수정 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/reset/password")
    public ResponseEntity<PasswordResetUserReqDto> requestPasswordReset(@RequestBody PasswordResetUserReqDto reqDto) {
        log.info("사용자 비밀번호 초기화 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
        reqDto.validate();
        log.debug("비밀번호 초기화 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.savePasswordReset(reqDto.getCommUserSeq(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 비밀번호 초기화 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("비밀번호 초기화 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/reset/otp")
    public ResponseEntity<OtpResetUserReqDto> requestOtpReset(@RequestBody OtpResetUserReqDto reqDto) {
        log.info("사용자 OTP 초기화 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
        reqDto.validate();
        log.debug("OTP 초기화 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveOtpReset(reqDto.getCommUserSeq(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 OTP 초기화 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("OTP 초기화 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/reset/gpki")
    public ResponseEntity<GpkiResetUserReqDto> requestGpkiReset(@RequestBody GpkiResetUserReqDto reqDto) {
        log.info("사용자 GPKI 초기화 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
        reqDto.validate();
        log.debug("GPKI 초기화 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveGpkiReset(reqDto.getCommUserSeq(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 GPKI 초기화 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("GPKI 초기화 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/reset/account-lock")
    public ResponseEntity<AccountLockResetUserReqDto> requestAccountLockReset(@RequestBody AccountLockResetUserReqDto reqDto) {
        log.info("사용자 계정 잠김 초기화 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
        reqDto.validate();
        log.debug("계정 잠김 초기화 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveAccountLockReset(reqDto.getCommUserSeq(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 계정 잠김 초기화 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("계정 잠김 초기화 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/reset/inactive")
    public ResponseEntity<InactiveResetUserReqDto> requestInactiveReset(@RequestBody InactiveResetUserReqDto reqDto) {
        log.info("장기 미접속자 초기화 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
        reqDto.validate();
        log.debug("장기 미접속자 초기화 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveInactiveLockReset(reqDto.getCommUserSeq(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("장기 미접속자 초기화 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("장기 미접속자 초기화요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<DelUserReqDto> requestUserDeletion(@RequestBody DelUserReqDto reqDto) {
        log.info("사용자 계정 삭제 요청 시작: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
        reqDto.validate();
        log.debug("사용자 삭제 요청 검증 완료");
        validateUserAuthorization();

        try {
            userManagementSaveService.saveDelete(reqDto.getCommUserSeq(),
                    reqDto.getRequestUserSeq(),
                    reqDto.getRequestInstCd(),
                    reqDto.getRequestTypes(),
                    reqDto.getRequestReason(),
                    UserManagementProcessTypes.REQUEST);

            log.info("사용자 계정 삭제 요청 완료: requestUserSeq=" + reqDto.getRequestUserSeq() + ", commUserSeq=" + reqDto.getCommUserSeq());
            return ResponseEntity.ok(reqDto);
        } catch (Exception e) {
            log.error("사용자 삭제 요청 실패: " + e.getMessage(), e);
            throw e;
        }
    }
}
