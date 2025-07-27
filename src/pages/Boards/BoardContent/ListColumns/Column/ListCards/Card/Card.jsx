import { Card as MuiCard } from "@mui/material";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
const Card = ({ temporaryHideMedia }) => {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              p: 1.5,
            },
          }}
        >
          <Typography>Card 01</Typography>
        </CardContent>
      </MuiCard>
    );
  }
  return (
    <>
      <MuiCard
        sx={{
          cursor: "pointer",
          // boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/516556923_710968314904015_8095573414336475991_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3VMEUxqey5vc4BwHXtXbW5lRgVodcipfmVGBWh1yKlz5E9E1h87sA1m0JiAaiXngpIp8AXvrd88xnbIaY8Cvx&_nc_ohc=-sfmFYNc8mIQ7kNvwHm9-Sb&_nc_oc=AdnyZ3qzOWQWcAgFop4gl_RL0bnrUy6lsXqdJlyolred_XazSO99UcsbLGAnSUYdKHcANyKBziu3dxSLNfJ49zqx&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=_cq3ZpaT6LqKmpbGzovddg&oh=00_AfTI39rcCRBZPg1_Aev5UdAfEDVrMwOW4FiijB4eiPXEEA&oe=68861220"
          title="green iguana"
        />
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              p: 1.5,
            },
          }}
        >
          <Typography>MiQuyen</Typography>
        </CardContent>
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          <Button size="small" startIcon={<GroupIcon />}>
            20
          </Button>
          <Button size="small" startIcon={<ModeCommentIcon />}>
            15
          </Button>
          <Button size="small" startIcon={<AttachmentIcon />}>
            10
          </Button>
        </CardActions>
      </MuiCard>
    </>
  );
};

export default Card;
