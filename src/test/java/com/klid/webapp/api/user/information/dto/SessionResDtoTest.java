package com.klid.webapp.api.user.information.dto;

import com.klid.user.session.dto.UserSessionResDto;
import com.klid.webapp.common.dto.UserDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserSessionResDtoTest {

    @Nested
    @DisplayName("from() 팩토리 메서드")
    class FromFactoryMethod {

        @Test
        @DisplayName("UserDto가 null이면 null을 반환한다")
        void returnsNullWhenUserDtoIsNull() {
            UserSessionResDto result = UserSessionResDto.from(null);

            assertNull(result);
        }

        @Test
        @DisplayName("UserDto의 기본 정보가 정상적으로 매핑된다")
        void mapsBasicInformationCorrectly() {
            UserDto userDto = createTestUserDto();

            UserSessionResDto result = UserSessionResDto.from(userDto);

            assertAll(
                    () -> assertEquals("testUser", result.userId()),
                    () -> assertEquals("홍길동", result.userName()),
                    () -> assertEquals(100, result.instCd()),
                    () -> assertEquals("테스트기관", result.instNm()),
                    () -> assertEquals("과장", result.grade()),
                    () -> assertEquals("test@example.com", result.emailAddr())
            );
        }

        @Test
        @DisplayName("UserDto의 권한 정보가 정상적으로 매핑된다")
        void mapsRoleInformationCorrectly() {
            UserDto userDto = createTestUserDto();

            UserSessionResDto result = UserSessionResDto.from(userDto);

            assertAll(
                    () -> assertEquals("10", result.roleCtrs()),
                    () -> assertEquals("20", result.roleIics()),
                    () -> assertEquals("A", result.authMain()),
                    () -> assertEquals("01", result.authSub())
            );
        }

        @Test
        @DisplayName("BoardAuthDto가 정상적으로 생성된다")
        void createsBoardAuthDtoCorrectly() {
            UserDto userDto = createTestUserDto();

            UserSessionResDto result = UserSessionResDto.from(userDto);

            assertNotNull(result.boardAuth());
            assertEquals("Y", result.boardAuth().roleTbz01());
            assertEquals("N", result.boardAuth().roleNot01());
        }
    }

    @Nested
    @DisplayName("Record 동등성")
    class RecordEquality {

        @Test
        @DisplayName("같은 값을 가진 Record는 동등하다")
        void recordsWithSameValuesAreEqual() {
            UserDto userDto = createTestUserDto();

            UserSessionResDto dto1 = UserSessionResDto.from(userDto);
            UserSessionResDto dto2 = UserSessionResDto.from(userDto);

            assertEquals(dto1, dto2);
            assertEquals(dto1.hashCode(), dto2.hashCode());
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
        return userDto;
    }
}
