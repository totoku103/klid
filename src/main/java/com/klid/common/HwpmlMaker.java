package com.klid.common;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

import javax.imageio.ImageIO;
import javax.imageio.stream.FileImageInputStream;

import org.apache.commons.codec.binary.Base64;

/**
 *
 * @author Kyoungnam Kim (zealiard@gmail.com)
 *
 */
public class HwpmlMaker {

	private String reportFile;
	private String prefix;
	private String postfix;
	private String hwpml;


	public HwpmlMaker(String reportFile) {
		this.reportFile = reportFile;
		this.prefix = "";
		this.postfix = "";
		this.setReport();
	}


	public HwpmlMaker(String reportFile, String prefix) {
		this.reportFile = reportFile;
		this.prefix = prefix;
		this.postfix = "";
		this.setReport();
	}


	public HwpmlMaker(String reportFile, String prefix, String postfix) {
		this.reportFile = reportFile;
		this.prefix = prefix;
		this.postfix = postfix;
		this.setReport();
	}


	/**
	 * hwpml 문서의 파라미터를 입력한다.
	 * id + index 값의 파라미터를 배열 순차적으로 입력한다.
	 * index는 0부터 시작한다.
	 *
	 * @param params
	 */
	public void setParams(String paramName, String[] params) {
		for (int i = 0; i < params.length; i++) {
			hwpml = hwpml.replaceFirst(prefix + paramName + i + postfix, params[i]);
		}
	}


	/**
	 * hwpml 문서의 파라미터를 입력한다.
	 *
	 * @param paramName
	 * @param param
	 */
	public void setParam(String paramName, String param) {
		hwpml = hwpml.replaceFirst(prefix + paramName + postfix, param);
	}


	/**
	 * hwpml 문서를 지정된 경로에 저장한다.
	 *
	 * @param path
	 * @param fileName
	 */
	public void saveFile(String path, String fileName) {

		try {
			File p = new File(path);

			if (!p.exists()) {
				p.mkdirs();
			}

			FileOutputStream fos = new FileOutputStream(new File(path, fileName));
			fos.write(hwpml.getBytes("UTF-8"));
			fos.close();

		} catch(IOException e) {
			e.printStackTrace();
		}


	}


	/**
	 * hwpml을 반환한다.
	 * @return
	 */
	public String getHwpml() {
		return hwpml;
	}


