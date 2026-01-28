package com.klid.api.menu;

import com.klid.exception.NotFoundUserException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.menu.dto.PageDto;
import com.klid.webapp.common.service.PrimaryCtrsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;


@Slf4j
@RestController("ApiMenuController")
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final PrimaryCtrsService primaryCtrsService;

    @GetMapping
    public ResponseEntity<List<PageDto>> getMenu() throws PrimaryCtrsService.NotFoundDataByIdException {
        final UserDto user = SessionManager.getUser();
        if (user == null) {
            throw new NotFoundUserException();
        }
        final String id = Objects.requireNonNull(user).getUserId();
        log.info("get menu id: {}", id);

        final UserDto sessionUser = primaryCtrsService.getUserInfoByOnlyId(id);
        final List<PageDto> simpleUserMenu = primaryCtrsService.getSimpleUserMenu(sessionUser);
        return ResponseEntity.ok(simpleUserMenu);
    }
}
