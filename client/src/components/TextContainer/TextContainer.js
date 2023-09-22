import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
    </div>
    {
      users
        ? (
          <div>
            <h2>People currently in the room:</h2>
            <hr></hr>
            <div className="activeContainer">
              <ul>
                {users.map(({name}) => (
                  <li key={name} className="activeItem">
                    - {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;