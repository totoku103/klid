/**
 * Program Name	: WebDashSidoServiceImpl.java
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
package com.klid.webapp.webdash.sido.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.sido.persistence.WebDashSidoMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;

@Service("webDashSidoService")
public class WebDashSidoServiceImpl extends MsgService implements WebDashSidoService {

	@Resource(name = "webDashSidoMapper")
	private WebDashSidoMapper mapper;

	/** 공지사항리스트 */
	@Override
	public ReturnData getNoticeList(Criterion criterion) {
		return new ReturnData(mapper.getNoticeList(criterion.getCondition()));
	}

	/** 보안리스트 */
	@Override
	public ReturnData getSecuList(Criterion criterion) {
		return new ReturnData(mapper.getSecuList(criterion.getCondition()));
	}

	/**수동차단 */
	@Override
	public ReturnData getRegionStatusManual(Criterion criterion) {
		return new ReturnData(mapper.getRegionStatusManual(criterion.getCondition()));
	}

	/**위변조 */
	@Override
	public ReturnData getForgeryCheck(Criterion criterion) {
		return new ReturnData(mapper.getForgeryCheck(criterion.getCondition()));
	}

	/**헬스체크 */
	@Override
	public ReturnData getHcCheck(Criterion criterion) {
		return new ReturnData(mapper.getHcCheck(criterion.getCondition()));
	}

	/**처리현황 */
	@Override
	public ReturnData getProcess(Criterion criterion) {
		return new ReturnData(mapper.getProcess(criterion.getCondition()));
	}

	/**시도리스트 */
	@Override
	public ReturnData getSidoList(Criterion criterion) {
		return new ReturnData(mapper.getSidoList(criterion.getCondition()));
	}
}
