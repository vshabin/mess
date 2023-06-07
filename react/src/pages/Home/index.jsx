import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router';
import { Messages, ChatInput, Status, Sidebar } from 'containers';
import { connect } from 'react-redux';
import MediaQuery from "react-responsive";
import './Home.scss';
import { Link } from 'react-router-dom';
import { dialogsActions } from 'redux/actions';

const Home = props => {
  const { setCurrentDialogId, user } = props;
  useEffect(() => {
    const { pathname } = props.location;
    const dialogId = pathname.split('/').pop();
    setCurrentDialogId(dialogId);
    if(dialogId){setChats(false);}
  }, [props.location.pathname]);
  const [chats, setChats] = useState(true);

  return (
    <section className="home">
        <MediaQuery maxWidth={1223}>
        {chats && 
          <Sidebar/>
        }
        {!chats &&
          <div className="chat_mobile">
            
            <Link to={`/`} className="c-button" onClick={() => {setChats(true)}}>
            Назад
            </Link>
               
            {user && (
              <div className="chat__dialog">
                <Status />
                <Messages />
                <div className="chat__dialog-input">
                  <ChatInput />
                </div>
              </div>
            )}
          </div>
        }
  
        </MediaQuery>
        <MediaQuery minWidth={1224}>
            <div className="chat">
              <Sidebar />
              {user && (
                <div className="chat__dialog">
                  <Status />
                  <Messages />
                  <div className="chat__dialog-input">
                    <ChatInput />
                  </div>
                </div>
              )}
              
            </div>
        </MediaQuery>
        
      
    </section>
  );
};

export default withRouter(
  connect(
    ({ user }) => ({ user: user.data }),
    dialogsActions,
  )(Home),
);
