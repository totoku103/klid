package com.klid.webapp.common.file.persistence;

import java.util.Map;

public interface FileDeleteMapper {

	int deleteFileInfo(Map<String, Object> paramMap);

	int deleteAccFileInfo(Map<String, Object> paramMap);
}
