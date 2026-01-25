package com.klid.common.hwplib.object.bodytext.paragraph.text;

import java.io.IOException;

/**
 * 인라인 컨트롤 character
 * 
 * @author neolord
 */
public class HWPCharControlInline extends HWPChar {
	/**
	 * 추가 정보
	 */
	private byte[] addition;

	/**
	 * 생성자
	 */
	public HWPCharControlInline() {
	}

	/**
	 * 글자의 종류을 반환한다.
	 * 
	 * @return 글자의 타입
	 */
	@Override
	public HWPCharType getType() {
		return HWPCharType.ControlInline;
	}

	/**
	 * 추가 정보를 반환한다.
	 * 
	 * @return 추가 정보
	 */
	public byte[] getAddition() {
		byte[] returnAddition = null;
		if (this.addition != null) {
			returnAddition = new byte[this.addition.length];
			System.arraycopy(this.addition, 0, returnAddition, 0, this.addition.length);
		}
		return returnAddition;
	}

	/**
	 * 추가 정보를 설정한다.
	 * 
	 * @param addition
	 *            추가 정보
	 * @throws IOException
	 */
	public void setAddition(byte[] addition) throws IOException {
		if (addition.length != 12) {
			throw new IOException("addition's length must be 12");
		}
		this.addition = new byte[addition.length];
		System.arraycopy(addition, 0, this.addition, 0, addition.length);
	}
}
