package com.klid.webapp.main.controller.env;

import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import com.klid.webapp.main.env.userManagementHistory.dto.*;
import com.klid.webapp.main.env.userManagementHistory.service.UserManagementHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/main/env/user-management/history")
public class UserManagementHistoryController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final UserManagementHistoryService userManagementHistoryService;

    public UserManagementHistoryController(final UserManagementHistoryService userManagementHistoryService) {
        this.userManagementHistoryService = userManagementHistoryService;
    }

    public static void checkAuthenticate() {
        final UserDto user = SessionManager.getUser();
        if (user == null) throw new CustomException("접속자 정보를 찾을 수 없습니다.");

//        메인권한 관리자
        final boolean isAdmin = "AUTH_MAIN_1".equalsIgnoreCase(user.getAuthMain());
//        메인권한 개발원
        final boolean isKlid = "AUTH_MAIN_2".equalsIgnoreCase(user.getAuthMain());
        final boolean isOperator = "AUTH_SUB_3".equalsIgnoreCase(user.getAuthSub());

        if (!(isAdmin || (isKlid && isOperator))) {
            throw new CustomException("요청 권한이 없습니다.");
        }
    }

    @PostMapping("/grid")
    public ResponseEntity<List<HistoryGridResDto>> getGridList(UserManagementHistoryGridSearchDto searchDto) {
        final List<HistoryGridResDto> historyGridList = userManagementHistoryService.getHistoryGridList(searchDto);
        return ResponseEntity.ok(historyGridList);
    }


    @PostMapping("/compare/user-info")
    public ResponseEntity getCompareUserInfo(@RequestParam Integer commUserSeq, @RequestParam Integer commUserRequestSeq) {
        final UserDto currentUser = SessionManager.getUser();
        if (currentUser == null) throw new CustomException("사용자 정보를 찾을수 없습니다.");

        log.info(String.format("상태 변경: commUserRequestSeq=%d, 요청 -> 확인중", commUserRequestSeq));

        final LatestCommUserRequestProcessStateDto latestProcessState = userManagementHistoryService.getLatestProcessState(commUserRequestSeq);
        if ("AUTH_MAIN_1".equalsIgnoreCase(currentUser.getAuthMain())) {
            if (UserManagementProcessTypes.REQUEST.equals(latestProcessState.getLatestProcessState())) {
                userManagementHistoryService.saveRequestReviewState(commUserRequestSeq, currentUser.getSeq(), currentUser.getInstCd());
            }
        }

        final List<CompareUserInfoResDto> compareUserInfo = userManagementHistoryService.getCompareUserInfo(commUserSeq, commUserRequestSeq);
        return ResponseEntity.ok(compareUserInfo);
    }

    @PostMapping("/request/cancel")
    public ResponseEntity<String> cancelRequest(@RequestBody RequestCancelReqDto reqDto) {
        final LatestCommUserRequestProcessStateDto latestProcessState = userManagementHistoryService.getLatestProcessState(reqDto.getCommUserRequestSeq());
        if (!UserManagementProcessTypes.REQUEST.equals(latestProcessState.getLatestProcessState())) {
            throw new CustomException("취소 할 수 없는 처리 상태입니다.");
        }

        userManagementHistoryService.editRequestProcessState(reqDto.getCommUserRequestSeq(),
                reqDto.getRequestReason(),
                reqDto.getRequestUserSeq(),
                reqDto.getRequestInstCd(),
                UserManagementProcessTypes.REQUEST,
                UserManagementProcessTypes.CANCELLATION_REQUEST);

        return ResponseEntity.ok("success");
    }

    @PostMapping("/request/approve")
    public ResponseEntity<String> approveUserManagementHistory(@RequestParam Integer commUserRequestSeq,
                                                               @RequestParam String approveReason,
                                                               @RequestParam UserManagementProcessTypes approveType) {
        final LatestCommUserRequestProcessStateDto latestProcessState = userManagementHistoryService.getLatestProcessState(commUserRequestSeq);

        switch (latestProcessState.getLatestProcessState()) {
            case CANCELLATION_REQUEST:
                throw new CustomException("취소된 요청입니다.");
            case APPROVAL:
                throw new CustomException("이미 승인된 요청입니다.");
            case REJECTION:
                throw new CustomException("이미 반려된 요청입니다.");
            case REVIEWING:
            case REQUEST:
                break;
        }

        userManagementHistoryService.editApproveRequest(commUserRequestSeq, approveReason, approveType);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/download/excel")
    public ResponseEntity<String> downloadExcel(@RequestParam String fileName) {
        return null;
    }

    @GetMapping("/check/user-id/{userId}")
    public ResponseEntity<Map<String, Boolean>> checkUser(@PathVariable String userId) {
        final UserManagementProcessTypes latestProcessType = userManagementHistoryService.getStandByRegUserId(userId);
        if (UserManagementProcessTypes.REQUEST.equals(latestProcessType)) {
            throw new CustomException("등록을 위해 요청 중인 아이디입니다.");
        }
        if (UserManagementProcessTypes.REVIEWING.equals(latestProcessType)) {
            throw new CustomException("등록을 위해 검토 중인 아이디입니다.");
        }
        if (UserManagementProcessTypes.APPROVAL.equals(latestProcessType)) {
            throw new CustomException("이미 사용중인 아이디입니다.");
        }
        return ResponseEntity.ok(new HashMap<String, Boolean>() {{
            put("isAvailableId", true);
        }});
    }
}
