import React, { useCallback, useState, useRef, useEffect } from 'react'
import { MuiDialog } from './Dialog'
import lzString from 'lz-string'
import Image from 'next/image'

interface CardProps {
  card: {
    id: number
    data: string
    author: string
  }
  newLimit: any
  isLast: boolean

}

const Card = ({ card, newLimit, isLast }: CardProps) => {
  const [fadeIn, setFadeIn] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)


  // const handleClipboard = useCallback(
  //   (e: React.MouseEvent) => {
  //     setFadeIn(true)
  //     setTimeout(() => setFadeIn(false), 1000)
  //     navigator.clipboard.writeText(card.data)
  //   },
  //   [card.data]
  // )
  const cardRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (!isLast) return
    if (!cardRef?.current) return;
  
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        observer.unobserve(entry.target);
        newLimit();
      }
    });
  
    observer.observe(cardRef.current);
  }, [isLast]);

  const imgData = lzString.decompressFromBase64(card.data)


  return (
    <div ref={cardRef}>
    <div
      className="selector"
      key={card.id}
      // title="Copy Emoji to Clipboard 📋"
      onClick={() => setOpenDialog(true)} 
    >
      <div className="cardImg"><img src={imgData} alt="card"/></div>
      <div className="text-center pt-[30px] text-[20px] text-[#050505]">
        {card.author}
      </div>
    </div>
    <MuiDialog img={<div><img src={imgData} alt="card"/></div>} author={card.author} openDialog={openDialog} setOpenDialog={setOpenDialog}></MuiDialog>
    </div>
  )
}

export default Card
