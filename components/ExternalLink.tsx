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
  href: string;
  color?: string;
  variant?: "text" | "caption" | null;
}
const ShakeIcon = motion(InsertLink);

export default function ExternalLink({
  children,
  href,
  color,
  variant,
}: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <MotionBox display={"flex"} whileHover="hover">
        <Box
          sx={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            gap:
              variant === "text"
                ? "12px"
                : variant === "caption"
                ? "9px"
                : "12px",
          }}
        >
          <InsertLink
            fontSize={"inherit"}
            sx={{
              marginTop:
                variant === "text"
                  ? "-4px"
                  : variant === "caption"
                  ? "-1px"
                  : "-4px",
              fontSize:
                variant === "text"
                  ? "40px"
                  : variant === "caption"
                  ? "34px"
                  : "40px",
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
