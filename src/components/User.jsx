import React, { Component } from 'react';

const User = (props) => {
  const { display_name, images, id } = props.userInfo;
  return (
    <div>
      <button
        className='userInfo'
        onClick={props.handleUserClick}> Get User Info
      </button>
      <ul className='userDataList'> 
        {/* <li className='userData'>
            <img src={images} alt="userImage" />
        </li> */}
        <li className='userData'>Display Name: {display_name}</li>
        <li className='userData'>id: {id}</li>
      </ul>
    </div>
  )
}

export default User;