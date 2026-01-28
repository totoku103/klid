package com.klid.webapp.common.controller;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.AppGlobal;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.code.dto.BoardMgmtDto;
import com.klid.webapp.common.code.service.CodeService;
import com.klid.webapp.common.file.dto.AttachfileDto;
import com.klid.webapp.common.file.service.FileDeleteService;
import com.klid.webapp.common.file.service.FileDownloadService;
import com.klid.webapp.common.file.service.FileUploadService;
import com.klid.webapp.main.acc.accidentApply.persistence.AccidentApplyMapper;
import com.klid.webapp.main.sec.shareBoard.dto.ShareBoardDto;
import com.klid.webapp.main.sec.shareBoard.service.ShareBoardService;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping("/api/file")
@Controller
@Slf4j
public class FileController {

    public static String emlcsvFilePath = null;
	public static String emlcsvFileName = null;
	public static String emlcsvExtName = null;
	public static String xlsFilePath = null;
	public static String xlsFileName = null;
	public static String xlsExtName = null;

	@Resource(name = "fileDownloadService")
	public FileDownloadService downloadService;

	@Resource(name = "fileUploadService")
	public FileUploadService uploadService;

	@Resource(name = "fileDeleteService")
	public FileDeleteService deleteService;

	@Resource(name = "shareBoardService")
	public ShareBoardService shareBoardService;

	@Resource(name = "codeService")
	public CodeService codeService;

	@RequestMapping("download")
	public void fileDownload(@RequestParam("fileNo") long fileNo, HttpServletResponse response, HttpServletRequest request) {
		Criterion criterion = new Criterion();
		criterion.addParam("fileNo", fileNo);
		List<AttachfileDto> file = downloadService.searchFileName(criterion);

		downloadService.fileRender(response, file.get(0));
	}

	@ExceptionHandler(Exception.class)
	public void handleException(Exception ex, HttpServletRequest request, HttpServletResponse response) {
		StringBuffer sb = new StringBuffer();
		if (ex instanceof org.springframework.web.multipart.MaxUploadSizeExceededException) {
			sb.append(((MaxUploadSizeExceededException) ex).getMaxUploadSize() / 1000 + "kb");
		}
		log.error(sb.toString());
	}

