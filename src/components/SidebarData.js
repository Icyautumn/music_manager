import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const SidebarData = [
  {
    title: 'Home',
    path: `/home/}`,
    icon: <AiIcons.AiFillHome />,
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
  {
    title: 'save file',
    path: '/invoice_edit/',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'pdf',
    path: '/pdf/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Calendar',
    path: '/Calendar/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];