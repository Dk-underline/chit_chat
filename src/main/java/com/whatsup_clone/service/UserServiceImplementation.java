package com.whatsup_clone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.whatsup_clone.config.TokenProvider;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.repository.UserRepository;
import com.whatsup_clone.request.UpdateUserRequest;

@Service
public class UserServiceImplementation implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TokenProvider tokenProvider;

	@Override
	public User findUserById(Integer id) throws UserException {
		Optional<User> opl = userRepository.findById(id);
		if (opl.isPresent())
			return opl.get();
		throw new UserException("User Not Found!!");

	}

	@Override
	public User findUserProfile(String jwt) throws UserException {
		String email = tokenProvider.getEmailFromToken(jwt);
		if (email == null)
			throw new BadCredentialsException("Invalid Token");
		User u = userRepository.findByEmail(email);
		if (u == null)
			throw new UserException("No user found with Email id : " + email);
		return u;

	}

	@Override
	public User updateUser(Integer id, UpdateUserRequest req) throws UserException {
		User u = userRepository.findById(id).get();
		if (req.getFull_name() != null) {
			u.setFull_name(req.getFull_name());
		}
		if (req.getProfile_picture() != null) {
			u.setProfile_picture(req.getProfile_picture());
		}
		return userRepository.save(u);
	}

	@Override
	public List<User> searchUser(String query) {
		List<User> users = userRepository.searchUser(query);
		return users;
	}

}
