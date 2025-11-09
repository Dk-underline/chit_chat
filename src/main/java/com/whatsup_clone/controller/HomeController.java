package com.whatsup_clone.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
	@GetMapping("/")
	public ResponseEntity<String> home_controller() {
		return new ResponseEntity<String>("Welcome Home!!!", HttpStatus.OK);
	}
}
