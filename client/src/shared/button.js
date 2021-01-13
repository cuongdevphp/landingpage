import { h, createElement  } from 'preact';

import { css } from 'emotion'

import { $_ } from 'root/_components';

import { Spinner } from './spinner';

const CSS$ = css`
    width: 170px;
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 16px;
    color: white;
    width: 100%;
    height:  48px;
    text-transform: uppercase;
    border: 0;
    font-size: 14px;
    vertical-align: top;
    font-weight: 600;
    outline: none;
    background: #666;
    &.primary {
        background: #00377B;
    }
    &.warning {
        background: #F6C04B;
    }
    .button__loading {
        position: absolute;
        right: 10px;
        top: calc(50% - 16px);
    }
`;
export function VCIButton({loading, children, ...props}) {
    return <button  {...props} disabled={loading} className={$_(CSS$, props.className)}>
       { loading ? <Spinner className={'button__loading'} /> : null } {children}
    </button>
}
