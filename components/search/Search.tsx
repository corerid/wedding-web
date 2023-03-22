'use client'
import _ from 'lodash'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
// import dynamic from 'next/dynamic'
import Card from '../card/Card'
// import "../../pages/index.css";

// const Card = dynamic(() => import ('../card/Card'))
import MyLoader from '../card/Loader'
const shortid = require('shortid');

interface Emoji {
  id: number
  title: string
  symbol: string
  keywords: string
}

const Search = () => {
  const [img, setImg] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true)

  const loaderRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    console.log('i fire once');
    setIsLoading(true)
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `https://wedding-api-service.onrender.com/images?limit=10&page=${page}`
        )
      ).json();

      const newData = _.map(data.result, (val: any) => ({
        ...val,

        id: val.id
      }))
      if (!data.hasNextPage) {
        setHasNextPage(false)
      }
      
      // set state when the data received
        setImg((prev) => [...prev, ...newData])
        setIsLoading(false)
    };


    dataFetch()
  }, [page])

    //  useEffect(() => {
    //   if (!loaderRef.current) return
  
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       if (entries[0].isIntersecting) {
    //         setIsLoading(false)
    //         observer.disconnect()
    //       }
    //     },
    //     {
    //       rootMargin: '50px',
    //     }
    //   )
  
    //   observer.observe(loaderRef.current)
    // }, [img])


  return (
    <div className="div-content">
    <section className="container !max-w-[1024px] flex flex-col gap-[2rem] p-[2rem_0]" id="content">
      <div className="draw-img">
        <Link href="/draw">
          <button className="button-89 m-auto w-full sm:w-[500px]" role="button">
            อวยพรพวกเรา
          </button>
          {/* <button className="button-82-pushable" role="button">
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
              อวยพรพวกเรา
            </span>
          </button> */}
          
        </Link>
      </div>
      <div className="grid gap-[2rem] relative xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" style={{justifyContent: "center"}}>

        {
          img.map((data, id) => (
            // console.log("BBBB", data)
            <Card card={data} isLast={id === img.length - 1} newLimit={() => setPage(page + 1)} key={id} />
          ))
          
        }
        {/* { isLoading && 
          [...new Array(10)].map((e, i) => (
            <MyLoader id={e} />
          ))      
        } */}
        { hasNextPage && 
        
        [...new Array(3)].map((e, id) => (

            <MyLoader key={shortid()} />
          ))      
        }

        {/* {isLoading && (
            <div ref={loaderRef} className="flex justify-center my-8">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )} */}
      </div>
    </section>
    </div>
  )
}

export default Search

