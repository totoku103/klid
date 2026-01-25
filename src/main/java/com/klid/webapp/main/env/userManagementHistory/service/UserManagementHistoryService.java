package com.klid.webapp.main.env.userManagementHistory.service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import com.klid.webapp.common.service.GpkiService;
import com.klid.webapp.common.service.OtpService;
import com.klid.webapp.main.env.userManagement.dto.CommUserDto;
import com.klid.webapp.main.env.userManagement.dto.CommUserRequestUserInfo;
import com.klid.webapp.main.env.userManagement.persistence.UserManagementMapper;
import com.klid.webapp.main.env.userManagementHistory.dto.*;
import com.klid.webapp.main.env.userManagementHistory.persistence.UserManagementHistoryMapper;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.*;

@Service
@Transactional
public class UserManagementHistoryService {
    private final Logger log = LoggerFactory.getLogger(UserManagementHistoryService.class);
    private final UserManagementHistoryMapper userManagementHistoryMapper;
    private final UserActHistMapper userActHistMapper;
    private final UserManagementMapper userManagementMapper;
    private final OtpService otpService;
    private final GpkiService gpkiService;

    public UserManagementHistoryService(final UserManagementHistoryMapper userManagementHistoryMapper,
                                        final UserActHistMapper userActHistMapper,
                                        final UserManagementMapper userManagementMapper,
                                        final OtpService otpService,
                                        final GpkiService gpkiService) {
        this.userManagementHistoryMapper = userManagementHistoryMapper;
        this.userActHistMapper = userActHistMapper;
        this.userManagementMapper = userManagementMapper;
        this.otpService = otpService;
        this.gpkiService = gpkiService;
    }


    public List<HistoryGridResDto> getHistoryGridList(UserManagementHistoryGridSearchDto searchDto) {
        final UserDto user = SessionManager.getUser();

        if ("AUTH_MAIN_1".equalsIgnoreCase(user.getAuthMain())) {
            return this.userManagementHistoryMapper.selectUserManagementHistoryGrid(null, searchDto);
        } else if ("AUTH_MAIN_2".equalsIgnoreCase(user.getAuthMain())
                && "AUTH_SUB_3".equalsIgnoreCase(user.getAuthSub())) {
            return this.userManagementHistoryMapper.selectUserManagementHistoryGrid(user.getSeq(), searchDto);
        } else {
            throw new CustomException("권한이 없습니다.");
        }
    }

    public void checkProcessState(int commUserRequestSeq) {
        final CommUserRequestDto commUserRequestDto = userManagementHistoryMapper.selectCommUserRequestBySeq(commUserRequestSeq);
        if (!UserManagementProcessTypes.REQUEST.equals(commUserRequestDto.getProcessState())) {
            throw new CustomException("요청을 취소 할 수 없는 상태입니다.");
        }
    }

    public UserManagementRequestTypes getRequestTypeByCommUserRequestSeq(int commUserRequestSeq) {
        return userManagementHistoryMapper.selectRequestTypeByCommUserRequestSeq(commUserRequestSeq);
    }

    public LatestCommUserRequestProcessStateDto getLatestProcessState(int commUserRequestSeq) {
        final LatestCommUserRequestProcessStateDto latestCommUserRequestProcessStateDto = userManagementHistoryMapper.selectLatestRequestProcessState(commUserRequestSeq);
        return latestCommUserRequestProcessStateDto;
    }

    public void editRequestProcessState(int commUserRequestSeq,
                                        String requestReason,
                                        int requestUserSeq,
                                        int requestInstCd,
                                        UserManagementProcessTypes beforeProcessType,
                                        UserManagementProcessTypes afterProcessType) {
        log.debug(String.format(
                "editRequestProcessState called. commUserRequestSeq=%d, requestUserSeq=%d, requestReason=%s, " +
                        "requestInstCd=%d, beforeProcessType=%s, afterProcessType=%s",
                commUserRequestSeq,
                requestUserSeq,
                requestReason,
                requestInstCd,
                beforeProcessType,
                afterProcessType
        ));
        final int i = userManagementHistoryMapper.copyUserRequestForStateChange(commUserRequestSeq,
                requestUserSeq,
                beforeProcessType,
                requestReason,
                requestInstCd,
                afterProcessType);
        if (i != 1) {
            throw new CustomException("수정 작업에 실패했습니다.");
        }
    }

