package com.klid.webapp.common.file.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.code.dto.CodeDto;
import com.klid.webapp.common.file.persistence.FileUploadMapper;
import com.klid.webapp.main.acc.accidentApply.persistence.AccidentApplyMapper;
import com.klid.webapp.main.env.userConf.persistence.UserConfMapper;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.klid.common.AppGlobal;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.file.dto.AttachfileDto;
import com.klid.webapp.common.file.persistence.FileDownloadMapper;

@Service("fileDownloadService")
public class FileDownloadServiceImpl extends MsgService implements FileDownloadService {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Resource(name = "fileDownloadMapper")
	public FileDownloadMapper mapper;

	@Resource(name = "fileUploadMapper")
	public FileUploadMapper fileUploadMapper;

	@Resource(name = "accidentApplyMapper")
	AccidentApplyMapper applyMapper;

	@Resource(name = "userConfMapper")
	private UserConfMapper userMapper;

	@Override
	public List<AttachfileDto> searchFileName(Criterion criterion) {
		return mapper.selectFileName(criterion.getCondition());
	}

	//사고접수용 첨부파일 다운
	@Override
	public List<AttachfileDto> searchAccFileName(Criterion criterion) {
		return mapper.selectAccFileName(criterion.getCondition());
	}

	@SuppressWarnings("static-access")
	@Override
	public HttpServletResponse fileRender(HttpServletResponse response, AttachfileDto file) {

		if (file.getFileName().isEmpty() || file.getOriginalFileName().isEmpty()) {
			response.setStatus(response.SC_BAD_REQUEST);
			return response;
		}

		try {
			String tempFileName = URLEncoder.encode(file.getFileName(), "utf-8");
			tempFileName = tempFileName.substring(0,tempFileName.length()>150?150:tempFileName.length());
			file.setFileName(tempFileName);
			file.setOriginalFileName(URLEncoder.encode(file.getOriginalFileName(), "utf-8"));
		} catch (UnsupportedEncodingException e2) {
		}

		// 다운로드 창을 띄우고 파일명을 보여준다.
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=\"" + file.getOriginalFileName() + "\"");
		response.setHeader("content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1");

