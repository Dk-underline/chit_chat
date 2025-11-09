package com.whatsup_clone.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Chat {
	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String chat_name;
	private String chat_img;

	@ManyToMany
	private Set<User> admins = new HashSet<>();

	@Column(name = "is_group")
	private boolean isGroup;

	@JoinColumn(name = "created_by")
	@ManyToOne
	private User createdBy;

	@ManyToMany
	private Set<User> users = new HashSet<>();

	@OneToMany
	private List<Message> messages = new ArrayList<>();

	public Chat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Chat(Integer id, String chat_name, String chat_img, Set<User> admins, boolean isGroup, User createdBy,
			Set<User> users, List<Message> messages) {
		super();
		id = id;
		this.chat_name = chat_name;
		this.chat_img = chat_img;
		this.admins = admins;
		this.isGroup = isGroup;
		this.createdBy = createdBy;
		this.users = users;
		this.messages = messages;
	}

	public Set<User> getAdmins() {
		return admins;
	}

	public void setAdmins(Set<User> admins) {
		this.admins = admins;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		id = id;
	}

	public String getChat_name() {
		return chat_name;
	}

	public void setChat_name(String chat_name) {
		this.chat_name = chat_name;
	}

	public String getChat_img() {
		return chat_img;
	}

	public void setChat_img(String chat_img) {
		this.chat_img = chat_img;
	}

	public boolean isGroup() {
		return isGroup;
	}

	public void setGroup(boolean isGroup) {
		this.isGroup = isGroup;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

//	@Override
//	public int hashCode() {
//		return Objects.hash(Id, chat_img, chat_name, createdBy, isGroup, messages, users);
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		Chat other = (Chat) obj;
//		return Objects.equals(Id, other.Id) && Objects.equals(chat_img, other.chat_img)
//				&& Objects.equals(chat_name, other.chat_name) && Objects.equals(createdBy, other.createdBy)
//				&& isGroup == other.isGroup && Objects.equals(messages, other.messages)
//				&& Objects.equals(users, other.users);
//	}

}
