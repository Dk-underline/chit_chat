package com.whatsup_clone.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// From which end point the web socket acess are allowed
//		registry.addEndpoint("/ws").withSockJS();
		registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// Client to server side end point
		registry.setApplicationDestinationPrefixes("/app");
		// Server to client side end points
		registry.enableSimpleBroker("/group/", "/user/");
		registry.setUserDestinationPrefix("/user");
	}

}
