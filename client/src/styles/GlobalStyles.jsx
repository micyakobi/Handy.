import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 1rem;
    }
    &::-webkit-scrollbar-thumb{
      background-color: ${props => props.theme.palette.scrollbar.thumb};
    }
    &::-webkit-scrollbar-track{
      background-color: ${props => props.theme.palette.scrollbar.track};
    }
  }
  
  body {
    min-height: 100vh;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    background: ${props => props.theme.palette.body.main};
  }
  


/* Notification Component Styles */
.notification-container {
    margin-right: 15px;
}
/* Notifications */
.notification {
    display: inline-block;
    position: relative;
    padding: 6px;
    background: #00aeff;
    border-radius: 45px;
    font-size: 1.3em;
    box-shadow: 0 0 10px #00aeff;
    cursor: pointer;
}
.notification::before, .notification::after {
    color: #fff;
    text-shadow: 0 1px 3px #00aeff;
}
.notification::before {
    display: block;
    font-family: "FontAwesome";
    transform-origin: top center;
}
.notification::after {
    font-family: Arial;
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    top: -9px;
    right: -15px;
    padding: 5px 8px;
    line-height: 100%;
    border: 2px #fff solid;
    border-radius: 60px;
    background: #db3434;
    opacity: 0;
    content: attr(data-count);
    opacity: 0;
    transform: scale(0.5);
    transition: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
}
.notification.notify::before {
    animation: ring 1.5s ease;
}
.notification.show-count::after {
    transform: scale(1);
    opacity: 1;
}
.notification-info-panel {
    max-height: 300px;
    overflow-y: auto;
    padding: 0;
}
.notification-info-panel .notification-message {
    list-style: none;
    padding: 4px;
    background-color: #ebebeb;
    margin-bottom: 3px;
    border: 1px solid #ececec;
    border-radius: 8px;
}
.notification-info-panel .notification-message .timestamp {
    margin-bottom: 2px;
    font-size: 13px;
    font-weight: 600;
}
.notification-info-panel .notification-message .content {
    font-size: 17px;
}
.notification-info-panel .notification-message.unread {
    background-color: #00aeff;
    color: #fff;
}



`;

export default GlobalStyles;
