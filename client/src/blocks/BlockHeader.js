import { h } from 'preact';

import { useLayoutEffect } from 'preact/hooks'
import { css } from 'emotion'

const $$CSS = css`
    height: 80px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.02);
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10000;
    background-color: #fff;
    display: flex;
    .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;
    }
    .logo {
        width: 200px;
        flex: 0 0 200px;
        max-width: 200px;
        margin-left: 20px;
    }
    nav {
        display: flex;
        justify-content: flex-end;
        padding: 0 20px;
        flex: 0 0 calc(100% - 200px);
        max-width: calc(100% - 200px);
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        .nav-item {
            color: #333333;
            text-transform: uppercase;
            &.active, &:hover {
                border-radius: 16px;
                background-color: #00377b;
                color: #ffffff;
            }
            padding: 7px 16px;
            cursor: pointer;
            margin: 0 5px;
            display: flex;
            align-items: center;
        }
    }
    .wrapper-nav .bar {
        display: none;
    }
    .bar {
        display: inline-block;
        cursor: pointer;
        .bar1, .bar2, .bar3 {
            width: 35px;
            height: 5px;
            background-color: #333;
            margin: 6px 0;
            transition: 0.4s;
          }
          
          &.change .bar1 {
            -webkit-transform: rotate(-45deg) translate(-9px, 6px);
            transform: rotate(-45deg) translate(-9px, 6px);
          }
          
          &.change .bar2 {opacity: 0;}
          
          &.change .bar3 {
            -webkit-transform: rotate(45deg) translate(-8px, -8px);
            transform: rotate(45deg) translate(-8px, -8px);
          }
    }
    @media screen and (max-width: 850px) {
        .container {
            justify-content: space-between;
        }
        .wrapper-nav {
            .bar {
                display: block;
                margin-right: 20px;
            }
        }
        nav {
            display: none;
            
            &.show {
                border-top: 1px solid #ddd;
                display: flex;
                flex-wrap: wrap;
                position: absolute;
                bottom: -200px;
                padding: 0;
                display: flex;
                flex-wrap: wrap;
                background-color: #fff;
                width: 100vw;
                max-width: 100%;
                .nav-item {
                    padding: 12px 16px;
                    border-radius: unset;
                    margin: unset;
                    flex: 0 0 100%;
                    max-width: 100%;
                }
            }
        }
    }
`

export function BlockHeader() {
    function scrollToID(id) {
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
            block: "start"
        });
        toogle();
    }
    function toogle() {
        var x = document.getElementById("myTopnav");
        x.classList.toggle('reponsive');
        document.getElementById('bar-toggle').classList.toggle("change");
        document.querySelector("nav").classList.toggle("show")
      }
    useLayoutEffect( () => {
        let mainNavLinks = document.querySelectorAll("nav a");
        function onScroll () {
            let fromTop = window.scrollY + 50;
            mainNavLinks.forEach(link => {
                if (link.getAttribute('data-href')) {
                    let section = document.getElementById(link.getAttribute('data-href'));
                    if (section &&
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                    ) {
                    link.classList.add("active");
                    } else {
                    link.classList.remove("active");
                    }
                }
            });
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', scroll);
    })
    
    return <div className={$$CSS}>
        <div className="container" id="myTopnav">
            <div className="logo">
                <img src={`${HOST}/imgs/ic_logo.svg`} />
            </div>
            <div className="wrapper-nav">
                <div id="bar-toggle" class="bar" onClick={() => toogle()}>
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </div>
            <nav>
                    <a data-href="section-form" onClick={() => scrollToID('section-form')} className="nav-item active">Mở Tài khoản Ngay</a>
                    <a data-href="section-why" onClick={() => scrollToID('section-why')} className="nav-item">Vì sao nên mở TK?</a>
                    <a data-href="section-intro" onClick={() => scrollToID('section-intro')} className="nav-item">Về chúng tôi</a>
                    <a data-href="section-award" onClick={() => scrollToID('section-award')} className="nav-item">Giải thưởng</a>
                    <a data-href="section-contact" onClick={() => scrollToID('section-contact')} className="nav-item">Liên hệ</a>
            </nav>
        </div>
    </div>
}