import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';
import Jitsi from "react-jitsi";
import useWindowDimensions from './WindowDimensions';


const App = (props) => {
  const dispatch = useContext(EventContext);
  const { height, width } = useWindowDimensions();
  console.log({height,width})
  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  };


  const [meeting, setMeeting] = useState(false);
  const toggleMeeting = () => {
    console.log(meeting);
    setMeeting(!meeting);
  };

  return (
    <Styled styles={styles}>
      <div>
        {!meeting && <button className="join-btn" onClick={toggleMeeting}>{props.joinMode} Class</button>}
        {meeting && <button className="join-btn" onClick={toggleMeeting}>Stop Class</button>}
        {meeting && <WliVideoConfig {...props} width={width>801?'800'+'px':'96vw'} height={width>801?500+'px':'60vw'} />}
      </div>
    </Styled>
  );
};

App.defaultProps = {
  componentTitle: 'Myjitsi Component',
  roomName: 'WLI-Test' + Date(),
  teacher:"WLI Teacher",
  width:'600px',
  height:'350px',
  joinMode:'Join'
}

App.propTypes = {
  componentTitle: PropTypes.string,
  roomName: PropTypes.string,
  teacher: PropTypes.string,
  width:PropTypes.string,
  height:PropTypes.string,
  joinMode:PropTypes.string
};


const WliVideoConfig = (props) => {
  const handleAPI = (JitsiMeetAPI) => {
    //JitsiMeetAPI.executeCommand("toggleVideo");
  };

  const containerStyle = { width: props.width, height: props.height }

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
  SHOW_JITSI_WATERMARK: false,
  SHOW_WATERMARK_FOR_GUESTS: false,
  LANG_DETECTION: false,
  lang: "en",
  APP_NAME: "WLI",
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  HIDE_INVITE_MORE_HEADER: true,
  MOBILE_APP_PROMO: false,
  SHOW_CHROME_EXTENSION_BANNER: false,
  DEFAULT_LOGO_URL: 'assets/quiz.svg',
  BRAND_WATERMARK_LINK: 'assets/quiz.svg',

  TOOLBAR_BUTTONS: [
    "microphone",
    "camera",
    "fullscreen",
    //"fodeviceselection",
    "hangup",
    "profile",
    "chat",
    //"settings",
    //"videoquality",
    //"tileview",
    //"download",
    //"help",
    "mute-everyone",
    // 'security'
  ],
};

const config = {
  defaultLanguage: "en",
  prejoinPageEnabled: false,
  disableDeepLinking: true,
};

export default App;