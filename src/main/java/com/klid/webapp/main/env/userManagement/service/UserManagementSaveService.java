package com.klid.webapp.main.env.userManagement.service;


import lombok.extern.slf4j.Slf4j;
import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import com.klid.webapp.main.env.userManagement.dto.CommUserDto;
import com.klid.webapp.main.env.userManagement.dto.CommUserRequestUserInfo;
import com.klid.webapp.main.env.userManagement.dto.CommUserRequestUserInfoDto;
import com.klid.webapp.main.env.userManagement.persistence.UserManagementMapper;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
@Transactional
@Slf4j
public class UserManagementSaveService {
    private final UserManagementMapper userManagementMapper;
    private final UserActHistMapper userActHistMapper;

    public UserManagementSaveService(final UserManagementMapper userManagementMapper,
                                     final UserActHistMapper userActHistMapper) {
        this.userManagementMapper = userManagementMapper;
        this.userActHistMapper = userActHistMapper;
    }

    private void saveUserActHist(UserManagementRequestTypes requestType) {
        final Criterion criterionHist = new Criterion();
        criterionHist.addParam("guid", "FA5CF53F-A3F9-466F-8533-3E62E94695C3");
        switch (requestType) {
            case REGISTRATION_REQUEST:
                criterionHist.addParam("actType", "C");
                break;
            case DELETION_REQUEST:
                criterionHist.addParam("actType", "D");
                break;
            case PASSWORD_RESET_REQUEST:
            case OTP_SECRET_KEY_RESET_REQUEST:
            case GPKI_SERIAL_NO_RESET_REQUEST:
            case MODIFICATION_REQUEST:
            case INACTIVE_RESET_REQUEST:
            case ACCOUNT_LOCK_RESET_REQUEST:
                criterionHist.addParam("actType", "U");
                break;
            default:
                log.error("UserManagementRequestTypes: " + requestType);
                throw new RuntimeException("알수 없는 UserManagementRequestTypes");
        }
        criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
        criterionHist.addParam("refTable", "COMM_USER_REQUEST");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());

        userActHistMapper.addUserActHist(criterionHist.getCondition());
    }



    public void saveRequest(CommUserRequestUserInfoDto commUserRequestUserInfoDto,
                            Integer requestUserSeq,
                            Integer requestInstCd,
                            UserManagementRequestTypes requestType,
                            String requestReason,
                            UserManagementProcessTypes requestProcessState) {
        commUserRequestUserInfoDto.encrypt();

//        if (UserManagementRequestTypes.MODIFICATION_REQUEST.equals(requestType)) {
//            compareData(commUserRequestUserInfoDto);
//        }

        log.debug(String.format("requestUserSeq: %d, requestType: %s, requestProcessState: %s, userInfo: %s", requestUserSeq, requestType, requestProcessState, commUserRequestUserInfoDto));
        final int i = userManagementMapper.insertCommUserRequest(commUserRequestUserInfoDto,
                requestUserSeq,
                requestInstCd,
                requestType,
                requestReason,
                requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }

        saveUserActHist(requestType);
    }


    public void savePasswordReset(int commUserSeq,
                                  Integer requestUserSeq,
                                  Integer requestInstCd,
                                  UserManagementRequestTypes requestType,
                                  String requestReason,
                                  UserManagementProcessTypes requestProcessState) {
        final CommUserDto commUserDto = userManagementMapper.selectCommUserBySeq(commUserSeq);
        if (commUserDto == null) {
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        commUserDto.setUserPwd(SEED_KISA256.Encrypt(commUserDto.getUserId()));
        commUserDto.setPassResetYn("Y");
        commUserDto.setLastPwdModified(Timestamp.valueOf(LocalDateTime.now()));

        final int i = userManagementMapper.insertCommUserRequest(commUserDto, requestUserSeq, requestInstCd, requestType, requestReason, requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }
        saveUserActHist(requestType);
    }

    public void saveOtpReset(int commUserSeq,
                             Integer requestUserSeq,
                             Integer requestInstCd,
                             UserManagementRequestTypes requestType,
                             String requestReason,
                             UserManagementProcessTypes requestProcessState) {
        final CommUserDto commUserDto = userManagementMapper.selectCommUserBySeq(commUserSeq);
        if (commUserDto == null) {
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        commUserDto.setOtpKey("-");

        final int i = userManagementMapper.insertCommUserRequest(commUserDto, requestUserSeq, requestInstCd, requestType, requestReason, requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }
        saveUserActHist(requestType);
    }

    public void saveGpkiReset(int commUserSeq,
                              Integer requestUserSeq,
                              Integer requestInstCd,
                              UserManagementRequestTypes requestType,
                              String requestReason,
                              UserManagementProcessTypes requestProcessState) {
        final CommUserDto commUserDto = userManagementMapper.selectCommUserBySeq(commUserSeq);
        if (commUserDto == null) {
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        commUserDto.setGpkiSerialNo("-");

        final int i = userManagementMapper.insertCommUserRequest(commUserDto, requestUserSeq, requestInstCd, requestType, requestReason, requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }
        saveUserActHist(requestType);
    }

    public void saveAccountLockReset(int commUserSeq,
                                     Integer requestUserSeq,
                                     Integer requestInstCd,
                                     UserManagementRequestTypes requestType,
                                     String requestReason,
                                     UserManagementProcessTypes requestProcessState) {
        final CommUserDto commUserDto = userManagementMapper.selectCommUserBySeq(commUserSeq);
        if (commUserDto == null) {
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        commUserDto.setLockYn("N");
        commUserDto.setLoginFailCnt(0);

        final int i = userManagementMapper.insertCommUserRequest(commUserDto, requestUserSeq, requestInstCd, requestType, requestReason, requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }
        saveUserActHist(requestType);
    }

    public void saveInactiveLockReset(int commUserSeq,
                                      Integer requestUserSeq,
                                      Integer requestInstCd,
                                      UserManagementRequestTypes requestType,
                                      String requestReason,
                                      UserManagementProcessTypes requestProcessState) {
        final CommUserDto commUserDto = userManagementMapper.selectCommUserBySeq(commUserSeq);
        if (commUserDto == null) {
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        commUserDto.setInactiveYn("N");

        final int i = userManagementMapper.insertCommUserRequest(commUserDto, requestUserSeq, requestInstCd, requestType, requestReason, requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }
        saveUserActHist(requestType);
    }

    public void saveDelete(int commUserSeq,
                           Integer requestUserSeq,
                           Integer requestInstCd,
                           UserManagementRequestTypes requestType,
                           String requestReason,
                           UserManagementProcessTypes requestProcessState) {
        final CommUserDto source = userManagementMapper.selectCommUserBySeq(commUserSeq);
        if (source == null) {
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        final int i = userManagementMapper.insertCommUserRequest(source, requestUserSeq, requestInstCd, requestType, requestReason, requestProcessState);
        if (i != 1) {
            throw new CustomException("저장 작업을 실패했습니다.");
        }
        saveUserActHist(requestType);
    }
}
