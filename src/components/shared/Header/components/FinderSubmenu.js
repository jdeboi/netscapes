import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class FinderSubmenu extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    }

    this.toggleHidden = this.toggleHidden.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isVisible: false
      })
    }
  }

  toggleHidden() {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }

  render() {

    // var title = this.props.title; 

    // if (this.props.title === "") {
    const title =
      <React.Fragment>
        <i className={this.props.icon}></i>
        <span> </span>
        {this.props.title}
      </React.Fragment>
    // }
    const specialClass = this.props.specialClass;
    let ulSpecialClass = this.props.ulSpecialClass ? this.props.ulSpecialClass : "";
    if (this.getMobile())
      ulSpecialClass += " mobile";
    const listItems = this.props.listItems;


    let classN = specialClass ? (" " + specialClass) : "";
    if (!this.getMobile()) {
      classN += " expandable";
      classN += this.state.isVisible ? ' selected' : '';
    }
    // if (this.props.title === "losing my dimension" && this.isXXSmall())
    //   classN += " xxsmall";

    return (
      <li className={classN} onClick={this.toggleHidden} ref={this.setWrapperRef}>{title}
        <div className={`submenu ${this.state.isVisible ? 'visible' : ''}`}>
          <ul className={ulSpecialClass}>
            {listItems.map((item, i) => {
              let classLN = item.classN ? item.classN : "";
              let t = item.title;

              if (classLN === "disabled") {
                t = "coming soon";
                return (
                  <ListItem
                    key={i}
                    shortcut={item.shortcut}
                    title={t}
                    link={null}
                    callback={item.callback}
                    classN={classLN}
                  />)
              }
              if (item.title === "hard drives on seashores")
                t = "hard drives";
              return (
                <ListItem
                  key={i}
                  shortcut={item.shortcut}
                  title={t}
                  link={`/${item.link}`}
                  callback={item.callback}
                  classN={classLN}
                />)


            })}
          </ul>
        </div>
      </li>
    );
  }

  getPageTitle = () => {
    // if (this.getMobile() && this.props.title === "losing my dimension") {
    //   return (
    //     <div className="mobile-title">
    //       <div>losing my dimension</div>
    //       <div className="subtitle">{this.props.currentPage}</div>
    //     </div>
    //   )
    // }
    return (
      <span id="pageTitle">{this.props.title}</span>
    )

  }

  isXXSmall = () => {
    // return (this.props.currentPage !== "gallery" && this.props.ui.width < 445);
    return false;
  }

  getMainTitle = () => {
    // let title = "losing my dimension";
    if (this.props.title === "losing my dimension") {
      if (this.isXXSmall()) {
        // let sty = { display: "flex", flexDirection: "column", lineHeight: "15px", position: "absolute", top: 10 }
        // return (
        //   <span><span className="xxsmallLogo" style={sty}><span>losing my</span><span>dimension</span></span></span>
        // )
        return null;
      }


    }
    return (
      <React.Fragment>{this.props.title}</React.Fragment>
    )

    // return this.props.currentPage; // === "gallery"?"losing my dimension":this.props.currentPage;
  }

  getMobile = () => {
    // return this.props.ui.isMobile || this.props.ui.hasFooter;
    return false;
  }

}

export default FinderSubmenu
