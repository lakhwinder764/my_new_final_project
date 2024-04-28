
import React, { useState } from 'react'
import { Avatar, Box, Switch, Typography, styled } from '@mui/material'
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlinePersonOutline, MdOutlineSettings } from "react-icons/md";

const MainMenu = ({setMode, mode}) => {
 const [menus, setMenus] = useState('messages');
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" checked={mode} disableRipple {...props} onChange={(e) => setMode(e?.target?.checked)}/>
      ))(({ theme }) => ({
        width: 80,
        height: 40,
        borderRadius:24,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 3,
          transitionDuration: '300ms',
          transform: 'translateX(5px)',
          '&.Mui-checked': {
            transform: 'translateX(50px)',
            transitionDuration: '300ms',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-unChecked': {
            transform: 'translateY(50px)',
            transitionDuration: '300ms',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            ...(mode ? ({
              color: '#536ae0',
            }):({
              color: '#33cf4d',
            })),
          
            border: '6px solid #fff',
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 25,
          height: 25,
          marginTop: 4,
          marginLeft: -4,
          ...(mode ? ({
            color: '#536ae0',
          }):({
            color: '#1c1f2e',
          })),
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));

      
  return (
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        background:'#222431'
       }}>
        <Box
        sx={{
          display:'flex',
          flexDirection:'column'
        }}
        >
  <Box  p={3} display="flex" alignItems="center" justifyContent="center">
        <Avatar src="/MyImage.jpg" />
        </Box>
        <Box  p={3} display="flex" alignItems="center" justifyContent="center" onClick={() =>  setMenus('messages')}
        sx={{
          ...(menus==="messages" && ({
            borderLeft:'7px solid #7382e0',
            background:'#1b1c21 !important'
          })),
          cursor:'pointer'
        }}
        >
       <FaRegMessage
       style={{
        fontSize:20,
        ...(menus === "messages"?({
          color:"#7382e0"
        }): ({
          color:"#d5d6d8"
        }))
       }}
       /> 
        </Box>
        <Box p={3} display="flex" alignItems="center" justifyContent="center" onClick={() =>  setMenus("user")}
         sx={{
          ...(menus === "user" && ({
            borderLeft:'7px solid #7382e0',
            background:'#1b1c21 !important'
          })),
          cursor:'pointer'
        }}
        >
       <MdOutlinePersonOutline
         style={{
          fontSize:20,
          ...(menus === "user"?({
            color:"#7382e0"
          }): ({
            color:"#d5d6d8"
          }))
         }}
       /> 
        </Box>
        <Box p={3} display="flex" alignItems="center" justifyContent="center" onClick={() =>  setMenus("settings")}
         sx={{
          ...(menus ==="settings" && ({
            borderLeft:'7px solid #7382e0',
            background:'#1b1c21 !important'
          })),
          cursor:'pointer'
        }}
        >
       <MdOutlineSettings
         style={{
          fontSize:20,
          ...(menus ==="settings"?({
            color:"#7382e0"
          }): ({
            color:"#d5d6d8"
          }))
         }}
       /> 
        </Box>
        </Box>
        <Box display="flex" flexDirection="column" mb={6}>
          <Box display="flex" alignItems="center" justifyContent="center">
          <Typography sx={{
          color:"#d5d6d8"
        }}>Mode 1</Typography>
          </Box>
  
        <Box sx={{
         transform: 'rotate(90deg)',
         my: 3,
        }} display="flex"  alignItems="center" justifyContent="center">
        <IOSSwitch />
        </Box>
        <Box display="flex"  alignItems="center" justifyContent="center">
        <Typography 
        sx={{
          color:"#d5d6d8"
        }}
        >Mode 2</Typography>
        </Box>
     
        </Box>
       </Box>
  )
}

export default MainMenu
