/**
 * Program Name	: MainViewController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 9. 04.
 * 
 * Programmer Name 	: jjung
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klid.common.CommonController;


@RequestMapping("/main/board/")
@Controller
public class MainViewController extends CommonController {
	
	/**===============================공지 게시판=============================== */
	
	@RequestMapping("pNoticeBoardList.do") public void pNoticeBoardList(Model model) {
		setBaseInfo(model);
	}
	@RequestMapping("pNoticeBoardContents.do") public void pNoticeBoardContents(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}
	
	@RequestMapping("pNoticeBoardWrite.do") public void pNoticeBoardWrite(Model model) {
		setBaseInfo(model);
	}
	
	@RequestMapping("pNoticeBoardEdit.do") public void pNoticeBoardEdit(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}
	
	/**===============================	보안자료실	=============================== */
	
	@RequestMapping("pResourceBoardList.do") public void pResourceBoardList(Model model) {
		setBaseInfo(model);
	}
	@RequestMapping("pResourceBoardContents.do") public void pResourceBoardContents(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}
	
	@RequestMapping("pResourceBoardWrite.do") public void pResourceBoardWrite(Model model) {
		setBaseInfo(model);
	}
	
	@RequestMapping("pResourceBoardEdit.do") public void pResourceBoardEdit(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}

	/**===============================	침해대응 정보 공유	=============================== */

	@RequestMapping("pShareBoardBoardList.do") public void pShareBoardBoardList(Model model) {
		setBaseInfo(model);
	}

	@RequestMapping("pShareBoardContents.do") public void pShareBoardContents(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}

	@RequestMapping("pShareBoardWrite.do") public void pShareBoardWrite(Model model) {
		setBaseInfo(model);
	}

	@RequestMapping("pShareBoardEdit.do") public void pShareBoardEdit(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}

	/**===============================	문의/의견	=============================== */

	@RequestMapping("pQnaBoardList.do") public void pQnaBoardList(Model model) {
		setBaseInfo(model);
	}

	@RequestMapping("pQnaBoardContents.do") public void pQnaBoardContents(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}

	@RequestMapping("pQnaBoardWrite.do") public void pQnaBoardWrite(Model model) {
		setBaseInfo(model);
	}

	@RequestMapping("pQnaBoardComment.do") public void pQnaBoardComment(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}

	@RequestMapping("pQnaBoardEdit.do") public void pQnaBoardEdit(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}


	//행안부
	@RequestMapping("pMoisBoardContents.do") public void pMoisBoardContents(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}

	@RequestMapping("pMoisBoardWrite.do") public void pMoisBoardWrite(Model model) {
		setBaseInfo(model);
	}

	@RequestMapping("pMoisBoardEdit.do") public void pMoisBoardEdit(Model model, HttpServletRequest request) {
		model.addAttribute("boardNo", request.getParameter("boardNo"));
		setBaseInfo(model);
	}
}
