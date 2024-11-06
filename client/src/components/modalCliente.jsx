import React, { useState } from "react";
import FormCliente from "./formCliente";

const ModalCliente = ({ onSubmit, initialData = {}, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{initialData.nome ? "Editar Cliente" : "Adicionar Cliente"}</h2>
        <FormCliente onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
};

export default ModalCliente;
