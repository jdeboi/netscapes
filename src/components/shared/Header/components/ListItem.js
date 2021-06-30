import React from 'react';
import { Link } from 'react-router-dom';

class ListItem extends React.PureComponent {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { title, link, callback, classN } = this.props;
    const shortcut = getShortcut(this.props.shortcut);

    let classn = classN;
    classn += (shortcut === '' || shortcut === null) ? ' noShortcut' : ' shortcut';
    if (link && link !== '') {
      return (
        <li className={classn}><Link to={link}>{this.getMenuItem(title, shortcut)}</Link></li>
      );
    }

    return (
      <li className={classn} shortcut={shortcut}>{title}</li>
    );
  }

  getMenuItem = (title, shortcut) => {
    return (
      <div className="flexRow">
        <div className="title flex1">{title}</div>
        <div className="shortcut">{shortcut}</div>
      </div>
    )
  }
}

function getShortcut(shortcut) {
  if (shortcut === null || shortcut === "")
    return null;

  const parser = new DOMParser();
  const parsedString = parser.parseFromString(shortcut, 'text/html');
  return parsedString.body.innerHTML;
}

export default ListItem