		ServletOutputStream sos = null;
		InputStream fis = null;
		try {
			sos = response.getOutputStream();
			Path path = Paths.get(AppGlobal.uploadPath + file.getAthPath(), file.getFileName());
			fis = Files.newInputStream(path);
			FileCopyUtils.copy(fis, sos);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					fis = null;
				}
			}
			if (sos != null) {
				try {
					sos.flush();
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}

		return response;
	}

	@SuppressWarnings("static-access")
	public HttpServletResponse fileRender2(HttpServletResponse response, AttachfileDto file) {
		if (file.getFileName().isEmpty() || file.getOriginalFileName().isEmpty()) {
			response.setStatus(response.SC_BAD_REQUEST);
			return response;
		}

		try {
			file.setFileName(URLEncoder.encode(file.getFileName(), "utf-8"));
			file.setOriginalFileName(URLEncoder.encode(file.getOriginalFileName(), "utf-8"));
		} catch (UnsupportedEncodingException e2) {
		}
		// 다운로드 창을 띄우고 파일명을 보여준다.
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=\"" + file.getOriginalFileName() + "\"");
		response.setHeader("content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1");

		ServletOutputStream sos = null;
		FileInputStream fis = null;
		try {
			sos = response.getOutputStream();
			String fullPath = AppGlobal.homePath + "/upload/" + file.getFileName();
			fis = new FileInputStream(fullPath);
			FileCopyUtils.copy(fis, sos);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());

		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					fis = null;
				}
			}
			if (sos != null) {
				try {
					sos.flush();
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return response;
	}


	public HttpServletResponse fileRenderHelp(HttpServletResponse response, String code2) {
		//한글이름 일 경우 post 인코딩 문제로 service에서 파일명 호출 쿼리 실행
		Criterion criterion = new Criterion();
		criterion.addParam("code2", code2);
		CodeDto helpAttInfo = fileUploadMapper.helpFileName(criterion.getCondition());

		String fileName = helpAttInfo.getCodeName()+"."+helpAttInfo.getComCode3().substring(helpAttInfo.getComCode3().lastIndexOf(".") + 1);

		try {
			fileName  = URLEncoder.encode(fileName, "UTF-8");
		} catch (UnsupportedEncodingException e2) {
			e2.printStackTrace();
		}
		// 다운로드 창을 띄우고 파일명을 보여준다.
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
		response.setHeader("content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1");

		ServletOutputStream sos = null;
		FileInputStream fis = null;
		try {
			sos = response.getOutputStream();
			String fullPath = AppGlobal.uploadHelpPath + helpAttInfo.getComCode3();
			fis = new FileInputStream(fullPath);
			FileCopyUtils.copy(fis, sos);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());

		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					fis = null;
				}
			}
			if (sos != null) {
				try {
					sos.flush();
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return response;
	}

	@Override
	public ReturnData exportGrid(Criterion criterion) {
		String filename = StringUtils.defaultString(criterion.getCondition().get("filename").toString(), "");
		List<Map<String, Object>> headerGrpList = (List<Map<String, Object>>) criterion.getCondition().get("headerGrps");
		List<Map<String, Object>> headerList = (List<Map<String, Object>>) criterion.getCondition().get("header");
		List<Map<String, Object>> dataList = (List<Map<String, Object>>) criterion.getCondition().get("data");
		Criterion paramsCriterion = new Criterion((Map<String, Object>)criterion.getCondition().get("params"));

		//사고내용 검색이 있을 경우 띄어쓰기를 기준으로 IN 조건
		if(!paramsCriterion.getCondition().get("inciDclCont").equals("")){
			String arr = (String) paramsCriterion.getCondition().get("inciDclCont"); //검색 값 전체 string 값 ex)1111 test ip 기관
			String[] arrSplit = arr.split(" ");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			paramsCriterion.addParam("InciDclCont", list);
		}

		//조사내용 검색이 있을 경우 띄어쓰기를 기준으로 IN 조건 inciBelowCont
		if(!paramsCriterion.getCondition().get("inciInvsCont").equals("")){
			String arr = (String) paramsCriterion.getCondition().get("inciInvsCont"); //검색 값 전체 string 값 ex)1111 test ip 기관
			String[] arrSplit = arr.split(" ");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			paramsCriterion.addParam("InciInvsCont", list);
		}

		//시도의견 검색이 있을 경우 띄어쓰기를 기준으로 IN 조건
		if(!paramsCriterion.getCondition().get("inciBelowCont").equals("")){
			String arr = (String) paramsCriterion.getCondition().get("inciBelowCont"); //검색 값 전체 string 값 ex)1111 test ip 기관
			String[] arrSplit = arr.split(" ");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			paramsCriterion.addParam("InciBelowCont", list);
		}

		//접수방법 복수 선택 ,를 기준으로 IN 조건 20210226 추가
		if(!paramsCriterion.getCondition().get("srchAcpnMthd").equals("")){
			String arr = (String) paramsCriterion.getCondition().get("srchAcpnMthd");
			String[] arrSplit = arr.split(",");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			paramsCriterion.addParam("srchAcpnMthdList", list);
		}

		try {
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(filename);
			// header group이 존재하면 merge header 추가
			if(headerGrpList.size() > 0) {
				for(int i = 0; i < headerList.size(); i++) {
					Object columngroup = headerList.get(i).get("columngroup");
					if(columngroup == null) {
						xls.addMergedHeader(headerList.get(i).get("text").toString(), 2, 1);
					}
					else {
						for(int j = 0; j < headerGrpList.size(); j++) {
							String headerGrp = headerGrpList.get(j).get("name").toString();
							if(headerGrp.equals(headerList.get(i).get("columngroup").toString())) {
								int colspan = NumberUtils.toInt(headerGrpList.get(j).get("colspan").toString());
								xls.addMergedHeader(headerGrpList.get(j).get("text").toString(), 1, colspan);
								i += colspan -1;
								break;
							}
						}
					}
				}
				xls.nextRow();
				String[][] headers = new String[headerList.size()][2];
				for(int i = 0; i < headerList.size(); i++) {
					headers[i][0] = headerList.get(i).get("text").toString();
					headers[i][1] = headerList.get(i).get("width").toString();
				}
				xls.addHeaders(headers);
				xls.nextRow();
			}
			else {	 // header row=1인경우
				String[][] headers = new String[headerList.size()][2];
				for(int i = 0; i < headerList.size(); i++) {
					headers[i][0] = headerList.get(i).get("text").toString();
					headers[i][1] = headerList.get(i).get("width").toString();
				}
				xls.addHeaders(headers);
				xls.nextRow();
			}
			int colIdx = 0;

			applyMapper.selectAccidentApplyList(paramsCriterion.getCondition(), new ResultHandler() {
				@Override
				public void handleResult(ResultContext resultContext) {
					Map<String, Object> map = (Map<String, Object>) resultContext.getResultObject();
					int colIdx = 0;
					for(int i = 0; i < headerList.size(); i++) {

						String dataField = headerList.get(i).get("datafield").toString().toUpperCase();
						if(dataField.equals("INCITTLDTT")){

							String inciDttNm = "";
							String inciTtl = "";
							String inciTtlDtt = "";

							if(map.containsKey("INCIDTTNM")){
								if(map.get("INCIDTTNM")==null){
									inciDttNm = "";
								}else{
									inciDttNm = map.get("INCIDTTNM").toString();
								}
							}

							if(map.containsKey("INCITTL")){
								if(map.get("INCITTL")==null){
									inciTtl = "";
								}else{
									inciTtl = map.get("INCITTL").toString();
								}
							}

							if(inciDttNm.equals("") || inciDttNm.equals("null") || inciDttNm.equals("NULL")){
//								map.put("INCITTLDTT",inciTtlDtt + "[" + inciDttNm + "]");
								map.put("INCITTLDTT",inciTtl);
							} else {
								map.put("INCITTLDTT",inciTtl+ "[" + inciDttNm + "]");
							}
						}

						Object value = map.get(headerList.get(i).get("datafield").toString().toUpperCase());
						if(value instanceof Long) {
							xls.setDataValue(colIdx++, NumberUtils.toLong(value.toString()));
						}
						else if(value instanceof Integer) {
							//xls.setDataValue(colIdx++, NumberUtils.toInt(value.toString()));
							xls.setDataValue(colIdx++, NumberUtils.toDouble(value.toString()));
						}
						else if(value instanceof Double) {
							xls.setDataValue(colIdx++, NumberUtils.toDouble(value.toString()));
						}
						else {
							xls.setDataValue(colIdx++, value==null? null : ObjectUtils.toString(value.toString()));
						}
					}
					xls.nextRow();
				}
			});

//			int colIdx = 0;
//			for(Map<String, Object> data : dataList) {
//				colIdx = 0;
//				for(int i = 0; i < headerList.size(); i++) {
//					Object value = data.get(headerList.get(i).get("datafield").toString());
//					if(value instanceof Long) {
//						xls.setDataValue(colIdx++, Long.valueOf(value.toString()));
//					}
//					else if(value instanceof Integer) {
//						xls.setDataValue(colIdx++, Integer.valueOf(value.toString()));
//					}
//					else if(value instanceof Double) {
//						xls.setDataValue(colIdx++, Double.valueOf(value.toString()));
//					}
//					else {
//						xls.setDataValue(colIdx++, value==null? null : value.toString());
//					}
//				}
//				xls.nextRow();
//			}

			String path = xls.save();
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", path);
			resultMap.put("fileName", filename);
			return new ReturnData(resultMap);
		} catch(NullPointerException npe) {
			npe.printStackTrace();
			return new ReturnData(new ErrorInfo(npe));
		} catch(IOException ioe) {
			ioe.printStackTrace();
			return new ReturnData(new ErrorInfo(ioe));
		} catch(Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	public ReturnData exportUserGrid(Criterion criterion) {
		String filename = StringUtils.defaultString(criterion.getCondition().get("filename").toString(), "");
		List<Map<String, Object>> headerGrpList = (List<Map<String, Object>>) criterion.getCondition().get("headerGrps");
		List<Map<String, Object>> headerList = (List<Map<String, Object>>) criterion.getCondition().get("header");
		Criterion paramsCriterion = new Criterion((Map<String, Object>)criterion.getCondition().get("params"));
		try {
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(filename);
			// header group이 존재하면 merge header 추가
			if(headerGrpList.size() > 0) {
				for(int i = 0; i < headerList.size(); i++) {
					Object columngroup = headerList.get(i).get("columngroup");
					if(columngroup == null) {
						xls.addMergedHeader(headerList.get(i).get("text").toString(), 2, 1);
					}
					else {
						for(int j = 0; j < headerGrpList.size(); j++) {
							String headerGrp = headerGrpList.get(j).get("name").toString();
							if(headerGrp.equals(headerList.get(i).get("columngroup").toString())) {
								int colspan = NumberUtils.toInt(headerGrpList.get(j).get("colspan").toString());
								xls.addMergedHeader(headerGrpList.get(j).get("text").toString(), 1, colspan);
								i += colspan -1;
								break;
							}
						}
					}
				}
				xls.nextRow();
				String[][] headers = new String[headerList.size()][2];
				for(int i = 0; i < headerList.size(); i++) {
					headers[i][0] = headerList.get(i).get("text").toString();
					headers[i][1] = headerList.get(i).get("width").toString();
				}
				xls.addHeaders(headers);
				xls.nextRow();
			}
			else {	 // header row=1인경우
				String[][] headers = new String[headerList.size()][2];
				for(int i = 0; i < headerList.size(); i++) {
					headers[i][0] = headerList.get(i).get("text").toString();
					headers[i][1] = headerList.get(i).get("width").toString();
				}
				xls.addHeaders(headers);
				xls.nextRow();
			}
			int colIdx = 0;
			String path = xls.save();
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", path);
			resultMap.put("fileName", filename);
			return new ReturnData(resultMap);
		} catch(NullPointerException npe) {
			npe.printStackTrace();
			return new ReturnData(new ErrorInfo(npe));
		} catch(IOException ioe) {
			ioe.printStackTrace();
			return new ReturnData(new ErrorInfo(ioe));
		} catch(Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}
}
