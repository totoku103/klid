package com.klid.webapp.api.user.information.service;

import com.klid.webapp.api.user.information.dto.UserInformationResDto;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserInformationServiceImpl implements UserInformationService {

    @Override
    public UserInformationResDto getCurrentUserInformation() {
        final UserDto user = SessionManager.getUser();

        if (user == null) {
            throw new CustomException("로그인 정보가 없습니다.");
        }

        return UserInformationResDto.from(user);
    }
}