	@RequestMapping("upload")
	public void fileUpload(@RequestParam("fileinput") MultipartFile multipartFile, @RequestParam("boardNo") String boardNo, HttpServletRequest request, HttpServletResponse response) {

		Criterion boardDetailCriterion = new Criterion();
		boardDetailCriterion.addParam("boardNo", boardNo);

		List<ShareBoardDto> list = shareBoardService.getBoardDetail(boardDetailCriterion);
		String boardType = list.get(0).getBultnType();

		String boardGuid = "B4529762-C067-4731-9129-B84FF840063A"; //공지사항
		//notice
		if(boardType.equals("notice")){
			boardGuid = "B4529762-C067-4731-9129-B84FF840063A"; //공지
		}else if(boardType.equals("secu_data")){
			boardGuid = "35E56A6F-B4CF-4255-8300-A55BA44F7BA6"; //자료실
		}else if(boardType.equals("data_sbms")){
			boardGuid = "11B3C551-A9E2-4361-AC5C-D45751AD5E64"; //공유
		}else if(boardType.equals("qna")){
			boardGuid = "270241B8-AA1C-4BBA-948F-B9AF8BBD74DD"; //문의
		}else{
			boardGuid = "B4529762-C067-4731-9129-B84FF840063A";
		}

		String tempFileName = tempFileName(multipartFile);
		String originalFileName = multipartFile.getOriginalFilename();

		Criterion boardCriterion = new Criterion();
		boardCriterion.addParam("guid", boardGuid);
		//codeService.getDetailBoardMgmtList(boardCriterion);
		ReturnData boardBanList = codeService.getDetailBoardMgmtList(boardCriterion);
		BoardMgmtDto codeDetail = (BoardMgmtDto) boardBanList.getResultData();

		String contenType = originalFileName.substring(originalFileName.lastIndexOf(".") + 1).toLowerCase();
		if(codeDetail != null){
			if(codeDetail.getFileExt() != null){ //DB에 게시판별 확장자 제약을 걸어 놨을 경우
				if(codeDetail.getFileExt().toLowerCase().indexOf(contenType) > -1){ //허용된 확장자에 포함되었을때

					uploadService.fileUploadLocal(multipartFile, tempFileName);

					Criterion criterion = new Criterion();
					criterion.addParam("fileName", tempFileName);
					criterion.addParam("originalFileName", originalFileName);
					criterion.addParam("fileType", originalFileName.substring(originalFileName.lastIndexOf(".") + 1));
					criterion.addParam("fileSize", multipartFile.getSize());
					criterion.addParam("boardNo", boardNo);

					//업로드시 해당 날짜의 폴더생성 (사고접수쪽과 동일) 해당 날짜는 bultn -> fila_path에 insert
					SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
					Calendar c1 = Calendar.getInstance();
					String todayPath = sdf.format(c1.getTime());
					String savePath = "\\"+todayPath;

					criterion.addParam("filePath", savePath);

					uploadService.insertFileInfo(criterion);
				}else{
				}
			}else{ //확장자 제약이 없을 경우는 무조건 첨부파일 등록

				uploadService.fileUploadLocal(multipartFile, tempFileName);

				Criterion criterion = new Criterion();
				criterion.addParam("fileName", tempFileName);
				criterion.addParam("originalFileName", originalFileName);
				criterion.addParam("fileType", originalFileName.substring(originalFileName.lastIndexOf(".") + 1));
				criterion.addParam("fileSize", multipartFile.getSize());
				criterion.addParam("boardNo", boardNo);

				//업로드시 해당 날짜의 폴더생성 (사고접수쪽과 동일) 해당 날짜는 bultn -> fila_path에 insert
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
				Calendar c1 = Calendar.getInstance();
				String todayPath = sdf.format(c1.getTime());
				String savePath = "\\"+todayPath;

				criterion.addParam("filePath", savePath);

				uploadService.insertFileInfo(criterion);
			}
		}

		// response.setStatus(response.SC_OK);
		// return response;
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public ReturnData fileDelete(@RequestParam Map<String, Object> reqMap) {

		List<AttachfileDto> list = downloadService.searchFileName(new Criterion(reqMap));

		ReturnData returnData = null;
		if (deleteService.deleteFileInfo(new Criterion(reqMap))) {
			returnData = deleteService.deleteFile(list);
		} else {
			returnData = new ReturnData();
			returnData.setResultData("삭제할 파일이 없습니다.");
		}
		return returnData;
	}

	public String tempFileName(MultipartFile multipartFile) {
		long time = System.currentTimeMillis();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss_sss");
		String uploadTime = format.format(new Date(time));

		String tempFileName = uploadTime + "_" + SessionManager.getUser().getUserId().toString() + "_" + multipartFile.getOriginalFilename();
		return tempFileName;

	}

	public String tempEmlFileName(MultipartFile multipartFile, String type) {

		long time = System.currentTimeMillis();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss_sss");
		String uploadTime = format.format(new Date(time));

		// 파일 형식 (업로드날짜, 업로드아이디, 원래파일이름) ex) 20150917034156_123_admin_netis.exe
		String tempFileName;
		if(type=="eml")
			tempFileName = uploadTime + "_"+"eml";
		else if(type=="xls")
			tempFileName = uploadTime + "_"+"xls";
		else
			tempFileName = uploadTime + "_"+"csv";

		return tempFileName;
	}

	/**
	 * 차트데이터를 이미지로 /export폴더안에 저장한다.
	 * 
	 * @param request
	 * @throws IOException
	 */
	@RequestMapping(value = "saveChart.do")
	public void saveChart(HttpServletRequest request) throws IOException {
		try{
			String fname = StringUtils.defaultString(request.getParameter("fname"), "");
			String content = StringUtils.defaultString(request.getParameter("content"), "");
			byte[] dearr = Base64.decodeBase64(content);
			String filePath = AppGlobal.homePath + "/export/" + fname;
			FileUtils.writeByteArrayToFile(new File(filePath), dearr);
		}catch(Exception err){
			err.printStackTrace();
		}
	}

	/** 파일 다운로드 */
	@RequestMapping(value = "fileDown.do")
	public void fileDown(Model model) {
	}
	/** 파일 다운로드 */
	@RequestMapping(value="docDown.do") public void docDown(Model model) { }
	/** OZ 파일 다운로드 */
	@RequestMapping(value = "ozFileDown.do")
	public void ozFileDown(Model model) {
	}

	@RequestMapping(value = "exportChart.do")
	public void exportChart(HttpServletRequest request, Model model) {
		// String fname = request.getParameter("fname");
		// String content = request.getParameter("content");
		// byte[] dearr = Base64.decodeBase64(content);
		// String curTime = DateFormatUtils.format(new Date(),
		// "yyyyMMddHHmmssSSS");
		// String filePath = AppGlobal.homePath + "/export/" + curTime + "_" +
		// fname;
		// FileUtils.writeByteArrayToFile(new File(filePath), dearr);
		// model.addAttribute("filePath", filePath);
	}

	@RequestMapping(value="exportGrid.do")
	@SuppressWarnings("unchecked")
	public @ResponseBody ReturnData exportGrid(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> reqMap) {
		try{
			return downloadService.exportGrid(new Criterion(reqMap));
		} catch(Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	@RequestMapping(value="exportImage.do", method = RequestMethod.POST)
	public HttpServletResponse exportImage(HttpServletRequest request, HttpServletResponse response) {
		String fname = StringUtils.defaultString(request.getParameter("fname"), "");
		String imgData = StringUtils.defaultString(request.getParameter("imgData"), "");
		String fileExt = "jpg";
//		if(imgData.indexOf("image/jpeg") != -1) fileExt = "jpg";
//		imgData = imgData.replace("data:image/png;base64,", "");
		imgData = imgData.replace("data:image/jpeg;base64,", "");
//		imgData = imgData.replace("data:image/svg+xml;base64,", "");
		byte[] byteData = Base64.decodeBase64(imgData.getBytes());
		ServletOutputStream sos = null;
		try {
			fname = URLEncoder.encode(fname, "UTF-8");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + "." + fileExt + "\"");
			response.setContentType("application/octet-stream; charset=utf-8");
			sos = response.getOutputStream();
			sos.write(byteData);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sos != null) {
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

	/**
	 * Highchart를 export 폴더에 저장
	 */
	@RequestMapping(value="saveHighchart.do")
	public @ResponseBody ReturnData  saveHighchart(@RequestBody Map<String, Object> reqMap) {
		try{
			String fname = reqMap.get("fname").toString();
			String imgData = reqMap.get("imgData").toString();
			imgData = imgData.replace("data:image/png;base64,", "");
			byte[] byteData = Base64.decodeBase64(imgData.getBytes());
			String path = AppGlobal.homePath + "/export/" + fname;
			try {
				FileUtils.writeByteArrayToFile(new File(path), byteData);
			} catch (IOException e) {
				e.printStackTrace();
	//			log.error("[saveChart]", e);
			}
		}catch(Exception err){
			err.printStackTrace();
		}
		return new ReturnData();
	}
	
	/**
	 * Highchart를 png파일로 export
	 */
	@RequestMapping(value="exportHighchart.do")
	public HttpServletResponse exportHighchart(HttpServletRequest request, HttpServletResponse response) {
		String fname = StringUtils.defaultString(request.getParameter("fname"), "");
		String imgData = StringUtils.defaultString(request.getParameter("imgData"), "");
		imgData = imgData.replace("data:image/png;base64,", "");
		byte[] byteData = Base64.decodeBase64(imgData.getBytes());		
		ServletOutputStream sos = null;
		try {
			fname = URLEncoder.encode(fname, "UTF-8");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + ".png\"");
			response.setContentType("application/octet-stream; charset=utf-8");
			sos = response.getOutputStream();
			sos.write(byteData);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sos != null) {
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

	//사고접수용 첨부파일 업로드
	@RequestMapping("accUpload")
	public void fileAccUpload(@RequestParam("fileinput") MultipartFile multipartFile, @RequestParam("inciNo") String inciNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String todayPath = sdf.format(c1.getTime());

		String tempFileName = tempFileName(multipartFile);
		String originalFileName = multipartFile.getOriginalFilename();
		//String savePath = Paths.get(AppGlobal.uploadPath).toString();
		String savePath = "\\"+todayPath;

		uploadService.fileUploadLocal(multipartFile, tempFileName);

		Criterion criterion = new Criterion();
		criterion.addParam("fileName", tempFileName);
		criterion.addParam("originalFileName", originalFileName);
		criterion.addParam("fileType", originalFileName.substring(originalFileName.lastIndexOf(".") + 1));
		criterion.addParam("fileSize", multipartFile.getSize());
		criterion.addParam("inciNo", inciNo);
		criterion.addParam("savePath", savePath);
		uploadService.insertAccFileInfo(criterion);

	}

	//사고접수용 첨부파일 업로드
	@RequestMapping("accEmlCsvUpload")
	public void fileEmlAccUpload(@RequestParam("emlcsvfileinput") MultipartFile multipartFile, @RequestParam("type") String type, HttpServletRequest request, HttpServletResponse response) {

		String tempFileName = tempEmlFileName(multipartFile, type);
		String originalFileName = multipartFile.getOriginalFilename();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar c1 = Calendar.getInstance();
			String todayPath = sdf.format(c1.getTime());

//			String tempFileName = tempFileName(multipartFile);
//			String originalFileName = multipartFile.getOriginalFilename();
			//String savePath = Paths.get(AppGlobal.uploadPath).toString();
			String savePath = "\\"+todayPath;
//			String savePath = Paths.get(AppGlobal.uploadPath).toString();

			uploadService.fileUploadLocal(multipartFile, tempFileName);

			Criterion criterion = new Criterion();
			criterion.addParam("fileName", tempFileName);
			criterion.addParam("originalFileName", originalFileName);

			String fileType = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
			criterion.addParam("fileType", fileType);
			criterion.addParam("fileSize", multipartFile.getSize());
			criterion.addParam("savePath", savePath);

			emlcsvFilePath = Paths.get(AppGlobal.uploadPath).toString()+savePath;
			emlcsvFileName = tempFileName;
			emlcsvExtName = fileType;
	}

	//사고접수용 양식파일 다운로드
	@RequestMapping(value = "accEmlCsvDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData fileEmlAccDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {

		Map<String, String> resultMap = new HashMap<>();
		if(reqMap.get("type").toString().equals("csv")){
			resultMap.put("filePath", "/export/lcsc.csv");
			resultMap.put("fileName", "csv_form");
			resultMap.put("fileExt", ".csv");
		}
		else if(reqMap.get("type").toString().equals("eml")){
			resultMap.put("filePath", "/export/lcsc.eml");
			resultMap.put("fileName", "eml_form");
			resultMap.put("fileExt", ".eml");
		}
		return new ReturnData(resultMap);

	}

	@RequestMapping("accDelete")
	@ResponseBody
	public ReturnData fileAccDelete(@RequestParam Map<String, Object> reqMap) {

		List<AttachfileDto> list = downloadService.searchAccFileName(new Criterion(reqMap));

		ReturnData returnData = null;
		if (deleteService.deleteAccFileInfo(new Criterion(reqMap))) {
			returnData = deleteService.deleteAccFile(list);
		} else {
			returnData = new ReturnData();
			returnData.setResultData("삭제할 파일이 없습니다.");
		}
		return returnData;
	}

	//사고접수용 첨부파일 다운로드
	@RequestMapping("accDownload")
	public void fileAddDownload(@RequestParam("fileNo") long fileNo, HttpServletResponse response, HttpServletRequest request) {
		Criterion criterion = new Criterion();
		criterion.addParam("fileNo", fileNo);
		List<AttachfileDto> file = downloadService.searchAccFileName(criterion);

		downloadService.fileRender(response, file.get(0));
	}

	//사고유형별 처리방안 첨부파일 업로드
	@RequestMapping("codeUpload")
	public void codeUpload(@RequestParam("codefileinput") MultipartFile multipartFile, HttpServletRequest request, HttpServletResponse response, @RequestParam("code2") String code2) {
		//String tempFileName = tempFileName(multipartFile);
		String originalFileName = multipartFile.getOriginalFilename();
		String fileType = "."+originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
		String fileName = code2+fileType;

		uploadService.fileUploadHelp(multipartFile, fileName, code2);

		Criterion criterion = new Criterion();

		//String path = AppGlobal.homePath + "/ctrslogs/upload_dir/help/";

		criterion.addParam("fileName", fileName);
		criterion.addParam("code2", code2);

		uploadService.addHelpFile(criterion);

	}

	//사고유형 첨부파일 다운로드
	@RequestMapping("codeDownload")
	public void codeDownload(HttpServletResponse response, HttpServletRequest request, @RequestParam("code2") String code2) {
		Criterion criterion = new Criterion();
		//criterion.addParam("fileNo", fileNo);
		downloadService.fileRenderHelp(response, code2);
	}

	//홈페이지 모니터링 엑셀 업로드
	@RequestMapping("homeURLUpload")
	public void homeURLUpload(@RequestParam("xlsfileinput") MultipartFile multipartFile, HttpServletRequest request, HttpServletResponse response) {

		String tempFileName = tempEmlFileName(multipartFile, "xls");
		String originalFileName = multipartFile.getOriginalFilename();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String todayPath = sdf.format(c1.getTime());

		String savePath = "\\"+todayPath;

		uploadService.fileUploadLocal(multipartFile, tempFileName);

		Criterion criterion = new Criterion();
		criterion.addParam("fileName", tempFileName);
		criterion.addParam("originalFileName", originalFileName);

		String fileType = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
		criterion.addParam("fileType", fileType);
		criterion.addParam("fileSize", multipartFile.getSize());
		criterion.addParam("savePath", savePath);

		xlsFilePath = Paths.get(AppGlobal.uploadPath).toString()+savePath;
		xlsFileName = tempFileName;
		xlsExtName = fileType;
	}

	//홈페이지용 양식파일 다운로드
	@RequestMapping(value = "homeXlsDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData homeXlsDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {

		Map<String, String> resultMap = new HashMap<>();
		resultMap.put("filePath", "/export/home.xls");
		resultMap.put("fileName", "xls_form");
		resultMap.put("fileExt", ".xls");

		return new ReturnData(resultMap);

	}
}
