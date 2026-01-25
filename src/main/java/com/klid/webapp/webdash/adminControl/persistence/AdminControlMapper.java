package com.klid.webapp.webdash.adminControl.persistence;

import com.klid.webapp.webdash.adminControl.dto.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("webdash.adminControlMapper")
public interface AdminControlMapper {

    public IncidentDto selectIncidentStatus(Map<String, Object> paramMap);

    public List<String> selectInciCnt(Map<String, Object> paramMap);

    public List<TbzledgeCntDto> selectTbzledgeCnt(Map<String, Object> paramMap);

    public List<String> selectLocalInciCnt(Map<String, Object> paramMap);

    public List<LocalStatusDto> selectLocalStatus(Map<String, Object> paramMap);

    public UrlStatusDto selectUrlStatus(Map<String, Object> paramMap);

    public List<SysErrorDto> selectSysErrorStatus(Map<String, Object> paramMap);

    public List<String> selectInciTypeCnt(Map<String, Object> paramMap);

}