    public void saveRequestReviewState(Integer commUserRequestSeq,
                                       Integer requestUserSeq,
                                       Integer requestInstCd) {
        final int i = userManagementHistoryMapper.insertRequestReviewState(commUserRequestSeq, requestUserSeq, "상세 정보 확인", requestInstCd, UserManagementProcessTypes.REVIEWING);
        if (i != 1) {
            throw new CustomException("데이터 처리 중 에러가 발생했습니다.");
        }
    }

    public List<CompareUserInfoResDto> getCompareUserInfo(Integer commUserSeq, Integer commUserRequestSeq) {
        final SimpleUserInfoDto originUserInfo;
        if (commUserSeq == null) {
            originUserInfo = new SimpleUserInfoDto();
        } else {
            originUserInfo = userManagementHistoryMapper.selectCommUserUserInfo(commUserSeq);
            if (originUserInfo == null) {
                log.error("원본 사용자 정보 조회 실패.  commUserSeq: " + commUserSeq);
                throw new CustomException("원본 사용자 정보를 찾을 수 없습니다.");
            }
        }

        final SimpleUserInfoDto requestUserInfo = userManagementHistoryMapper.selectCommUserRequestUserInfo(commUserRequestSeq);
        if (requestUserInfo == null) {
            log.error("변경 요청 사용자 정보 조회 실패. commUserRequestSeq: " + commUserRequestSeq);
            throw new CustomException("변경 요청 사용자 정보를 찾을 수 없습니다.");
        }

        final UserManagementRequestTypes requestType = getRequestTypeByCommUserRequestSeq(commUserRequestSeq);
        if (requestType == null) {
            log.error("요청 타입 정보 조회 실패. commUserRequestSeq: " + commUserRequestSeq);
            throw new CustomException("요청 타입 정보를 찾을 수 없습니다.");
        }

        if (requestType.equals(UserManagementRequestTypes.OTP_SECRET_KEY_RESET_REQUEST)) {
            return getResetOtp(originUserInfo);
        } else if (requestType.equals(UserManagementRequestTypes.GPKI_SERIAL_NO_RESET_REQUEST)) {
            return getResetGpki(originUserInfo);
        } else {
            return getNormal(originUserInfo, requestUserInfo);
        }
    }

    private ArrayList<CompareUserInfoResDto> getResetOtp(final SimpleUserInfoDto originUserInfo) {
        log.info("OTP 초기화 조회");
        final ArrayList<CompareUserInfoResDto> list = new ArrayList<>();
        list.add(new CompareUserInfoResDto("사용자ID", originUserInfo.getUserId(), originUserInfo.getUserId()));
        list.add(new CompareUserInfoResDto("이름", originUserInfo.getUserName(), originUserInfo.getUserName()));
        list.add(new CompareUserInfoResDto("소속기관", originUserInfo.getInstNm(), originUserInfo.getInstNm()));
        list.add(new CompareUserInfoResDto("사용여부", originUserInfo.getUseYn(), originUserInfo.getUseYn()));
        list.add(new CompareUserInfoResDto("SMS수신여부", originUserInfo.getSmsYn(), originUserInfo.getSmsYn()));
        list.add(new CompareUserInfoResDto("로그인 IP", originUserInfo.getIpAddr(), originUserInfo.getIpAddr()));

        list.add(new CompareUserInfoResDto("휴대폰 번호", SEED_KISA256.Decrypt(originUserInfo.getMoblPhnNo()), SEED_KISA256.Decrypt(originUserInfo.getMoblPhnNo())));
        list.add(new CompareUserInfoResDto("사무실 전화번호", originUserInfo.getOffcTelNo(), originUserInfo.getOffcTelNo()));
        list.add(new CompareUserInfoResDto("이메일 주소", SEED_KISA256.Decrypt(originUserInfo.getEmailAddr()), SEED_KISA256.Decrypt(originUserInfo.getEmailAddr())));

        list.add(new CompareUserInfoResDto("메인 권한", originUserInfo.getAuthMainName(), originUserInfo.getAuthMainName()));
        list.add(new CompareUserInfoResDto("서브 권한", originUserInfo.getAuthSubName(), originUserInfo.getAuthSubName()));

        list.add(new CompareUserInfoResDto("비밀번호 초기화 여부", originUserInfo.getPassResetYn(), originUserInfo.getPassResetYn()));
        list.add(new CompareUserInfoResDto("잠금여부", originUserInfo.getLockYn(), originUserInfo.getLockYn()));

//        OTP 초기화
        final String originOtpKey = originUserInfo.getOtpKey() == null ? "N" : "Y";
        list.add(new CompareUserInfoResDto("OTP 키 설정 여부", originOtpKey, "N"));

        final String originGpkiSerialNo = originUserInfo.getGpkiSerialNo() == null ? "N" : "Y";
        list.add(new CompareUserInfoResDto("인증서 설정 여부", originGpkiSerialNo, originGpkiSerialNo));
        list.add(new CompareUserInfoResDto("장기 미접속 여부", originUserInfo.getInactiveYn(), originUserInfo.getInactiveYn()));
        return list;
    }

