import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { db, auth } from "./firebase";
import { Button, Avatar, makeStyles, Modal, Input } from "@material-ui/core";
import FlipMove from "react-flip-move";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  
  //these two are the methods of material UI --- 1 it is in built function
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  //------------3-----------------state for handling posts
  const [posts, setPosts] = useState([]);
  
  //------------4--------------------------- state for handling USENAME in the input form 
  const [username, setUsername] = useState("");
  
  //--------------------------------5---------------- state for handling E-MAIL in the input form 
  const [email, setEmail] = useState("");
  
  // --------------------------6-----------------------------state for handling PASSWORD in the input form 
  const [password, setPassword] = useState("");
  
  //-------------------------7-------------------this state is used for authentification and used in login and signup in UseEffect functions
  const [user, setUser] = useState(null);
  
  
  //this is used for openning and closing of modal in which we are making a login form
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  

  
  //------------------------------------DEFINITION AND WORKING OF USE-EFFECT FUNCTION-------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------
  /* useEffect == runs a  code based on a specific conditions
  useEffect{() => {this is where we write our code}
  ,[here we write our conditions]
  } it will run when app component load and second time when changes are made in the conditions
  ---------------------------------------------------------------------------------------------------------------------------------------------
  
  
  */
  useEffect(() => {
    //here we are using unsubscribe to perform some clean up if this code runs multiple times
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
//this retun we can use in use-effect function 
    // by calling this it is removing the previous ones 
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  
  
  
  /* use effect functions of posts
  
  snapshot ==== every single time when there is some changes in the db it will catch it
  
  
  */

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
                  //without key it will refresh all the posts /
                  //here we a returning a objectwhich contains id and posts
                  //every time a post is added this code runs
      );
  }, []);
  
  
  
  
  /* these are the two functions which are assosiated with the two buttuons
  1---- handle login
  2======handle register
  
  */

  //---------------------------------------------------------------------------------------------------------------------------------
  
  const handleLogin = (e) => {
    //when we use a form its default behaviour when submit is done is to reload to prevent that from happing we use event.prevent function
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  
  
  
  
  
  const handleRegister = (e) => {
    //when we use a form its default behaviour when submit is done is to reload to prevent that from happing we use event.prevent function
    e.preventDefault();
    auth
    //this is defaul function from the firebase
      .createUserWithEmailAndPassword(email, password)
    // these email and password are from the states//
      .catch((error) => alert(error.message));

    setRegisterOpen(false);
  };

 
  
  /*above this is the handle event functions
  
  --------------------------------------------------------------------------------------------
  ----------------------------------------------
  here return of app functional component starts---*/
  
  
  return (
    <div className="app">
    
    //here we are using two modals one for login and other for signup
    
    
    
    /*this modal is for login */
    //here we are using material UI modal
    
    
    
    // MODAL NUMBER -----------------ONE
    
      <Modal open={open} onClose={() => setOpen(false)}> // either we can make a handle close function which will SetOpen falce 
    //or we can make a inline function which will perform the same work on less code
        <div style={modalStyle} className={classes.paper}>
          <form className="app__login">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>  
          </form>
        </div>
      </Modal>


/* this modal is for signup which contains 4 things
1-ip for email
2--ip for username
3---ip for password
4-- button to trigger a function

*/


//MODAL NUMBER =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-TWO

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__login">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
          </form>
        </div>
      </Modal>
//Header is here 

//you should make it a different component remove it from appppp---------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user?.displayName ? (
          <div className="app__headerRight">
            <Button onClick={() => auth.signOut()}>Logout</Button>
            <Avatar
              className="app__headerAvatar"
              alt={user.displayName}
              src="/static/images/avatar/1.jpg"
            />
          </div>
        ) : (
          <form className="app__loginHome">
            <Button onClick={() => setOpen(true)}>Login</Button>
            <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
          </form>
        )}
      </div>

// app header termminates here
//---------------------------------------------------------------------------------------------------------------------------
//=============================================================================================================================4
//==============================================================================================================================



      <div className="app__posts">
        <div className="app__postsLeft">
          <FlipMove>
          
          /* here we are using a map function you can relate to a loop and it is fetching data ,here from database*/
          
            {posts.map(({ id, post }) => (
              
              /* imported the post component and fiving it props
              after this we are generating the dynamic post component not the static ones which we used in initial stages
              */
              
              <Post
                user={user}
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
          </FlipMove>
        </div>


        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/B_uf9dmAGPw/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        <div className="app__upload">
        
  // -------------------------------------------------------------IMAGE --UPLOAD --COMPONENT COMES HERE ------------------------------//
        // WE ARE JUST PASSING ONE PROPS=========
          <ImageUpload username={user.displayName} />
        </div>
      ) : (
        <center>
          <h3>Login to upload</h3>
        </center>
      )}
    </div>
  );
}

export default App;
