package com.klid.user.session.dto;

import com.klid.webapp.common.dto.UserDto;

/**
 * 사용자 정보 응답 DTO
 *
 * <p>사용자 기본 정보와 게시판 권한, 인증 정보를 포함합니다.</p>
 *
 * @param userId    사용자 ID
 * @param userName  사용자 이름
 * @param instCd    기관 코드
 * @param instNm    기관 이름
 * @param boardRole 게시판 권한 정보
 * @param authRole  인증/권한 그룹 정보
 */
public record UserSessionResDto(
        String userId,
        String userName,
        int instCd,
        String instNm,
        BoardRole boardRole,
        AuthRole authRole
) {
    public static UserSessionResDto from(final UserDto user) {
        if (user == null) {
            return null;
        }

        return new UserSessionResDto(
                user.getUserId(),
                user.getUserName(),
                user.getInstCd(),
                user.getInstNm(),
                BoardRole.from(user),
                AuthRole.from(user)
        );
    }

    /**
     * 게시판 권한 정보
     *
     * <p>각 게시판 카테고리별 권한을 관리합니다.</p>
     *
     * <h3>카테고리 설명</h3>
     * <ul>
     *   <li><b>tbz</b>: 사고신고/침해사고 (accidentApplyList, pAccidentDetail)</li>
     *   <li><b>notice</b>: 공지사항 (noticeBoardList, moisBoardList, pNoticeBoardContents)</li>
     *   <li><b>resource</b>: 자료실 (resourceBoardList, pResourceBoardContents, pMoisBoardContents)</li>
     *   <li><b>share</b>: 정보공유 (shareBoardList, pShareBoardContents)</li>
     *   <li><b>qna</b>: Q&amp;A (qnaBoardList, pQnaBoardContents)</li>
     * </ul>
     *
     * @see CategoryRole
     */
    public record BoardRole(
            CategoryRole tbz,
            CategoryRole notice,
            CategoryRole resource,
            CategoryRole share,
            CategoryRole qna
    ) {
        public static BoardRole from(final UserDto user) {
            return new BoardRole(
                    new CategoryRole(
                            user.getRoleTbz01(),
                            user.getRoleTbz02(),
                            user.getRoleTbz03(),
                            user.getRoleTbz04(),
                            user.getRoleTbz05(),
                            user.getRoleTbz06()
                    ),
                    new CategoryRole(
                            user.getRoleNot01(),
                            user.getRoleNot02(),
                            user.getRoleNot03(),
                            user.getRoleNot04(),
                            user.getRoleNot05(),
                            user.getRoleNot06()
                    ),
                    new CategoryRole(
                            user.getRoleRes01(),
                            user.getRoleRes02(),
                            user.getRoleRes03(),
                            user.getRoleRes04(),
                            user.getRoleRes05(),
                            user.getRoleRes06()
                    ),
                    new CategoryRole(
                            user.getRoleSha01(),
                            user.getRoleSha02(),
                            user.getRoleSha03(),
                            user.getRoleSha04(),
                            user.getRoleSha05(),
                            user.getRoleSha06()
                    ),
                    new CategoryRole(
                            user.getRoleQna01(),
                            user.getRoleQna02(),
                            user.getRoleQna03(),
                            user.getRoleQna04(),
                            user.getRoleQna05(),
                            user.getRoleQna06()
                    )
            );
        }

        /**
         * 게시판 카테고리별 세부 권한 (role01~role06)
         *
         * <h3>권한 의미 (카테고리별 상이)</h3>
         *
         * <h4>TBZ (사고신고/침해사고)</h4>
         * <ul>
         *   <li><b>role01</b>: 조회 권한</li>
         *   <li><b>role02</b>: 등록 권한</li>
         *   <li><b>role03</b>: (미사용)</li>
         *   <li><b>role04</b>: (미사용)</li>
         *   <li><b>role05</b>: 승인요청 권한</li>
         *   <li><b>role06</b>: 승인 권한</li>
         * </ul>
         *
         * <h4>Notice, Resource, Share (공지사항, 자료실, 정보공유)</h4>
         * <ul>
         *   <li><b>role01</b>: 조회 권한</li>
         *   <li><b>role02</b>: 수정 권한</li>
         *   <li><b>role03</b>: 삭제 권한</li>
         *   <li><b>role04~06</b>: (미사용)</li>
         * </ul>
         *
         * <h4>QnA (질문답변)</h4>
         * <ul>
         *   <li><b>role01</b>: 조회 권한</li>
         *   <li><b>role02</b>: 수정 권한</li>
         *   <li><b>role03</b>: 삭제 권한</li>
         *   <li><b>role04</b>: 답변 권한</li>
         *   <li><b>role05~06</b>: (미사용)</li>
         * </ul>
         *
         * @param role01 권한 01 (Y/N)
         * @param role02 권한 02 (Y/N)
         * @param role03 권한 03 (Y/N)
         * @param role04 권한 04 (Y/N)
         * @param role05 권한 05 (Y/N)
         * @param role06 권한 06 (Y/N)
         */
        public record CategoryRole(
                String role01,
                String role02,
                String role03,
                String role04,
                String role05,
                String role06
        ) {
        }
    }

    /**
     * 인증/권한 그룹 정보
     *
     * @param main    메인 권한
     * @param sub     서브 권한
     */
    public record AuthRole(
            String main,
            String sub
    ) {
        public static AuthRole from(final UserDto user) {
            return new AuthRole(
                    user.getAuthMain(),
                    user.getAuthSub()
            );
        }
    }
}
