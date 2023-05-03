import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function HomePage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <>
            <Slider {...settings}>
                <div>
                    <Box position="relative">
                        <img src="/images/hero1.png" alt="hero" style={{ display: "block", width: "120%", maxHeight: 1100 }} />
                        <Typography
                            variant="h2"
                            fontSize={90}
                            color="white"
                            textAlign="center"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textShadow: "0 0 10px black"
                            }}
                        >
                            Welcome to the New World
                        </Typography>

                    </Box>
                </div>
                <div>
                    <Box position="relative">
                        <img src="/images/hero2.jpg" alt="hero" style={{ display: "block", width: "100%", maxHeight: 1000 }} />
                        <Typography
                            variant="h2"
                            fontSize={90}
                            color="white"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textShadow: "0 0 10px black"
                            }}
                        >
                            Welcome to the New World
                        </Typography>

                    </Box>
                </div>
                <div>
                    <Box position="relative">
                        <img src="/images/hero3.jpg" alt="hero" style={{ display: "block", width: "100%", maxHeight: 900 }} />
                        <Typography
                            variant="h2"
                            fontSize={90}
                            color="white"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textShadow: "0 0 10px black"
                            }}
                        >
                            Welcome to the New World
                        </Typography>

                    </Box>
                </div>
            </Slider>
        </>
    )
}
