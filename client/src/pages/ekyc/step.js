import { h  } from 'preact';

import { useState } from 'preact/hooks'

import { css } from 'emotion'

import {  $_ } from 'root/_components';

const CSS$ = css`
    display: inline-flex;
    align-items: center;
    .step {
        border: 2px solid #9FBFF3;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: relative;
        margin-right: 80px;
        &.active {
            width: 32px;
            height: 32px;
            background: #00377B;
            border: unset;
            &:after {
                content: attr(data-step);
                position: absolute;
                font-size: 16px;
                color: white;
                font-weight: 600;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        &.done {
            width: 32px;
            height: 32px;
            background: #46AB00;
            
            border: unset;
            &:after {
                content: "";
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC3SURBVHgB7dZREYMwDMbxT8IkIAEJkzAHixMkTUIlTAISJiErW/YwrpQGkvDC/66PhB/0elcgMGbu83ryt5RXh8gE8OL/EqJaAHxCRDVAboR3K4CpGzxrABA8OwH5BdejAXeuR2sDLvIVPTZkAZj/wgGKdgNkyFh4sAliApBBSw0hABmWtBBTgAzsuLwlRYg5QAtxAyggD1eAAuIL2AEheKSAEDxrgBAiqkAIkQnkdzKm67r5lewNZiT8vQh4F0oAAAAASUVORK5CYII=");
                position: absolute;
                height: 10px;
                width: 14px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-size: contain;
                background-repeat: no-repeat;
            }
        }
        &:before {
             content: "";
             background: rgba(159, 191, 243, 0.6);
             position: absolute;
             border: 0.5px solid rgba(159,191,243,0.6);
             width: 60px;
             top: 50%;
             right: -70px;
        }
        &:last-child {
            margin-right: 0;
            &:before {
                display: none;
            }
        }
    }
    @media screen and (max-width: 700px) {
        margin: 20px auto;
        .step {
            margin-right: 60px;
            &:before {
                width: 45px;
                right: -53px;
             }
        }
    }
`;

export function EKYCStep({active = 1}) {
    return <div className={CSS$}>
            <div className={$_('step', active == 1 && "active", active > 1 && 'done')} data-step="1"></div>
            <div className={$_('step', active == 2 && "active", active > 2 && 'done')} data-step="2"></div>
            <div className={$_('step', active == 3 && "active", active > 3 && 'done')} data-step="3"></div>
            <div className={$_('step', active == 4 && "active", active > 4 && 'done')} data-step="4"></div>
        </div>
}