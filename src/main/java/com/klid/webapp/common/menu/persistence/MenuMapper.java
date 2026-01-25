
package com.klid.webapp.common.menu.persistence;

import com.klid.webapp.common.menu.dto.LayoutMenuCondDto;
import com.klid.webapp.common.menu.dto.LayoutMenuDto;
import com.klid.webapp.common.menu.dto.PageDto;
import com.klid.webapp.common.menu.dto.SimpleMenuDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface MenuMapper {

    List<SimpleMenuDTO> selectSimpleMenuList(Map<String, Object> param);

    List<SimpleMenuDTO> selectExcludeMenuList(String authGrpNo);

    /**
     * 계층적 메뉴 목록 조회
     *
     * @param authGrpNo 권한 그룹 번호 (제외할 메뉴 필터링에 사용)
     * @param auth      권한 타입 ("System", "Admin", 또는 일반 사용자)
     * @return 계층 구조의 페이지 목록 (Page > PageGroup > Menu)
     */
    List<PageDto> selectHierarchicalMenuList(@Param("authGrpNo") String authGrpNo,
                                             @Param("auth") String auth);

    List<LayoutMenuDto> selectLayoutMenuList(Map<String, Object> paramMap);

    List<LayoutMenuCondDto> selectLayoutMenuCondList(Map<String, Object> paramMap);

    void deleteExcludeMenuList(String authGrpNo);

    void insertExcludemenuList(Map<String, Object> param);
}
