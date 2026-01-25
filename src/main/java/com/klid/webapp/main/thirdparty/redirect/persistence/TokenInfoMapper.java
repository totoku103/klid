package com.klid.webapp.main.thirdparty.redirect.persistence;

import com.klid.webapp.main.thirdparty.redirect.dto.SimpleSaveTokenInfoDto;
import com.klid.webapp.main.thirdparty.redirect.dto.SimpleTokenInfoDto;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenInfoMapper {
    int insertToken(SimpleSaveTokenInfoDto dto);

    SimpleTokenInfoDto selectActiveAndNotUsedTokenByToken(String token);

    int updateOnlyExpiredByToken(@Param("token") String token);

    int updateExpiredAndUsedByToken(@Param("token") String token);
}
