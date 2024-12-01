import React, { useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipBox = styled.div`
  position: absolute;
  top: -40px;  /* Ajuste para que o tooltip apareça acima */
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ButtonArea = styled.div`
  display: inline-block;
  padding: 10px 15px;  /* Aumente o padding para expandir a área de hover */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover + ${TooltipBox} {
    opacity: 1;
    visibility: visible;
  }
`;

const Dashboard = () => {
  return (
    <TooltipContainer>
      <ButtonArea>
        Mostrar Tooltip
      </ButtonArea>
      <TooltipBox>
        <h4>Este é um Tooltip no Canto Superior Direito</h4>
        <p>Informações adicionais podem ser apresentadas aqui.</p>
      </TooltipBox>
    </TooltipContainer>
  );
};

export default Dashboard;
