package com.klid.api.session.controller;

import com.klid.api.session.dto.SessionUserSimpleInformationDTO;
import com.klid.api.session.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/information")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(final SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public ResponseEntity<SessionUserSimpleInformationDTO> getSessionUserSimpleInformation() {
        final SessionUserSimpleInformationDTO userInformation = sessionService.getSessionUserSimpleInformation();
        return ResponseEntity.ok(userInformation);
    }
}
