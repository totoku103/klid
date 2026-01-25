package com.klid.webapp.api.user.information.dto;

import com.klid.webapp.common.dto.UserDto;

public record UserInformationResDto(
        String userId,
        String userName,
        int instCd,
        String instNm,
        int pntInstCd,
        String pntInstNm,
        String grade,
        String emailAddr,
        String moblPhnNo,
        String offcTelNo,
        String offcFaxNo,
        String homeTelNo,
        String smsYn,
        String emailYn,
        String centerUserYn,
        String regDt,
        String roleCtrs,
        String roleIics,
        String roleRms,
        String roleEws,
        String roleSd,
        String authMain,
        String authSub,
        int authGrpNo,
        String authGrpName,
        BoardAuthDto boardAuth
) {
    public static UserInformationResDto from(final UserDto user) {
        if (user == null) {
            return null;
        }

        return new UserInformationResDto(
                user.getUserId(),
                user.getUserName(),
                user.getInstCd(),
                user.getInstNm(),
                user.getPntInstCd(),
                user.getPntInstNm(),
                user.getGrade(),
                user.getEmailAddr(),
                user.getMoblPhnNo(),
                user.getOffcTelNo(),
                user.getOffcFaxNo(),
                user.getHomeTelNo(),
                user.getSmsYn(),
                user.getEmailYn(),
                user.getCenterUserYn(),
                user.getRegDt(),
                user.getRoleCtrs(),
                user.getRoleIics(),
                user.getRoleRms(),
                user.getRoleEws(),
                user.getRoleSd(),
                user.getAuthMain(),
                user.getAuthSub(),
                user.getAuthGrpNo(),
                user.getAuthGrpName(),
                BoardAuthDto.from(user)
        );
    }
}
