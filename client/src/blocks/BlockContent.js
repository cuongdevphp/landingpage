import { h } from 'preact';
import { css } from 'emotion'
import { BlockSlide } from './BlockSlide';
import { IconChat } from 'root/_components';
const $$CSS = css`
    background-color: #fafafa;
    .ic-chat {
        position: fixed;
        top: 50vh;
        z-index: 9999;
        right: 40px; 
        width: 64px;
        height: 64px;
        cursor: pointer;
        @media screen and (max-width: 850px) {
           right: 10px;
        }
    }
    .container {
        display: flex;
        margin: 50px auto 0 auto;
        max-width: 1280px;
        .content__slide {
            flex: 0 0 65%;
            max-width: 65%;
            z-index: 2;
        }
        .content__form {
            flex: 0 0 35%;
            max-width: 35%;
            position: relative;
            z-index: 2;
        }
        @media screen and (max-width: 850px) {
            flex-wrap: wrap;
            .content__slide {
                flex: 0 0 100%;
                max-width: 100%;
            }
            .content__form {
                flex: 0 0 100%;
                max-width: 450px;
                position: relative;
                z-index: 2;
                display: flex;
                margin: 0 auto;
            }
        }
    }
    
   
`

export function BlockContent({children}) {
    return <section id="section-form" className={$$CSS}>
        <div className="container">
            <div className="content__slide">
               <BlockSlide/>
            </div>
            <div className="content__form">
                {children}
            </div>
        </div>
        {/* <IconChat className="ic-chat" /> */}
    </section>
}