import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, InputAdornment, TextField } from "@mui/material";
import db from "./Firebase.js";
import SidebarChat from "./SidebarChat";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IoMdAdd } from "react-icons/io";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "react-pro-sidebar/dist/css/styles.css";
import debounce from "lodash.debounce";
import "./Sidebar.css"

const Sidebar = ({
  mode,
  searchResults,
  setSearchResults,
  users,
  setUsers,
  rooms,
  setrooms,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = db
      ?.collection("rooms")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        setrooms(
          snapshot?.docs?.map((doc) => {
            return {
              id: doc?.id,
              data: doc?.data(),
            };
          })
        );
      });
    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const unsubscribe = db
      ?.collection("users")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot?.docs?.map((doc) => {
            return {
              id: doc?.id,
              data: doc?.data(),
            };
          })
        );
      });
    return () => {
      unsubscribe();
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = debounce((query) => {
    console.info(query?.length);
    console.info(mode);
    const filteredResults = mode
      ? users?.filter((item) =>
          item?.data?.name.toLowerCase()?.includes(query.toLowerCase())
        )
      : rooms?.filter((item) =>
          item?.data?.name.toLowerCase()?.includes(query.toLowerCase())
        );
    setSearchResults(filteredResults);
  }, 100);

  const handleSearch = (event) => {
    const query = event?.target?.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#1b1c21 !important",
          borderLeft: "1px solid #1b1c21",
        },
        "& .pro-sidebar.collapsed": {
          width: 0,
          minWidth: 0,
        },
        "& .pro-sidebar-inner .pro-sidebar-layout": {
          overflow: "visible",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#FFFFF !important",
        },
        "& .pro-menu-item.active": {
          color: "#FFFFF !important",
        },
          position: {sm: "relative", xs:"fixed"},
          zIndex:10,
          height:'100vh'
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        // sx={{
        //   position: {lg: "relative", sm:"fixed"},
        // }}
      >
        <Menu iconShape="square">
          <Box
            sx={{
              ...(isCollapsed && {
                display: "none",
              }),
              // height:'100vh'
            }}
          >
            <div className="sidebar">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                sx={{
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box p={1}>
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 20,
                        "& fieldset": {
                          border: "none",
                        },
                        color: "#ffffff",
                        background: "#393b48",
                      },
                    }}
                    value={searchQuery}
                    onChange={handleSearch}
                    variant="outlined"
                    placeholder="Search ID"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon
                            sx={{
                              color: "#ffffff",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  p={1.2}
                  sx={{
                    borderRadius: 1,
                    border: "2px solid black",
                    // width: 40,
                    // height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    background: "#ffffff",
                  }}
                >
                  <IoMdAdd
                    style={{
                      fontSize: 14,
                      color: "4e6da6",
                    }}
                  />
                </Box>
              </Box>
              <div className="sidebar_chats">
                {searchResults?.map((room) => {
                  return (
                    <MenuItem>
                      <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                      />
                    </MenuItem>
                  );
                })}
              </div>
            </div>
          </Box>

          <Box
            sx={{
              ...(mode
                ? {
                    background: "black",
                    color: "#ffffff",
                  }
                : {
                    background: "#ffffff",
                    color: "black",
                  }),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              p: 1,
              position: "absolute",
              top: {sm: "60%", xs: '50vh'},
              right: {sm: -10, xs: -28},
              cursor:'pointer'
            }}
          >
            {isCollapsed ? (
              <ArrowForwardIosIcon
                onClick={() => setIsCollapsed(!isCollapsed)}
                sx={{
                  fontSize: 12,
                }}
              />
            ) : (
              <ArrowBackIosNewIcon
                onClick={() => setIsCollapsed(!isCollapsed)}
                sx={{
                  fontSize: 12,
                }}
              />
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
