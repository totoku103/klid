/**
 * Program Name	: WebDashMoisServiceImpl.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 22.
 * 
 * Programmer Name 	:  kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.webdash.mois.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.adminControl.dto.InciCntDto;
import com.klid.webapp.webdash.mois.persistence.WebDashMoisMapper;
import org.apache.commons.collections.CollectionUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.*;

@Service("webDashMoisService")
public class WebDashMoisServiceImpl extends MsgService implements WebDashMoisService {

	@Resource(name = "webDashMoisMapper")
	private WebDashMoisMapper mapper;

	/** 사이버 위기경보 */
	@Override
	public ReturnData getThreatNow(Criterion criterion){
		return new ReturnData(mapper.getThreatNow(criterion.getCondition()));
	}

	/** 홈페이지 모니터링 (중앙행정기관)  */
	@Override
	public ReturnData getHmHcUrlCenter(Criterion criterion) {
		return new ReturnData(mapper.getHmHcUrlCenter(criterion.getCondition()));
	}

	/** 홈페이지 모니터링 (지방자치단체)  */
	@Override
	public ReturnData getHmHcUrlRegion(Criterion criterion) {
		return new ReturnData(mapper.getHmHcUrlRegion(criterion.getCondition()));
	}

	/** 홈페이지 위변조 (지방자치단체)  */
	@Override
	public ReturnData getForgeryRegion(Criterion criterion)  {
		return new ReturnData(mapper.getForgeryRegion(criterion.getCondition()));
	}

    /**지방자치단체 사이버위협 대응현황 (지도표시)  */
    @Override
    public ReturnData getRegionStatus(Criterion criterion)  {
        return new ReturnData(mapper.getRegionStatus(criterion.getCondition()));
    }

    /**지방자치단체 사이버위협 대응현황 (자동차단)  */
    @Override
    public ReturnData getRegionStatusAuto(Criterion criterion) {
		List<String> dbList = mapper.getRegionStatusAuto(criterion.getCondition());

		int sum = 0;

		if(!CollectionUtils.isEmpty(dbList)) {
			Map<String, Integer> map = new HashMap<>();
			for (String sumJson : dbList) {
				JSONObject jsonObj = new JSONObject(sumJson);
				Iterator<String> keys = jsonObj.keys();
				while (keys.hasNext()) {
					String key = keys.next();
					int value = jsonObj.getInt(key);
					sum =sum + value;
				}
			}
		}

			return new ReturnData(sum);
    }

    /**지방자치단체 사이버위협 대응현황 (수동차단)  */
    @Override
    public ReturnData getRegionStatusManual(Criterion criterion)  {
        return new ReturnData(mapper.getRegionStatusManual(criterion.getCondition()));
    }

	/** 행안부 리스트 받아오기 */
	@Override
	public ReturnData getDashConfigList(Criterion criterion)  {
		return new ReturnData(mapper.getDashConfigList(criterion.getCondition()));
	}

	/**행안부 중앙,지방 차트 합계 */
	@Override
	public ReturnData getDashChartSum(Criterion criterion) {
		return new ReturnData(mapper.getDashChartSum(criterion.getCondition()));
	}

}
