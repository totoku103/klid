/**
 * Program Name	: NoticeBoardServiceImpl.java
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
package com.klid.webapp.main.env.nationIPMgmt.service;

import com.klid.common.AppGlobal;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.common.*;
import com.klid.webapp.main.env.nationIPMgmt.dto.NationIPMgmtDto;
import com.klid.webapp.main.env.nationIPMgmt.persistence.NationIPMgmtMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

@Service("nationIPMgmtService")
public class NationIPMgmtServiceImpl extends MsgService implements NationIPMgmtService {

	@Resource(name = "nationIPMgmtMapper")
	private NationIPMgmtMapper mapper;

	/** 국가 리스트 조회 */
	@Override
	public ReturnData getNationMgmtList(Criterion criterion){
		return new ReturnData(mapper.selectNationMgmtList(criterion.getCondition()));
	}
	
	/** 국가정보 조회 */
	@Override
	public ReturnData getNationMgmtInfo(Criterion criterion){
		return new ReturnData(mapper.selectNationMgmtInfo(criterion.getCondition()));
	}
	
	/** 국가 도메인 리스트 조회  */
	@Override
	public ReturnData getNationList_domain(Criterion criterion){
		return new ReturnData(mapper.selectNationList_domain());
	}
	
	/** IP대역에 해당하는 국가코드 조회  */
	@Override
	public ReturnData getNationIP_nationCd(Criterion criterion) {
		return new ReturnData(mapper.selectNationIP_nationCd(criterion.getCondition()));
	}
	
	/** 국가별 IP대역 리스트 조회  */
	@Override
	public ReturnData getNationIPList(Criterion criterion) {
		return new ReturnData(mapper.selectNationIPList(criterion.getCondition()));
	}
	
	/** 국가IP 추가 */
	@Override
	public ReturnData addNationIPMgmt(Criterion criterion){
		try{



		MultipartFile uploadedFile = (MultipartFile) criterion.getValue("file");
		String usrId = criterion.getValue("usrId").toString();
		String usrIp = criterion.getValue("usrIp").toString();
		
		String fileName = uploadedFile.getOriginalFilename();
		if (fileName.equals("")) new ReturnData(new ErrorInfo(new CustomException("파일을 선택해주세요.")));
		
		InputStream is = uploadedFile.getInputStream();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		// 글자 깨짐
		BufferedReader br = new BufferedReader(new InputStreamReader(is, "EUC-KR"));
		int rowNum = 0;
		
		// 도메인 리스트 조회
		List<NationIPMgmtDto> domain_list = mapper.selectNationList_domain();
		
		// insert 전, 기존의 IP 모두 제거
		mapper.deleteNationIP_all();
		
		
		while (true) {
			String a = br.readLine();
			
			if (a == null) break;
			
			
			String[] columns = a.split(",");
			
			if(columns.length==0) break;
			

			// 앞뒤공백제거
			for(int z=0; z<columns.length; z++){
				String tmp = columns[z];
				tmp = tmp.replaceAll("(^\\p{Z}+|\\p{Z}+$)", ""); // 앞뒤공백제거
				tmp = tmp.replaceAll("\"", ""); // 쌍따옴표 제거
				columns[z] = tmp;
			}

			// 필수정보
			String sipStr = columns[0]; // sip
			String eipStr = columns[1]; // eip
			String sip = columns[2]; // sip
			String eip = columns[3]; // eip
			String domain = columns[4]; // domain
			String nationNm = columns[5]; // 국가명

			// 필수정보 들어있는지 확인 - 하나라도 안들어가 있으면 리스트에 안담음
			if (StringUtils.isBlank(sip)) continue;
			if (StringUtils.isBlank(eip)) continue;
			if (StringUtils.isBlank(sipStr)) continue;
			if (StringUtils.isBlank(eipStr)) continue;
			if (StringUtils.isBlank(domain)) continue;
			if (StringUtils.isBlank(nationNm)) continue;

			Map<String, Object> oneMap = new HashMap<String, Object>();
			oneMap.put("domain", domain);

			// domain으로 nationCd 조회
			for(int i=0; i<domain_list.size(); i++){
				NationIPMgmtDto dto = domain_list.get(i);
				int g_nationCd = dto.getNationCd();
				String g_domain = dto.getDomain();
				if(g_domain.equals(domain)){
					oneMap.put("nationCd", g_nationCd);
					break;
				}
			}

			oneMap.put("sip", sip);
			oneMap.put("eip", eip);
			oneMap.put("sipStr", sipStr);
			oneMap.put("eipStr", eipStr);
			oneMap.put("domain", domain);
			oneMap.put("nationNm", nationNm);
			oneMap.put("usrId", usrId);
			oneMap.put("usrIp", usrIp);


			if(!oneMap.containsKey("nationCd")) continue; // nationCd 정보 가져온거 없을시, 해당 ip 정보 저장 안함

			mapper.insertNationIp(oneMap); // 데이터량이 많아서 한번에 insert시 멈춰버리는 현상이 일어나서 하나씩 insert

			list.add(oneMap);
		} // end while

		if(list.size()==0) throw new CustomException("저장할 데이터가 존재하지 않습니다.");
			
		criterion.addParam("list", list);
		
//		mapper.insertNationIp_list(criterion.getCondition());
		return new ReturnData("SUCCESS");

		}catch (IllegalArgumentException iae){
			iae.printStackTrace();
			return new ReturnData(new ErrorInfo(iae));
		}catch (UnsupportedEncodingException uee){
			uee.printStackTrace();
			return new ReturnData(new ErrorInfo(uee));
		}catch (IOException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (Exception e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}
	
	/** 국가IP 삭제 */
	@Override
	public ReturnData delNationIPMgmt(Criterion criterion){
//		mapper.deleteNationIP_all(criterion.getCondition());
		return new ReturnData("SUCCESS");
	}
	
	/** 엑셀 출력 */
	@Override
	public ReturnData export(HttpServletResponse response, Criterion criterion){
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "국가별IP대역관리";
			String sheetNm = "국가별IP대역관리";
			String[][] headers = new String[][] { 
				{ "번호", "150" }, { "국가명", "200" }, { "대륙명", "200" }, { "한글명", "200" },{ "갱신일시", "150" }
			};
			
			ReturnData excelData = getNationMgmtList(criterion);
			
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			
			// 토탈 조회 row
			List<NationIPMgmtDto> list = null;
			if (!excelData.getHasError()) {
				list = (List<NationIPMgmtDto>) excelData.getResultData();
			}
			xls.addSubTitle(0, "총 개수", xls.styleHelper.subTitleStyle);
			xls.addCustomCell(1, list.size(), xls.styleHelper.subValueStyle, 2);
			xls.nextRow();
			xls.nextRow();
			
			// 리스트 조회 row
			xls.addHeaders(headers);
			xls.nextRow();
			
			
			if (!excelData.getHasError()) {
//				List<NationIPMgmtDto> list = (List<NationIPMgmtDto>) excelData.getResultData();
				if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						NationIPMgmtDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getNationCd(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getNationNm());
						xls.setDataValue(colIdx++, dto.getContinental());
						xls.setDataValue(colIdx++, dto.getKrNm());
						xls.setDataValue(colIdx++, dto.getRegDt(), xls.centerValueStyle);

            			xls.nextRow();
            			
						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
	                    if((i+1)%maxinumRow==0){
	                    	sheetCnt++;
	                    	xls.newSheet(sheetNm+"_"+sheetCnt);
	            			xls.addHeaders(headers);
	            			xls.nextRow();
	                    }
					}
				}
			}
			
			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	/** 엑셀 출력 */
	@Override
	public ReturnData export_ip(HttpServletResponse response, Criterion criterion){
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "국가별IP리스트";
			String sheetNm = "국가별IP리스트";
			String[][] headers = new String[][] { 
				{ "시작IP", "200" }, { "종료IP", "200" }
			};
			
			
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);

			xls.nextRow();
			// 국가정보
			String nationNm = criterion.containsKey("nationNm")?criterion.getValue("nationNm").toString():"";
			String continental = criterion.containsKey("continental")?criterion.getValue("continental").toString():"";
			xls.addSubTitle(0, "대륙명", xls.styleHelper.subTitleStyle);
			xls.addCustomCell(1, continental, xls.styleHelper.subValueStyle, 2);
			xls.addSubTitle(3, "국가명", xls.styleHelper.subTitleStyle);
			xls.addCustomCell(4, nationNm, xls.styleHelper.subValueStyle, 2);
			xls.nextRow();
			xls.nextRow();
			
			// 리스트 조회 row
			xls.addHeaders(headers);
			xls.nextRow();
			
			ReturnData excelData = getNationIPList(criterion);
			if (!excelData.getHasError()) {
				List<NationIPMgmtDto> list = (List<NationIPMgmtDto>) excelData.getResultData();
				if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						NationIPMgmtDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getSipStr(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getEipStr(), xls.centerValueStyle);

            			xls.nextRow();
            			
						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
	                    if((i+1)%maxinumRow==0){
	                    	sheetCnt++;
	                    	xls.newSheet(sheetNm+"_"+sheetCnt);
	            			xls.addHeaders(headers);
	            			xls.nextRow();
	                    }
					}
				}
			}
			
			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	/** 국가정보조회 */
	@Override
	public ReturnData getNationDetail(Criterion criterion){
		return new ReturnData(mapper.selectNationDetail(criterion.getCondition()));
	}

	/** 국가정보수정 */
	@Override
	public ReturnData editNation(Criterion criterion){
		return new ReturnData(mapper.editNation(criterion.getCondition()));
	}
}
