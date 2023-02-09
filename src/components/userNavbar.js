import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const userNavbar = [
  {
    title: 'Calendar',
    path: '/Calendar/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Invoice',
    path: `/view_invoice/`,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }, 
  
];