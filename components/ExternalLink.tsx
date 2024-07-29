import { InsertLink } from "@mui/icons-material";
import theme from "@/styles/theme";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  LinkUnderline,
  LinkUnderlineMotionTypography,
} from "./StyledComponents";

const MotionBox = motion(Box);

interface ExternalLinkProps {
  children: React.ReactNode;
  url: string;
  color?: string;
}
const ShakeIcon = motion(InsertLink);

export default function ExternalLink({
  children,
  url,
  color,
}: ExternalLinkProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <MotionBox
        display={"flex"}
        gap={"12px"}
        alignItems={"center"}
        position="relative"
        whileHover="hover"
      >
        <Box display={"flex"} gap={"12px"} alignItems={"center"}>
          <InsertLink
            fontSize={"inherit"}
            sx={{
              fontSize: "40px",
              color: color ? color : theme.custom.palette.text.link,
              [theme.breakpoints.down("sm")]: {
                fontSize: "30px",
              },
              [theme.breakpoints.down("md")]: {
                fontSize: "30px",
              },
            }}
          />
          <LinkUnderlineMotionTypography
            color={color ? color : theme.custom.palette.text.link}
            initial={{ scaleX: 1 }}
            variants={{
              hover: { scaleX: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            {children}
            <LinkUnderline
              initial={{ scaleX: 0 }}
              variants={{
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.1 }}
            />
          </LinkUnderlineMotionTypography>
        </Box>
      </MotionBox>
    </a>
  );
}