    private ArrayList<CompareUserInfoResDto> getResetGpki(final SimpleUserInfoDto originUserInfo) {
        log.info("GPKI 초기화 조회");
        final ArrayList<CompareUserInfoResDto> list = new ArrayList<>();
        list.add(new CompareUserInfoResDto("사용자ID", originUserInfo.getUserId(), originUserInfo.getUserId()));
        list.add(new CompareUserInfoResDto("이름", originUserInfo.getUserName(), originUserInfo.getUserName()));
        list.add(new CompareUserInfoResDto("소속기관", originUserInfo.getInstNm(), originUserInfo.getInstNm()));
        list.add(new CompareUserInfoResDto("사용여부", originUserInfo.getUseYn(), originUserInfo.getUseYn()));
        list.add(new CompareUserInfoResDto("SMS수신여부", originUserInfo.getSmsYn(), originUserInfo.getSmsYn()));
        list.add(new CompareUserInfoResDto("로그인 IP", originUserInfo.getIpAddr(), originUserInfo.getIpAddr()));

        list.add(new CompareUserInfoResDto("휴대폰 번호", SEED_KISA256.Decrypt(originUserInfo.getMoblPhnNo()), SEED_KISA256.Decrypt(originUserInfo.getMoblPhnNo())));
        list.add(new CompareUserInfoResDto("사무실 전화번호", originUserInfo.getOffcTelNo(), originUserInfo.getOffcTelNo()));
        list.add(new CompareUserInfoResDto("이메일 주소", SEED_KISA256.Decrypt(originUserInfo.getEmailAddr()), SEED_KISA256.Decrypt(originUserInfo.getEmailAddr())));

        list.add(new CompareUserInfoResDto("메인 권한", originUserInfo.getAuthMainName(), originUserInfo.getAuthMainName()));
        list.add(new CompareUserInfoResDto("서브 권한", originUserInfo.getAuthSubName(), originUserInfo.getAuthSubName()));

        list.add(new CompareUserInfoResDto("비밀번호 초기화 여부", originUserInfo.getPassResetYn(), originUserInfo.getPassResetYn()));
        list.add(new CompareUserInfoResDto("잠금여부", originUserInfo.getLockYn(), originUserInfo.getLockYn()));

        final String originOtpKey = originUserInfo.getOtpKey() == null ? "N" : "Y";
        list.add(new CompareUserInfoResDto("OTP 키 설정 여부", originOtpKey, originOtpKey));
// 인증서 초기화
        final String originGpkiSerialNo = originUserInfo.getGpkiSerialNo() == null ? "N" : "Y";
        list.add(new CompareUserInfoResDto("인증서 설정 여부", originGpkiSerialNo, "N"));
        list.add(new CompareUserInfoResDto("장기 미접속 여부", originUserInfo.getInactiveYn(), originUserInfo.getInactiveYn()));
        return list;
    }

