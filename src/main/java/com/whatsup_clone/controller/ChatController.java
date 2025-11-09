package com.whatsup_clone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatsup_clone.entity.Chat;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.ChatException;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.request.GroupChatRequest;
import com.whatsup_clone.request.SingleChatRequest;
import com.whatsup_clone.response.ApiResponse;
import com.whatsup_clone.service.ChatService;
import com.whatsup_clone.service.UserService;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
	@Autowired
	private ChatService chatService;
	@Autowired
	private UserService userService;

	@PostMapping("/single")
	public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatRequest singlechatrequest,
			@RequestHeader("Authorization") String jwt) throws UserException {
		User reqUser = userService.findUserProfile(jwt);
		Chat chat = chatService.createChat(reqUser, singlechatrequest.getUserId());
		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@PostMapping("/group")
	public ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatRequest groupchatrequest,
			@RequestHeader("Authorization") String jwt) throws UserException {
		User reqUser = userService.findUserProfile(jwt);
		Chat chat = chatService.createGroup(groupchatrequest, reqUser);
		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@GetMapping("/{chatId}")
	public ResponseEntity<Chat> findChatByChatIdHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String jwt) throws ChatException {
		Chat chat = chatService.findChatById(chatId);
		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Chat>> findAllChatByUserIdHandler(@RequestHeader("Authorization") String jwt)
			throws UserException {
		User reqUser = userService.findUserProfile(jwt);
		List<Chat> chats = chatService.findAllChatByUserId(reqUser.getId());
		return new ResponseEntity<List<Chat>>(chats, HttpStatus.OK);
	}

	@PutMapping("/{chatId}/add/{userId}")
	public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User reqUser = userService.findUserProfile(jwt);
		Chat chat = chatService.addUserToGroup(chatId, userId, reqUser);
		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@PutMapping("/delete/{chatId}")
	public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User reqUser = userService.findUserProfile(jwt);
		chatService.deleteChat(chatId, reqUser.getId());
		ApiResponse respo = new ApiResponse("Chat Deleted Successfully", true);
		return new ResponseEntity<ApiResponse>(respo, HttpStatus.OK);
	}

}
