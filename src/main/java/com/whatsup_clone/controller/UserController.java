package com.whatsup_clone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.request.UpdateUserRequest;
import com.whatsup_clone.response.ApiResponse;
import com.whatsup_clone.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired(required = true)
	private UserService service;

	@GetMapping("/profile")
	public ResponseEntity<User> getProfileUserHandler(@RequestHeader("Authorization") String token)
			throws UserException {
		User user = service.findUserProfile(token);
		System.out.print(user);
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping("/search")
	public ResponseEntity<List<User>> searchUserHandler(@RequestParam("name") String query) {
		List<User> users = service.searchUser(query);
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest uup,
			@PathVariable("userId") Integer userId, @RequestHeader("Authorization") String token) throws UserException {
//		User user = service.findUserProfile(token);
		service.updateUser(userId, uup);
		ApiResponse api_repo = new ApiResponse("User Succefully Update", true);
		return new ResponseEntity<ApiResponse>(api_repo, HttpStatus.ACCEPTED);

	}

}
