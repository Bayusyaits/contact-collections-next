import { CallOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function HeaderView() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <CallOutlined sx={{ mr: 1 }} />
          <Typography
            component="a"
            href="/"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Contact List
          </Typography>

        </Toolbar>
      </AppBar>
    </>
  );
}
