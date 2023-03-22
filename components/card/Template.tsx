import React, { useCallback, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import Diagram from '@/components/draw/Draw'
import "../../pages/index.css";
import wish1 from './wish1.png'
import TemplateData from '../../utils/template.json'
import _ from 'lodash'


const Template = () => {
  const [fadeIn, setFadeIn] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [isShown, setIsShown] = useState(false);
  const [templateURL, setTemplateURL] = useState("/assets/Empty.png");


  
  const handleBoxClick = (e: any) => {
    setIsShown(true)
    setFadeIn(true)
    setTimeout(() => setFadeIn(false), 1000)
    setTemplateURL(e.currentTarget.dataset.url)
    // console.log("AAAA", e.target.dataset.url)
  }

  const templateData = _.map(TemplateData, (data: any, index: any) => ({
    ...data,
    id: index
  }))

  return (
    <>
    { !isShown &&
        <Grid 
            container
            direction="row"
            justifyContent="space-evenly"
            // alignItems="center"
            height="100%"
            paddingLeft="10rem"
            paddingRight="10rem"
            // alignContent="center"
        >
            <Box sx={{ minWidth: "100vw", display: 'flex', justifyContent: 'center', alignItems: 'end', margin: "20px" }}>
                <div className="template">
                <Typography component="div">
                    <Box sx={{ textAlign: 'center', fontSize: 'h4.fontSize', fontStyle: 'italic', fontFamily: 'Bradley Hand', m: 1 }}>Select card template.</Box>
                </Typography>
                </div>
            </Box>
            {
                _.take(templateData, 100).map((data, id) => (
                    // console.log("KKKKK ", id, data)
                    // <Card card={data} key={id} />
                    // <Box key={id} sx={{ maxWidth: 500 }} style={{margin: "20px"}} onClick={handleBoxClick} >
                    //     <ImageShadow key={id} width={250} shadowHover shadowRadius={10} src={data.url} />   
                    // </Box>
                    <Box key={id} data-url={data.url} sx={{ maxWidth: 500 }} style={{margin: "20px"}} onClick={handleBoxClick} >
                        <ImageShadow key={id} width={250} shadowHover shadowRadius={10} src={data.url} />   
                    </Box>
                ))
            }
        </Grid>
    }
    { isShown && <Diagram url={templateURL} /> }
        


    </>
    
  )
}

export default Template
