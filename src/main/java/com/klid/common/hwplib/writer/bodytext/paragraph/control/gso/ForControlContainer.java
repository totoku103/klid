package com.klid.common.hwplib.writer.bodytext.paragraph.control.gso;

import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlContainer;
import com.klid.common.hwplib.object.bodytext.control.gso.GsoControl;

import java.io.IOException;

/**
 * 묶음 컨트롤의 나머지 부분을 쓰기 위한 객체
 * 
 * @author neolord
 */
public class ForControlContainer {
	/**
	 * 묶음 컨트롤의 나머지 부분을 쓴다.
	 * 
	 * @param cont
	 *            묶음 컨트롤
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void writeRest(ControlContainer cont, StreamWriter sw)
			throws IOException {
		childControls(cont, sw);
	}

	/**
	 * 묶음 컨트롤에 포함된 컨트롤들을 쓴다.
	 * 
	 * @param cont
	 *            묶음 컨트롤
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	private static void childControls(ControlContainer cont, StreamWriter sw)
			throws IOException {
		for (GsoControl child : cont.getChildControlList()) {
			ForGsoControl.writeInContainer(child, sw);
		}
	}
}
