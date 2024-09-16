import React from "react";

const ModalSucesso = ({ onClose, message }) => {
  return (
    <div style={modalSucessoStyle}>
      <div style={modalSucessoContentStyle}>
        <p style={{ color: "green", fontSize: "16px" }}>{message}</p>
        <button style={closeButtonSucessoStyle} onClick={onClose}>X</button>
      </div>
    </div>
  );
};

const modalSucessoStyle = {
  position: 'fixed',
  top: '60px', 
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalSucessoContentStyle = {
  backgroundColor: '#d4edda',
  padding: '10px 20px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
};

const closeButtonSucessoStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  marginLeft: '10px',
};

export default ModalSucesso;
