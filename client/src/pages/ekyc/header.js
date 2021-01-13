import { h  } from 'preact';

import { useState } from 'preact/hooks'

import { css } from 'emotion';

import {  $_ } from 'root/_components';

import { EKYCStep } from './step';

const CSS$ = css`
   header {
    display: inline-flex;
    width: 100vw;
    height: 80px;
    text-align: left;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.02);
    display: inline-flex;
    align-items: center;
    padding: 0 5%;
    justify-content: space-between;
   }
   &.mobile {
       header {
        justify-content: center;
       }
   }
   @media screen and (max-width: 700px) {
        header {
            justify-content: center;
       }
    }
`;

export function EKYCHeader({active, isMobile}) {
    return <div className={$_(CSS$, isMobile && 'mobile')}>
        <header>
                <div className="logo">
                    <img src={`${HOST}/imgs/ic_logo.svg`} />
                </div>
               { isMobile ? null : <EKYCStep active={active} /> }
        </header>
        { !isMobile ? null : <EKYCStep active={active} /> }
    </div>
}