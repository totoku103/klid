package com.klid.user.session.controller;

import com.klid.user.session.dto.UserSessionResDto;
import com.klid.user.session.service.UserSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/information")
public class UserSessionController {

    private final UserSessionService userSessionService;

    public UserSessionController(final UserSessionService userSessionService) {
        this.userSessionService = userSessionService;
    }

    @GetMapping
    public ResponseEntity<UserSessionResDto> getCurrentUserInformation() {
        final UserSessionResDto userInformation = userSessionService.getCurrentUserInformation();
        return ResponseEntity.ok(userInformation);
    }
}
