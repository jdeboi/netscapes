import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import FinderSubmenu from './components/FinderSubmenu';
// import { withRouter, Link } from "react-router-dom";

// components
import Clock from './components/Clock';
// import Volume from '../Volume/VolumeMute';

// icons
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import LiveIcon from '@material-ui/icons/LiveTv';
import VolumeDown from '@material-ui/icons/VolumeDown';

import { sketches } from '../../sketches/Sketches';


export default function Header(props) {

  // const [isVolumeMuted, setVolumeMuted] = useState(false);



  const getMainMenuSub = () => {
    const homeIcon = isSimpleHeader() ? "fas fa-bars" : "fas fa-server";
    const title = isSimpleHeader() ? "" : getCurrentDirectory();

    return (
      <FinderSubmenu
        currentPage={props.currentPage}
        title={title}
        icon={homeIcon}
        specialClass="apple"
        listItems={sketches} />
    );
  }


  const getDesktopHeader = () => {

    let headerClass = "Header menuTheme";

    return (
      <header className={headerClass}>
        <ul className="left">
          {getMainMenuSub()}
        </ul>
        <ul className="right">
          {getAboutLi()}
          {getInstaLi()}
          <li></li>
          <li><Clock /></li>
          {getVolumeLi()}
        </ul>
      </header>
    )
  }


  const getMobileHeaderPortrait = () => {

    const headerClass = "Header menuTheme mobile";

    return (
      <header className={headerClass}>
        <ul className="left">
          {getMainTitleLi()}
        </ul>
        <ul className="right">
          {getMainMenuSub()}
        </ul>
      </header>
    )
  }


  const isSimpleHeader = () => {
    const { ui } = props;
    return (ui.isMobile || ui.hasFooter);
  }



  const getMobileRightMenus = () => {
    return (
      <ul className="right">
        {/* <li className="header-avatar" onClick={props.avatarClicked}>{this.getAvatar()}</li> */}
      </ul>
    );
  }

  const getInstaLi = () => {
    return (
      <li className="clickable" onClick={() => openInNewTab("https://www.instagram.com/jdeboi/")}>
        <i className="fab fa-instagram"></i>
      </li>
    )
  }

  const getAboutLi = () => {
    return (
      <li className="clickable">
        <Link to="/about"><i className="far fa-file-alt"></i></Link>
      </li>
    )
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow)
      newWindow.opener = null
  }

  const getMainTitleLi = () => {
    return (
      <li><span id="pageTitle">netscapes</span></li>
    )
  }

  const getCurrentDirectory = () => {
    return (
      <React.Fragment>
        <span id="pageTitle">netscapes</span>
        {/* <span className="subtitle"> / </span>
        <span className="subtitle">{props.currentPage}</span> */}
      </React.Fragment>
    )
  }

  const getVolumeLi = () => {
    const classVol = "expandable icon opened";
    return (
      <li className={classVol} onClick={props.toggleAudio}>
        {/* <Volume isMuted={props.music.isMuted} /> */}
        {getVolumeIcon()}
      </li>
    )
  }

  const getVolumeIcon = () => {
    const { audioOn } = props;
    if (audioOn)
      return <VolumeUp />
    return <VolumeOff />
  }

  if (isSimpleHeader()) {
    return getMobileHeaderPortrait();
  }
  return (getDesktopHeader());

}
