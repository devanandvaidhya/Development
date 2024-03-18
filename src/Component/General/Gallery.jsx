import { useEffect } from 'react'
import './gen.css'

export function Gallery()
{

    
    useEffect(()=>{

    },[])
    return(
        <>
                <div className="gallery">
            <img src="https://example.com/image1.jpg" alt="Image 1"/>
            <img src="https://example.com/image2.jpg" alt="Image 2"/>
            <img src="https://example.com/image3.jpg" alt="Image 3"/>
        </div>
        </>
    )
}


