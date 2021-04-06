import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';
import Jitsi from "react-jitsi";


const App = (props) => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  };


  const [meeting, setMeeting] = useState(false);
  const toggleMeeting = () => {
    console.log(meeting);
    setMeeting(!meeting);
  };

  const items = props.sampleList.map((s) =>
    <li key={s}>{s}</li>
  )

  return (
    <Styled styles={styles}>
      <div className='app'>
        {!meeting && <button onClick={toggleMeeting}>Start Class</button>}
        {meeting && <button onClick={toggleMeeting}>Stop Class</button>}
        {meeting && <WliVideoConfig roomName={props.roomName} teacher={props.teacher} />}
      </div>
    </Styled>
  );
};

App.defaultProps = {
  componentTitle: 'Myjitsi Component',
  sampleList: [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
  ],
  roomName: 'WLI-Test' + Date(),
  teacher:"WLI Teacher"
}

App.propTypes = {
  componentTitle: PropTypes.string,
  sampleList: PropTypes.array,
  roomName: PropTypes.string,
  teacher: PropTypes.string
};


const WliVideoConfig = (props) => {
  const handleAPI = (JitsiMeetAPI) => {
    //JitsiMeetAPI.executeCommand("toggleVideo");
  };

  const containerStyle = { width:'600px', height: '350px' }

  return (
    <>
        <Jitsi
          containerStyle={containerStyle}
          domain="meet.jit.si"
          onAPILoad={handleAPI}
          roomName={props.roomName}
          displayName={props.teacher}
          interfaceConfig={interfaceConfig}
          config={config}
        />
    </>
  );
};

const interfaceConfig = {
  LANG_DETECTION: false,
  lang: "es",
  APP_NAME: "WLI",
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  HIDE_INVITE_MORE_HEADER: true,
  MOBILE_APP_PROMO: false,
  SHOW_CHROME_EXTENSION_BANNER: false,
  TOOLBAR_BUTTONS: [
    "microphone",
    "camera",
    "fullscreen",
    "fodeviceselection",
    "hangup",
    "profile",
    "chat",
    "settings",
    "videoquality",
    "tileview",
    "download",
    "help",
    "mute-everyone",
    // 'security'
  ],
};

const config = {
  defaultLanguage: "es",
  prejoinPageEnabled: false,
  disableDeepLinking: true,
};

export default App;