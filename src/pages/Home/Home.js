import React, { useState } from 'react'
import {
  Button,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
} from '@mui/material'
import Link from 'components/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Edit, Link as LinkIcon, QrCode, Handshake } from '@mui/icons-material'
import ReactPlayer from 'react-player'
import Image from 'components/Image'
import ClaimtagImage from 'images/claimtag_image.png'
import { Box } from '@mui/system'

const Home = () => {
  const [playerIsReady, setPlayerIsReady] = useState(false)

  return (
    <Container maxWidth="sm">
      <Grid container spacing={5} justifyContent="center" mb={5} mt={3}>
        <Grid item xs={12} sm={5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            textAlign="center"
          >
            <Box width="200px" textAlign="center">
              <Image src={ClaimtagImage} width="100%" />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          container
          spacing={2}
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
        >
          <Grid item xs={12}>
            <Typography variant="h1" lineHeight={0.9}>
              <b>Claimtags</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Claimable <b>QR code name tags</b> that make it easy for event
              attendees to share <b>who they are</b> and{' '}
              <b>what they're working on</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              disableElevation
              color="secondary"
              component={RouterLink}
              to="/create"
            >
              <Typography textTransform={'none'}>
                <b>Create For Free</b>
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box position="relative" paddingTop="56.25%">
            <ReactPlayer
              url="https://vimeo.com/708592308/8e6189fe7b"
              width="100%"
              height="100%"
              controls
              muted
              // playing
              loop
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                visibility: playerIsReady ? null : 'hidden',
              }}
              onReady={() => setPlayerIsReady(true)}
            />
          </Box>
        </Grid>
        <Grid item xs={11} sm={12}>
          <Typography variant="h5" mb={1}>
            More than a name tag
          </Typography>
          <Typography>
            Claimtags are a fun and easy way for event attendees to connect.
            Each Claimtag features a unique QR code that attendees scan once to
            claim and redirect to any link they want. Minimal prep, easy to use,
            no setup required.{' '}
            <Link to="how-it-works" underline="hover">
              Learn More →
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Typography variant="h5" mb={1}>
            Easy for Organizers
          </Typography>
          <Typography>
            Generate a PDF template for your Claimtags{' '}
            <Link to="create" underline="hover">
              here
            </Link>
            , then print your claimtags at home before your next event.{' '}
          </Typography>
          <Typography>
            <Link to="how-it-works" underline="hover">
              What you'll need →
            </Link>
          </Typography>
          <br />
          <Typography></Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Typography variant="h5">Fun for Attendees</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Write your name" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <QrCode />
              </ListItemIcon>
              <ListItemText primary="Scan the QR Code" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Enter a link" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <Handshake />
              </ListItemIcon>
              <ListItemText primary="Share your Claimtag" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={11} sm={10} maxWidth="350px" mb={2}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" textAlign="center">
                    <b>Get Started</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography textAlign="center">
                    Generate your Claimtags for free and print them at home for
                    your next event. No account required.
                  </Typography>
                </Grid>
                <Grid item xs={12} textAlign="center" mt={1}>
                  <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    color="secondary"
                    component={RouterLink}
                    to="/create"
                  >
                    <Typography textTransform={'none'}>
                      <b>Create Claimtags</b>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            <b>Learn More</b>
          </Typography>
          <Typography variant="subtitle1">
            Check out our Getting Started guide for info on how to print your
            Claimtags and make sure they're a hit at your next event.
          </Typography>
        </Grid> */}
        <Grid item xs={11}>
          <Typography mb={1} textAlign="center">
            Powered by <MuiLink href="https://plynth.com">Plynth</MuiLink>
          </Typography>
          <Typography mb={1} textAlign="center" fontSize={10}>
            © QR Code is a registered trademark of Denso Wave Incorporated.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