    private ArrayList<CompareUserInfoResDto> getNormal(final SimpleUserInfoDto originUserInfo, final SimpleUserInfoDto requestUserInfo) {
        log.info("보통 정보 조회");
        final ArrayList<CompareUserInfoResDto> list = new ArrayList<>();
        list.add(new CompareUserInfoResDto("사용자ID", originUserInfo.getUserId(), requestUserInfo.getUserId()));
        list.add(new CompareUserInfoResDto("이름", originUserInfo.getUserName(), requestUserInfo.getUserName()));
        list.add(new CompareUserInfoResDto("소속기관", originUserInfo.getInstNm(), requestUserInfo.getInstNm()));
        list.add(new CompareUserInfoResDto("사용여부", originUserInfo.getUseYn(), requestUserInfo.getUseYn()));
        list.add(new CompareUserInfoResDto("SMS수신여부", originUserInfo.getSmsYn(), requestUserInfo.getSmsYn()));
        list.add(new CompareUserInfoResDto("로그인 IP", originUserInfo.getIpAddr(), requestUserInfo.getIpAddr()));

        list.add(new CompareUserInfoResDto("휴대폰 번호", SEED_KISA256.Decrypt(originUserInfo.getMoblPhnNo()), SEED_KISA256.Decrypt(requestUserInfo.getMoblPhnNo())));
        list.add(new CompareUserInfoResDto("사무실 전화번호", originUserInfo.getOffcTelNo(), requestUserInfo.getOffcTelNo()));
        list.add(new CompareUserInfoResDto("이메일 주소", SEED_KISA256.Decrypt(originUserInfo.getEmailAddr()), SEED_KISA256.Decrypt(requestUserInfo.getEmailAddr())));

        list.add(new CompareUserInfoResDto("메인 권한", originUserInfo.getAuthMainName(), requestUserInfo.getAuthMainName()));
        list.add(new CompareUserInfoResDto("서브 권한", originUserInfo.getAuthSubName(), requestUserInfo.getAuthSubName()));

        list.add(new CompareUserInfoResDto("비밀번호 초기화 여부", originUserInfo.getPassResetYn(), requestUserInfo.getPassResetYn()));
        list.add(new CompareUserInfoResDto("잠금여부", originUserInfo.getLockYn(), requestUserInfo.getLockYn()));

        final String originOtpKey = originUserInfo.getOtpKey() == null ? "N" : "Y";
        final String requestOtpKey = requestUserInfo.getOtpKey() == null || "-".equals(requestUserInfo.getOtpKey()) ? "N" : "Y";
        list.add(new CompareUserInfoResDto("OTP 키 설정 여부", originOtpKey, requestOtpKey));

        final String originGpkiSerialNo = originUserInfo.getGpkiSerialNo() == null ? "N" : "Y";
        final String requestGpkiSerialNo = requestUserInfo.getGpkiSerialNo() == null || "-".equals(requestUserInfo.getGpkiSerialNo()) ? "N" : "Y";
        list.add(new CompareUserInfoResDto("인증서 설정 여부", originGpkiSerialNo, requestGpkiSerialNo));
        list.add(new CompareUserInfoResDto("장기 미접속 여부", originUserInfo.getInactiveYn(), requestUserInfo.getInactiveYn()));
        return list;
    }

