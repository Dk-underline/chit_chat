import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SelectedMember from './SelectedMember';
import ChatCard from '../card/ChatCard';
import NewGroup from './NewGroup';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../redux/auth/Action';

const Group = ({setIsGroup}) => {
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [groupMembers, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);
  const token = localStorage.getItem("token");
  const handleremoveMember = (item) => {
    groupMembers.delete(item)
    setGroupMember(groupMembers);
  }
  const handleSearch = (query) => {
    dispatch(searchUser({ keyword:query,token}))
  }
  // console.log(groupMembers.size)
  return (
    <>
      <div className='w-full h-full'>
        {!isNewGroup && (<>
          <div>
            <div className='flex bg-[#008069] text-white space-x-10 items-center pt-16 pb-5 px-10'>
              <BsArrowLeft
                className="text-2xl cursor-pointer font-bold"
              />
              <p className='text-xl font-semibold'>Add Participats to Group </p>
            </div>
            <div className="relative bg-white px-3 py-4">
              <div className="flex space-x-2 flex-wrap space-y-1">
                {
                  groupMembers.size > 0 &&
                  Array.from(groupMembers).map((item) => { return <SelectedMember handleremoveMember={handleremoveMember} member={item} /> })
                }
              </div>
            </div>
            <input type='text'
              onChange={(e) => {
                handleSearch(e.target.value)
                setQuery(e.target.value)
              }}
              placeholder='Search User'
              className='outline-none font-semibold border-b border-[#8888] pb-4 w-full'
              value={query}
            />
          </div>
          <div className='bg-white overflow-y-scroll h-[50.2vh]'>
            {query &&
              auth.searchUser?.map((item) => <div onClick={() => {
                groupMembers.add(item)
                setGroupMember(groupMembers);
                setQuery("");
              }}
                key={item?.id}
              >
                <hr />
                <ChatCard userImg={item.profile_picture} name={item.full_name} />
              </div>
              )
            }
          </div>
          <div className='bottom-10 py-10 flex items-center justify-center bg-slate-200'>
            <div className='bg-green-600 cursor-pointer rounded-full p-4' onClick={() => {
              setIsNewGroup(true);
            }}>
              <BsArrowRight className='text-3xl text-white font-bold' />
            </div>
          </div>
        </>)}
        {isNewGroup && <NewGroup groupMember={groupMembers} setIsGroup={setIsGroup}/>}
      </div>

    </>
  )
}

export default Group
