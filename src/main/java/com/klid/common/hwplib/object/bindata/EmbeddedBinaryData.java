package com.klid.common.hwplib.object.bindata;

import com.klid.common.hwplib.object.docinfo.bindata.BinDataCompress;

/**
 * HWP 파일내에서 사용하는 이미지등의 바이너리 데이터를 저장하는 객체
 * 
 * @author neolord
 */
public class EmbeddedBinaryData {
	/**
	 * 바이너리 데이터의 이름
	 */
	private String name;
	/**
	 * 실제 데이터
	 */
	private byte[] data;
	/**
	 * 압축 방법
	 */
	private BinDataCompress compressMethod;

	/**
	 * 생성자
	 */
	public EmbeddedBinaryData() {
	}

	/**
	 * 바이너리 데이터의 이름을 반환한다.
	 * 
	 * @return 바이너리 데이터의 이름
	 */
	public String getName() {
		return name;
	}

	/**
	 * 바이너리 데이터의 이름을 설정한다.
	 * 
	 * @param name
	 *            바이너리 데이터의 이름
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 실제 데이터를 반환한다.
	 * 
	 * @return 실제 데이터
	 */
	public byte[] getData() {
		byte[] returnData = null;
		if (this.data != null) {
			returnData = new byte[this.data.length];
			System.arraycopy(this.data, 0, returnData,0, this.data.length);
		}
		return returnData;
	}

	/**
	 * 실제 데이터를 설정한다.
	 * 
	 * @param data
	 *            실제 데이터
	 */
	public void setData(byte[] data) {
		this.data = new byte[data.length];
		System.arraycopy(data, 0, this.data, 0, data.length);
	}

	/**
	 * 압축 방법을 리턴한다.
	 * 
	 * @return 압축 방법
	 */
	public BinDataCompress getCompressMethod() {
		return compressMethod;
	}

	/**
	 * 압축 방법을 설정한다.
	 * 
	 * @param compressMethod
	 *            압축 방법
	 */
	public void setCompressMethod(BinDataCompress compressMethod) {
		this.compressMethod = compressMethod;
	}
}
