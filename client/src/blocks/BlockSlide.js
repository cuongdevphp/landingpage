import { h } from 'preact';
import { useLayoutEffect }  from 'preact/hooks'
import { css } from 'emotion'

import { useState } from 'preact/hooks'
const $$CSS = css`
    position: relative;
    .slide {
        display: none;
        &.active {
            display: block;
        }
    //     -webkit-animation: fadein 0.8s; /* Safari, Chrome and Opera > 12.1 */
    //    -moz-animation: fadein 0.8s; /* Firefox < 16 */
    //     -ms-animation: fadein 0.8s; /* Internet Explorer */
    //      -o-animation: fadein 0.8s; /* Opera < 12.1 */
    //         animation: fadein 0.8s;
        // &:nth-child(1) {animation: autoplay6 1s}
        // &:nth-child(2) {animation: autoplay6 1s}
        // &:nth-child(3) {animation: autoplay6 1s}
        
    }
    .dots {
        position: absolute;
        bottom: 20px;
        width: 100%;
        span {
            display: inline-block;
            text-align: center;
            width: 24px;
            height: 3px;
            border-radius: 2px;
            margin: 0 2px;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
            &.active, &:hover {
                background-color: #ffffff;
            }
        }
        @media screen and (max-width: 850px) {
            bottom: 100px;
        }
        @media screen and (max-width: 650px) {
            bottom: 70px;
        }
    }
    @keyframes autoplay6 {
        0% {opacity: 0.0}
        4% {opacity: 1.0}
        33.33% {opacity: 1.0}
        37.33% {opacity: 0.0}
        100% {opacity: 0.0}
      }
    
    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`

export function BlockSlide() {
    let [indexActive, setIndexActive] = useState(1)
    useLayoutEffect( () => {
        function onChangeActive () {
            if (indexActive === 3) {
                setIndexActive(1);
            } else {
                setIndexActive(indexActive + 1);
            }
        }
        let myChangeActive = setInterval(onChangeActive, 5000);
        return () => clearInterval(myChangeActive);
    })
    return <div className={$$CSS}>
        <img className={indexActive == 1 ? 'slide active': 'slide'} src={`${HOST}/imgs/slide_1.jpg`} />
        <img className={indexActive == 2 ? 'slide active': 'slide'} src={`${HOST}/imgs/slide_2.jpg`} />
        <img className={indexActive == 3 ? 'slide active': 'slide'} src={`${HOST}/imgs/slide_3.jpg`} />
        <div className="dots">
            <span onClick={() => setIndexActive(1)} className={indexActive == 1 ? 'active': ''}></span>
            <span onClick={() => setIndexActive(2)} className={indexActive == 2 ? 'active': ''}></span>
            <span onClick={() => setIndexActive(3)} className={indexActive == 3 ? 'active': ''}></span>
        </div>
    </div>
}