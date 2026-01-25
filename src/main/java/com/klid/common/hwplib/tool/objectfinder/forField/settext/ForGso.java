package com.klid.common.hwplib.tool.objectfinder.forField.settext;

import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlPolygon;
import com.klid.common.hwplib.object.bodytext.control.gso.textbox.TextBox;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlArc;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlContainer;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlCurve;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlEllipse;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlRectangle;
import com.klid.common.hwplib.object.bodytext.control.gso.GsoControl;
import com.klid.common.hwplib.tool.objectfinder.SetFieldResult;
import com.klid.common.hwplib.tool.objectfinder.TextBuffer;
import com.klid.common.hwplib.tool.objectfinder.forField.ForParagraphList;

/**
 * 그리기 개체에 포함된 필드의 텍스트를 설정하는 기능을 포함한 클래스
 * 
 * @author 박성균
 */
public class ForGso {
	/**
	 * 그리기 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param gc
	 *            그리기 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	public static SetFieldResult setFieldText(GsoControl gc, ControlType fieldType, String fieldName,
											  TextBuffer textBuffer) {
		switch (gc.getGsoType()) {
		case Line:
			break;
		case Rectangle:
			return rectangle((ControlRectangle) gc, fieldType, fieldName, textBuffer);
		case Ellipse:
			return ellipse((ControlEllipse) gc, fieldType, fieldName, textBuffer);
		case Arc:
			return arc((ControlArc) gc, fieldType, fieldName, textBuffer);
		case Polygon:
			return polygon((ControlPolygon) gc, fieldType, fieldName, textBuffer);
		case Curve:
			return curve((ControlCurve) gc, fieldType, fieldName, textBuffer);
		case Picture:
			break;
		case OLE:
			break;
		case Container:
			return container((ControlContainer) gc, fieldType, fieldName, textBuffer);
		default:
			break;
		}
		return SetFieldResult.InProcess;
	}

	/**
	 * 사각형 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param rectangle
	 *            사각형 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult rectangle(ControlRectangle rectangle, ControlType fieldType, String fieldName,
			TextBuffer textBuffer) {
		return textBox(rectangle.getTextBox(), fieldType, fieldName, textBuffer);
	}

	/**
	 * 텍스트 박스 안에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param textBox
	 *            텍스트 박스
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult textBox(TextBox textBox, ControlType fieldType, String fieldName,
										  TextBuffer textBuffer) {
		return ForParagraphList.setFieldText(textBox.getParagraphList(), fieldType, fieldName, textBuffer);
	}

	/**
	 * 타원 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param ellipse
	 *            타원 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult ellipse(ControlEllipse ellipse, ControlType fieldType, String fieldName,
			TextBuffer textBuffer) {
		return textBox(ellipse.getTextBox(), fieldType, fieldName, textBuffer);
	}

	/**
	 * 호 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param arc
	 *            호 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult arc(ControlArc arc, ControlType fieldType, String fieldName, TextBuffer textBuffer) {
		return textBox(arc.getTextBox(), fieldType, fieldName, textBuffer);
	}

	/**
	 * 다각형 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param polygon
	 *            다각형 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult polygon(ControlPolygon polygon, ControlType fieldType, String fieldName,
			TextBuffer textBuffer) {
		return textBox(polygon.getTextBox(), fieldType, fieldName, textBuffer);
	}

	/**
	 * 곡선 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param curve
	 *            곡선 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult curve(ControlCurve curve, ControlType fieldType, String fieldName,
			TextBuffer textBuffer) {
		return textBox(curve.getTextBox(), fieldType, fieldName, textBuffer);
	}

	/**
	 * 묶음 개체에 포함된 필드의 텍스트를 설정한다.
	 * 
	 * @param container
	 *            묶음 개체
	 * @param fieldType
	 *            필드 타입
	 * @param fieldName
	 *            필드 이름
	 * @param textBuffer
	 *            텍스트 버퍼
	 * @return 필드 설정 결과값
	 */
	private static SetFieldResult container(ControlContainer container, ControlType fieldType, String fieldName,
			TextBuffer textBuffer) {
		for (GsoControl child : container.getChildControlList()) {
			if (setFieldText(child, fieldType, fieldName, textBuffer) == SetFieldResult.NotEnoughText) {
				return SetFieldResult.NotEnoughText;
			}
		}
		return SetFieldResult.InProcess;
	}
}
