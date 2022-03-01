import React from 'react'
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
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Edit, Link as LinkIcon, QrCode } from '@mui/icons-material'

const Create = () => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justifyContent="center" mb={5}>
        <Grid item xs={12}>
          <Typography variant="h1" textAlign="center" lineHeight={0.9}>
            <b>Create Claimtags</b>
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography textAlign="center">
            Make it easy for event attendees to share <b>who they are</b> and{' '}
            <b>what they're working on</b>
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center" mb={3}>
          <Button
            variant="contained"
            size="large"
            disableElevation
            color="secondary"
            component={Link}
            to="/create"
          >
            <Typography textTransform={'none'}>
              <b>Create For Free</b>
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            More than a name tag
          </Typography>
          <Typography>
            Make it easy for attendees to connect, follow and get to know each
            other. Each Claimtag features a unique "claimable" QR code.
            Attendees scan their Claimtag once to enter a link, then again to
            follow it.
          </Typography>
        </Grid>

        <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            Easy for organizers and attendees
          </Typography>
          <Typography>
            Print your claimtags at home before the event, then have attendees:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Write their name and scan the QR code" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText
                primary="Enter a link they'd like to share, like their website, Linktree,
                LinkedIn, etc."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <QrCode />
              </ListItemIcon>
              <ListItemText primary="Scan each other's Claimtags to connect" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={11} maxWidth="400px" mb={2}>
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
                    component={Link}
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

        <Grid item xs={11}>
          <Typography variant="h5" mb={1}>
            <b>Learn More</b>
          </Typography>
          <Typography variant="subtitle1">
            Check out our Getting Started guide for info on how to print your
            Claimtags and make sure they're a hit at your next event.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Create
