package com.klid.webapp.main.sms.service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.main.sms.dto.SmsInfoDto;
import com.klid.webapp.main.sms.persistence.SmsMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by Yuna on 2018-12-20.
 */
@Service("smsService")
public class SmsServiceImpl extends MsgService implements SmsService {

    @Resource(name="smsMapper")
    private SmsMapper mapper;

    @Override
    public ReturnData addSmsMessage(Criterion criterion) {
        SmsInfoDto smsInfo = mapper.getSmsInfo(criterion.getCondition());

        LinkedHashMap<String, Object> sms = (LinkedHashMap<String, Object>)criterion.getValue("sms");
        String message = (String)sms.get("msg");
        String sender = (String)sms.get("sender");
        ArrayList<LinkedHashMap<String, Object>> recv = (ArrayList<LinkedHashMap<String, Object>>)sms.get("recv");
        String dbUrl = "jdbc:oracle:thin:@"+smsInfo.getSms_ip()+":"+smsInfo.getSms_port()+"/" +smsInfo.getSms_sid();

        Connection conn = null;
        Statement stmt = null;

        try {
            Class.forName("oracle.jdbc.OracleDriver");
        }catch (ClassNotFoundException e){
            e.printStackTrace();
        }

        try{
            conn = DriverManager.getConnection(dbUrl,smsInfo.getSms_user(),smsInfo.getSms_pwd());
            stmt = conn.createStatement();

            Date date = new Date();
            String yyyymmdd = new SimpleDateFormat("yyyyMMdd").format(date);
            String hhmmdd = new SimpleDateFormat("HHmmss").format(date);

            for(int i=0; i< recv.size(); i++){
                String phone = (String)recv.get(i).get("phone");
                String query = "insert into sc_tran (" +
                        "tr_num, tr_senddate, tr_sendstat, tr_msgtype, tr_rsltstat, tr_phone, tr_callback, tr_msg" +
                        ") values (sc_tran_seq.nextval, sysdate, '0', '0', '00', '"
                        + phone.replace("-", "") + "', '"
                        + sender.replace("-", "") + "', '"
                        + message + "')";
                stmt.executeQuery(query);
                Map<String, Object> newMap = new HashMap<String, Object>();
                newMap.put("yyyymmdd",yyyymmdd);
                newMap.put("hhmmss",hhmmdd);
                newMap.put("cellNo", SEED_KISA256.Encrypt(phone));
                newMap.put("contents",message);
                newMap.put("sendNo",SEED_KISA256.Encrypt(sender));
                newMap.put("cellName",recv.get(i).get("userName"));
                newMap.put("sendUserId", SessionManager.getUser().getUserId());

                mapper.insertSmsHist(newMap);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            try {
                stmt.close();
                conn.close();
            }catch (SQLException e){}
        }
        return null;
    }
}
