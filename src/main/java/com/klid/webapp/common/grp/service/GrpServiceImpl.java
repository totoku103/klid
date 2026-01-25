/**
 * Program Name	: GrpService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 23.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.grp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.common.AppGlobal;
import com.klid.common.DBEnum;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.grp.persistence.GrpMapper;

/**
 * @author jung
 *
 */
@Service("grpService")
public class GrpServiceImpl extends MsgService implements GrpService {

	@Resource(name="grpMapper")
	private GrpMapper mapper;

	@Override
	public ReturnData getGrpDuplCnt(Criterion criterion) {
		return new ReturnData(mapper.selectGrpDuplCnt(criterion.getCondition()));
	}
	
	@Override
	public ReturnData getAuthGrpList(Criterion criterion) {
		return new ReturnData(mapper.selectAuthGrpList());
	}
	
	@Override
	public ReturnData addAuthGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertAuthGrp(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData saveAuthGrp(Criterion criterion) {
		List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("list");
		for(Map<String, Object> map : list) {
			int duplCnt = mapper.selectGrpDuplCnt(map);
			if(duplCnt > 0) {
				return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
			}
		}
		mapper.updateAuthGrp(criterion.getCondition());
		return new ReturnData();			
	}

	@Override
	public ReturnData delAuthGrp(Criterion criterion) {
		mapper.deleteAuthGrp(criterion.getCondition());
		return new ReturnData();
	}
	
	@Override
	public ReturnData getDefaultGrpTreeList(Criterion criterion) {
		if(criterion.containsKey("devKind2")) {
			String[] devKindList = criterion.getValue("devKind2").toString().split(",");
			criterion.addParam("devKindList", devKindList);
		}
		return new ReturnData(mapper.selectDefaultGrpTreeList(criterion.getCondition()));
	}

	@Override
	public ReturnData getVmSvrGrpTreeList(Criterion criterion) {
		if(criterion.containsKey("devKind2")) {
			String[] devKindList = criterion.getValue("devKind2").toString().split(",");
			criterion.addParam("devKindList", devKindList);
		}
		return new ReturnData(mapper.selectVmSvrGrpTreeList(criterion.getCondition()));
	}

	@Override
	public ReturnData getDefaultGrpTreeListAll(Criterion criterion) {
		return new ReturnData(mapper.selectDefaultGrpTreeListAll(criterion.getCondition()));
	}

	@Override
	public ReturnData getL4DefaultGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectL4DefaultGrpTreeList(criterion.getCondition()));
	}
	
	@Override
	public ReturnData getApDefaultGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectApDefaultGrpTreeList(criterion.getCondition()));
	}

	@Override
	public ReturnData addDefaultGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertDefaultGroup(criterion.getCondition());
		mapper.procSpMakeGrpLeaf(new HashMap<String, Object>());
		return new ReturnData();
	}
	
	@Override
	public ReturnData editDefaultGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		
		mapper.updateDefaultGroup(criterion.getCondition());
		mapper.procSpMakeGrpLeaf(new HashMap<String, Object>());			
		
		return new ReturnData();
	}
	
	@Override
	public ReturnData delDefaultGrp(Criterion criterion) {
		mapper.deleteDefaultGroup(criterion.getCondition());
		mapper.procSpMakeGrpLeaf(new HashMap<String, Object>());
		return new ReturnData();
	}

	@Override
	public ReturnData getSearchGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectSearchGrpTreeList(criterion.getCondition()));
	}
	
	@Override
	public ReturnData addSearchGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertSearchGroup(criterion.getCondition());
		return new ReturnData();
	}
	
	@Override
	public ReturnData editSearchGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateSearchGroup(criterion.getCondition());
		return new ReturnData();
	}
	
	@Override
	public ReturnData delSearchGrp(Criterion criterion) {
		mapper.deleteSearchGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData getIfGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectIfGrpTreeList(criterion.getCondition()));
	}

	@Override
	public ReturnData addIfGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertIfGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData editIfGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateIfGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData delIfGrp(Criterion criterion) {
		mapper.deleteIfGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData getServerGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectServerGrpTreeList(criterion.getCondition()));
	}

	@Override
	public ReturnData addSvrGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertSvrGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData editSvrGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateSvrGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData delSvrGrp(Criterion criterion) {
		mapper.deleteSvrGroup(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData getMangGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectMangGrpTreeList(criterion.getCondition()));
	}
	
	@Override
	public ReturnData addMangGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertMangGroup(criterion.getCondition());
		if(AppGlobal.db.equals(DBEnum.MARIA.name())) {
			mapper.procSpMakeGrpTypeLeaf(new HashMap<String, Object>());
		}
		return new ReturnData();
	}
	
	@Override
	public ReturnData editMangGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		if(AppGlobal.db.equals(DBEnum.MARIA.name())) {
			//원래 상위그룹 조회
			Long grpParent = mapper.selectDefaultGroupParent(criterion.getCondition());
			long orgGrpParent = grpParent != null? grpParent.longValue() : 0; 
			
			// 그룹수정
			mapper.updateMangGroup(criterion.getCondition());
			
			// 상위그룹이 변경되었으면 leaf생성 프로시저를 호출
			if(orgGrpParent != Long.parseLong(criterion.getValue("grpParent").toString())) {
				// leaf에서 자신을 포함한 상위그룹을 제거
				mapper.spMakeGrpLeafMove(criterion.getCondition());
			}
		}
		else {
			mapper.updateMangGroup(criterion.getCondition());
		}
		return new ReturnData();
	}
	
	@Override
	public ReturnData delMangGrp(Criterion criterion) {
		mapper.deleteMangGroup(criterion.getCondition());
		if(AppGlobal.db.equals(DBEnum.MARIA.name())) {
			mapper.procSpMakeGrpTypeLeaf(new HashMap<String, Object>());
		}
		return new ReturnData();
	}
	
	@Override
	public ReturnData getMangFlowGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectMangFlowGrpTreeList(criterion.getCondition()));
	}
		
	@Override
	public ReturnData addMangFlowGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertMangFlowGroup(criterion.getCondition());
		return new ReturnData();
	}
	
	@Override
	public ReturnData editMangFlowGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateMangFlowGroup(criterion.getCondition());
		return new ReturnData();
	}
	
	@Override
	public ReturnData delMangFlowGrp(Criterion criterion) {
		mapper.deleteMangFlowGroup(criterion.getCondition());
		return new ReturnData();
	}
	
	@Override
	public ReturnData getServiceGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectServiceGrpTreeList(criterion.getCondition()));
	}

	@Override
	public ReturnData getAuthConfDefaultGrpTreeListAll(Criterion criterion) {
		return new ReturnData(mapper.selectAuthConfDefaultGrpTreeListAll(criterion.getCondition()));
	}

	@Override
	public ReturnData getSvcPortGrpList(Criterion criterion) {
		return new ReturnData(mapper.selectSvcPortGrpList(criterion.getCondition()));
	}

	@Override
	public ReturnData addSvcPortGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertSvcPortGroup(criterion.getCondition());
		return new ReturnData(getAddOkMessage());
	}

	@Override
	public ReturnData editSvcPortGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateSvcPortGroup(criterion.getCondition());
		return new ReturnData(getEditOkMessage());
	}

	@Override
	public ReturnData delSvcPortGrp(Criterion criterion) {
		mapper.deleteSvcPortGroup(criterion.getCondition());
		return new ReturnData(getDeleteOkMessage());
	}

	@Override
	public ReturnData addServiceGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertServiceGroup(criterion.getCondition());
		return new ReturnData(getAddOkMessage());
	}

	@Override
	public ReturnData editServiceGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateServiceGroup(criterion.getCondition());
		return new ReturnData(getEditOkMessage());
	}
	
	@Override
	public ReturnData delServiceGrp(Criterion criterion) {
		mapper.deleteServiceGroup(criterion.getCondition());
		return new ReturnData(getDeleteOkMessage());
	}

	
	/** =================As그룹=================== */
	@Override
	public ReturnData getAsGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectAsGrpTreeList(criterion.getCondition()));
	}
	@Override
	public ReturnData addAsGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertAsGroup(criterion.getCondition());
		return new ReturnData(getAddOkMessage());
	}

	@Override
	public ReturnData editAsGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateAsGroup(criterion.getCondition());
		return new ReturnData(getEditOkMessage());
	}
	
	@Override
	public ReturnData delAsGrp(Criterion criterion) {
		mapper.deleteAsGroup(criterion.getCondition());
		return new ReturnData(getDeleteOkMessage());
	}
	/** =================As그룹=================== */
	
	@Override
	public ReturnData getAppGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectAppGrpTreeList(criterion.getCondition()));
	}
	
	@Override
	public ReturnData addAppGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.insertAppGroup(criterion.getCondition());
		return new ReturnData(getAddOkMessage());
	}
	

	@Override
	public ReturnData editAppGrp(Criterion criterion) {
		int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if(duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}
		mapper.updateAppGroup(criterion.getCondition());
		return new ReturnData(getEditOkMessage());
	}
	
	@Override
	public ReturnData delAppGrp(Criterion criterion) {
		mapper.deleteAppGroup(criterion.getCondition());
		return new ReturnData(getDeleteOkMessage());
	}

	/** =================기관그룹=================== */
	@Override
	public ReturnData getInstGrpTreeList(Criterion criterion) {
		return new ReturnData(mapper.selectInstGrpTreeList(criterion.getCondition()));
	}

}