	/**
	 * 이미지파일(fileName)을 hwpml에 추가한다.
	 *
	 * @param id 추가할 이미지 ID
	 * @param fileName	이미지파일경로
	 */
	public void setImage(String id, String fileName) {
		try{
			FileImageInputStream input = new FileImageInputStream(new File(fileName));
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			byte[] data = null;
			int numBytesRead = 0;

			while ((numBytesRead = input.read(buf)) != -1) {
				output.write(buf, 0, numBytesRead);
			}

			data = output.toByteArray();

//			data = scale(data,300,300);

			output.close();
			input.close();

			hwpml = hwpml.replaceFirst(prefix + id + postfix, Base64.encodeBase64String(data));

		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
	}

	public byte[] scale(byte[] fileData, int width, int height){
		try {

			ByteArrayInputStream in = new ByteArrayInputStream(fileData);

			BufferedImage img = ImageIO.read(in);
			if(height == 0){
				height = (width*img.getHeight()) / img.getWidth();
			}
			if(width ==0){
				width = (height*img.getWidth()) / img.getHeight();
			}
			Image scaledImage = img.getScaledInstance(width,height,Image.SCALE_DEFAULT);

			BufferedImage imageBuff= new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
			imageBuff.getGraphics().drawImage(scaledImage,0,0,new Color(0,0,0),null);

			ByteArrayOutputStream buffer = new ByteArrayOutputStream();

			ImageIO.write(imageBuff, "jpg", buffer);

			return buffer.toByteArray();
		} catch (IOException e){
			e.printStackTrace();
			return null;
		}
	}


	/**
	 * id="abcd" 형식의 Attribute 값을 변경한다.
	 * id값은 반드시 Unique 해야 한다.
	 *
	 * @param id
	 * @param attrName
	 * @param value
	 */
	public void setAttribute(String id, String attrName, String value) {
		String tag = this.getStartTag(id);
		String newTag = "";

		if (tag.indexOf(attrName) == -1) {
			newTag = tag.substring(0, tag.length() - 1) + " " + attrName + "=\"" + value + "\">";
		}
		else {
			newTag = tag.replaceFirst(attrName + "=\"\\p{Alnum}*\"", "RowCount=\"" + value + "\"");
		}

		hwpml = hwpml.replaceFirst(tag, newTag);
	}


	/**
	 * parentId 노드를 포함한 하위 노드들의 attribute 값을 모두 value로 변경한다.
	 *
	 * @param parentId
	 * @param attrName
	 * @param value
	 */
	public void setChildAttribute(String parentId, String attrName, String value) {
		String tag = this.getTagBlock(parentId);
		String newTag = tag.replaceAll(attrName + "=\"\\p{Alnum}*\"", "RowCount=\"" + value + "\"");

		hwpml = hwpml.replaceFirst(tag, newTag);
	}


	/**
	 * TABLE의 ROW를 늘려준다.
	 *
	 * @param rowId	기준이 되는 ROW의 id
	 * @param rows	추가할 ROW 수
	 */
	public void insertTableRow(String tableId, String rowId, int rows) {
		String tag = this.getTagBlock(rowId);
		String old = tag;

		int i1 = tag.indexOf("RowAddr=\"") + 9;
		int i2 = tag.indexOf("\"", i1);

		int startRowAddr = Integer.parseInt(tag.substring(i1, i2));

		// 테이블의 RowCount를 추가 될 Row수에 맞게 수정
		this.setAttribute(tableId, "RowCount", String.valueOf(startRowAddr + rows));


		StringBuffer newTag = new StringBuffer(tag);

		for (int i = 1; i < rows; i++) {
			int position = 0;
			int j1 = 0;
			int j2 = 0;

			do {
				j1 = tag.indexOf(prefix, position) + prefix.length();

				if (j1 == prefix.length() - 1) break;

				j2 = tag.indexOf(postfix, j1);

				String paramName = tag.substring(j1, j2).replaceFirst("\\d+", "");
				int idx = Integer.parseInt(tag.substring(j1, j2).replaceFirst("\\D+", ""));

				tag = tag.replaceFirst(prefix + paramName + idx + postfix, prefix + paramName + (idx + 1) + postfix);
				position = j2 + prefix.length();
			} while (true);

			tag = tag.replaceAll("RowAddr=\"\\d+\"", "RowAddr=\"" + ++startRowAddr + "\"");
			newTag.append(tag);
		}

		hwpml = hwpml.replaceFirst(old, newTag.toString());
	}



	/**
	 * 시작태그 부분만 가져온다.
	 *
	 * @param id
	 * @return
	 */
	private String getStartTag(String id) {
		int i1 = hwpml.indexOf("id=\"" + id + "\"");

		if (i1 == -1) return null;

		int i2 = hwpml.lastIndexOf("<", i1);
		int i3 = hwpml.indexOf(">", i1);

		String tag = hwpml.substring(i2, i3 + 1);

		return tag;
	}


	/**
	 * 태그블럭 전체를 가져온다.
	 *
	 * @param id
	 * @return
	 */
	private String getTagBlock(String id) {
		int i1 = hwpml.indexOf("id=\"" + id + "\"");

		if (i1 == -1) return null;

		int i2 = hwpml.lastIndexOf("<", i1);
		int i3 = hwpml.indexOf(" ", i2);
		int i4 = hwpml.indexOf("</" + hwpml.substring(i2 + 1, i3) + ">", i2) + i3 - i2 + 2;

		String tag = hwpml.substring(i2, i4) + "\n";

		return tag;
	}


	/**
	 * reportFile을 읽어 hwpml에 저장한다.
	 */
	private void setReport() {
		FileInputStream fis = null;

		try {
			fis = new FileInputStream(new File(reportFile));
			byte[] buf = new byte[1024];
			int len = 0;

			StringBuffer tmp = new StringBuffer();

			while ((len = fis.read(buf)) != -1) {
				tmp.append(new String(buf, 0, len, "UTF-8"));
			}

			fis.close();

			hwpml = tmp.toString().substring(tmp.toString().indexOf("<"));

		} catch(FileNotFoundException e) {
			e.printStackTrace();
		} catch(IOException e) {
			e.printStackTrace();
		}
	}
}
