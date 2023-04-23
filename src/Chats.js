import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { ChatEngine } from 'react-chat-engine'
import { useHistory } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';

function Chats() {
  const history = useHistory();
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () =>{
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }
    
    useEffect(()=>{
      if(!user){
        history.push('/');

        return;
      }

      //user agar chatEngine me already hai to 
      axios.get('https://api.chatengine.io/users/me', {
          headers:{
              "project-id": "18c5579e-017a-4a15-8e4b-1f2b23848897",
              "user-name" : user.email,
              "user-secret": user.uid,

          }
      })
      .then(() =>{
        setLoading(false);
      })
      //this below line of code (if user don't have a profile in chat engine , so we need to create it)
      .catch(() =>{
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('name', user.displayName);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
        .then((avatar)=>{
          formdata.append('avatar', avatar, avatar.name)
          // post request is use wehn we need to create some object
          axios.post('https://api.chatnengine.io/users/',
              formdata,
              { headers:{"private-key": "1a12da87-80c7-4f4a-bd8c-c328782f317b"}} 
          )
          // if user creating is successful
          .then(()=> setLoading(false))
          .catch((error)=> console.log(error))
        })
      })

    }, [user, history]);

    if(!user || loading) return 'Loading...';
    
    return (
      <div className='chats-page'>
          <div className="nav-bar">
            <div className="logo-tab">
              Unichat
            </div>
            <div onClick={handleLogout} className="logout-tab">
              Logout
            </div>
        </div>

        <ChatEngine
            height="calc(100vh-66px)"
            projectID="18c5579e-017a-4a15-8e4b-1f2b23848897"
            userName={user.email}
            userSecret={user.uid}
        />
    </div>
  )
}

export default Chats