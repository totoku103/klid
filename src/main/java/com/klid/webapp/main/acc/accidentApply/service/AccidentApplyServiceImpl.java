package com.klid.webapp.main.acc.accidentApply.service;

import com.klid.webapp.common.*;
import com.klid.webapp.common.controller.FileController;
import com.klid.webapp.common.file.persistence.FileUploadMapper;
import com.klid.webapp.main.acc.accidentApply.persistence.AccidentApplyMapper;
import com.klid.webapp.main.acc.accidentApply.dto.AccidentApplyDto;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.klid.common.SEED_KISA256;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.io.*;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author imhojong
 *
 */
@Service("accidentApplyService")
public class AccidentApplyServiceImpl extends MsgService implements AccidentApplyService {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Resource(name = "accidentApplyMapper")
	private AccidentApplyMapper mapper;

	@Resource(name = "fileUploadMapper")
	public FileUploadMapper fileUploadMapper;

	/** 신고 목록	 */
	@Override
	public ReturnData getAccidentApplyList(Criterion criterion){
		String myAuthMain = SessionManager.getUser().getAuthMain();
		String paramAuthMain = criterion.getValue("sAuthMain").toString();
		if(!myAuthMain.equals(paramAuthMain)){
			throw new CustomException("잘못된 접근입니다.");
		}
		//사고내용 검색이 있을 경우 띄어쓰기를 기준으로 IN 조건
		if(!criterion.getCondition().get("inciDclCont").equals("")){
			String arr = (String) criterion.getCondition().get("inciDclCont"); //검색 값 전체 string 값 ex)1111 test ip 기관
			String[] arrSplit = arr.split(" ");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			criterion.addParam("InciDclCont", list);
		}

		//조사내용 검색이 있을 경우 띄어쓰기를 기준으로 IN 조건 inciBelowCont
		if(!criterion.getCondition().get("inciInvsCont").equals("")){
			String arr = (String) criterion.getCondition().get("inciInvsCont"); //검색 값 전체 string 값 ex)1111 test ip 기관
			String[] arrSplit = arr.split(" ");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			criterion.addParam("InciInvsCont", list);
		}

		//시도의견 검색이 있을 경우 띄어쓰기를 기준으로 IN 조건
		if(!criterion.getCondition().get("inciBelowCont").equals("")){
			String arr = (String) criterion.getCondition().get("inciBelowCont"); //검색 값 전체 string 값 ex)1111 test ip 기관
			String[] arrSplit = arr.split(" ");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			criterion.addParam("InciBelowCont", list);
		}

		//접수방법 복수 선택 ,를 기준으로 IN 조건
		if(!criterion.getCondition().get("srchAcpnMthd").equals("")){
			String arr = (String) criterion.getCondition().get("srchAcpnMthd");
			String[] arrSplit = arr.split(",");

			List<String> list = new ArrayList<String>();

			for(int i=0; i<arrSplit.length; i++){
				list.add(arrSplit[i]);
			}
			criterion.addParam("srchAcpnMthdList", list);
		}

		return new ReturnData(mapper.getAccidentApplyList(criterion.getCondition()));
	}

	/** 신고 등록	 */
	@Override
	public ReturnData addAccidentApply(Criterion criterion) {

		//신고기관 담당자 이메일 암호화
	    /*if(!criterion.getValue("dclEmail").equals("")){
            String dclEmail = criterion.getValue("dclEmail").toString();
            criterion.addParam("dclEmail", SEED_KISA256.Encrypt(dclEmail));
        }

        //피해정보 담당자 이메일 암호화
        if(!criterion.getValue("dmgEmail").equals("")){
            String dmgEmail = criterion.getValue("dmgEmail").toString();
            criterion.addParam("dmgEmail", SEED_KISA256.Encrypt(dmgEmail));
        }*/

		mapper.addAccidentApply(criterion.getCondition());

		//피해기관 IP
		if(!criterion.getCondition().get("dmgIpList").equals("")){
			List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("dmgIpList");
			for(int i=0; i<list.size(); i++){
				criterion.addParam("dmgIp", list.get(i));
				mapper.addDmgIp(criterion.getCondition());
			}
		}
		//공격기관 IP
		if(!criterion.getCondition().get("attIpList").equals("")){
			List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("attIpList");
			for(int i=0; i<list.size(); i++){
				criterion.addParam("attIp", list.get(i));
				mapper.addAttIp(criterion.getCondition());
			}
		}

		//비고 여부 확인 0:없음, 1:해킹, 2:취약점탐지
		if(criterion.getValue("remarks") != null){
			if(criterion.getValue("remarks").equals("1") ){		// 비고: 해킹 - tbzhacking 테이블 insert
				mapper.addTbzHacking(criterion.getCondition());
			}else if(criterion.getValue("remarks").equals("2") ){	//비고: 취약점탐지 - tbzvulner 테이블 insert
				mapper.addTbzHomepv(criterion.getCondition());
			}
		}
		return new ReturnData(criterion.getValue("inciNo"));
	}

