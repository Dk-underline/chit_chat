import React, { useEffect, useState } from "react";
import { TbCircleDashed } from 'react-icons/tb'
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs'
import ChatCard from "../card/ChatCard";
import MessageCard from "../card/MessageCard";
import "./Home.css"
import { Profile } from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateGroup from "../Group/Group";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutUser, searchUser } from "../redux/auth/Action";
import { createChat, getUserChat } from "../redux/chat/Action";
import { createNewMessage, getALLMessages } from "../redux/message/Action";
import { over} from 'stompjs'
import SockJS from "sockjs-client";
import { BASE_API_URL } from "../config/Api";
const Home = () => {
    // console.log("This is Home Page");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const { auth, chat, message } = useSelector(store => store);
    const nevigate = useNavigate();
    const token = localStorage.getItem("token");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [query, setQuery] = useState("");
    const [currChat, setCurrChat] = useState(false);
    const [content, setContent] = useState("");
    const [isProfile, setProfile] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
     const [stompClient, setStompClient] = useState();
    const connectToWebSocket = async () => {
            const header = {
                Authorization:`Bearer ${token}`,
                'content-type': 'application/json',
                "X-XSRF-TOKEN":getCookie("XSRF-TOKEN")
            }
            const sockjs = new SockJS("http://localhost:5454/ws");
            const temp = over(sockjs);
            setStompClient(temp);
            // console.log("Connect to web Socket")
            // while(!isConnected){
           temp.connect(header,onConnect,onError);
            // }
            // console.log("Connected to web Socket")
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }
    const onConnect = () => {
        console.log("Web Socket is Connected Successfully")
        setIsConnected(true);
    }
    const onError = (error) => {
        console.log("No Error" ,error);
    }
    useEffect(() => {
        if (message.newMessage && stompClient) {
            setMessages([...messages, message.newMessage])
            stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
            console.log("Message Sent")
        }
    }, [message.newMessage])
    const onMessageReceive = (payload) => {
        console.log("Message Receive")
        const receivemessages = JSON.parse(payload.body);
        setMessages([...messages, receivemessages]);
    }

    useEffect(() => {
        console.log("Calling Message Recieve Use Effect")
        if (isConnected && stompClient && auth.reqUser && currChat) {
            const subscription = stompClient.subscribe("/group/" + currChat.id.toString(), onMessageReceive);
            console.log("Recived Message")
            return () => {
                subscription.unsubscribe();
            }
        }
    })
    useEffect(() => {
        connectToWebSocket();
    },[])

    useEffect(() => {
        setMessages(message.messages)
    }, [message.messages])

    const handleSearch = (keyword) => {
        dispatch(searchUser({ keyword, token }))
    }
    const ChatClickHandler = (id) => {
        // console.log(id);
        let userId = parseInt(id);
        dispatch(createChat({ token, data: { userId } }))
        // handleClickChat(item);
    }
    const handleClickChat = (item) => {
        setCurrChat(item);
    }
    const handleCreateNewMessage = () => {
        dispatch(createNewMessage({ token, data: { content: content, chatId: currChat.id } }))
        console.log("Create New Message");
        setContent("");
    }
    const handleNavigation = () => {
        setProfile(!isProfile);
    }
    const handleCreateGroup = () => {
        setIsGroup(true);
    }
    const handleLogOut = () => {
        dispatch(logoutUser());
    }
    useEffect(() => {
        dispatch(getUserChat({ token }));
    }, [chat.createChat, chat.createGroupChat])
    useEffect(() => {
        if (auth.reqUser === null) {
            nevigate("/signIn")
        }
    }, [auth.reqUser])
    useEffect(() => {
        dispatch(currentUser(token))
    }, [token])
    useEffect(() => {
        // console.log(currChat.id);
        dispatch(getALLMessages({ token: token, chatId: parseInt(currChat.id) }))

    }, [currChat, message.newMessage])
    // console.log(chat.chats);
    return (
        <>
            <div className="relative">
                <div className="py-14 bg-[#00a884] w-full"> </div>
                <div className="absolute flex bg-[#f0f2f2] h-[94vh] top-[5vh] left-[2vw] w-[96vw]">
                    <div className="left h-full w-[30%] bg-[#e8e9ec]">
                        {/* Profile */}
                        {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
                        {isProfile && <div className="w-full h-full"> <Profile handleNavigation={handleNavigation} /> </div>}
                        {!isProfile && !isGroup && <div className="w-full">
                            <div className="flex justify-between p-3">
                                <div className="space-x-3 flex items-center" onClick={handleNavigation}>
                                    <img className="rounded-full w-10 h-10 cursor-pointer"
                                        src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"}
                                        alt=""
                                    />
                                    <p>{auth.reqUser?.full_name}</p>
                                </div>
                                <div className="space-x-3 text-2xl flex">
                                    <TbCircleDashed className="cursor-pointer" onClick={() => { navigate("/status") }} />
                                    <BiCommentDetail />
                                    <div>
                                        <BsThreeDotsVertical
                                            className="cursor-pointer"
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleCreateGroup}>New Group</MenuItem>
                                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            <div className="flex relative items-center justify-center bg-white py-4 px-3">
                                <input className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                                    type="text"
                                    placeholder="serach or start new chat"
                                    onChange={(e) => {
                                        handleSearch(e.target.value)
                                        setQuery(e.target.value)
                                    }}
                                    value={query}
                                />
                                <AiOutlineSearch className="left-5 top-7 absolute" />
                                <div>
                                    <BsFilter className="ml-4 text-2xl" />
                                </div>
                            </div>
                            {/* {all Userse} */}
                            <div className="bg-white overflow-y-scroll h-[70vh] px-3">
                                {auth.reqUser != null && query && auth.searchUser?.map((item) => {
                                    return <div onClick={() => ChatClickHandler(item.id)} ><hr /><ChatCard name={item.full_name} userImg={item.profile_picture} /></div>
                                })}
                                {auth.reqUser != null && chat.chats?.length > 0 && !query && chat.chats?.map((item) => {
                                    return <div onClick={() => handleClickChat(item)} >
                                        <hr />
                                        {item.group ? (
                                            <ChatCard name={item.chat_name}
                                                userImg={
                                                    item.chat_img || "https://img.freepik.com/premium-photo/attractive-asian-american-woman-manga-character-design-anime-style_739548-5900.jpg?size=626&ext=jpg&ga=GA1.1.1081587985.1685936815&semt=sph"
                                                }
                                            />
                                        ) :
                                            (
                                                <ChatCard isChat={true} name={auth.reqUser.id === item.users[0].id ? item.users[1].full_name : item.users[0].full_name}
                                                    userImg={auth.reqUser.id === item.users[0].id ? item.users[1].profile_picture : item.users[0].profile_picture}
                                                />
                                            )
                                        }
                                    </div>
                                })}
                            </div>
                        </div>}
                    </div>
                    {/* Defualt User page */}
                    {!currChat && <div className="right w-[70%] flex flex-col items-center justify-center h-full">
                        <div className="max-w-[70%] text-center">
                            <img src="https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg" alt="" />
                            <h1 className="text-4xl text-gray-600">WhatsUp Web</h1>
                            <p className="my-9">
                                send and receive message without keeping your phone onling. Use WhatsUp up to 4 Linked devices and 1 phone at same time
                            </p>
                        </div>
                    </div>}
                    {/* User Interaction Page */}
                    {/* Message Container */}
                    {auth.reqUser != null && currChat && <div className="w-[70%] relative">
                        {/* header container */}
                        <div className="header absolute top-0 w-full bg-[#f1f3f7]">
                            <div className="justify-between flex">
                                {/* Image and user name container left */}
                                <div className="space-x-3 flex items-center px-3 py-3 ">
                                    <img className="rounded-full w-10 h-10 cursoer-pointer"
                                        src={(currChat.group ? currChat.chat_img : (auth.reqUser.id === currChat.users[0].id ? currChat.users[1].profile_picture : currChat.users[0].profile_picture)) || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"}
                                        alt=""
                                    />
                                    <p>{currChat.group ? currChat.chat_name : (auth.reqUser.id === currChat.users[0].id ? currChat.users[1].full_name : currChat.users[0].full_name)}</p>
                                </div>
                                {/* Search and 3 dot right */}
                                <div className="space-x-3 flex items-center px-3 py-3 ">
                                    <AiOutlineSearch className="text-lg" />
                                    <BsThreeDotsVertical className="text-lg" />
                                </div>
                            </div>
                        </div>
                        {/* Message Section */}
                        <div className="overflow-y-scroll px-10 h-[85vh] bg-gray-200">
                            <div className="py-2 flex flex-col justify-center space-y-1 mt-20">
                                {messages.length > 0 && messages?.map((item, ind) => {
                                    return (<MessageCard isReqUser={auth.reqUser.id !== item.user.id} content={item.content} />)
                                })
                                }
                            </div>
                        </div>
                        {/* footer Section */}
                        <div className="bg-[#f0f2f5] footer py-3 w-full absolute bottom-0">
                            <div className="flex justify-between items-center px-5 relative">
                                <BsEmojiSmile className="cursor-pointer text-lg" />
                                <ImAttachment className="text-lg" />
                                <input
                                    className="py-2 border-none outline-none w-[85%] rounded-md pl-4 bg-white"
                                    type="text"
                                    onChange={(e) => { setContent(e.target.value) }}
                                    value={content}
                                    placeholder="Type Message"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleCreateNewMessage();
                                            setContent("");
                                        }
                                    }}
                                />
                                <BsMicFill className="text-lg" />
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
}
export default Home;

// function subscribe(address, callback) {
//     if (isConnected) {
//       stompClient.subscribe(address, callback);
//     } else {
//       stompClient = Stomp.over(socket);
//       isConnected = true;
//       stompClient.connect({}, () => {
//         stompClient.subscribe(address, callback);
//       }, () => {
//         console.error('Sorry, I cannot connect to the server right now.');
//       });
//     }
//   }