import React, {useState} from 'react'
import './Popup.css'

function Popup(props) {
  const [popupTrigger, setPopupTrigger] = useState(false)

  const popup = () => {
    setPopupTrigger(false)
  }

  return (props.trigger || popupTrigger) ? (
      <div className="popup-main-div" id="dropdown" onClick={popup} >
        <div className="popup-inner-div">

          <span className="material-icons">person</span>Signin <br />
          <span className="material-icons">exit_to_app</span>Logout <br />
          <span className="material-icons">settings</span>Studio <br />
          <span className="material-icons">add_box</span>Create Channel <br />

        </div>
      </div>
  ) : "";
}

export default Popup
