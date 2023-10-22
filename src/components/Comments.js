import React from 'react'
import Giscus from '@giscus/react'
import { Link } from 'gatsby'
import { switchContainer, switchLabel, slider, round } from './Comments.module.css'

const Comments = (props) => {
    const [isEnabled, setIsEnabled] = React.useState(() => {
        return (
            window.localStorage.getItem("comments-enabled")?.toLowerCase() === "true" || false
        )
    })

    const checkHandler = () => {
        setIsEnabled(!isEnabled)
        window.localStorage.setItem("comments-enabled",(!isEnabled).toString())
        // If previous state was true, we have to remove giscus-session localStorage key
        if (isEnabled) {
            window.localStorage.removeItem("giscus-session")
        }
    }

    return (
        <>
            <div className={switchContainer}>        
                <label 
                    className={switchLabel}
                    htmlFor="enable-comments">
                    <input 
                        type="checkbox" 
                        id="enable-comments"
                        checked={isEnabled}
                        onChange={checkHandler}
                        >
                    </input>
                    <div className={`${slider} ${round}`}></div>
                </label>
                <span>{ isEnabled? "Disable comments" :
                  (<><span>Enable Comments. Enabling comments stores session information in your browser. </span>
                    <Link to="/privacy">More Info</Link></>)
                }</span>
            </div>
            { isEnabled? 
                <Giscus
                repo="cpiment/pimentel.page"
                repoId="R_kgDOGKKV9g"
                category="Blog Comments"
                categoryId="DIC_kwDOGKKV9s4CaP_A"
                mapping="title"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="purple_dark"
                lang="en"
            ></Giscus>
            : null }
       </>
    )
}

export default Comments