    public void editApproveRequest(int commUserRequestSeq, String approveReason, UserManagementProcessTypes approveType) {
        final UserDto currentUser = SessionManager.getUser();
        if (currentUser == null) {
            throw new CustomException("사용자 세션을 찾을 수 없습니다.");
        }

        // 권한 체크
        if (!"AUTH_MAIN_1".equalsIgnoreCase(currentUser.getAuthMain())) {
            throw new CustomException("승인/반려 권한이 없습니다.");
        }

        log.debug(String.format(
                "editApproveRequest called. commUserRequestSeq=%d, approveReason=%s, approveType=%s, approveUserSeq=%d",
                commUserRequestSeq,
                approveReason,
                approveType,
                currentUser.getSeq()
        ));

        // 요청 정보 조회
        final CommUserRequestDto commUserRequestDto = userManagementHistoryMapper.selectCommUserRequestBySeq(commUserRequestSeq);
        if (commUserRequestDto == null) {
            throw new CustomException("승인/반려할 요청을 찾을 수 없습니다.");
        }

        // commUserRequest 테이블에 새 레코드 insert
        final int result = userManagementHistoryMapper.insertApproveRejectRecord(
                commUserRequestSeq,
                currentUser.getSeq(),
                currentUser.getInstCd(),
                approveReason,
                approveType
        );

        if (result != 1) {
            throw new CustomException("승인/반려 처리에 실패했습니다.");
        }

        if (!UserManagementProcessTypes.APPROVAL.equals(approveType)) return;
        // 승인인 경우에만 comm_user 테이블 업데이트/인서트 처리


        final UserManagementRequestTypes requestType = commUserRequestDto.getRequestType();

        switch (requestType) {
            case OTP_SECRET_KEY_RESET_REQUEST:
            case GPKI_SERIAL_NO_RESET_REQUEST:
                break;
            default:
                compareData(commUserRequestDto);
        }

        switch (requestType) {
            case REGISTRATION_REQUEST:
                insertCommUserFromRequest(commUserRequestSeq);
                break;
            case DELETION_REQUEST:
                deleteCommUserFromRequest(commUserRequestDto.getCommUserSeq());
                break;
            case OTP_SECRET_KEY_RESET_REQUEST:
                otpService.updateOtpSecretKeyAllSystem(StringUtils.EMPTY, commUserRequestDto.getUserName(), commUserRequestDto.getOffcTelNo(), SEED_KISA256.Decrypt(commUserRequestDto.getMoblPhnNo()));
                updateOtpSecretKeyIsNull(commUserRequestDto.getCommUserSeq());
                break;
            case GPKI_SERIAL_NO_RESET_REQUEST:
                gpkiService.updateGpkiSerialNumberAllSystem(StringUtils.EMPTY, commUserRequestDto.getUserName(), commUserRequestDto.getOffcTelNo(), SEED_KISA256.Decrypt(commUserRequestDto.getMoblPhnNo()));
                updateGpkiSerialNoIsNull(commUserRequestDto.getCommUserSeq());
                break;
            case INACTIVE_RESET_REQUEST:
            case MODIFICATION_REQUEST:
            case PASSWORD_RESET_REQUEST:
            case ACCOUNT_LOCK_RESET_REQUEST:
                updateCommUserFromRequest(commUserRequestDto);
                break;
        }
    }

    private void deleteCommUserFromRequest(int comUserSeq) {
        final int i = userManagementHistoryMapper.deleteCommUserFromRequest(comUserSeq);
        if (i != 1) {
            throw new CustomException("사용자 정보 삭제에 실패했습니다.");
        }
        deleteUserAct();
    }

    private void insertCommUserFromRequest(int commUserRequestSeq) {
        int insertResult = userManagementHistoryMapper.insertCommUserFromRequest(commUserRequestSeq);
        if (insertResult != 1) {
            throw new CustomException("사용자 정보 생성에 실패했습니다.");
        }
        insertUserAct();
    }

    private void updateGpkiSerialNoIsNull(int commUserSeq) {
        final int updateResult = userManagementHistoryMapper.updateGpkiSerialNoIsNullByCommUserSeq(commUserSeq);
        if (updateResult != 1) {
            throw new CustomException("인증서 초기화에 실패했습니다.");
        }
        updateUserAct();
    }

    private void updateOtpSecretKeyIsNull(int commUserSeq) {
        final int updateResult = userManagementHistoryMapper.updateOtpSecretKeyIsNullByCommUserSeq(commUserSeq);
        if (updateResult != 1) {
            throw new CustomException("OTP 초기화에 실패했습니다.");
        }
        updateUserAct();
    }


    public int updateOtpInitializeByThirdParty(int commUserSeq, String reqUserId, String reqUserName) {
        final int otpSecretKeyUpdateResult = userManagementHistoryMapper.updateOtpSecretKeyIsNullByCommUserSeq(commUserSeq);
        if (otpSecretKeyUpdateResult != 1) {
            updateUserAct(reqUserId, reqUserName);
        }
        return otpSecretKeyUpdateResult;
    }

    private void updateCommUserFromRequest(CommUserRequestDto requestInfo) {
        int updateResult = userManagementHistoryMapper.updateCommUserFromRequest(requestInfo);
        if (updateResult != 1) {
            throw new CustomException("사용자 정보 업데이트에 실패했습니다.");
        }
        updateUserAct();
    }

    private void insertUserAct() {
        final Criterion criterionHist = new Criterion();
        criterionHist.addParam("guid", "37EFE475-2428-49B8-95CE-2AA78262631F");
        criterionHist.addParam("actType", "C");
        criterionHist.addParam("refTable", "COMM_USER");
        criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());

