package com.whatsup_clone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whatsup_clone.entity.Chat;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.ChatException;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.repository.ChatRepositroy;
import com.whatsup_clone.request.GroupChatRequest;

@Service
public class ChatServiceImplementation implements ChatService {
	@Autowired
	private ChatRepositroy chatRepositroy;
	@Autowired
	private UserService userService;

	@Override
	public Chat createChat(User reqUser, Integer userId2) throws UserException {
		User user = userService.findUserById(userId2);
		Chat isChatExists = chatRepositroy.findSingleChatByUserIds(user, reqUser);
		if (isChatExists != null)
			return isChatExists;
		Chat c = new Chat();
		c.setCreatedBy(reqUser);
		c.getUsers().add(user);
		c.getUsers().add(reqUser);
		c.setGroup(false);

		return chatRepositroy.save(c);
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {
		Optional<Chat> chat = chatRepositroy.findById(chatId);
		if (chat.isPresent())
			return chat.get();
		throw new ChatException("Chat not found with id " + chatId);
	}

	@Override
	public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
		List<Chat> chats = chatRepositroy.findCharByUserId(userId);
		return chats;
	}

	@Override
	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
		Chat group = new Chat();
		group.setGroup(true);
		group.setChat_img(req.getChat_image());
		group.setChat_name(req.getChat_name());
		group.setCreatedBy(reqUser);
		group.getAdmins().add(reqUser);
		for (Integer usI : req.getUserIds()) {
			User user = userService.findUserById(usI);
			group.getUsers().add(user);
		}

		return chatRepositroy.save(group);
	}

	@Override
	public Chat addUserToGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
		Optional<Chat> chat = chatRepositroy.findById(chatId);
		if (!chat.isPresent())
			throw new ChatException("Chat not found with id " + chatId);
		User user = userService.findUserById(userId);
		Chat c = chat.get();
		if (!c.getAdmins().contains(reqUser))
			throw new UserException("You are Not Admin");
		c.getUsers().add(user);
		return chatRepositroy.save(c);
	}

	@Override
	public Chat renameGroup(Integer chatId, String group_name, User reqUser) throws UserException, ChatException {
		Optional<Chat> chat = chatRepositroy.findById(chatId);
		if (!chat.isPresent())
			throw new ChatException("Chat not found with id " + chatId);
		Chat c = chat.get();
		if (!c.getUsers().contains(reqUser)) {
			throw new UserException("You are Not Member of this Group");
		}
		c.setChat_name(group_name);
		return chatRepositroy.save(c);
	}

	@Override
	public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
		Optional<Chat> chat = chatRepositroy.findById(chatId);
		if (!chat.isPresent())
			throw new ChatException("Chat not found with id " + chatId);
		User user = userService.findUserById(userId);
		Chat c = chat.get();
		if (c.getAdmins().contains(reqUser) || user.getId() == reqUser.getId()) {
			c.getUsers().remove(user);
			return chatRepositroy.save(c);
		}
		throw new UserException("Invalid Action");

	}

	@Override
	public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException {
		Optional<Chat> chat = chatRepositroy.findById(chatId);
		if (!chat.isPresent())
			throw new ChatException("Chat not found with id " + chatId);
//		User user = userService.findUserById(userId);
		Chat c = chat.get();
		chatRepositroy.deleteById(c.getId());

	}

}
