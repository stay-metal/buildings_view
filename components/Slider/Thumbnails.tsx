import { Box } from "@mui/material";
import { SxCircleButton } from "../StyledComponents";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import React, { useState } from "react";

export function Thumbnails() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverdThumb, setHoverdThumb] = useState(-1);

  const thumbsList = [
    { id: 1, url: "/placeholders/82x82.png" },
    { id: 2, url: "/placeholders/82x82.png" },
    { id: 3, url: "/placeholders/82x82.png" },
    { id: 4, url: "/placeholders/82x82.png" },
    { id: 5, url: "/placeholders/82x82.png" },
    { id: 6, url: "/placeholders/82x82.png" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.25)",
        },
      }}
    >
      <Box
        sx={{
          width: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <SxCircleButton>
          <ChevronLeftRoundedIcon fontSize={"inherit"} />
        </SxCircleButton>
      </Box>
      <Box
        sx={{
          transition: "transform 0.3s ease",
          display: "flex",
          //   gap: "5px",
        }}
        className="sx-thumbnails__container"
      >
        {thumbsList.map((thumb) => (
          <Box
            key={thumb.id}
            sx={{
              padding: "2px",
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(0.98)" : "none",
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              setHoverdThumb(thumb.id);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoverdThumb(-1);
            }}
          >
            <Box
              component="img"
              src={thumb.url}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease",
                borderRadius: "6px",
                // border:
                //   isHovered && hoverdThumb != thumb.id
                //     ? "2px solid red"
                //     : "2px solid yellow",
                transform:
                  isHovered && hoverdThumb != thumb.id ? "scale(0.98)" : "none",

                "&:hover": {
                  transform: "scale(1.07)",
                  width: "120%",
                  boxShadow: "0px 0px 6px #00000040",
                  zIndex: "100000",
                },
              }}
              className="sx-thumbnails__item"
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <SxCircleButton>
          <ChevronRightRoundedIcon fontSize={"inherit"} />
        </SxCircleButton>
      </Box>
    </Box>
  );
}
