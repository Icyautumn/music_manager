import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const studentsidebar = [
  {
    title: 'Calendar',
    path: '/Calendar/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Student',
    path: `/students/`,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Teacher',
    path: '/teachers/',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  
];