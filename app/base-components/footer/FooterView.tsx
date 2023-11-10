import { CallOutlined, Copyright } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function FooterView() {
  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
          }} variant="h6" align="center" gutterBottom>
          <span style={{ display: 'flex' }} >
            <Copyright sx={{ marginRight: '0.5rem' }} />
          </span>Bayu Syaits
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Find me in <span>
            <Typography
              component="a"
              href="https://github.com/bayusyaits"
              variant="h6"
              color="inherit"
              sx={{ fontSize: '16px' }}
            >
              Github
            </Typography>
          </span>
        </Typography>
      </Box>
    </>
  );
}
