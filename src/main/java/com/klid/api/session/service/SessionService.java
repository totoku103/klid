package com.klid.api.session.service;

import com.klid.api.session.dto.SessionUserSimpleInformationDTO;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    public SessionUserSimpleInformationDTO getSessionUserSimpleInformation() {
        final UserDto user = SessionManager.getUser();

        if (user == null) {
            throw new CustomException("로그인 정보가 없습니다.");
        }

        return SessionUserSimpleInformationDTO.from(user);
    }
}
