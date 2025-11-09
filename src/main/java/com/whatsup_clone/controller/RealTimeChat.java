package com.whatsup_clone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.whatsup_clone.entity.Message;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class RealTimeChat {
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/message") // Receive the data coming at that end point
	@SendTo("/group/public") // BroadCast at the given end point
	public Message receiveMessage(@Payload Message message) {
//		System.out.print(message.getContent());
		// Where you want to send ---> group
		simpMessagingTemplate.convertAndSend("/group/" + message.getChat().getId().toString(), message);
		return message;
	}
}
