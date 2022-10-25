import React from 'react'

const Message = ({msg, bgColor, handleClose}) => {
    let styles = {
        padding: "1rem",
        marginBottom: "1rem",
        height:"20px",
        width:"300px",
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor,
    };
    return (
        <div style={styles}>
            {msg}
            <button onClick={handleClose}>x</button>
        </div>
    )
}

export default Message