        userActHistMapper.addUserActHist(criterionHist.getCondition());
        log.debug("사용자 생성 활동 이력 기록 완료: " + criterionHist);
    }

    private void deleteUserAct() {
        final Criterion criterionHist = new Criterion();
        criterionHist.addParam("guid", "37EFE475-2428-49B8-95CE-2AA78262631F");
        criterionHist.addParam("actType", "D");
        criterionHist.addParam("refTable", "COMM_USER");
        criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());

        userActHistMapper.addUserActHist(criterionHist.getCondition());
        log.debug("사용자 생성 활동 이력 기록 완료: " + criterionHist);
    }

    private void updateUserAct() {
        final Criterion criterionHist = new Criterion();
        criterionHist.addParam("guid", "37EFE475-2428-49B8-95CE-2AA78262631F");
        criterionHist.addParam("actType", "U");
        criterionHist.addParam("refTable", "COMM_USER");
        criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());

        userActHistMapper.addUserActHist(criterionHist.getCondition());
        log.debug("사용자 수정 활동 이력 기록 완료: " + criterionHist);
    }

    private void updateUserAct(String reqUserId, String reqUserName) {
        final Criterion criterionHist = new Criterion();
        criterionHist.addParam("guid", "37EFE475-2428-49B8-95CE-2AA78262631F");
        criterionHist.addParam("actType", "U");
        criterionHist.addParam("refTable", "COMM_USER");
        criterionHist.addParam("regUserId", reqUserId);
        criterionHist.addParam("regUserName", reqUserName);

        userActHistMapper.addUserActHist(criterionHist.getCondition());
        log.debug("사용자 생성 활동 이력 기록 완료." + reqUserId + ", " + reqUserName + ", " + criterionHist);
    }

    public UserManagementProcessTypes getStandByRegUserId(String userId) {
        final List<StandByRegUserIdDto> standByRegUserIds = userManagementHistoryMapper.selectStandByRegUserIdList(userId);
        for (StandByRegUserIdDto standByRegUserId : standByRegUserIds) {
            if (UserManagementProcessTypes.REQUEST.equals(standByRegUserId.getLatestProcessState())) {
                return UserManagementProcessTypes.REQUEST;
            }
            if (UserManagementProcessTypes.REVIEWING.equals(standByRegUserId.getLatestProcessState())) {
                return UserManagementProcessTypes.REVIEWING;
            }
            if (UserManagementProcessTypes.APPROVAL.equals(standByRegUserId.getLatestProcessState())) {
                return UserManagementProcessTypes.APPROVAL;
            }
        }
        return null;
    }

    private void compareData(CommUserRequestUserInfo newData) {
        final Set<String> passFieldSet = new HashSet<>();
        passFieldSet.add("commUserSeq");
        passFieldSet.add("userId");
        passFieldSet.add("ipAddr");

        final Integer commUserSeq = newData.getCommUserSeq();
        if (commUserSeq == null) {
            log.info("신규 사용자 가입." + newData.getUserId());
            return;
        }
        final CommUserDto commUserDto = userManagementMapper.selectCommUserBySeq(commUserSeq);

        if (commUserDto == null) {
            log.warn("No CommUserDto found for commUserSeq=" + commUserSeq);
            return;
        }

        // 리플렉션으로 두 객체의 공통 필드 비교
        final Field[] fields = CommUserDto.class.getDeclaredFields();
        for (Field oldField : fields) {
            try {
                final String fieldName = oldField.getName();
                if (passFieldSet.contains(fieldName)) {
                    log.info("pass fieldName: " + fieldName);
                    continue;
                }
                // newData에 동일한 필드가 있는지 확인
                Field newField = null;
                try {
                    newField = newData.getClass().getDeclaredField(fieldName);
                } catch (NoSuchFieldException ignore) {
                    continue; // newData에 없는 필드는 무시
                }

                oldField.setAccessible(true);
                newField.setAccessible(true);

                final Object oldValue = oldField.get(commUserDto);
                final Object newValue = newField.get(newData);

                if (Objects.equals(oldValue, newValue) && newValue != null) {
                    log.info(String.format("Field [%s] unchanged, setting newData.%s to null (value=%s)",
                            fieldName, fieldName, newValue));
                    newField.set(newData, null);
                } else {
                    log.debug(String.format("Field [%s] differs or newValue is null. oldValue=%s, newValue=%s",
                            fieldName, oldValue, newValue));
                }

            } catch (IllegalAccessException e) {
                log.error(String.format("Error comparing field [%s]: %s", oldField.getName(), e.getMessage()), e);
            }
        }
    }
}
