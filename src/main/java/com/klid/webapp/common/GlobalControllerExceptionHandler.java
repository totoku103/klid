package com.klid.webapp.common;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.AppGlobal;
import com.klid.common.LoginString;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileNotFoundException;
import java.io.IOException;

@ControllerAdvice
@Slf4j
public class GlobalControllerExceptionHandler {


	@ExceptionHandler(value=Exception.class)
	public @ResponseBody ReturnData exceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[Exception] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("처리 중 에러가 발생하였습니다."));
	}

	@ExceptionHandler(value=BadSqlGrammarException.class)
	public @ResponseBody ReturnData badSqlGrammarExceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[BadSqlGrammarException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("처리 중 에러가 발생하였습니다."));
	}

	@ExceptionHandler(value=IOException.class)
	public @ResponseBody ReturnData ioExceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[IOException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("처리 중 에러가 발생하였습니다."));
	}

	@ExceptionHandler(value=RuntimeException.class)
	public @ResponseBody ReturnData runtimeExceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[RuntimeException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("처리 중 에러가 발생하였습니다."));
	}

	@ExceptionHandler(value=CustomException.class)
	public @ResponseBody ReturnData customExceptionHandleConflict(CustomException e) {
		e.printStackTrace();
		log.error("[CustomException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo(e.getCode() == null ? "200" : e.getCode(), e.getMessage()));
	}

	@ExceptionHandler(value=InvalidPageException.class)
	public String invalidPageExceptionHandleConflict(InvalidPageException e) {
		e.printStackTrace();
        log.error(String.valueOf(e));
		return "redirect:" + LoginString.getFullPath();
	}

	@ExceptionHandler(value=MyBatisSystemException.class)
	public @ResponseBody ReturnData myBatisSystemExceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[MyBatisSystemException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("처리 중 에러가 발생하였습니다."));
	}

	@ExceptionHandler(value=CannotGetJdbcConnectionException.class)
	public @ResponseBody ReturnData cannotGetJdbcConnectionExceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[CannotGetJdbcConnectionException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("DB에 연결할 수 없습니다."));
	}

	@ExceptionHandler(value= FileNotFoundException.class)
	public @ResponseBody ReturnData fileNoFoundExceptionHandleConflict(Exception e) {
		e.printStackTrace();
		log.error("[FileNotFoundException] " + e.getCause());
        log.error(String.valueOf(e));
		return new ReturnData(new ErrorInfo("파일을 찾을 수 없습니다."));
	}

    @ExceptionHandler(value = AuthenticationCredentialsNotFoundException.class)
    public @ResponseBody ReturnData authenticationCredentialsNotFoundExceptionHandleConflict(AuthenticationCredentialsNotFoundException e) {
        e.printStackTrace();
        log.error("[Exception] " + e.getCause());
        log.error(String.valueOf(e));
        return new ReturnData(new ErrorInfo(e.getMessage() == null ? "인증이 완료되지 않았습니다." : e.getMessage()));
    }
}
