package com.klid.webapp.main.env.userManagementHistory.persistence;

import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import com.klid.webapp.main.env.userManagementHistory.dto.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserManagementHistoryMapper {
    List<HistoryGridResDto> selectUserManagementHistoryGrid(@Param("requestUserSeq") Integer requestUserSeq,
                                                            @Param("searchDto") UserManagementHistoryGridSearchDto searchDto);

    CommUserRequestDto selectCommUserRequestBySeq(@Param("seq") int seq);

    int insertRequestReviewState(@Param("seq") int seq,
                                 @Param("requestUserSeq") int requestUserSeq,
                                 @Param("requestReason") String requestReason,
                                 @Param("requestInstCd") int requestInstCd,
                                 @Param("requestProcessState") UserManagementProcessTypes requestProcessState);

    UserManagementRequestTypes selectRequestTypeByCommUserRequestSeq(@Param("commUserRequestSeq") int commUserRequestSeq);

    LatestCommUserRequestProcessStateDto selectLatestRequestProcessState(@Param("commUserRequestSeq") int commUserRequestSeq);

    int copyUserRequestForStateChange(@Param("seq") int seq,
                                      @Param("requestUserSeq") int requestUserSeq,
                                      @Param("beforeRequestProcessState") UserManagementProcessTypes beforeRequestProcessState,
                                      @Param("requestReason") String requestReason,
                                      @Param("requestInstCd") int requestInstCd,
                                      @Param("requestProcessState") UserManagementProcessTypes requestProcessState);

    SimpleUserInfoDto selectCommUserRequestUserInfo(@Param("seq") int commUserRequestSeq);

    SimpleUserInfoDto selectCommUserUserInfo(@Param("seq") int commUserSeq);

    int insertApproveRejectRecord(@Param("commUserRequestSeq") int commUserRequestSeq,
                                  @Param("approveUserSeq") int approveUserSeq,
                                  @Param("approveInstCd") int approveInstCd,
                                  @Param("approveReason") String approveReason,
                                  @Param("requestProcessState") UserManagementProcessTypes requestProcessState);

    SimpleUserInfoDto selectCommUserByRequestSeq(@Param("commUserRequestSeq") int commUserRequestSeq);

    int updateCommUserFromRequest(@Param("dto") CommUserRequestDto commUserRequestSeq);

    int updateOtpSecretKeyIsNullByCommUserSeq(@Param("commUserSeq") int commUserSeq);

    int updateGpkiSerialNoIsNullByCommUserSeq(@Param("commUserSeq") int commUserSeq);

    int insertCommUserFromRequest(@Param("commUserRequestSeq") int commUserRequestSeq);

    int deleteCommUserFromRequest(@Param("seq") int seq);

    List<StandByRegUserIdDto> selectStandByRegUserIdList(@Param("userId") String userId);
}
