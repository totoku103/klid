package com.klid.webapp.api.user.information.dto;

import com.klid.webapp.common.dto.UserDto;

public record BoardAuthDto(
        String roleTbz01,
        String roleTbz02,
        String roleTbz03,
        String roleTbz04,
        String roleTbz05,
        String roleTbz06,
        String roleNot01,
        String roleNot02,
        String roleNot03,
        String roleNot04,
        String roleRes01,
        String roleRes02,
        String roleRes03,
        String roleRes04,
        String roleSha01,
        String roleSha02,
        String roleSha03,
        String roleSha04,
        String roleQna01,
        String roleQna02,
        String roleQna03,
        String roleQna04
) {
    public static BoardAuthDto from(final UserDto user) {
        return new BoardAuthDto(
                user.getRoleTbz01(),
                user.getRoleTbz02(),
                user.getRoleTbz03(),
                user.getRoleTbz04(),
                user.getRoleTbz05(),
                user.getRoleTbz06(),
                user.getRoleNot01(),
                user.getRoleNot02(),
                user.getRoleNot03(),
                user.getRoleNot04(),
                user.getRoleRes01(),
                user.getRoleRes02(),
                user.getRoleRes03(),
                user.getRoleRes04(),
                user.getRoleSha01(),
                user.getRoleSha02(),
                user.getRoleSha03(),
                user.getRoleSha04(),
                user.getRoleQna01(),
                user.getRoleQna02(),
                user.getRoleQna03(),
                user.getRoleQna04()
        );
    }
}
