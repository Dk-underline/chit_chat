package com.whatsup_clone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.request.UpdateUserRequest;

@Service
public interface UserService {
	public User findUserById(Integer id) throws UserException;

	public User findUserProfile(String jwt) throws UserException;

	public User updateUser(Integer id, UpdateUserRequest req) throws UserException;

	public List<User> searchUser(String query);
}
