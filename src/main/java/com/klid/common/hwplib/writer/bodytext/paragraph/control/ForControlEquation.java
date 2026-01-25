package com.klid.common.hwplib.writer.bodytext.paragraph.control;

import com.klid.common.hwplib.object.bodytext.control.ControlEquation;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.eqed.ForEQEdit;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.gso.part.ForCaption;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.gso.part.ForCtrlHeaderGso;

import java.io.IOException;

/**
 * 수식 컨트롤을 쓰기 위한 컨트롤
 * 
 * @author neolord
 */
public class ForControlEquation {
	/**
	 * 수식 컨트롤을 쓴다.
	 * 
	 * @param eqed
	 *            수식 컨트롤
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(ControlEquation eqed, StreamWriter sw)
			throws IOException {
		ForCtrlHeaderGso.write(eqed.getHeader(), sw);

		sw.upRecordLevel();

		ForCaption.write(eqed.getCaption(), sw);
		ForEQEdit.write(eqed.getEQEdit(), sw);

		sw.downRecordLevel();
	}
}
