import React, { useCallback, useState, createRef } from 'react'
import Button from '@mui/material/Button';
import CanvasDraw from 'react-canvas-draw'
import "../../pages/index.css";
import { useRouter } from 'next/router'
// import '../../app/globals.css'
import Head from "../../app/head"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  


import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles';
import { Stack } from '@mui/material';
// interface CardProps {
//   card: {
//     id: number
//     data: string
//     author: string
//   }
// }
// declare module '@mui/material' {
//   interface ButtonPropsColorOverrides {
//     anger: any,
//     apple: any,
//     blue: any,
//     violet: any,

//   }
// }

// import "@mui/material/styles/createPalette";
// declare module '@mui/material/styles/createPalette' {
//     interface PaletteOptions {
//       anger?: PaletteColorOptions,
//       apple?: PaletteColorOptions,
//       blue?: PaletteColorOptions,
//       violet?: PaletteColorOptions,

//     }

//     interface Palette {
//       anger: PaletteColor,
//       apple: PaletteColor,
//       blue: PaletteColor,
//       violet: PaletteColor,

//     }
// }

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: {
      main: '#ff706e', 
      contrastText: "#ffffff"
    },
    apple: {
      main: '#65c96f', 
      contrastText: "#ffffff"
    },    
    blue: {
      main: '#5eade6', 
      contrastText: "#ffffff"
    },    
    violet: createColor('#BC00A3'),
  },
});


const Draw = (props) => {
  const canvasRef = createRef(null);
  const [search, setSearch] = useState('')
  const [color, setColor] = useState("#E571AF")
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(600)
  const [brushRadius, setBrushRadius] = useState(2)
  const [lazyRadius, setLazyRadiush] = useState(1)
  const [backgroundImg, setBackgroundImg] = useState("https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg")

  const [loading, setLoading] = useState(false)


  let router= useRouter()


  function redirect() {
    console.log("DDDD")
    router.push('/#content')
 }

  let { url } = props

  if (url.includes("Empty")) {
    url = "/assets/blank.png"
  }

  const confirm1 = () => {
    confirmDialog({
        message: 'คุณแน่ใจว่าจะลบทั้งหมดใช่หรือไม่? (ถ้าจะแก้ไขให้กด ย้อนกลับ นะ)',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept,
        reject
    });
  };

  const accept = () => {
    canvasRef.current.eraseAll();
  }

  const reject = () => {
      
  }

  return (
  <ThemeProvider theme={theme}>
    {/* <Head /> */}
    {loading && <div id="cover-spin"></div>}
    <div style={{
       margin: "2em auto",
       width: "min-content",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
    }}>
        <h1>Wedding Wishes ...</h1>
        <div className="muistack">
        <Stack direction="row" spacing={4}>
          <ConfirmDialog />
          <button class="button-green" role="button"
            onClick={async () => {
              setLoading(true)
              // localStorage.setItem(
              //   "savedDrawing",
              //   this.saveableCanvas.getSaveData()
              // );
              const author = search || "Anonymous"
              const imgUrl = canvasRef.current.getDataURL()

              await fetch('/api/upload', {
                  body: '{ "data":"'+imgUrl+'", "author":"'+author+'"}',
                  method: 'POST'
                })
              .then((res) => res.json())   


              await fetch('/api/images', {
                body: '{ "data":"'+imgUrl+'", "author": "'+author+'", "template": "'+ url +'"}',
                method: 'POST'
              })
                .then((res) => res.json())  
                  
              // redirect('/main2');
              redirect()
            }}>
            บันทึก
          </button>
          <button class="button-blue" role="button"
            onClick={() => {
              canvasRef.current.undo();
            }}
          >
            ย้อนกลับ
          </button>
          <button class="button-red" role="button"
            onClick={
              confirm1
              // canvasRef.current.eraseAll();
            }
          >
            ลบทั้งหมด
          </button>
          {/* <div>
            <label>Width:</label>
            <input
              type="number"
              value={width}
              onChange={e =>
                setWidth({ width: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={height}
              onChange={e =>
                setHeight({ height: parseInt(e.target.value, 10) })
              }
            />
          </div> */}
          {/* <input
            // style={{ background: { canvas } }}
            type="color"
            // value={canvas}
            onChange={(event) => {
              console.log(event.target.value);
              setColor(event.target.value);
            }}
          /> */}
          <div className="brush-size">
            <label>Color</label>
            <div className="div-range">
            <input type="color" id="style1" name="color" defaultValue="#E571AF" onChange={(event) => {
              console.log(event.target.value);
              setColor(event.target.value);
            }} />
          </div>
          </div>
          <div className="brush-size">
            <label>Brush size</label>
            <div className="div-range">
            <input
              min="2"
              max="50"
              defaultValue="2"
              type="range"
              onChange={(event) => {
                console.log(event.target.value);
                setBrushRadius(event.target.value);
              }}
            />
            </div>
          </div>
          </Stack>
          {/* <section className="container !max-w-[1024px] flex flex-col gap-[2rem] p-[2rem_0]" id="content"> */}
         
        </div>
        <div className='author'>
        <input
        className="focus:outline-0 p-[12px] text-[20px] rounded-[8px] shadow-[0_1px_2px_rgba(0,0,0,0.2)] m-auto w-full sm:w-[500px] dark:bg-[#18191A] dark:text-[#E4E6EB]"
        placeholder="ผู้เขียน"
        id="gText"
        type="text"
        value={search}
        maxLength="15"
        onChange={e => setSearch(e.target.value)}
      />
      </div>
        <CanvasDraw
          ref={(canvasDraw) => (canvasRef.current = canvasDraw)}
          brushColor={color}
          brushRadius={brushRadius}
          lazyRadius={lazyRadius}
          canvasWidth={width}
          canvasHeight={height}
          imgSrc={url}
          enablePanAndZoom={false}
        />
      </div>
      </ThemeProvider>
  )
}

export default Draw
