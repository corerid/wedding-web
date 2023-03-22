import ContentLoader from "react-content-loader"
import React, { useRef, useEffect } from 'react'

interface LoadProps {
    // newLimit: any
    // isLast: boolean
  
  }

const MyLoader = (props: LoadProps) => {
    // const cardRef = useRef<HTMLInputElement>(null);

    // const { newlimit, islast } = props
    // console.log("QQQQQ", newlimit, islast)
    // useEffect(() => {
    //     if (!cardRef?.current) return;

    //     const observer = new IntersectionObserver(([entry]) => {
    //     if (props.isLast && entry.isIntersecting) {
    //         props.newLimit();
    //         observer.unobserve(entry.target);
    //     }
    //     });

    //     observer.observe(cardRef.current);
    // }, [props.isLast]);

    return (
        <div>
            {/* <div className="cardImg"><img src="https://www.freecodecamp.org/news/content/images/size/w60/2022/08/divi.jpg" alt="card"/></div> */}
        <ContentLoader 
            speed={2}
            width={"100%"}
            height={"100%"}
            viewBox="0 0 600 800"
            backgroundColor="#f3f3f3"
            foregroundColor="#d6d6d6"
            {...props}
        >
            <rect x="49" y="27" rx="18" ry="18" width="494" height="613" />
        </ContentLoader>
    </div>
    )
}

export default MyLoader
