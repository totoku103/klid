package com.klid.webapp.common.file.service;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import jakarta.annotation.Resource;

import com.klid.webapp.common.code.dto.CodeDto;
import java.util.Base64;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.klid.common.AppGlobal;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.file.persistence.FileUploadMapper;

@Service("fileUploadService")
public class FileUploadServiceImpl extends MsgService implements FileUploadService {

	@Resource(name = "fileUploadMapper")
	public FileUploadMapper mapper;

	@Override
	public void fileUploadLocal(MultipartFile multipartFile, String tempFileName) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String todayPath = sdf.format(c1.getTime());

		Path folderPath = Paths.get(AppGlobal.uploadPath + todayPath);
		if (!Files.exists(folderPath)) {
			try {
				Files.createDirectories(folderPath);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		try {
			tempFileName = URLEncoder.encode(tempFileName, "UTF-8");
			tempFileName = tempFileName.substring(0,tempFileName.length()>150?150:tempFileName.length());
		} catch (UnsupportedEncodingException e2) {
			e2.printStackTrace();
		}
		Path path = Paths.get(AppGlobal.uploadPath + todayPath, tempFileName);
		try {
			OutputStream os = new BufferedOutputStream(Files.newOutputStream(path, StandardOpenOption.CREATE_NEW));
			os.write(multipartFile.getBytes());
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void agentFileUploadLocal(MultipartFile multipartFile, String tempFileName) {
		Path folderPath = Paths.get(AppGlobal.uploadPath, "SMS") ;
		if (!Files.exists(folderPath)) {
			try {
				Files.createDirectories(folderPath);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		Path path = Paths.get(AppGlobal.uploadPath, "SMS", tempFileName);
		try {
			OutputStream os = new BufferedOutputStream(Files.newOutputStream(path, StandardOpenOption.CREATE_NEW));
			os.write(multipartFile.getBytes());
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public ReturnData fileUploadDB(MultipartFile multipartFile) {
		return null;
	}

	@Override
	public ReturnData insertFileInfo(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.insertFileInfo(criterion.getCondition());
		returnData.setResultData(getAddOkMessage());
		return returnData;
	}

	//사고접수용 첨부파일 업로드
	@Override
	public ReturnData insertAccFileInfo(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.insertAccFileInfo(criterion.getCondition());
		returnData.setResultData(getAddOkMessage());
		return returnData;
	}

	@Override
	public void fileUploadHelp(MultipartFile multipartFile, String tempFileName, String code2) {
		//Path folderPath = Paths.get("/ctrslogs/upload_dir/help/");
		Path folderPath = Paths.get(AppGlobal.uploadHelpPath);
		if (!Files.exists(folderPath)) {
			try {
				Files.createDirectories(folderPath);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		try {
			tempFileName = URLEncoder.encode(tempFileName, "UTF-8");
		} catch (UnsupportedEncodingException e2) {
			e2.printStackTrace();
		}
		/*Criterion criterion = new Criterion();
		criterion.addParam("code2", code2);
		CodeDto helpAttInfo = mapper.helpFileName(criterion.getCondition());*/

		//업로드 할 경우 동일 파일 존재시 comcode3에 있는 기존의 파일명 호출 후 삭제
		Path postPath = Paths.get(AppGlobal.uploadHelpPath, tempFileName);
		try {
			// Files.delete(path);
			Files.deleteIfExists(postPath);
		} catch (IOException e) {
			e.printStackTrace();
		}

		Path path = Paths.get(AppGlobal.uploadHelpPath, tempFileName);
		try {
			OutputStream os = new BufferedOutputStream(Files.newOutputStream(path, StandardOpenOption.CREATE_NEW));
			os.write(multipartFile.getBytes());
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public ReturnData addHelpFile(Criterion criterion) {
		ReturnData returnData = new ReturnData();

		mapper.addHelpFile(criterion.getCondition());
		returnData.setResultData(getAddOkMessage());
		return returnData;
	}

}
