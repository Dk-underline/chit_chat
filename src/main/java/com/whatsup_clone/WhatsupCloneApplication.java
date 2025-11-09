package com.whatsup_clone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class WhatsupCloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhatsupCloneApplication.class, args);
	}

}
