package com.klid.webapp.main.env.userManagement.dto;

import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import org.apache.commons.lang3.StringUtils;

public class EditUserReqDto {
    private CommUserRequestUserInfoDto userInfo;
    private String requestReason;
    private final UserManagementRequestTypes requestTypes = UserManagementRequestTypes.MODIFICATION_REQUEST;
    private final Integer requestUserSeq = SessionManager.getUser().getSeq();
    private final Integer requestInstCd = SessionManager.getUser().getInstCd();

    public CommUserRequestUserInfoDto getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(final CommUserRequestUserInfoDto userInfo) {
        this.userInfo = userInfo;
    }

    public String getRequestReason() {
        return requestReason;
    }

    public void setRequestReason(final String requestReason) {
        this.requestReason = requestReason;
    }

    public UserManagementRequestTypes getRequestTypes() {
        return requestTypes;
    }

    public Integer getRequestUserSeq() {
        return requestUserSeq;
    }

    public Integer getRequestInstCd() {
        return requestInstCd;
    }

    public void validate() {
        final CommUserRequestUserInfoDto info = getUserInfo();
        if (info == null) throw new CustomException("사용자 정보가 없습니다.");
//        기본 정보
        if (StringUtils.isBlank(info.getUserId())) throw new CustomException("사용자 아이디를 입력하세요.");
        if (StringUtils.isBlank(info.getUserName())) throw new CustomException("사용자 이름을 입력하세요.");
        if (StringUtils.isBlank(info.getUseYn())) throw new CustomException("사용 여부를 선택하세요.");
        if (StringUtils.isBlank(info.getSmsYn())) throw new CustomException("SMS  수신 여부를 선택하세요.");
        if (StringUtils.isBlank(info.getIpAddr())) throw new CustomException("로그인 IP를 입력하세요.");
//        연락처 정보
        if (StringUtils.isBlank(info.getMoblPhnNo())) throw new CustomException("휴대폰 번호를 입력하세요.");
        if (StringUtils.isBlank(info.getEmailAddr())) throw new CustomException("이메일 주소를 입력하세요.");
//        권한 설정
        if (StringUtils.isBlank(info.getAuthMain())) throw new CustomException("메인 권한을 선택하세요.");
        if (StringUtils.isBlank(info.getAuthSub())) throw new CustomException("서브 권한을 선택하세요.");
//        사유
        if(StringUtils.isBlank(getRequestReason())) throw new CustomException("사유를 입력하세요.");
    }
}
