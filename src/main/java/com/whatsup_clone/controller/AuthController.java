package com.whatsup_clone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.whatsup_clone.config.TokenProvider;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.repository.UserRepository;
import com.whatsup_clone.request.LoginRequest;
import com.whatsup_clone.response.AuthResponse;
import com.whatsup_clone.service.CustomUserService;

@Controller
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TokenProvider tokenProvider;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private CustomUserService customUserService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
		String email = user.getEmail();
		String full_name = user.getFull_name();
		String password = user.getPassword();
		User isUser = userRepository.findByEmail(email);
		if (isUser != null)
			throw new UserException("Email address is already exists!!!");
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFull_name(full_name);
		createdUser.setProfile_picture(user.getProfile_picture());
		createdUser.setPassword(encoder.encode(password));
		userRepository.save(createdUser);
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateToken(authentication);
		AuthResponse resp = new AuthResponse(jwt, true);
		return new ResponseEntity<AuthResponse>(resp, HttpStatus.ACCEPTED);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandelr(@RequestBody LoginRequest req) {
		String email = req.getEmail();
		String passowrd = req.getPassword();
		Authentication authentication = authenticate(email, passowrd);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateToken(authentication);
		AuthResponse resp = new AuthResponse(jwt, true);
		return new ResponseEntity<AuthResponse>(resp, HttpStatus.ACCEPTED);
	}

	public Authentication authenticate(String email, String password) {
		UserDetails userDetails = customUserService.loadUserByUsername(email);
		if (userDetails == null)
			throw new BadCredentialsException("Invalid User Name");
		if (!encoder.matches(password, userDetails.getPassword()))
			throw new BadCredentialsException("Invalid Password!!");
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

	}
}