	/** 신고 수정 */
	@Override
	public ReturnData editAccidentApply(Criterion criterion) {
		//피해시스템 정보 담당자 이메일 암호화
        /*if(criterion.getCondition().get("dmgEmail") != null){
            String dmgEmail = criterion.getValue("dmgEmail").toString();
            criterion.addParam("dmgEmail", SEED_KISA256.Encrypt(dmgEmail));
        }*/
		//사고 수정시 히스토리
		mapper.addAccidentHistory(criterion.getCondition());

		mapper.editAccidentApply(criterion.getCondition());

		//피해기관 IP
		if(criterion.getCondition().get("dmgIpList") != null){
			//inciNo를 기준으로 이미 등록된 아이피 우선 삭제 후 재등록
			mapper.deleteDmgIp(criterion.getCondition());

			List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("dmgIpList");
			for(int i=0; i<list.size(); i++){
				criterion.addParam("dmgIp", list.get(i));
				mapper.addDmgIp(criterion.getCondition());
			}
		}

		//공격기관 IP
		if(criterion.getCondition().get("attIpList") != null){
			//inciNo를 기준으로 이미 등록된 아이피 우선 삭제 후 재등록
			mapper.deleteAttIp(criterion.getCondition());

			List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("attIpList");
			for(int i=0; i<list.size(); i++){
				criterion.addParam("attIp", list.get(i));
				mapper.addAttIp(criterion.getCondition());
			}
		}

		//비고 여부 확인 0:없음, 1:해킹, 2:취약점탐지
		if(criterion.getValue("remarks") != null){
			if(criterion.getValue("remarks").equals("1") ){
				mapper.updateTbzHacking(criterion.getCondition());
			}else if(criterion.getValue("remarks").equals("2") ){
				mapper.updateTbzHomepv(criterion.getCondition());
			}
		}
		return new ReturnData(criterion.getCondition());
	}

