package com.klid.user.session.service;

import com.klid.user.session.dto.UserSessionResDto;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserSessionService {

    public UserSessionResDto getCurrentUserInformation() {
        final UserDto user = SessionManager.getUser();

        if (user == null) {
            throw new CustomException("로그인 정보가 없습니다.");
        }

        return UserSessionResDto.from(user);
    }
}
