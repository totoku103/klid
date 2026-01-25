package com.klid.webapp.main.env.userManagement.persistence;

import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import com.klid.webapp.main.env.userManagement.dto.CommUserDto;
import com.klid.webapp.main.env.userManagement.dto.CommUserRequestUserInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserManagementMapper {

    CommUserDto selectCommUserBySeq(@Param("seq") int commUserSeq);

    int insertCommUserRequest(@Param("userInfo") CommUserRequestUserInfo userInfo,
                              @Param("requestUserSeq") Integer requestUserSeq,
                              @Param("requestInstCd") Integer requestInstCd,
                              @Param("requestType") UserManagementRequestTypes requestType,
                              @Param("requestReason") String requestReason,
                              @Param("requestProcessState") UserManagementProcessTypes requestProcessState);
}
