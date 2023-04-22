import { Card, CardActions, CardContent, CardMedia, Typography, Box, Grid, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Grid item xs component={Card} sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardMedia
        sx={{
          height: 420,
          width: "100%",
        }}
      >
        <Skeleton animation="wave" variant="rectangular" sx={{ height: "100%" }} />
      </CardMedia>
      <Box>
        <CardContent>
          <Typography gutterBottom color="text.primary"
            variant="h6"
            sx={{
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              marginBottom: "10px"
            }}
          >
            <Skeleton
              animation="wave"
              height={20}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          </Typography>
          <Typography gutterBottom color="text.secondary"
            variant="subtitle1"
            sx={{
              textAlign: "center",
              overflow: "hidden",
              marginBottom: "20px"
            }}
          >
            <Skeleton
              animation="wave"
              height={20}
              width="50%"
              style={{ marginBottom: 6 }}
            />
          </Typography>
        </CardContent>
        <CardActions sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: "-20px"
        }}>
          <Skeleton animation="wave" height={40} width="80%" />
        </CardActions>
      </Box>
    </Grid>
  )
}
