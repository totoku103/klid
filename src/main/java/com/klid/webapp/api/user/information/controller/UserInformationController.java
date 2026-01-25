package com.klid.webapp.api.user.information.controller;

import com.klid.webapp.api.user.information.dto.UserInformationResDto;
import com.klid.webapp.api.user.information.service.UserInformationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/information")
public class UserInformationController {

    private final UserInformationService userInformationService;

    public UserInformationController(final UserInformationService userInformationService) {
        this.userInformationService = userInformationService;
    }

    @GetMapping
    public ResponseEntity<UserInformationResDto> getCurrentUserInformation() {
        final UserInformationResDto userInformation = userInformationService.getCurrentUserInformation();
        return ResponseEntity.ok(userInformation);
    }
}
