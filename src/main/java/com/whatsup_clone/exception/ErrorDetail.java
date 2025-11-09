package com.whatsup_clone.exception;

import java.time.LocalDateTime;

public class ErrorDetail {
	private String error;
	private String message;
	private LocalDateTime time_stamp;

	public ErrorDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ErrorDetail(String error, String message, LocalDateTime time_stamp) {
		super();
		this.error = error;
		this.message = message;
		this.time_stamp = time_stamp;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getTime_stamp() {
		return time_stamp;
	}

	public void setTime_stamp(LocalDateTime time_stamp) {
		this.time_stamp = time_stamp;
	}

}
