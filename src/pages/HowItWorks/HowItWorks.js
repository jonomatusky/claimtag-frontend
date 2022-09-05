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
  ListItemButton,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import {
  Edit,
  Link as LinkIcon,
  QrCode,
  Handshake,
  Style,
  OpenInNew,
  Book,
  AttachFile,
} from '@mui/icons-material'
import ReactPlayer from 'react-player'
import Image from 'components/Image'
import ClaimtagImage from 'images/claimtag_image.png'
import { Box } from '@mui/system'
import DemoPhoto from 'images/claimtag_demo_photo.jpg'

const HowItWorks = () => {
  const [playerIsReady, setPlayerIsReady] = useState(false)

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center" mb={5} mt={1}>
        <Grid item xs={11}>
          <Image src={DemoPhoto} width="100%" />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h4" mb={2} textAlign="center">
            Claimtags: How They Work
          </Typography>
          <Box width="100%" display="flex">
            <Box flexGrow={1}>
              <Typography>
                Claimtags are print-at-home name tags featuring "claimable" QR
                codes. Attendees simply scan the code to enter a link they'd
                like to share–like their LinkedIn, Linktree, or Instagram. Use
                them at your next event as a fun way for attendees to share and
                connect.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={11}>
          <Typography textAlign="center">
            <b>See them action:</b>
          </Typography>
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
        <Grid item xs={11} textAlign="center">
          <Button
            variant="contained"
            size="large"
            disableElevation
            color="secondary"
            component={RouterLink}
            to="/create"
          >
            <Typography textTransform={'none'}>
              <b>Get Started</b>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            How They Work
          </Typography>
          <Typography>
            Each Claimtag's QR code is unique. When attendees scan it for the
            first time, they'll be taken to a form where they can enter a new
            link for the Claimtag. The next time someone scans it, they'll be
            taken to that link. Easy as that!
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Box width="100%" display="flex" alignItems="center">
            <Box flexGrow={1}>
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
            </Box>
            <Box
              width="100px"
              flexShrink={0}
              ml={2}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <Image src={ClaimtagImage} width="100%" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h5" mb={2}>
            Get Started
          </Typography>
          <Typography>
            Before your next event, print as many Claimtags as you need and
            bring them along with the materials below. Attendees write their
            name, scan the code, and assemble their Claimtag. They can even
            reuse them at future events!
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            What You'll Need
          </Typography>
          <Typography>
            Claimtags are designed to work with standard name badge inserts,
            badge holders and clips. The end result is an inexpensive and
            durable badge that looks pretty cool too. You'll just need a few
            items to get started:
          </Typography>

          <List dense>
            <ListItem>
              <ListItemButton
                href="https://www.amazon.com/gp/product/B00007LVDL"
                target="_blank"
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <Style />
                </ListItemIcon>
                <ListItemText primary={'Badge inserts (Avery 2¼" x 3½")'} />
                <OpenInNew color="inherit" sx={{ fontSize: 16 }} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                href="https://www.amazon.com/dp/B01DN8THN6"
                target="_blank"
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <Book />
                </ListItemIcon>
                <ListItemText primary={'Badge/ID holders'} />
                <OpenInNew color="inherit" sx={{ fontSize: 16 }} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                href="https://www.amazon.com/Happy-Trees-Metal-Badge-Adapter/dp/B003ITDKBQ"
                target="_blank"
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <AttachFile />
                </ListItemIcon>
                <ListItemText primary={'Badge clips or lanyards'} />
                <OpenInNew color="inherit" sx={{ fontSize: 16 }} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                href="https://www.amazon.com/Sharpie-1884739-Permanent-Markers-Point/dp/B00G4CJ8GK"
                target="_blank"
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary={'Permanent markers or pens'} />
                <OpenInNew color="inherit" sx={{ fontSize: 16 }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Typography>
            See the full list{' '}
            <MuiLink href="https://a.co/ee3xmGm" target="_blank">
              here
            </MuiLink>
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            Print Instructions
          </Typography>
          <Typography>
            You can print your Claimtags on any standard printer. Just swap out
            the paper for the badge inserts above, or print them on standard
            8.5x11 sheets of paper and cut them out by hand before your event.
          </Typography>
          <br />
          <Typography>
            Once you download your Claimtags file, open it with any PDF viewer,
            like Adobe Acrobat, and print. Just be sure to{' '}
            <b>print at 100% scale</b> as the printer settings may try to
            automatically scale the file to fit the paper.
          </Typography>
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

export default HowItWorks
