package com.klid.webapp.main.thirdparty.redirect.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.main.thirdparty.redirect.dto.SimpleSaveTokenInfoDto;
import com.klid.webapp.main.thirdparty.redirect.dto.SimpleTokenInfoDto;
import com.klid.webapp.main.thirdparty.redirect.persistence.TokenInfoMapper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TokenInfoService {
    private final TokenInfoMapper tokenInfoMapper;

    public TokenInfoService(final TokenInfoMapper tokenInfoMapper) {
        this.tokenInfoMapper = tokenInfoMapper;
    }

    public SimpleTokenInfoDto getTokenInfo(String token) {
        return tokenInfoMapper.selectActiveAndNotUsedTokenByToken(token);
    }

    public void saveToken(SimpleSaveTokenInfoDto dto) {
        final int i = tokenInfoMapper.insertToken(dto);
        if (i != 1) {
            final String message = "Database Insert Failed. ";
            log.error(message + dto);
            throw new RuntimeException(message);
        }
    }

    public void editOnlyExpiredByToken(String token) {
        final int i = tokenInfoMapper.updateOnlyExpiredByToken(token);
        if (i != 1) {
            final String message = "Database Update Failed. ";
            log.error(message + token);
            throw new RuntimeException(message);
        }
    }

    public void editExpiredAndUsedByToken(String token) {
        final int i = tokenInfoMapper.updateExpiredAndUsedByToken(token);
        if (i != 1) {
            final String message = "editExpiredAndUsedByToken Database Update Failed. ";
            log.error(message + token);
            throw new RuntimeException(message);
        }
    }
}
