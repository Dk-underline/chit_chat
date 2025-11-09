package com.whatsup_clone.service;

import java.util.List;

import com.whatsup_clone.entity.Message;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.ChatException;
import com.whatsup_clone.exception.MessageException;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.request.SendMessageRequest;

public interface MessageService {

	public Message sendMessage(SendMessageRequest req) throws ChatException, UserException;

	public List<Message> getChatsMessage(Integer chatId, User reqUser) throws ChatException;

	public Message findMessageById(Integer messageId) throws MessageException;

	public void deleteMessageById(Integer messageId, User reqUser) throws MessageException, UserException;

}
