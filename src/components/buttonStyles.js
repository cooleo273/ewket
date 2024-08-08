import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    border-radius: 10px;
    background-color: #444252;
    border: 1px solid darkgray; 
    font-family: "Montserrat", sans-serif;
    font-size: 11px;
    width: 10rem;
     &:hover {
      background-color: #444252 !important;
      
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background-color: #270843;
    color: #fff;
    &:hover {
      background-color: #3f1068;
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background-color: #7f56da;
    color: #fff;
    &:hover {
      background-color: #7a1ccb;
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #133104;
    color: #fff;
    &:hover {
      background-color: #266810;
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #444252;
    color: white;
    width: 10rem;
    font-family: montserrat;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;

export const GrayButton = styled(Button)`
  && {
    background-color: #444252 ;
    color: white;
    width: 20rem;
    font-family: montserrat;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;