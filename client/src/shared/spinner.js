import { h, createElement  } from 'preact';

import { Fragment, lazy, Suspense } from 'preact/compat'

import { css } from 'emotion';

import { $_ } from 'root/_components';
const SPINNER_CSS$ = css`
    position: relative;
        width: 32px;
        height: 32px;
        display: inline-block;
        padding: 10px;
        border-radius: 10px;

     div {
        width: 6%;
        height: 16%;
        background: #FFF;
        position: absolute;
        left: 49%;
        top: 43%;
        opacity: 0;
        border-radius: 50px;
        box-shadow: 0 0 3px rgba(0,0,0,0.2);
        animation: fade 1s linear infinite;
    }

    @keyframes fade {
        from {opacity: 1;}
        to {opacity: 0.25;}
    }

    .bar1 {
       transform:rotate(0deg) translate(0, -130%);
       animation-delay: 0s;
    }    

    .bar2 {
       transform:rotate(30deg) translate(0, -130%); 
       animation-delay: -0.9167s;
    }

    .bar3 {
       transform:rotate(60deg) translate(0, -130%); 
       animation-delay: -0.833s;
    }
    .bar4 {
       transform:rotate(90deg) translate(0, -130%); 
       animation-delay: -0.7497s;
    }
    .bar5 {
       transform:rotate(120deg) translate(0, -130%); 
       animation-delay: -0.667s;
    }
    .bar6 {
       transform:rotate(150deg) translate(0, -130%); 
       animation-delay: -0.5837s;
    }
    .bar7 {
       transform:rotate(180deg) translate(0, -130%); 
       animation-delay: -0.5s;
    }
    .bar8 {
       transform:rotate(210deg) translate(0, -130%); 
       animation-delay: -0.4167s;
    }
    .bar9 {
       transform:rotate(240deg) translate(0, -130%); 
       animation-delay: -0.333s;
    }
    .bar10 {
       transform:rotate(270deg) translate(0, -130%); 
       animation-delay: -0.2497s;
    }
    .bar11 {
       transform:rotate(300deg) translate(0, -130%); 
       animation-delay: -0.167s;
    }
    .bar12 {
       transform:rotate(330deg) translate(0, -130%); 
       animation-delay: -0.0833s;
    }

`;
export function Spinner({className}) {
    return <div className={$_(SPINNER_CSS$, 'spinner', className)}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
    </div>
}