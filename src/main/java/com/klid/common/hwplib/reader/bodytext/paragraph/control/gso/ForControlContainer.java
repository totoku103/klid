package com.klid.common.hwplib.reader.bodytext.paragraph.control.gso;

import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.ShapeComponentContainer;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlContainer;
import com.klid.common.hwplib.object.bodytext.control.gso.GsoControl;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

import java.io.IOException;

/**
 * 묶은 컨트롤의 나머지 부분을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlContainer {
	/**
	 * 묶은 컨트롤의 나머지 부분을 읽는다.
	 * 
	 * @param container
	 *            묶은 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void readRest(ControlContainer container, StreamReader sr)
			throws IOException {
		ShapeComponentContainer scc = (ShapeComponentContainer) container
				.getShapeComponent();
		int childCount = scc.getChildControlIdList().size();
		for (int index = 0; index < childCount; index++) {
			ForGsoControl fgc = new ForGsoControl();
			GsoControl gc = fgc.readInContainer(sr);
			container.addChildControl(gc);
		}
	}
}
