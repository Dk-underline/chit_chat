package com.whatsup_clone.service;

import java.util.List;

import com.whatsup_clone.entity.Chat;
import com.whatsup_clone.entity.User;
import com.whatsup_clone.exception.ChatException;
import com.whatsup_clone.exception.UserException;
import com.whatsup_clone.request.GroupChatRequest;

public interface ChatService {

	public Chat createChat(User reqUser, Integer userId2) throws UserException;

	public Chat findChatById(Integer chatId) throws ChatException;

	public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException;

	public Chat addUserToGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

	public Chat renameGroup(Integer chatId, String group_name, User reqUser) throws UserException, ChatException;

	public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

	public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException;
}