	/** 신고 삭제 */
	@Override
	public ReturnData deleteAccidentApply(Criterion criterion) {
		mapper.deleteAccidentApply(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	/** 기관 목록	 */
	@Override
	public ReturnData getAccidenDeptList(Criterion criterion) {
		return new ReturnData(mapper.getAccidenDeptList(criterion.getCondition()));
	}

	@Override
	public ReturnData getAccidentDetail(Criterion criterion) {

		Map<String, Object> returnList = new HashMap<String, Object>();
		AccidentApplyDto accidentApplyDto = mapper.getAccidentLDetail(criterion.getCondition());

		//암호화된 이메일 정보 복호화
        /*if(accidentApplyDto.getDclEmail() != null){
            SEED_KISA256.Decrypt(accidentApplyDto.getDclEmail().toString());
            accidentApplyDto.setDclEmail(SEED_KISA256.Decrypt(accidentApplyDto.getDclEmail().toString()));
        }

        if(accidentApplyDto.getDmgEmail() != null){
            SEED_KISA256.Decrypt(accidentApplyDto.getDmgEmail().toString());
            accidentApplyDto.setDmgEmail(SEED_KISA256.Decrypt(accidentApplyDto.getDmgEmail().toString()));
        }*/

		//returnList.put("contents", mapper.getAccidentLDetail(criterion.getCondition()));
		//멀티이관의 경우 원사고의 첨부파일을 공유한다. 쿼리에서 noMuti 번호를 OR로 추가
		if(accidentApplyDto.getInciNo().toString().length() > 16){
			if(accidentApplyDto.getInciNoMulti() != null ){
				criterion.addParam("inciNoMulti", accidentApplyDto.getInciNoMulti());
			}
		}

		returnList.put("attachFile", mapper.selectAttachFileList(criterion.getCondition()));

		//처리방안 첨부파일 정보 쿼리 호출
		criterion.addParam("code2", accidentApplyDto.getAccdTypCd());
		returnList.put("attachHelpFile", fileUploadMapper.helpFileName(criterion.getCondition()));
		returnList.put("contents", accidentApplyDto);

		return new ReturnData(returnList);
	}

	/** 신고접수 상태 변경 */
	@Override
	public ReturnData updateAccidentProcess(Criterion criterion){
		int siGunUpdateCnt = 0; //다중 이관 여부 체크 카운트

		mapper.addAccidentHistory(criterion.getCondition());

		//프로세스가 이관승인 인지 체크
		String siGunApplyYn = "N";
		if(criterion.getValue("inciPrcsStat") != null){
			if(criterion.getValue("inciPrcsStat").toString().equals("11")){
				siGunApplyYn = "Y";
			}
		}
		if(criterion.getValue("transInciPrcsStat") != null){
			if(criterion.getValue("transInciPrcsStat").toString().equals("11")){
				siGunApplyYn = "Y";
			}
		}
		//이관 요청 승인시 다중이관으로 신규 접수된 사고들 (상태값 99)을 접수상태 (1)로 update
		//해당 로직은 다중이관 신청일수도 아닐수도 있기때문에 있을 경우 update , 없을 경우 X
		if(siGunApplyYn.equals("Y")){
			siGunUpdateCnt = mapper.updateSigunAccApply(criterion.getCondition()); //99 ->1 로직
		}

		if(siGunApplyYn.equals("Y")){
			//다중 이관된 데이터가 존재 했을 경우 원사고 처리할 값 세팅
			if(siGunUpdateCnt > 0){
				if(SessionManager.getUser().getAuthMain().equals("AUTH_MAIN_2")){ //개발원에서 처리 -> 개발원, 시도 양쪽 종결 , 시군구는 없음
					criterion.addParam("inciPrcsStat", 13);
					criterion.addParam("transInciPrcsStat", 13);
					criterion.addParam("transSidoPrcsStat", 0);

				}
				if(SessionManager.getUser().getAuthMain().equals("AUTH_MAIN_3")){ //시도에서 처리 -> 시도만 종결 처리, 시군구는 없음
					//criterion.addParam("transInciPrcsStat", 13); //시도에서 시군구로 멀티 이관할 경우 종결이 아닌 '이관' 상태 유지
					criterion.addParam("transSidoPrcsStat", 0);
				}

			}
		}
		//멀티이관을 요청한 상태에서 반려를 했을 경우 99로 생성된 멀티 이관건을 삭제한다.
		if(criterion.getValue("multiRejectYn") != null){
			if(criterion.getValue("multiRejectYn").equals("Y")){
				mapper.deleteMultiReject(criterion.getCondition());
			}

		}

		mapper.updateAccidentProcess(criterion.getCondition());


		//멀티이관 사고 히스토리의 경우 본인사고 + 원본사고에 이력을 남긴다.
		if(criterion.getValue("inciNo").toString().length() > 16){
			if(criterion.getValue("inciNoMulti") != null){
				criterion.addParam("inciNo", criterion.getValue("inciNoMulti")); //원사고 번호
				mapper.addAccidentHistory(criterion.getCondition());
			}
		}

		return new ReturnData(criterion.getCondition());
		//return new ReturnData(criterion.getValue("inciNo"));
	}

	/** 신고  상태 변경(이관기간이 복수일 경우) */
	@Override
	public ReturnData updateMultiAccidentProcess(Criterion criterion){
		mapper.addAccidentHistory(criterion.getCondition());

		List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("inciTrnsRcptInstCd");

		for(int i=0; i<list.size(); i++){
			criterion.addParam("inciNoTran", criterion.getValue("inciNo")+"-" + (i+1)*1 ); //다중이관의 경우 inci_no는 기존 사고접수의 inci_no + '-' 1~n
			criterion.addParam("inciTrnsRcptInstCd", list.get(i)); //선택 n개의 이관기관번호
			mapper.updateMultiAccidentProcess(criterion.getCondition());
		}
		//다중 이관 (insert/select) 완료후 기존 원 사고접수를 update (이관접수기관번호(inciTrnsRcptInstCd) = 원래 가지고있던 피해기관 번호 dmgInstCd)
		criterion.addParam("inciTrnsRcptInstCd", criterion.getValue("baseInciTrnsRcptInstCd"));

		//원사고의 개발원 상태, 시 상태는 종결로 처리
		//criterion.addParam("inciPrcsStat", 13);
		//criterion.addParam("transInciPrcsStat", 13);

		mapper.updateAccidentProcess(criterion.getCondition());


		return new ReturnData(criterion.getCondition());
	}

	/** 히스토리 이력 목록	 */
	@Override
	public ReturnData getAccidentHistoryList(Criterion criterion){
		return new ReturnData(mapper.getAccidentHistoryList(criterion.getCondition()));
	}

	public ReturnData getLocalList(Criterion criterion) {
		return new ReturnData(mapper.getLocalList(criterion.getCondition()));
	}

	@Override
	public ReturnData importEml(Criterion criterion) {
		try {

			String filename = FileController.emlcsvFilePath+"\\"+FileController.emlcsvFileName;

			File emlFile = new File(filename);
			Properties props = System.getProperties();

			Session mailSession = Session.getDefaultInstance(props, null);

			InputStream inputStream = null;
			inputStream = new FileInputStream(emlFile);
			MimeMessage message = new MimeMessage(mailSession, inputStream);

			StringBuilder builder = new StringBuilder();
			builder.append(message.getSubject()+"\n");

			String sDate = null,sHH = null,sMM = null,sSubject = null,sAttIP=null, sDepIp=null;

			Address[] froms = message.getFrom();
			String from_email = froms == null ? null : ((InternetAddress) froms[0]).getAddress();

			Address[] receips = message.getAllRecipients();
			String receipt_email = receips == null ? null : ((InternetAddress) receips[0]).getAddress();

			Multipart multipart = (Multipart)message.getContent();
			Part p = multipart.getBodyPart(0);
			String[] test = p.getContent().toString().split(":");
			builder.append("출발지 : "+test[8].split("\r\n")[0].trim()+"\n");
			builder.append("목적지 : "+test[9].split("\r\n")[0].trim()+"\n");
			builder.append("탐지명 : "+test[6].split("\r\n")[0].trim()+"\n");
			builder.append("내용"+"\n");
			builder.append("- "+test[1].split("\r\n")[0].trim()+"\n");

			String[] last = test[10].split("\r\n");
			for(int i=1; i<last.length; i++){
				builder.append(last[i]+"\n");
			}

			sDate = test[3].split(" ")[1].trim();
			sHH = test[3].split(" ")[2].trim();
			sMM = test[4].trim();
//			sSubject = "통-"+test[9].split(" ")[1]+"["+test[6].split(" ")[1]+"]";
			sSubject = "통-"+test[9].split("\r\n")[0].trim();
			sDepIp = test[9].split("\r\n")[0].trim();
			sAttIP = test[8].split("\r\n")[0].trim();

			Map<String, String> resultMap = new HashMap<>();
			resultMap.put("inciDclCont",builder.toString());
			resultMap.put("inciTtl",sSubject);
			resultMap.put("inciDttNm",test[6].split("\r\n")[0].trim());
			resultMap.put("sDate",sDate);
			resultMap.put("sHH",sHH);
			resultMap.put("sMM",sMM);
			resultMap.put("sDepIp",sDepIp);
			resultMap.put("sAttIP",sAttIP);
			resultMap.put("dclEmail",receipt_email);
			resultMap.put("dmgEmail",from_email);

			Map<String, Object> requestMap = new HashMap<>();
			requestMap.put("dttNm",test[6].split("\r\n")[0].trim());
			AccidentApplyDto dto = mapper.getAccdTypByDttNm(requestMap);

			if(dto==null){
				resultMap.put("accdTypCd","0");
			}else {
				resultMap.put("accdTypCd",dto.getComCode2());
			}

			return new ReturnData(resultMap);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return new ReturnData();
	}

	@Override
	public ReturnData importExcel(Criterion criterion) {

		BufferedReader br = null;
		String filename = FileController.emlcsvFilePath+"\\"+FileController.emlcsvFileName;

		String fileType = FileController.emlcsvExtName;

		try {

			Map<String, Object> resultMap = new HashMap<>();
			Map<String, Object> requestMap = new HashMap<>();

			if(fileType.equals("csv")){ //csv인경우 - 5.0
				// 0 - mgr_time
				// 1 - event_time
				// 2 - origin
				// 3 - origin_name
				// 4 - s_ip
				// 5 - s_port
				// 6 - d_ip
				// 7 - d_port
				// 8 - direction
				// 9 - protocol
				// 10 - status
				// 11 - attack
				// 12 - count
				// 13 - product
				// 14 - note
				// 15 - esm_ser_no

				//UTF-8
				CSVReader csvReader = new CSVReaderBuilder(new InputStreamReader(new FileInputStream(filename), "UTF-8"))
						.withSkipLines(1)
						.build();
				List<String[]> allData = csvReader.readAll();

				String[] firstRow = allData.get(0);

				int sum = 0;
				//카운트
				for( int i=0; i<allData.size(); i++){
					String counts = "";

					if(allData.get(i)[12].equals("")){
						counts = "1";
					}
					else if(allData.get(i)[12].equals("-")){
						counts = "1";
					}
					else{
						counts = allData.get(i)[12];
					}
					sum = sum+Integer.parseInt(counts);
				}

				//사고 일자
				String mgr_time = firstRow[0];
				String event_time = firstRow[1];
				SimpleDateFormat dt = new SimpleDateFormat("yyyyyMMdd HHmmss");
				if(event_time.equals("")){
					resultMap.put("sDate",mgr_time.split(" ")[0]);
					if(mgr_time.split(" ").length>1) {
						resultMap.put("sHH", mgr_time.split(" ")[1].substring(0, 2));
						resultMap.put("sMM", mgr_time.split(" ")[1].substring(2, 4));
					}
				}else if(mgr_time.compareTo(event_time)<0){
					resultMap.put("sDate",event_time.split(" ")[0]);
					if(event_time.split(" ").length>1) {
						resultMap.put("sHH", event_time.split(" ")[1].substring(0, 2));
						resultMap.put("sMM", event_time.split(" ")[1].substring(2, 4));
					}
				}else{
					resultMap.put("sDate",mgr_time.split(" ")[0]);
					if(mgr_time.split(" ").length>1) {
						resultMap.put("sHH", mgr_time.split(" ")[1].substring(0, 2));
						resultMap.put("sMM", mgr_time.split(" ")[1].substring(2, 4));
					}
				}

				//ESM 시리얼 번호
				if(firstRow.length>15){
					switch (firstRow[15]){
						case "":
						case "0":
						case "1":
							resultMap.put("esmSerNo","1");
							break;
						default:
							resultMap.put("esmSerNo",firstRow[0]);
							break;
					}
				}

				String origin = firstRow[2];
				String s_ip = firstRow[4];
				String d_ip = firstRow[6];
				if(!origin.equals("")){
					if(origin.split("\\.")[0].equals(s_ip.split("\\.")[0])){ //origin과 s_ip가 동일한경우 s_ip가 피해IP
						resultMap.put("sAttIP",ipTolong(d_ip));
						resultMap.put("sIP",d_ip);
						resultMap.put("sDepIP",ipTolong(s_ip));
						resultMap.put("dIP",s_ip);
					}else if(origin.split("\\.")[0].equals(d_ip.split("\\.")[0])){ //origin과 d_ip가 동일한경우 d_ip가 피해IP
						resultMap.put("sAttIP",ipTolong(s_ip));
						resultMap.put("sIP",s_ip);
						resultMap.put("sDepIP",ipTolong(d_ip));
						resultMap.put("dIP",d_ip);
					}else { //origin과 s_ip, d_ip가 동일하지 않은 경우
						if(s_ip.split("\\.")[0].equals("152")||
								s_ip.split("\\.")[0].equals("27")||
								s_ip.split("\\.")[0].equals("210")||
								s_ip.split("\\.")[0].equals("10")){ // s_ip가 152,27,210,10 으로 시작하는 경우 s_ip가 피해 IP
							resultMap.put("sAttIP",ipTolong(d_ip));
							resultMap.put("sIP",d_ip);
							resultMap.put("sDepIP",ipTolong(s_ip));
							resultMap.put("dIP",s_ip);
						}else if(d_ip.split("\\.")[0].equals("152")||
								d_ip.split("\\.")[0].equals("27")||
								d_ip.split("\\.")[0].equals("210")||
								d_ip.split("\\.")[0].equals("10")){ // d_ip가 152,27,210,10 으로 시작하는 경우 d_ip가 피해 IP
							resultMap.put("sAttIP",ipTolong(s_ip));
							resultMap.put("sIP",s_ip);
							resultMap.put("sDepIP",ipTolong(d_ip));
							resultMap.put("dIP",d_ip);
						}else{ // s_ip, d_ip 모두 일치하지 않은 경우 s_ip가 피해 IP
							resultMap.put("sAttIP",ipTolong(d_ip));
							resultMap.put("sIP",d_ip);
							resultMap.put("sDepIP",ipTolong(s_ip));
							resultMap.put("dIP",s_ip);
						}
					}

					requestMap.put("checkIp",ipTolong(origin));
					AccidentApplyDto dto = mapper.getInstByIP(requestMap);

					if (dto != null) {
						resultMap.put("dmgInstNm",dto.getInstNm());
						resultMap.put("dmgInstCd", dto.getInstCd());
					}
				}

//				String origin_name = firstRow[3];
//				byte[] byteText = origin_name.getBytes(Charset.forName("UTF-8"));
//				origin_name = new String(byteText, "UTF-8");
//				int _jeju = 0; // 0 : 제주 아님, 1 : 제주도, 2 : 제주시
//				if(!origin_name.equals("")){
//					String[] originNames=origin_name.split("_");
//					String _originName=null;
//					if(originNames.length>1){
//						_originName = origin_name.split("_")[1];
//					}
//					if(_originName!=null){
//						if(_originName.length()>1){
//							if(_originName.substring(0,2).equals("본청")||
//									_originName.substring(0,2).equals("IP")){
//								resultMap.put("dmgInstNm",origin_name.substring(0,2));
//								requestMap.put("localNm", origin_name.substring(0,2));
//								requestMap.put("instNm", origin_name.substring(0,2));
//								if(origin_name.substring(0,2).equals("제주")){
//									_jeju=1;
//								}
//							}else {
//								resultMap.put("dmgInstNm", _originName.substring(0, 2));
//								requestMap.put("localNm", origin_name.substring(0, 2));
//								requestMap.put("instNm", _originName.substring(0, 2));
//								if(_originName.substring(0, 2).equals("제주")){
//									_jeju=2;
//								}
//							}
//						}else{
//							resultMap.put("dmgInstNm",origin_name.substring(0,2));
//							requestMap.put("localNm",origin_name.substring(0,2));
//							requestMap.put("instNm", origin_name.substring(0,2));
//							if(origin_name.substring(0,2).equals("제주")){
//								_jeju=1;
//							}
//						}
//					}
//
//					if(_jeju==0){
//						if(resultMap.get("dmgInstNm")!=null) {
//							AccidentApplyDto dto = mapper.getNmByInstCd(requestMap);
//
//							if (dto != null)
//								resultMap.put("dmgInstCd", dto.getInstCd());
//						}
//					}else if(_jeju==1)
//						resultMap.put("dmgInstCd",6500000);
//					else if(_jeju==2)
//						resultMap.put("dmgInstCd",6510000);
//				}

				String attack = firstRow[11];

				if(!attack.equals(""))
					requestMap.put("dttNm",attack);

				AccidentApplyDto dto = mapper.getAccdTypByDttNm(requestMap);

				if(dto==null){
					resultMap.put("accdTypCd","0");
				}else {
					resultMap.put("accdTypCd",dto.getComCode2());
				}

				resultMap.put("inciTtl",resultMap.get("dIP")+"["+attack+"]");

				StringBuilder builder = new StringBuilder();

				builder.append("o 사이버침해대응지원센터\n" +
						" 1. 시도 사이버침해대응지원센터는 국가사이버안전관리규정(대통령훈령) 제 10조의 22항과\n" +
						"    국가전산망 보안관제 지침 2조 9항에 의거 사이버공격으로부터 지자체 정보자산에 대한\n" +
						"    보안관제지원 업무를 수행하고 있습니다.\n\n" +
						" 2. 국가사이버안전관리규정(대통령훈령) 제 14조(전문기관간 협력)와 국가정보원 국가전산망\n" +
						"    보안관제지침 18조(정보이관)에 의거 사이버위협정보를 이관하오니 국가사이버안전관리규정\n" +
						"    (대통령훈령) 제 12조 2항에 의거 신속한 피해유무 확인을 부탁드립니다.\n\n" +
						"o 관련정보\n");

				builder.append(" - 출발지 : "+s_ip+"\n");
				builder.append(" - 목적지 : "+d_ip+"\n");
				builder.append(" - 탐지명 : "+attack+"\n");
				builder.append(" - 탐지횟수 : "+allData.size()+"건 / "+sum+"회\n");

				resultMap.put("inciDclCont",builder.toString());
				resultMap.put("inciDttNm",attack);
			}else if(fileType.equals("xls")){
				HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(filename));
				HSSFSheet sheet = workbook.getSheetAt(0);
				// 0 - mgr_time
				// 1 - event_time
				// 2 - origin_name
				// 3 - origin
				// 4 - s_ip
				// 5 - s_port
				// 6 - d_ip
				// 7 - d_port
				// 8 - count
				// 9 - direction
				// 10 - protocol
				// 11 - status
				// 12 - Method
				// 13 - esm_ser_no

				resultMap = commonExcelImport(resultMap, sheet);

			}else if(fileType.equals("xlsx")){
				XSSFWorkbook workbook = new XSSFWorkbook(new FileInputStream(new File(filename)));
				XSSFSheet sheet = workbook.getSheetAt(0);

				resultMap = commonExcelImport(resultMap, sheet);
			}

			resultMap.put("fileType",fileType);

			return new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(br != null){
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return new ReturnData();
	}

	public Map<String, Object> commonExcelImport(Map<String, Object> resultMap,Sheet sheet){

		Map<String, Object> requestMap = new HashMap<>();

		int rows = sheet.getPhysicalNumberOfRows();

		String mgr_time = (sheet.getRow(1).getCell(0)).getStringCellValue();
		String event_time = (sheet.getRow(1).getCell(1)).getStringCellValue();
		String origin_name = (sheet.getRow(1).getCell(2)).getStringCellValue();
		String origin = (sheet.getRow(1).getCell(3)).getStringCellValue();
		String s_ip = (sheet.getRow(1).getCell(4)).getStringCellValue();
		String d_ip = (sheet.getRow(1).getCell(6)).getStringCellValue();
//		double count = (sheet.getRow(1).getCell(8)).getNumericCellValue();
		String direction = (sheet.getRow(1).getCell(9)).getStringCellValue();
		String Method = (sheet.getRow(1).getCell(12)).getStringCellValue();

		int sum = 0;

		//카운트
		for( int i=1; i<rows; i++){
			String counts = "";
			try {
				counts = sheet.getRow(i).getCell(8).getStringCellValue();
			}catch (NullPointerException e){
				e.printStackTrace();
				counts="1";
			}catch (IllegalStateException e){
				e.printStackTrace();
				counts="1";
			}
			sum = sum+Integer.parseInt(counts);
		}

		SimpleDateFormat dt = new SimpleDateFormat("yyyyyMMdd HHmmss");
		if(event_time.equals("")){
			resultMap.put("sDate",mgr_time.split(" ")[0]);
			if(mgr_time.split(" ").length>1) {
				resultMap.put("sHH", mgr_time.split(" ")[1].substring(0, 2));
				resultMap.put("sMM", mgr_time.split(" ")[1].substring(3, 5));
			}
		}else if(mgr_time.compareTo(event_time)<0){
			resultMap.put("sDate",event_time.split(" ")[0]);
			if(event_time.split(" ").length>1) {
				resultMap.put("sHH", event_time.split(" ")[1].substring(0, 2));
				resultMap.put("sMM", event_time.split(" ")[1].substring(3, 5));
			}
		}else{
			resultMap.put("sDate",mgr_time.split(" ")[0]);
			if(mgr_time.split(" ").length>1) {
				resultMap.put("sHH", mgr_time.split(" ")[1].substring(0, 2));
				resultMap.put("sMM", mgr_time.split(" ")[1].substring(3, 5));
			}
		}

		if(!origin.equals("")){
			if(origin.split("\\.")[0].equals(s_ip.split("\\.")[0])){ //origin과 s_ip가 동일한경우 s_ip가 피해IP
				resultMap.put("sAttIP",ipTolong(d_ip));
				resultMap.put("sIP",d_ip);
				resultMap.put("sDepIP",ipTolong(s_ip));
				resultMap.put("dIP",s_ip);
			}else if(origin.split("\\.")[0].equals(d_ip.split("\\.")[0])){ //origin과 d_ip가 동일한경우 d_ip가 피해IP
				resultMap.put("sAttIP",ipTolong(s_ip));
				resultMap.put("sIP",s_ip);
				resultMap.put("sDepIP",ipTolong(d_ip));
				resultMap.put("dIP",d_ip);
			}else { //origin과 s_ip, d_ip가 동일하지 않은 경우
				if(s_ip.split("\\.")[0].equals("152")||
						s_ip.split("\\.")[0].equals("27")||
						s_ip.split("\\.")[0].equals("210")||
						s_ip.split("\\.")[0].equals("10")){ // s_ip가 152,27,210,10 으로 시작하는 경우 s_ip가 피해 IP
					resultMap.put("sAttIP",ipTolong(d_ip));
					resultMap.put("sIP",d_ip);
					resultMap.put("sDepIP",ipTolong(s_ip));
					resultMap.put("dIP",s_ip);
				}else if(d_ip.split("\\.")[0].equals("152")||
						d_ip.split("\\.")[0].equals("27")||
						d_ip.split("\\.")[0].equals("210")||
						d_ip.split("\\.")[0].equals("10")){ // d_ip가 152,27,210,10 으로 시작하는 경우 d_ip가 피해 IP
					resultMap.put("sAttIP",ipTolong(s_ip));
					resultMap.put("sIP",s_ip);
					resultMap.put("sDepIP",ipTolong(d_ip));
					resultMap.put("dIP",d_ip);
				}else{ // s_ip, d_ip 모두 일치하지 않은 경우 s_ip가 피해 IP
					resultMap.put("sAttIP",ipTolong(d_ip));
					resultMap.put("sIP",d_ip);
					resultMap.put("sDepIP",ipTolong(s_ip));
					resultMap.put("dIP",s_ip);
				}
			}

			requestMap.put("checkIp",ipTolong(origin));
			AccidentApplyDto dto = mapper.getInstByIP(requestMap);

			if (dto != null) {
				resultMap.put("dmgInstNm",dto.getInstNm());
				resultMap.put("dmgInstCd", dto.getInstCd());
			}
		}

//		int _jeju = 0; // 0 : 제주 아님, 1 : 제주도, 2 : 제주시
//		if(!origin_name.equals("")){
//			String[] originNames=origin_name.split("_");
//			String _originName=null;
//			if(originNames.length>1){
//				_originName = originNames[1];
//			}
//			if(_originName!=null) {
//				if (_originName.length() > 1) {
//					if (_originName.substring(0, 2).equals("본청") ||
//							_originName.substring(0, 2).equals("IP")) {
//						resultMap.put("dmgInstNm", origin_name.substring(0, 2));
//						requestMap.put("localNm", origin_name.substring(0, 2));
//						requestMap.put("instNm", origin_name.substring(0, 2));
//						if (origin_name.substring(0, 2).equals("제주")) {
//							_jeju = 1;
//						}
//					} else {
//						resultMap.put("dmgInstNm", _originName.substring(0, 2));
//						requestMap.put("localNm", origin_name.substring(0, 2));
//						requestMap.put("instNm", _originName.substring(0, 2));
//						if (_originName.substring(0, 2).equals("제주")) {
//							_jeju = 2;
//						}
//					}
//				} else {
//					resultMap.put("dmgInstNm", origin_name.substring(0, 2));
//					requestMap.put("localNm", origin_name.substring(0, 2));
//					requestMap.put("instNm", origin_name.substring(0, 2));
//					if (origin_name.substring(0, 2).equals("제주")) {
//						_jeju = 1;
//					}
//				}
//			}
//
//			if(_jeju==0) {
//				if(resultMap.get("dmgInstNm")!=null) {
//					AccidentApplyDto dto = mapper.getNmByInstCd(requestMap);
//
//					if (dto != null)
//						resultMap.put("dmgInstCd", dto.getInstCd());
//				}
//			}else if(_jeju==1)
//				resultMap.put("dmgInstCd",6500000);
//			else if(_jeju==2)
//				resultMap.put("dmgInstCd",6510000);
//		}

		if(!Method.equals(""))
			requestMap.put("dttNm",Method);

		AccidentApplyDto dto = mapper.getAccdTypByDttNm(requestMap);

		if(dto==null){
			resultMap.put("accdTypCd","0");
		}else {
			resultMap.put("accdTypCd",dto.getComCode2());
		}

		resultMap.put("inciTtl",resultMap.get("dIP")+"["+Method+"]");

		StringBuilder builder = new StringBuilder();

		builder.append("o 사이버침해대응지원센터\n" +
				" 1. 시도 사이버침해대응지원센터는 국가사이버안전관리규정(대통령훈령) 제 10조의 22항과\n" +
				"    국가전산망 보안관제 지침 2조 9항에 의거 사이버공격으로부터 지자체 정보자산에 대한\n" +
				"    보안관제지원 업무를 수행하고 있습니다.\n\n" +
				" 2. 국가사이버안전관리규정(대통령훈령) 제 14조(전문기관간 협력)와 국가정보원 국가전산망\n" +
				"    보안관제지침 18조(정보이관)에 의거 사이버위협정보를 이관하오니 국가사이버안전관리규정\n" +
				"    (대통령훈령) 제 12조 2항에 의거 신속한 피해유무 확인을 부탁드립니다.\n\n" +
				"o 관련정보\n");

		builder.append(" - 출발지 : "+s_ip+"\n");
		builder.append(" - 목적지 : "+d_ip+"\n");
		builder.append(" - 탐지명 : "+Method+"\n");
		builder.append(" - 탐지횟수 : "+(rows-1)+"건 / "+sum+"회\n");

		resultMap.put("inciDclCont",builder.toString());
		resultMap.put("inciDttNm",Method);

		return resultMap;
	}

	public long ipTolong(String ipAddress){
		ByteBuffer buf = ByteBuffer.allocate(8);
		byte saddr[] = new byte[0];
		try {
			saddr = InetAddress.getByName(ipAddress).getAddress();
			buf.put(4, (byte)(0xff&saddr[0]));
			buf.put(5, (byte)(0xff&saddr[1]));
			buf.put(6, (byte)(0xff&saddr[2]));
			buf.put(7, (byte)(0xff&saddr[3]));
			return buf.asLongBuffer().get();
		} catch (UnknownHostException e) {
			e.printStackTrace();
			return 0;
		}
	}

	public ReturnData getTbzHomepv(Criterion criterion){

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("contents", mapper.getTbzHomepv(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	@Override
	public ReturnData getTbzHacking(Criterion criterion){

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("contents", mapper.getTbzHacking(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	public ReturnData getDmgIpList(Criterion criterion) {
		return new ReturnData(mapper.getDmgIpList(criterion.getCondition()));
	}

	public ReturnData getAttIpList(Criterion criterion) {
		return new ReturnData(mapper.getAttIpList(criterion.getCondition()));
	}

	@Override
	public ReturnData getTodayStatus(Criterion criterion) {
		return new ReturnData(mapper.selectTodayStatus(criterion.getCondition()));
	}

	@Override
	public ReturnData getYearStatus(Criterion criterion) {
		return new ReturnData(mapper.selectYearStatus(criterion.getCondition()));
	}

	@Override
	public ReturnData getPeriodStatus(Criterion criterion) {
		return new ReturnData(mapper.selectPeriodStatus(criterion.getCondition()));
	}

	@Override
	public ReturnData getInstStatus(Criterion criterion) {
		return new ReturnData(mapper.selectInstStatus(criterion.getCondition()));
	}

	@Override
	public ReturnData getAccdTypeStatus(Criterion criterion) {
		return new ReturnData(mapper.selectAccdTypeStatus(criterion.getCondition()));
	}

	@Override
	public ReturnData getIpByNationNm(Criterion criterion) throws UnknownHostException {

		Map<String, Object> returnList = new HashMap<String, Object>();

		ByteBuffer buf = ByteBuffer.allocate(8);
		String checkIp = criterion.getValue("checkIp").toString();

		long ipLong = 0;
		try {
			byte addr[] = InetAddress.getByName(checkIp).getAddress();

			buf.put(4, (byte) (0xff & addr[0]));
			buf.put(5, (byte) (0xff & addr[1]));
			buf.put(6, (byte) (0xff & addr[2]));
			buf.put(7, (byte) (0xff & addr[3]));
		} catch (UnknownHostException uhe) {
			logger.warn("[getIpByNationNm] IP 부터 Host 를 가져올 수 없습니다. ", uhe);
			return new ReturnData(returnList);
		}
		ipLong = buf.asLongBuffer().get();

		criterion.addParam("checkIp", ipLong);

		returnList.put("contents", mapper.getIpByNationNm(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	@Override
	public ReturnData getInstByIP(Criterion criterion) throws UnknownHostException {

		Map<String, Object> returnList = new HashMap<String, Object>();

		ByteBuffer buf = ByteBuffer.allocate(8);
		String checkIp = criterion.getValue("checkIp").toString();

		long ipLong = 0;
		try {
			byte addr[] = InetAddress.getByName(checkIp).getAddress();

			buf.put(4, (byte) (0xff & addr[0]));
			buf.put(5, (byte) (0xff & addr[1]));
			buf.put(6, (byte) (0xff & addr[2]));
			buf.put(7, (byte) (0xff & addr[3]));
		} catch (UnknownHostException uhe) {
			logger.warn("[getInstByIP] IP 부터 Host 를 가져올 수 없습니다. ", uhe);
			return new ReturnData(returnList);
		}
		ipLong = buf.asLongBuffer().get();

		criterion.addParam("checkIp", ipLong);

		returnList.put("contents", mapper.getInstByIP(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	@Override
	public ReturnData getEncrySyncList(Criterion criterion) {
		return new ReturnData(mapper.getEncrySyncList(criterion.getCondition()));
	}

	@Override
	public ReturnData updateEncrySync(Criterion criterion) {
		//테스트중
		List<Map<String, Object>> arrList = new ArrayList<Map<String, Object>>();

		//encry_yn = null 조건으로 이관된 기존 사고에서 암호화가 되지 않은 목록을 가져온다
		List<AccidentApplyDto> list = mapper.getEncrySyncList(criterion.getCondition());
		for(int i=0; i<list.size(); i++){
			Map<String, Object> map = new HashMap<String, Object>();

			//신고기관 이메일
			String encryDclEmail = "";
			if(list.get(i).getDclEmail() != null){ //DB상 이메일 데이터가 있을 경우만 암호화 적용하여 update
				String beforeDclEmail = list.get(i).getDclEmail().toString();
				encryDclEmail = SEED_KISA256.Encrypt(beforeDclEmail);

				map.put("dclEmail", encryDclEmail);
			}else{
				map.put("dclEmail", null);
			}

			//피해기관 이메일
			String encryDmgEmail = "";
			if(list.get(i).getDmgEmail() != null){
				String beforeDmgEmail = list.get(i).getDmgEmail().toString();
				encryDmgEmail = SEED_KISA256.Encrypt(beforeDmgEmail);

				map.put("dmgEmail", encryDmgEmail);
			}else{
				map.put("dmgEmail", null);
			}
			map.put("inciNo", list.get(i).getInciNo());

			arrList.add(map);
		}
		criterion.addParam("arrList", arrList);
		return new ReturnData(mapper.updateEncrySync(criterion.getCondition()));
	}

	@Override
	public ReturnData getNcscInfo(Criterion criterion) throws Exception {
		AccidentApplyDto dto = mapper.getNcscInfo(criterion.getCondition());
		if(dto.getUserName()==null){
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("crtrId", dto.getCrtrId());
			AccidentApplyDto userDto = mapper.getNcscUserInfo(paramMap);
			if(userDto.getUserName()!=null)
				dto.setUserName(userDto.getUserName());
			if(userDto.getMoblPhnNo()!=null)
				dto.setMoblPhnNo(userDto.getMoblPhnNo());
			if(userDto.getOffcTelNo()!=null)
				dto.setOffcTelNo(userDto.getOffcTelNo());
			if(userDto.getOffcFaxNo()!=null)
				dto.setOffcFaxNo(userDto.getOffcFaxNo());
			if(userDto.getEmailAddr()!=null)
				dto.setEmailAddr(userDto.getEmailAddr());
		}

		return new ReturnData(dto);
	}

	@Override
	public ReturnData getPntInst(Criterion criterion) {
		return new ReturnData(mapper.getPntInst(criterion.getCondition()));
	}

	@Override
	public ReturnData checkEncryText(Criterion criterion) {
		String inputText = criterion.getValue("checkText").toString();
		String encryptText = SEED_KISA256.Encrypt(inputText);

		return new ReturnData(encryptText);
	}

	@Override
	public ReturnData getAccDuplList(Criterion criterion){

		String arr = (String) criterion.getCondition().get("ipList"); //검색 값 전체 string 값 ex)1111 test ip 기관
		String[] arrSplit = arr.split(",");

		List<String> list = new ArrayList<String>();

		for(int i=0; i<arrSplit.length; i++){
			list.add(arrSplit[i]);
		}
		criterion.addParam("ipList", list);

		return new ReturnData(mapper.getAccDuplList(criterion.getCondition()));
	}

	/**  멀티이관 사고 종결 여부  */
	@Override
	public ReturnData getInciMutiEndYn(Criterion criterion) {
		//int userCount = mapper.getInciMutiEndYn(criterion.getCondition());
		//return new ReturnData(userCount);
		return new ReturnData(mapper.getInciMutiEndYn(criterion.getCondition()));
	}
}
