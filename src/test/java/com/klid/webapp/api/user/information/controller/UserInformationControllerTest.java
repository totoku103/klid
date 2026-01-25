package com.klid.webapp.api.user.information.controller;

import com.klid.webapp.api.user.information.dto.UserInformationResDto;
import com.klid.webapp.api.user.information.service.UserInformationService;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.dto.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class UserInformationControllerTest {

    @Mock
    private UserInformationService userInformationService;

    private UserInformationController controller;

    @BeforeEach
    void setUp() {
        controller = new UserInformationController(userInformationService);
    }

    @Nested
    @DisplayName("getCurrentUserInformation()")
    class GetCurrentUserInformation {

        @Test
        @DisplayName("사용자 정보가 있으면 200 OK와 함께 사용자 정보를 반환한다")
        void returnsUserInformationWhenUserExists() {
            UserInformationResDto responseDto = createTestResponseDto();
            given(userInformationService.getCurrentUserInformation()).willReturn(responseDto);

            ResponseEntity<UserInformationResDto> response = controller.getCurrentUserInformation();

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertNotNull(response.getBody());
            assertEquals("testUser", response.getBody().userId());
            assertEquals("홍길동", response.getBody().userName());
            assertEquals("테스트기관", response.getBody().instNm());
        }

        @Test
        @DisplayName("반환된 응답에 권한 정보가 포함된다")
        void responseIncludesRoleInformation() {
            UserInformationResDto responseDto = createTestResponseDto();
            given(userInformationService.getCurrentUserInformation()).willReturn(responseDto);

            ResponseEntity<UserInformationResDto> response = controller.getCurrentUserInformation();

            assertNotNull(response.getBody());
            assertEquals("10", response.getBody().roleCtrs());
            assertEquals("20", response.getBody().roleIics());
        }

        @Test
        @DisplayName("반환된 응답에 게시판 권한 정보가 포함된다")
        void responseIncludesBoardAuthInformation() {
            UserInformationResDto responseDto = createTestResponseDto();
            given(userInformationService.getCurrentUserInformation()).willReturn(responseDto);

            ResponseEntity<UserInformationResDto> response = controller.getCurrentUserInformation();

            assertNotNull(response.getBody());
            assertNotNull(response.getBody().boardAuth());
            assertEquals("Y", response.getBody().boardAuth().roleTbz01());
        }

        @Test
        @DisplayName("세션에 사용자 정보가 없으면 예외가 발생한다")
        void throwsExceptionWhenNoUserInSession() {
            given(userInformationService.getCurrentUserInformation())
                    .willThrow(new CustomException("로그인 정보가 없습니다."));

            assertThrows(CustomException.class, () -> controller.getCurrentUserInformation());
        }
    }

    private UserInformationResDto createTestResponseDto() {
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
        userDto.setOffcFaxNo("0212345679");
        userDto.setHomeTelNo("0312345678");
        userDto.setSmsYn("Y");
        userDto.setEmailYn("Y");
        userDto.setCenterUserYn("N");
        userDto.setRegDt("2024-01-01");
        userDto.setRoleCtrs("10");
        userDto.setRoleIics("20");
        userDto.setRoleRms("30");
        userDto.setRoleEws("40");
        userDto.setRoleSd("50");
        userDto.setAuthMain("A");
        userDto.setAuthSub("01");
        userDto.setAuthGrpNo(1);
        userDto.setAuthGrpName("관리자그룹");
        userDto.setRoleTbz01("Y");
        userDto.setRoleNot01("N");
        return UserInformationResDto.from(userDto);
    }
}
