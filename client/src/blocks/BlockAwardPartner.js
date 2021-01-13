import { h } from 'preact';
import { css } from 'emotion'
const $$BLOCK_AWARD = css`
    display: flex;
    margin-bottom: 50px;
    .award-item {
        flex: 0 0 25%;
        max-width: 25%;
        align-items: center;
        display: grid;
        justify-content: center;
        .logo {
            height: 80px;
            display: flex;
            align-items: center;
        }
        img {
            margin: 0 auto;
        }
        .alpha {
            width: 80px;
            height: 80px;
        }
        .ma {
            width: 160px;
            height: 25px;
        }
        .finance {
            width: 163px;
            height: 32px;
        }
        .top-50 {
            width: 80px;
            height: 80px;
        }
        .content {
            margin-top: 10px;
        }
    }
    @media screen and (max-width: 700px) {
        flex-wrap: wrap;
        .award-item {
            flex: 0 0 50%;
            max-width: 50%;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
            padding: 0 2px;
        }
    }
`
function BlockAward () {
return <div className={$$BLOCK_AWARD}>
    <div className="award-item">
       <div className="logo">
         <img className="alpha" src={`${HOST}/imgs/logo_alpha.png`}/>
       </div>
        <p className="content">
            <strong className="year">9</strong>năm liền<br/>
            nhận giải thưởng của<br/>
            <strong className="name">Alpha Southeast Asia</strong>
        </p>
    </div>
    <div className="award-item">
        <div className="logo">
            <img className="ma" src={`${HOST}/imgs/logo_ma.png`}/>
       </div>
        <p className="content">
            <strong className="year">9</strong>năm liền<br/>
            nhận giải thưởng của<br/>
            <strong className="name">Diễn đàn M&A Việt Nam</strong>
        </p>
    </div>
    <div className="award-item">
        <div className="logo">
            <img className="finance" src={`${HOST}/imgs/logo_finance.png`}/>
       </div>
        <p className="content">
            <strong className="year">6</strong>năm<br/>
            nhận giải thưởng của<br/>
            <strong className="name">Finance Asia</strong>
        </p>
    </div>
    <div className="award-item">
        <div className="logo">
            <img className="top-50" src={`${HOST}/imgs/logo_top50.png`}/>
       </div>
        <p className="content">
            <strong className="year">Top 50</strong><br/>
            công ty niêm yết tốt nhất Việt Nam<br/>
             2020 của <strong className="name">Forbes</strong>
        </p>
    </div>
</div>
}

const $$BLOCK_TIMELINE = css`
    display: flex;
    padding: 0 150px;
    .item {
        flex: 0 0 33.333333%;
        position: relative;
        max-width: 33.333333%;
        img {
            width: 48px;
            height: 48px;
            position: relative;
        }
        hr {
            height: 2px;
            border-radius: 1px;
            width: 100%;
            position: absolute;
            top: 19px;
            left: 0;
            background-color: #e3e5ec;
        }
    }
    @media screen and (max-width: 700px) {
        padding: 0 50px;
    }
    @media screen and (max-width: 450px) {
        flex-wrap: wrap;
        .item {
            flex: 0 0 100%;
            max-width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            hr {
                display: none;
            }
            .br {
                display: none;
            }
        }
    }
`
function BlockTimeLine () {
return <div className={$$BLOCK_TIMELINE}>
    <div className="item">
        <hr/>
        <img className="icon" src={`${HOST}/imgs/ic_flag.svg`}/>
        <p className="content">
            <strong className="year">2011<br/></strong>
            Tư vấn huy động vốn cho <strong className="code">VNM<br className="br"/></strong>
            &nbsp;(70 triệu đô)
        </p>
    </div>
    <div className="item">
        <hr/>
        <img className="icon" src={`${HOST}/imgs/ic_flag.svg`}/>
        <p className="content">
            <strong className="year">2010<br/></strong>
            Tư vấn IPO cho <strong className="code">PV GAS</strong>&nbsp;(cổ phiếu có&nbsp;<br className="br"/>
            vốn hóa lớn nhất từng đạt 3 tỷ đô)
        </p>
    </div>
    <div className="item">
        <hr/>
        <img className="icon" src={`${HOST}/imgs/ic_flag.svg`}/>
        <p className="content">
            <strong className="year">2009</strong> <br/>
            Tư vấn IPO và niêm yết cho <strong className="code">MSN<br className="br"/></strong>&nbsp;
            (thương vụ trị giá 1,6 tỷ đô)
        </p>
    </div>
</div>
}
const $$BLOCK_CONTAINER = css`
    background: url('${HOST}/imgs/bg_award_partner.png') no-repeat;
    object-fit: contain;
    background-position: bottom;
    background-size: auto; 
    font-family: 'Montserrat', sans-serif;
    padding-top: 20px;
    .container {
        margin-top: 24px;
        max-width: 1200px;
        width: 100%;
        display: inline-block;
        position: relative;
        padding-bottom: 80px;
    }
    h2 {
        height: 34px;
        font-family: Montserrat;
        font-size: 28px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #333333
    }
    hr {
        width: 60px;
        height: 4px;
        background-color: #00377b;
    }
    p {
        line-height: 1.5;
        color: #666666;
    }
    strong {
        font-weight: 600;
        color: #333333;
    }
`
export function BlockAwardPartner() {
    return <section id="section-award" className={$$BLOCK_CONTAINER}>
        <div className="container">
            <h2>Giải thưởng & đối tác</h2>
            <hr className="line" />
            <BlockAward/>
            <BlockTimeLine />
        </div>
    </section>
}