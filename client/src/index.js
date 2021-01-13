import { h, render } from 'preact';

import { injectGlobal } from 'emotion';

injectGlobal`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    * {
        box-sizing: border-box;
        font-size: 100%;
    }

    html, body {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        touch-action: manipulation;
    }

    #__paradox {
        overflow-x: hidden;
    }

    img {
        width: 100%;
        height: 100%;
    }

    body {
        > img {
            width: unset;
            height: unset;
        }
    }

    h5 {
        font-weight: 600;
        color: #333333;
    }

    h3 {
        font-weight: 700;
        color: #333333;
    }

    a { 
        color: inherit; 
        text-decoration: none; 
    }

    :scope {
        --black: #333333;
    }

    @media screen and (min-width: 25em){
        html { 
            font-size: calc(11px + (11 - 10) * (100vw - 320px) / (800 - 320) ); 
        }
    }

    @keyframes blink-color {
        50% { border-color: transparent; }
    }

    input::placeholder {
        color: #999999;
        font-family: 'Montserrat', sans-serif;
    }

    textarea::placeholder {
        color: #999999;
        font-family: 'Montserrat', sans-serif;
    }

    @keyframes slide {
        0%{
            background-position-x:0%;
        }
        100% {
            background-position-x:100%;
        }
    }

    .row {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-bottom: 10px;
        .col-3, .col-6, .col-9, .col-4, .col-12 {
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 5px;
            padding-left: 5px;
        }
        .col-3 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 25%;
            flex: 0 0 25%;
            max-width: 25%;
        }
        .col-4 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }
        .col-6 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 50%;
            flex: 0 0 50%;
            max-width: 50%;
        }
        .col-9 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 75%;
            flex: 0 0 75%;
            max-width: 75%;
        }
        .col-12 {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
        }
        @media screen and (max-width: 450px) {
            .col-3, .col-4, .col-6, .col-9, .col-12 {
                flex: 0 0 100%;
                max-width: 100%;
            }
            .mw-50 {
                max-width: 50%; 
            }
        }
    }
    div {

        &.inactive { display: none; }
        &.active { display: block; }

        div.input {
            min-height: 64px;
            margin: 12px 0;
            text-align: left;
        }

        input,  textarea, div.dropdown, div.date-input{
            padding: 6px 8px;
            width: 100%;
            margin-top: 8px;  
            font-size: 1rem;  
            outline: none;
            border: 1px solid #e3e5ec;
            border-radius: 4px;
            background: none;
            min-height: 40px;
            max-height: 40px;
            font-family: Montserrat;

            &.date-input {
                padding: 0;
                height: 100%;
                > .header {
                    left: 0;
                    border: 0;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                > .table {
                    background: white;
                }
            }
        }

        span[data-type='radio'] {
            margin-top: 8px;
            display: inline-block;
            position: relative;
            padding-left: 35px;
            cursor: pointer;
            font-size: 1rem;
            user-select: none;
            line-height: 26px;
            margin-right: 80px;

            > input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 26px;
                width: 26px;
                left: 0;
            }

            > .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 26px;
                width: 26px;
                border-radius: 50%;
                border: 1px solid #eee;
                z-index: 2;
                &.active {
                    background-color: #00377B;
                    &:after {
                        content: '';
                        position: absolute;
                        height: 12px;
                        border-radius: 50%;
                        width: 12px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        background: white;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }

        textarea {
            min-height: 40px;
        }

        div.dropdown {
            background: none;
            
            .__dropbox { 
                background: none; 
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                padding: 0;
                > p { line-height: normal; padding: 0; }
            }

            .__items {
                margin-top: 8px;
                background: white;
                border-radius: 4px;
                left: -1px;
                width: calc(100% + 2px);
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 14px 0px;
                overflow: hidden;
                div.item:hover {
                    background: #f1f7ff;
                }

                div.item {
                    line-height: 36px;
                }

                @media screen and (max-width: 576px) {
                    background: #222;
                    div.item {
                        border-bottom: 1px solid #333;
                        color: #f1f7ff;
                        &:hover {
                            background: #222;
                        }
                    }
                }
            
            }
            &.is-search {
                .__items {
                    width: 170%;
                    @media screen and (max-width: 402px) {
                        width: calc(100% + 2px);
                    }
                }
                ._scroll_horizontal {
                    padding-right: 0;
                }
            }
        }

        p { 
            margin: 8px 0;
        }
    }
    @keyframes fadeIn {
        0% {
            opacity:0;
        }
        50% {
            opacity: 0.2;
        }
        100% {
                opacity:1;
            }
        }

        @-moz-keyframes fadeIn {
            0% {
                                opacity:0;
                            }
                            50% {
                                opacity: 0.2;
                            }
                            100% {
                                opacity:1;
                            }
                        }

                        @-webkit-keyframes fadeIn {
                            0% {
                                opacity:0;
                            }
                            50% {
                                opacity: 0.2;
                            }
                            100% {
                                opacity:1;
                            }
                        }

                        @-o-keyframes fadeIn {
                            0% {
                                opacity:0;
                            }
                            50% {
                                opacity: 0.2;
                            }
                            100% {
                                opacity:1;
                            }
                        }

                        @-ms-keyframes fadeIn {
                            0% {
                                opacity:0;
                            }
                            100% {
                                opacity:1;
                            }
                        }
`

import HTML from 'root/_root/index.js'

render(<HTML />, document.getElementById("__paradox"))