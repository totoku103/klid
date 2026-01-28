package com.klid.api.board.accident.client;

import com.klid.common.Base64Coder;
import com.klid.common.SEED_KISA256;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.HttpMultipartMode;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.HttpEntity;
import org.json.JSONException;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.util.Map;

/**
 * NCI API 클라이언트 구현체
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NciApiClientImpl implements NciApiClient {

    private final NciApiProperties nciApiProperties;

    @Override
    public String callNciApi(Map<String, Object> reqMap) {
        String result = "";
        try {
            String urlKey = nciApiProperties.getKeyUrl();

            JSONObject jokey = new JSONObject();
            jokey.put("key", urlKey);
            String key = jokey.get("key").toString();

            String url = nciApiProperties.getUploadUrl();
            String type = "RES";

            JSONObject jo = new JSONObject();
            JSONObject j = new JSONObject();

            String email = "";
            if (reqMap.get("email") != null) {
                email = SEED_KISA256.Decrypt(reqMap.get("email").toString());
            }

            j.put("incidentId", reqMap.get("incidentId"));
            j.put("responseDateTime", reqMap.get("responseDateTime"));
            j.put("institutionName", reqMap.get("institutionName"));
            j.put("name", reqMap.get("name"));
            j.put("email", email);
            j.put("phone", "");
            j.put("cellularPhone", "");
            j.put("fax", "");
            j.put("responseType", "조치완료");

            String responseContent = reqMap.get("responseContent").toString();
            String NcscContEncoder = new String(Base64Coder.encode(responseContent.getBytes("EUC-KR")));

            j.put("responseContent", NcscContEncoder);
            jo.put("responseInfo", j);

            CloseableHttpClient client = HttpClients.createDefault();
            HttpPost httppost = new HttpPost(url);

            MultipartEntityBuilder build = MultipartEntityBuilder.create();
            build.setMode(HttpMultipartMode.LEGACY);

            build.addTextBody("key", key);
            build.addTextBody("type", type);
            build.addTextBody("obj", URLEncoder.encode(jo.toJSONString(), "UTF-8"));

            httppost.setEntity(build.build());
            CloseableHttpResponse res = client.execute(httppost);

            HttpEntity reEntity = res.getEntity();

            String msg = "";
            if (reEntity != null) {
                BufferedReader rd = new BufferedReader(new InputStreamReader(reEntity.getContent(), "UTF-8"));

                String line = "";
                while ((line = rd.readLine()) != null) {
                    msg += line;
                }
                rd.close();
            }
            result = msg;

        } catch (JSONException e) {
            log.error("NCI API JSON 처리 오류", e);
        } catch (Exception e) {
            log.error("NCI API 호출 오류", e);
        }

        return result;
    }

    @Override
    public String get(String url) {
        StringBuffer buffer = new StringBuffer();
        BufferedReader rd = null;
        try {
            CloseableHttpClient client = HttpClients.createDefault();
            HttpGet httpget = new HttpGet(url);
            httpget.setHeader("Content-Type", "application/json");

            CloseableHttpResponse res = client.execute(httpget);
            HttpEntity reEntity = res.getEntity();
            if (reEntity != null) {
                rd = new BufferedReader(new InputStreamReader(reEntity.getContent(), "UTF-8"));
                String line = "";
                while ((line = rd.readLine()) != null) {
                    buffer.append(line);
                }
            }
            rd.close();
        } catch (Exception e) {
            log.error("HTTP GET 요청 오류: {}", url, e);
        }
        return buffer.toString();
    }
}
