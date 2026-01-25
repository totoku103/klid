package com.klid.webapp.main.user.gpki.persistence;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GpkiMapper {
    String selectGpkiSerialNoByUserIdAndIpAddr(@Param("userId") String userId);

    int updateGpkiSerialNoByUserIdAndIpAddr(@Param("userId") String userId,
                                            @Param("ipAddr") String ipAddr,
                                            @Param("gpkiSerialNo") String gpkiSerialNo);

    int updateGpkiSerialNoByUserNameAndOfficeNumberAndPhoneNumber(@Param("userName") String userName,
                                                                  @Param("officeNumber") String officeNumber,
                                                                  @Param("phoneNumber") String phoneNumber,
                                                                  @Param("gpkiSerialNo") String gpkiSerialNo);
}
