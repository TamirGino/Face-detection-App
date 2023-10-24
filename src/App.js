import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import ClarifaiFaceDetection from './api/ClarifaiFaceDetection';
import SignIn from './components/SignIn/SingIn';
import Register from './components/Register/Register';

function App() {
  const [route,setRoute] = useState("home")
  const [imageUrl,setImageUrl] = useState("")
  const [user, SetUser] = useState({
    id:'',
    name:'',
    email:'',
    entries: '',
    joined:'',
  })

  const updateEntries = async () => {
    
    try {
      console.log("image!!!")
        const resp = await fetch('https://face-detection-wn85.onrender.com/update_entries', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          // id: user.id,
          email:user.email,
          entries:user.entries+1,
          })
        });
        // const count = await resp.json();
        if (resp.status === 200){
          console.log("Entry updated !!!!!!!!");
          SetUser(prevUser => ({
            ...prevUser,
            entries: prevUser.entries + 1
          }));
        }
       
        // if (count){
        //   console.log(count);
        //   SetUser({
        //     entries: count
        //   })
        // }
        
    } catch (error) {
        console.error('Error:', error);
    }
};

  const loadUser = (user_data) => {
    console.log(user_data)
    SetUser({
      id: user_data._id ,
      name: user_data.name,
      email: user_data.email,
      entries: user_data.entries,
      joined: user_data.joined
    })
  }

  const getRoute = (route) => {
    switch (route) {
      case "home":
        return (
          <div className='container'>
          <Rank count={user.entries} name={user.name}/>
          <ImageLinkForm sendImageUrl={handleApi} />
          <ClarifaiFaceDetection imgUrl={imageUrl} />
          </div> 
               );
      case "login":
        return (
          <SignIn handleRoutes={handleRoutes} loadUser={loadUser}/>
               );
      case "register":
        return (
          <Register handleRoutes={handleRoutes} loadUser={loadUser}/>
               );
      default:
        return (
          <div className='container'>
          <Rank />
          <ImageLinkForm sendImageUrl={handleApi} />
          <ClarifaiFaceDetection imgUrl={imageUrl} />
          </div>
               );
      }
    };

  const handleApi = (url) =>{
    //console.log(url);
    setImageUrl(url);
    updateEntries();
  }

  const handleRoutes = (route) =>{
    setRoute(route);
  }


  return (
    <div className="app">
        <ParticlesBg color="#ffebcd" type="cobweb" bg={true} />
        <Navigation handleRoutes={handleRoutes}/>
        {getRoute(route)}
           {/* <SignIn />
          <div className='container'>
            <Rank />
            <ImageLinkForm sendImageUrl={handleApi} />
            <ClarifaiFaceDetection imgUrl={imageUrl} />
          </div>  */}
          
    </div>
  );
}

export default App;