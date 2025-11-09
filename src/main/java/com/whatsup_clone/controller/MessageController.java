package com.whatsup_clone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsup_clone.entity.Message;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.ChatException;
import com.whatsup_clone.exception.MessageException;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.request.SendMessageRequest;
import com.whatsup_clone.response.ApiResponse;
import com.whatsup_clone.service.MessageService;
import com.whatsup_clone.service.UserService;

@RestController
@RequestMapping("/api/message")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
	@Autowired
	private MessageService messageService;
	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User user = userService.findUserProfile(jwt);
//		System.out.println(user.getId());
		req.setUserId(user.getId());
		Message message = messageService.sendMessage(req);
		return new ResponseEntity<Message>(message, HttpStatus.OK);
	}

	@GetMapping("/chat/{chatId}")
	public ResponseEntity<List<Message>> getChatMessageHandler(@PathVariable("chatId") Integer chatId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User user = userService.findUserProfile(jwt);
//		System.out.println(chatId);
		List<Message> message = messageService.getChatsMessage(chatId, user);
		return new ResponseEntity<List<Message>>(message, HttpStatus.OK);
	}

	@DeleteMapping("/{messageId}")
	public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable Integer messageId,
			@RequestHeader("Authorization") String jwt) throws UserException, MessageException {
		User user = userService.findUserProfile(jwt);
		messageService.deleteMessageById(messageId, user);
		ApiResponse respo = new ApiResponse("Message Deleted Successfully!!!", true);
		return new ResponseEntity<ApiResponse>(respo, HttpStatus.OK);
	}
}
