package com.klid.webapp.common.login.persistence;


import com.klid.webapp.common.dto.UserDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface LoginMapper {

    List<UserDto> selectLogin(Map<String, Object> paramMap);
    
    UserDto selectUserInfo(Map<String, Object> paramMap);

    List<UserDto> selectUserInfoByUserNameAndOfficeNumber(@Param("userName") String userName,
                                                                  @Param("officeNumber") String officeNumber);

    void insertUserLog(Map<String, Object> paramMap);

    void editOtpKey(Map<String, Object> paramMap);
}
