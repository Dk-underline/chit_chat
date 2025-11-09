package com.whatsup_clone.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whatsup_clone.entity.Chat;
import com.whatsup_clone.entity.Message;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.ChatException;
import com.whatsup_clone.exception.MessageException;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.repository.MessageRepository;
import com.whatsup_clone.request.SendMessageRequest;

@Service
public class MessageServiceImplementation implements MessageService {
	@Autowired
	private UserService userService;
	@Autowired
	private ChatService chatService;
	@Autowired
	private MessageRepository messageRepository;

	@Override
	public Message sendMessage(SendMessageRequest req) throws ChatException, UserException {
		User user = userService.findUserById(req.getUserId());
		Chat chat = chatService.findChatById(req.getChatId());
		Message message = new Message();
		message.setUser(user);
		message.setChat(chat);
		message.setContent(req.getContent());
		message.setTimestamp(LocalDateTime.now());
		messageRepository.save(message);
		return message;
	}

	@Override
	public List<Message> getChatsMessage(Integer chatId, User reqUser) throws ChatException {
		Chat chat = chatService.findChatById(chatId);
		if (!chat.getUsers().contains(reqUser))
			throw new ChatException("Chat Not Found");
		List<Message> messages = messageRepository.findByChatId(chatId);
		return messages;
	}

	@Override
	public Message findMessageById(Integer messageId) throws MessageException {
		Optional<Message> opt = messageRepository.findById(messageId);
		if (!opt.isPresent())
			throw new MessageException("Message does not found");
		return opt.get();
	}

	@Override
	public void deleteMessageById(Integer messageId, User reqUser) throws MessageException, UserException {
		Message message = this.findMessageById(messageId);
		if (message.getUser().getId() == reqUser.getId()) {
			messageRepository.deleteById(messageId);
		}
		throw new UserException("You cannot delete the message of Another user");
	}

}
