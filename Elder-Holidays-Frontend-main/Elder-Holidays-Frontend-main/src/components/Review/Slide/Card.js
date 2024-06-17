import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import Quote from "@mui/icons-material/FormatQuote";

const SliderCard = () => {
  const progress = 80;
  return (
    <Card
      sx={{
        background: "rgba(211, 250, 255, 0.86)",
        color: "grey",
        maxWidth: 1000,
      }}
    >
      <Box margin={5} sx={{ flexGrow: 1 }}>
        <Grid
          style={{ justifyContent: "center" }}
          justifyContent="center"
          alignItems="center"
          container
          spacing={0}
          gap={0}
        >
          <Grid item xs={10} lg={4}>
            <ListItem alignItems="flex-center">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "blue", width: 62, height: 62 }} />
              </ListItemAvatar>
              <div className="flex justify-center">
                <div className="block px-2 max-w-sm">
                  <h5 className="text-black text-xl leading-tight font-medium">
                    Loura Carkas
                  </h5>
                  <p className="text-lg">32y.o</p>
                </div>
              </div>
            </ListItem>
            <p className="py-1">
              <span className="font-medium text-lg uppercase">Tour: </span>
              <span>Czech, Prague</span>
            </p>
            <CardMedia
              className="selectDisable"
              draggable="false"
              sx={{ borderRadius: "0.5rem" }}
              component="img"
              height="50"
              image="https://mui.com/static/images/cards/paella.jpg"
              alt="Paella dish"
            />
          </Grid>
          <Grid
            style={{
              background: "#00000000",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }}
            item
            xs={10}
            lg={8}
          >
            <div className="flex justify-center">
              <ul className="rounded-xl w-full text-gray-500">
                <li className="flex flex-col md:flex-row items-center px-0 py-2 md:px-6 w-full rounded-t-lg">
                  <div className="text-left w-full md:w-2/5 text-lg">
                    Assistance
                  </div>
                  <div className="flex flex-row items-center w-full md:w-3/5">
                    <div className="w-full rounded-lg bg-gray-200 mr-3 h-2">
                      <div
                        className="bg-sky-400 rounded-l-lg h-2"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xl font-medium text-sky-400">
                      {progress + "%"}
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center px-0 py-2 md:px-6 w-full rounded-t-lg">
                  <div className="text-left w-full md:w-2/5 text-lg">
                    Tour quality
                  </div>
                  <div className="flex flex-row items-center w-full md:w-3/5">
                    <div className="w-full rounded-lg bg-gray-200 mr-3 h-2">
                      <div
                        className="bg-sky-400 rounded-l-lg h-2"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xl font-medium text-sky-400">
                      {progress + "%"}
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center px-0 py-2 md:px-6 w-full rounded-t-lg">
                  <div className="text-left w-full md:w-2/5 text-lg">Hotel</div>
                  <div className="flex flex-row items-center w-full md:w-3/5">
                    <div className="w-full rounded-lg bg-gray-200 mr-3 h-2">
                      <div
                        className="bg-sky-400 rounded-l-lg h-2"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xl font-medium text-sky-400">
                      {progress + "%"}
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center px-0 py-2 md:px-6 w-full rounded-t-lg">
                  <div className="text-left w-full md:w-2/5 text-lg">
                    Assistance
                  </div>
                  <div className="flex flex-row items-center w-full md:w-3/5">
                    <div className="w-full rounded-lg bg-gray-200 mr-3 h-2">
                      <div
                        className="bg-sky-400 rounded-l-lg h-2"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xl font-medium text-sky-400">
                      {progress + "%"}
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center px-0 py-2 md:px-6 w-full rounded-t-lg">
                  <div className="text-left w-full md:w-2/5 text-lg">
                    Overall Rating
                  </div>
                  <div className="flex items-center justify-center content-center text-xl font-medium text-sky-400 bg-white shadow-lg shadow-black-800 h-10 w-10 rounded-full">
                    10
                  </div>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </Box>
      <CardContent>
        <Quote style={{ display: "block", float: "left" }} />
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <Quote style={{ display: "block", float: "right" }} />
      </CardContent>
    </Card>
  );
};

export default SliderCard;
