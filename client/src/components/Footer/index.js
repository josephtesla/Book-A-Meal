import React from 'react'

const footerStyles = {
  position: "absolute",
  left: "0",
  right:"0",
  bottom: "-260px",
  padding: "50px",
  textAlign: "center",
  color: "#fff",
  background: "rgb(15, 15, 15)",
  fontSize: "14px"
}


const Footer = () => {
  return (
    <div>
      <footer 
        className="copyright"
        style={footerStyles}
        >
        <div>
            Copyright 2020. Developed by
            <a 
              href="https://github.com/josephtesla" 
              target="_blank"
              rel="noopener 
              noreferrer"
            > &nbsp;
            @Josephtesla
            </a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
