package com.klid.common.hwplib.object;

import com.klid.common.hwplib.object.bodytext.BodyText;
import com.klid.common.hwplib.object.fileheader.FileHeader;
import com.klid.common.hwplib.object.bindata.BinData;
import com.klid.common.hwplib.object.docinfo.DocInfo;

/**
 * HWP File를 나타내는 객체
 * 
 * @author neolord
 */
public class HWPFile {
	/**
	 * 파일 인식 정보를 나타내는 객체. "FileHeader" stream에 저장된다.
	 */
	private FileHeader fileHeader;
	/**
	 * 문서 정보를 나타내는 객체. "DocInfo" stream에 저장된다.
	 */
	private DocInfo docInfo;
	/**
	 * 본문을 나타내는 객체. "BodyText" storage에 저장된다.
	 */
	private BodyText bodyText;
	/**
	 * 바이너리 데이터를 나타내는 객체. "BinData" storage에 저장된다.
	 */
	private BinData binData;

	/**
	 * 생성자
	 */
	public HWPFile() {
		fileHeader = new FileHeader();
		docInfo = new DocInfo();
		bodyText = new BodyText();
		binData = new BinData();
	}

	/**
	 * 파일 인식 정보를 나타내는 객체를 반환한다.
	 * 
	 * @return 파일 인식 정보를 나타내는 객체
	 */
	public FileHeader getFileHeader() {
		return fileHeader;
	}

	/**
	 * 문서 정보를 나타내는 객체를 반환한다.
	 * 
	 * @return 문서 정보를 나타내는 객체
	 */
	public DocInfo getDocInfo() {
		return docInfo;
	}

	/**
	 * 본문을 나타내는 객체를 반환한다.
	 * 
	 * @return 본문을 나타내는 객체
	 */
	public BodyText getBodyText() {
		return bodyText;
	}

	/**
	 * 바이너리 데이터를 나타내는 객체를 반환한다.
	 * 
	 * @return 바이너리 데이터를 나타내는 객체
	 */
	public BinData getBinData() {
		return binData;
	}
}
