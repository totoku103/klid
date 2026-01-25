package com.klid.webapp.api.user.information.service;

import com.klid.webapp.api.user.information.dto.UserInformationResDto;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mockStatic;

@ExtendWith(MockitoExtension.class)
class UserInformationServiceImplTest {

    private final UserInformationServiceImpl service = new UserInformationServiceImpl();

    @Nested
    @DisplayName("getCurrentUserInformation()")
    class GetCurrentUserInformation {

        @Test
        @DisplayName("세션에 사용자가 없으면 CustomException을 던진다")
        void throwsExceptionWhenNoUserInSession() {
            try (MockedStatic<SessionManager> sessionManager = mockStatic(SessionManager.class)) {
                sessionManager.when(SessionManager::getUser).thenReturn(null);

                CustomException exception = assertThrows(
                        CustomException.class,
                        () -> service.getCurrentUserInformation()
                );

                assertEquals("로그인 정보가 없습니다.", exception.getMessage());
            }
        }

        @Test
        @DisplayName("세션에 사용자가 있으면 UserInformationResDto를 반환한다")
        void returnsUserInformationWhenUserExistsInSession() {
            UserDto userDto = createTestUserDto();

            try (MockedStatic<SessionManager> sessionManager = mockStatic(SessionManager.class)) {
                sessionManager.when(SessionManager::getUser).thenReturn(userDto);

                UserInformationResDto result = service.getCurrentUserInformation();

                assertNotNull(result);
                assertEquals("testUser", result.userId());
                assertEquals("홍길동", result.userName());
            }
        }

        @Test
        @DisplayName("반환된 DTO에 모든 기본 정보가 포함된다")
        void returnedDtoContainsAllBasicInformation() {
            UserDto userDto = createTestUserDto();

            try (MockedStatic<SessionManager> sessionManager = mockStatic(SessionManager.class)) {
                sessionManager.when(SessionManager::getUser).thenReturn(userDto);

                UserInformationResDto result = service.getCurrentUserInformation();

                assertAll(
                        () -> assertEquals("testUser", result.userId()),
                        () -> assertEquals("홍길동", result.userName()),
                        () -> assertEquals(100, result.instCd()),
                        () -> assertEquals("테스트기관", result.instNm()),
                        () -> assertEquals("test@example.com", result.emailAddr())
                );
            }
        }

        @Test
        @DisplayName("반환된 DTO에 권한 정보가 포함된다")
        void returnedDtoContainsRoleInformation() {
            UserDto userDto = createTestUserDto();

            try (MockedStatic<SessionManager> sessionManager = mockStatic(SessionManager.class)) {
                sessionManager.when(SessionManager::getUser).thenReturn(userDto);

                UserInformationResDto result = service.getCurrentUserInformation();

                assertAll(
                        () -> assertEquals("10", result.roleCtrs()),
                        () -> assertEquals("20", result.roleIics()),
                        () -> assertNotNull(result.boardAuth())
                );
            }
        }
    }

    private UserDto createTestUserDto() {
        UserDto userDto = new UserDto();
        userDto.setUserId("testUser");
        userDto.setUserName("홍길동");
        userDto.setInstCd(100);
        userDto.setInstNm("테스트기관");
        userDto.setPntInstCd(10);
        userDto.setPntInstNm("상위기관");
        userDto.setGrade("과장");
        userDto.setEmailAddr("test@example.com");
        userDto.setMoblPhnNo("01012345678");
        userDto.setOffcTelNo("0212345678");
        userDto.setSmsYn("Y");
        userDto.setEmailYn("Y");
        userDto.setCenterUserYn("N");
        userDto.setRoleCtrs("10");
        userDto.setRoleIics("20");
        userDto.setAuthMain("A");
        userDto.setAuthSub("01");
        return userDto;
    }
}
