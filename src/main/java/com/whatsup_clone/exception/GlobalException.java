package com.whatsup_clone.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalException {
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetail> user_Exception_Handler(UserException e, WebRequest req) {
		ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetail> message_Exception_Handler(MessageException e, WebRequest req) {
		ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ErrorDetail> chat_Exception_Handler(ChatException e, WebRequest req) {
		ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetail> Method_Argument_Not_Valid_Exception_Handler(MethodArgumentNotValidException me,
			WebRequest req) {
		String error = me.getBindingResult().getFieldError().getDefaultMessage();
		ErrorDetail err = new ErrorDetail("Invalid Method Arguments", error, LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetail> No_Handler_Found_Exception_Handler(NoHandlerFoundException ex, WebRequest req) {

		ErrorDetail err = new ErrorDetail("No End Point Found", ex.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetail> Other_Exception_Handler(Exception e, WebRequest req) {
		ErrorDetail err = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}

}
