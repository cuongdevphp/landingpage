import { h } from 'preact';

import { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'preact/hooks'

import { css } from 'emotion';

const $$DROPDOWN = css` 
    display: inline-block;
    width: 200px;
    position: relative;
    pointer-events: all;
    cursor: pointer;

    .hidden {
        display: none;
    }
    border-radius: 4px;
    border: solid 1px #e3e5ec;
    background-color: #ffffff;
    span.heading {
        font-family: Montserrat;
        position: absolute;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        -webkit-letter-spacing: normal;
        -moz-letter-spacing: normal;
        -ms-letter-spacing: normal;
        letter-spacing: normal;
        color: #666666;
        left: 4px;
        top: -8px;
        background: #fff;
        padding: 0 3px;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 12px;
        width: 4px;
        height: 4px;
        border-right: 2px solid #555;
        border-bottom: 2px solid #555;
        transform: rotate(45deg) translateY(-100%);
    }

    &.active {
        &:after {
            top: 60%;
            border-top: 2px solid #555;
            border-left: 2px solid #555;
            border-bottom: none;
            border-right: none;
        }
    }
    
    > div.__dropbox {
        background: #e3e5ec;
        line-height: 24px;
        padding: 0 8px;
        text-align: left;
        position: relative;
        width: 100%;
        > * {
            pointer-events: none;
            user-select: none;
        }
        p {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 85%;
        }
        &.d-none {
            display: none;
        }
    }

    > div.__items {
        position: absolute;
        width: 100%;
        max-height: 200px;
        top: calc(100% + 4px);
        left: 0;
        display: none;
        pointer-events: all;
        z-index: 1;
        cursor: pointer;
        user-select: none;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 14px 0px;

        &.active {
            display: block;
        }

        div.__scroller {
            min-height: 40px;
            height: 100%;
        }

        div.item {
            line-height: 24px;
            text-align: left;
            padding: 0 8px;
            user-select: none;
            &.active {
                background: #f1f7ff;
            }
        }
    }
    &.is-search {
        input.search-input {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin-top: 0;
            border: none;
            &::placeholder {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 85%;
                font-size: 12px;
            }
        }
    }
    &.is-bootstrap {
        margin-top: 17px;
       span.heading {
        top: -24px;
        left: -10px;
        position: inherit;
       } 
    }
    
`

export function Dropdown ({ data = [], isSearch = false, isBootstrap = false, required = false, value, disabled = false, item_height, className, heading, ...props }) {
    const mobileDropDown = useRef();
    let [isOpen, setOpen] = useState(false);
    
    let [dataTemp, setDataTemp] = useState(data);

    let found = data.find ( i => i.value == value);
    let [selected, setSelected] = useState(found);
    const inputRef = useRef();

    function selectItem (item, e) {
        setSelected(item);
        if (typeof props.dispatch == "function") {
            props.dispatch(item);
        }
    }

    function closeDropDown() {
        // window.removeEventListener("touchend", closeDropDown)
        window.removeEventListener("mouseup", closeDropDown);
    }

    useLayoutEffect( () => {
        if (isOpen) {
            // window.addEventListener("touchend", closeDropDown)
            window.addEventListener("mouseup", closeDropDown)
        }
    })

    function onChangeInputSearch(v) {
        let dataSet = data;
        if (v.trim()) {
            dataSet = data.filter(x => x.text.toUpperCase().includes(v.trim().toUpperCase()));
        }
        setDataTemp(dataSet);       
    }
    useEffect(() => {
        setDataTemp(data);
    }, [data]);

    useEffect(() => {
        if (!inputRef.current) {
            setDataTemp(data);
        }
    }, [isSearch, isOpen]);

    const Options = dataTemp.reduce((acc, item) => {
        let itemElement = <div className={$_("item",selected && selected.value === item.value && "active")} onClick={ e => selectItem(item, e) }>{item.text}</div>;
        acc.push(itemElement);
        return acc;
    }, []);


    function toggleMenu(e) {
        setOpen(!isOpen)
        // if (window.innerWidth < 576)  {
        //     if (!isOpen) {
        //         mobileDropDown.current.focus(e)
        //     }
        // }
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 10);
    }


    let List;

    if (item_height) {
        List = <div className={$_("__items",isOpen && "active")}>
            <Scrollable className="__scroller" style={{ height: item_height*Options.length }}>
                <div style={{ height: 24*Options.length }}>
                    { Options }
                </div>
            </Scrollable>
        </div>
    } else {
        List = <div className={$_("__items",isOpen && "active")}>
            { Options }
        </div>
    }
    let headingLable;
    
    if (heading) {
        if (!props.children || selected) {
            headingLable = <span className="heading">
            {heading}
            </span>
        }
    }

    let inputSearch;

    if (isSearch && isOpen) {
        inputSearch = <input onChange={(e) => onChangeInputSearch(e.target.value)} ref={inputRef} className="search-input" type="text" placeholder={selected ? selected.text : heading} />
    }
    

    return useMemo( () => {
        return <div className={$_($$DROPDOWN, className,isOpen && "active", isSearch && "is-search", isBootstrap && "is-bootstrap")} {...props} data-type="dropdown-input" data-name={props.name} data-value={selected&&selected.value} onClick={ e => toggleMenu(e) } onMouseDown={ e => window.removeEventListener("mouseup", closeDropDown) } data-required={required}>
            {  headingLable }
            { inputSearch }
            <div className={$_("__dropbox",isOpen && isSearch && "d-none")}>
                <p>{ selected ? selected.text : props.children }</p>
            </div>

            {/* <select ref={mobileDropDown} style={{ opacity: 0, width: 0, height: 0 }}>
                { data.map( item => <option value={item.value}>{item.text}</option> ) }
            </select> */}
            { List} 
        </div>
    }, [isOpen, disabled, value, selected, dataTemp])
}

const $$DATEINPUT = css` 
    display: inline-block;
    width: 200px;
    position: relative;
    cursor: pointer;
    user-select: none;
    position: relative;

    &.active {
        z-index: 100;
    }
    span.heading {
        font-family: Montserrat;
        position: absolute;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        -webkit-letter-spacing: normal;
        -moz-letter-spacing: normal;
        -ms-letter-spacing: normal;
        letter-spacing: normal;
        color: #666666;
        left: 5px;
        top: -8px;
        background: #fff;
        padding: 0 3px;
    }

    > div.header {
        border: 1px solid #e3e5ec;
        border-radius: 4px;
        left: 16px;
        width: 100%;
        text-align: left;
        padding: 0 8px;

        p {
            margin-left: 16px;
            display: inline-block;
            
            span {
                min-width: 20px;
                height: 20px;
                line-height: 20px;
                display: inline-block;
                text-transform: uppercase;
                padding: 0 2px;
                user-select: none;
                border-bottom: transparent dashed 1px;

                &:hover {
                    border-bottom: 1px dashed #222;
                }
                &.active {
                    animation: blink-color 1.5s infinite;
                    border-bottom: 1px dashed #222;
                }
            }
        }

        span.cal {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    > div.table {
        display: none;
        &.active { display: block; z-index: 100; }
        position: absolute;
        width: 100%;
        top: calc(100% + 4px);
        border-radius: 4px;
        font-size: 0.8rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 14px 0px;
        text-align: center;
        padding: 8px;

        > div.choice {
            height: 40px;
            line-height: 40px;
            background: #eee;
            border-radius: 4px;
            position: relative;
            text-align: center;

            > span {
                line-height: 40px;
                text-align: center;
            }

            > button {
                user-select: none;
                position: absolute;
                top: 0;
                border: 0;
                height: 100%;
                width: 24px;
                outline: none;
                cursor: pointer;
                background: none;
                padding: 0;
                border-radius: 4px;
                &[type='forward'] {
                    right: 0;
                    &:after {
                        content: '';
                        position: absolute;
                        right: 16px;
                        width: 4px;
                        height: 4px;
                        border-right: 2px solid #555;
                        border-top: 2px solid #555;
                        transform: rotate(45deg) translateY(-50%);
                    }
                }
                &[type='back'] {
                    left: 0;
                    &:after {
                        content: '';
                        position: absolute;
                        left: 12px;
                        width: 4px;
                        height: 4px;
                        border-left: 2px solid #555;
                        border-bottom: 2px solid #555;
                        transform: rotate(45deg) translateY(-50%);
                    }
                }
            }
        }
        > table {
            margin-top: 16px;
            width: 100%;
            > tr:first-of-type {
                margin-bottom: 12px;
                font-weight: 700;
            }

            > tr {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                > td {
                    margin-bottom: 100%;
                    position: relative;
                    height: 100%;
                    background: white;
                    border-radius: 4px;
                    &:after {
                        content: attr(data-entry);
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }

                    &:hover {
                        background: #eee;
                    }
                }
            }

            &.month, &.year {
                > tr:first-of-type {
                    font-weight: normal;
                    margin-bottom: 0;
                }
                tr { grid-template-columns: repeat(3, 1fr); }
                td {
                    height: 48px;
                    margin-bottom: 0%;
                }
            }

            &.day {
                > tr:first-of-type {
                    font-weight: normal;
                    margin-bottom: 0;
                }
            }
        }
        
    }
    span.error-text {
            display: none;
            font-size: 11px;
        }
    &.invalid {
        text-align: left;
        input {
            margin-bottom: 3px;
        }
        span.error-text {
            display: block;
        }
    }
`

export function DateInput({ disabled = false, className, name, heading, offset = 0, ...props }) {
    // let [isDayOpen, setDayOpen] = useState(false);

    let [$__year, set__year] = useState(new Date().getFullYear() - offset)

    let [day, setDay] = useState('dd');
    let [month, setMonth] = useState('mm');
    let [year, setYear] = useState('yyyy');
    let [isFocus, __setFocus] = useState(null);
    let [isClickOnInnerElement, _setClickOnElement] = useState(false);

    let currentDate = new Date();

    let [_month, _setMonth] = useState((month != "mm") ? parseInt(month) : currentDate.getMonth() + 1);

    let [_year, _setYear] = useState((year != "yyyy") ? parseInt(year) : currentDate.getFullYear());

    let _validated_value = {};
    if (props.validation && props.validation.length > 0) {
        props.validation.forEach( r => {
            if (typeof r == 'function') {
                let result = r(day, month, year);
                _validated_value[`data-valid-${r.name}`] = result.toString();
            }
        })
    }

    function parseDay (key) {
        day = day == "dd" ? "00" : day;
        key = key.toString();

        let next;

        if (key == "0" && parseInt(day) == 0) {
            setDay("00");
            return;
        }

        next = (day + key).slice(-2);

        if (parseInt(next) > 31) {
            if (key == 0) { key = day.slice(-1); }
            next = "0" + key;
        }

        if (next.length != 2) {
            next = "0" + key
        }

        if (parseInt(next).length == 2 && parseInt(day).length == 2) {
            next = "0" + key
        }

        setDay(next);
    }

    function parseMonth (key) {
        month = month == "mm" ? "00" : month;
        key = key.toString();
        
        let next;

        if (key == 0 && parseInt(month) == 0) {
            setMonth("00");
            return;
        }

        next = (month + key).slice(-2);
        if (parseInt(next) > 12) {
            if (key == 0) { key = month.slice(-1); }
            next = "0" + key;
        }

        if (next.length != 2) {
            next = "0" + key
        }

        setMonth(next);
        _setMonth(parseInt(next));
    }

    function parseYear (key) {
        year = year == "yyyy" ? "" : year;
        key = key.toString();

        let next;

        if (!year.startsWith("0")) {
            year = "" //= year.replace("0", "") + key;
        }

        if ((year.length == 0 && key == "0") || (year == "0" && key == "0") || (year == "00" && key == "0") || (year == "000" && key == "0") || (year == "0000" && key == "0")) {
            setYear("0000");
            return;
        }

        next = year + key;

        next = next.slice(-4);

        if (next.length < 4) {
            for(let i = 0; i < 3; i++) {
                next = "0" + next;
            }
        }

        setYear(next);
        _setYear(parseInt(next));
    }

    function logKey (e) {
        const keys = [8, 37, 38, 39, 40, 46, 27]; //arrow, backspace, delete
        if (keys.includes(e.keyCode)) {

            if (e.keyCode == 46 || e.keyCode == 8) {
                if (isFocus == 'day') { setDay("dd"); return; } 
                if (isFocus == "month") { setMonth("mm"); return; } 
                if (isFocus == "year") { setYear("yyyy"); return; }   
            }

            if (e.keyCode == 39) {
                if (isFocus == "day") { setFocus("month", e); return; }
                if (isFocus == "month") { setFocus("year", e); return; }
            }

            if (e.keyCode == 37) {
                if (isFocus == "year") { setFocus("month", e); return; }
                if (isFocus == "month") { setFocus("day", e); return; }
            }

            if (e.keyCode == 40) {
                if (isFocus == "day") {  
                    day = day < 2 ? 32 : day;
                    if (day == 'dd') { setDay(31); } 
                    else { setDay(day-1); }
                    return; 
                }
                if (isFocus == "month") {  
                    month = month < 2 ? 13 : month;
                    if (month == 'mm') { setMonth(12); } 
                    else { setMonth(month-1); }
                    return; 
                }
                if (isFocus == "year") {  
                    let current = new Date().getFullYear();
                    year = year < 0 ? current : year;
                    if (year == 'yyyy') { setYear(current); } 
                    else { setYear(year-1); }
                    return; 
                }
            }

            if (e.keyCode == 38) {
                if (isFocus == "day") {  
                    day = day > 30 ? 0 : day;
                    if (day == 'dd') { setDay(1); } 
                    else { setDay(day+1); }
                    return; 
                }
                if (isFocus == "month") {  
                    month = month > 11 ? 0 : month;
                    if (month == 'mm') { setMonth(1); } 
                    else { setMonth(month+1); }
                    return; 
                }
                if (isFocus == "year") {  
                    let current = new Date().getFullYear();
                    year = year < 0 ? current : year;
                    if (year == 'yyyy') { setYear(current); } 
                    else { setYear(year+1); }
                    return; 
                }
            }

            if (e.keyCode == 27) {
                if (isFocus == "day") {
                    setDay("dd")
                }
                if (isFocus == "month") {
                    setDay("mm")
                }
                if (isFocus == "year") {
                    setDay("yyyy")
                }
            }

            return;
        }

        if (/^[0-9]$/i.test(e.key) == true) {
            if (isFocus == 'day') {
                parseDay(e.key);
                return;
            }

            if (isFocus == 'month') {
                parseMonth(e.key);
                return;
            }

            if (isFocus == 'year') {
                parseYear(e.key);
                return;
            }

        }  
    }

    function stopLogKey(e) {
        window.removeEventListener('keydown', logKey);
        window.removeEventListener('mouseup', stopLogKey);
    }

    function unfocus(e) {
        setFocus(null, e);
        window.removeEventListener("mouseup", unfocus);
    }

    function back () {
        set__year($__year - 9)
        _setClickOnElement(false)
    }

    function forward () {
        set__year($__year + 9);

        _setClickOnElement(false)
    }

    useLayoutEffect( () => {
        if (isFocus != 'day' && day == '00') { setDay("01"); }; 
        if (isFocus != 'month' && month == '00') { setMonth("01"); }; 
        if (isFocus != 'year' && year == '0000') { setYear("0001"); }; 
        
        if (month != "00" && month != "mm" && year != "0000" && year != "yyyy" && year > 1800) {
            let lastDay = new Date(year, month, 0).getDate();
            if (day > lastDay) {
                setDay(lastDay.toString())
            }
        }

        if (isFocus != null) {
            window.addEventListener('keydown', logKey);
            window.addEventListener('mouseup', stopLogKey);
        }

        if (isClickOnInnerElement == false) {
            window.addEventListener('mouseup', unfocus);
        }

        return () => {
            window.removeEventListener("mouseup", unfocus);
            window.removeEventListener('keydown', logKey);
            window.removeEventListener('mouseup', stopLogKey);
        };
    })

    let day_rows = []

    function setFullMonth(e) {
        let __month = e.target.getAttribute("data-month");
        __month = __month < 10 ? "0" +__month : __month.toString();
        setMonth(__month);
        if (year == "yyyy") {
            setFocus("year", e);
        }else {
            setFocus(null, e)
        }
    }

    function setFullDay(e) {
        let __date = e.target.getAttribute("data-entry");
        __date = __date < 10 ? "0" + __date : __date.toString();
        setDay(__date);
        if (month == "mm") {
            setFocus("month", e)
        } else {
            setFocus(null, e)
        }
    }

    function setFullYear(e) {
        let __year = e.target.getAttribute("data-entry");
        setYear(__year);
        setFocus(null, e)
    }

    let __day = 1;
    for (let i = 0; i < 6; i++) {
        if (__day > 31) {
            break;
        }
        let cells = [];
        for (let j = 1; j < 8; j++) {
            cells.push(<td data-entry={__day} onClick={setFullDay}></td>)
            __day += 1;
            if (__day > 31) {
                break;
            }
        }
        day_rows.push(<tr>{cells}</tr>)
    }


    let entryRef = useRef();

    function setFocus(value, e) {
        if (value != null) {
            entryRef.current.focus();
        }

        __setFocus(value);
        e.stopPropagation();
    }

    let year_rows = [];

    let __year = $__year;
    for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
            cells.unshift(<td data-entry={__year} onClick={setFullYear} ></td>)
            __year -= 1;
        }
        year_rows.unshift(<tr>{cells}</tr>)
    }
    let headingLable;
    
    if (heading) {
        headingLable = <span className="heading">
        {heading}
        </span>
    }

    return <div className={$_($$DATEINPUT, className, isFocus != null && "active")} data-name={name} data-type="date-input" data-value={`${day}/${month}/${year}`} {..._validated_value}>
        {headingLable}
        <input type="number" inputmode="numeric" pattern="[0-9]*" style={{ opacity: 0, width: 0, height: 0, pointerEvents: "none" }} ref={entryRef} datta-disabled="true" />
        <div className="header" onClick={ e => setFocus("day", e)}>
            <p>
                <span type="day" className={$_(isFocus == "day"&&"active")} onClick={ (e) => setFocus("day", e)}>{day}</span>/
                <span type="month" className={$_(isFocus == "month"&&"active")} onClick={ (e) => setFocus("month", e)}>{month}</span>/
                <span type="year" className={$_(isFocus == "year"&&"active")} onClick={ (e) => setFocus("year", e)}>{year}</span>
            </p>
            <span className="cal" onClick={ e => setFocus("day", e) }><img src={`${HOST}/imgs/calendar.svg`} /></span>
        </div>

        <div className={$_('table', isFocus=="day" && "active")}>
            <div className="choice">
                {/* <button type="back" onClick={back} onMouseDown={ () => _setClickOnElement(true) }></button> */}
                <span>Ngày</span>
                {/* <button type="forward" onClick={forward} onMouseDown={ () => _setClickOnElement(true) }></button> */}
            </div>
            <table className="day">
                {
                    day_rows
                }
            </table>
        </div>

        <div className={$_('table', isFocus == "month" && "active")}>
            <div className="choice">
                Tháng
            </div>  
            <table className="month">
                <tr>
                    <td data-month={1}  data-entry={"Tháng 1"} onClick={setFullMonth}></td>
                    <td data-month={2}  data-entry={"Tháng 2"} onClick={setFullMonth}></td>
                    <td data-month={3}  data-entry={"Tháng 3"} onClick={setFullMonth}></td>
                </tr>
                <tr>
                    <td data-month={4}  data-entry={"Tháng 4"} onClick={setFullMonth}></td>
                    <td data-month={5}  data-entry={"Tháng 5"} onClick={setFullMonth}></td>
                    <td data-month={6}  data-entry={"Tháng 6"} onClick={setFullMonth}></td>
                </tr>
                <tr>
                    <td data-month={7}  data-entry={"Tháng 7"} onClick={setFullMonth}></td>
                    <td data-month={8}  data-entry={"Tháng 8"} onClick={setFullMonth}></td>
                    <td data-month={9}  data-entry={"Tháng 9"} onClick={setFullMonth}></td>
                </tr>
                <tr>
                    <td data-month={10}  data-entry={"Tháng 10"} onClick={setFullMonth}></td>
                    <td data-month={11}  data-entry={"Tháng 11"} onClick={setFullMonth}></td>
                    <td data-month={12}  data-entry={"Tháng 12"} onClick={setFullMonth}></td>
                </tr>
            </table>
        </div>

        <div className={$_('table', isFocus=="year" && "active")}>
            <div className="choice">
                <button type="back" onClick={back} onMouseDown={ () => _setClickOnElement(true) }></button>
                Năm
                <button type="forward" onClick={forward} onMouseDown={ () => _setClickOnElement(true) }></button>
            </div>
            <table className="year">
                { year_rows }
            </table>
        </div>
        
        <span className="error-text">
            Vui lòng nhập {heading}
        </span>
    </div>
}


const $$CHECKBOX = css`
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #bbb;
    position: relative;

    &.active {
        background: #00377B;
        border: 0;

        &:after {
            content: "";
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC3SURBVHgB7dZREYMwDMbxT8IkIAEJkzAHixMkTUIlTAISJiErW/YwrpQGkvDC/66PhB/0elcgMGbu83ryt5RXh8gE8OL/EqJaAHxCRDVAboR3K4CpGzxrABA8OwH5BdejAXeuR2sDLvIVPTZkAZj/wgGKdgNkyFh4sAliApBBSw0hABmWtBBTgAzsuLwlRYg5QAtxAyggD1eAAuIL2AEheKSAEDxrgBAiqkAIkQnkdzKm67r5lewNZiT8vQh4F0oAAAAASUVORK5CYII=");
            position: absolute;
            height: 7px;
            width: 9px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
    &.danger {
        border-color: #c42127;
    }
`

export function CheckBox ({ checked = false, disabled = false, onCheck, name, ...props }) {

    let [isChecked, setChecked] = useState(checked)

    function check(e) {
        if (disabled) {
            return;
        }
        if(typeof onCheck == "function") {
            onCheck(!isChecked)
        }
        setChecked(!isChecked);
    }

    return <span {...props} className={$_($$CHECKBOX, isChecked && "active")} data-check={isChecked} onClick={check} data-tick="✓" data-name={name} data-type="checkbox-input">    
    </span>
}

const $Scrollable = css`
    div._scroll_parent {
        /* https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll */
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        
        > div._scroll_horizontal {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -20px; /* Increase/Decrease this value for cross-browser compatibility */
            overflow-y: scroll;
            padding-right: 20px;
            > div {
                position: relative;
            }
        }   
    }

    div._scroll_bar {
        position: absolute;
        right: 1px;
        top: 2px;
        width: 12px;
        height: calc(100% - 4px);

        > div._thumb {
            transition: width 250ms ease, border-radius 250ms ease, opacity 250ms ease;
            position: relative;
            width: 6px;
            height: 40px;
            background: #ccc;
            border-radius: 3px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            &:hover {
                transition: width 250ms ease, border-radius 250ms ease, opacity 250ms ease;
                width: 12px;
                border-radius: 6px;
            }
        }
    }
`

export function Scrollable ({ children, invert = false, className, style, height }) {
    let parent_ref = useRef();
    let content_ref = useRef();
    let scrollbar_ref = useRef();
    let scrollbar_thumb_ref = useRef();
    let scrollbar_thumb_timer;

    let parent_content_dimention = {};
    let scrollbar_dimention = {};
    let scrollbar_thumb_dimention = {};

    useLayoutEffect( () => {

        function reRef () {
            scrollbar_dimention = scrollbar_ref.current.getBoundingClientRect();

            //resize thumb_size
            const thumb_size_ratio = children.__e.scrollHeight / scrollbar_dimention.height; 
            scrollbar_thumb_ref.current.style.height = (scrollbar_dimention.height / thumb_size_ratio) + "px"
            
            scrollbar_thumb_dimention = scrollbar_thumb_ref.current.getBoundingClientRect();
            parent_content_dimention = parent_ref.current.getBoundingClientRect();
        }

        reRef();

        window.addEventListener('resize', reRef);
        return () => window.removeEventListener('resize', reRef);
    })

    const scrollBoxHandler = {

        //scroll verticle from content to scrollbar
        onScroll: function(e) {

            window.clearTimeout(scrollbar_thumb_timer);

            let input = e.target.scrollTop;

            let input_start = 0;
            let input_end = 0;

            if (invert == true) {
                input_end = 0;
                input_start = children.__e.scrollHeight - parent_content_dimention.height; 
            } else {
                input_start = 0;
                input_end = children.__e.scrollHeight - parent_content_dimention.height; 
            }             

            let output_start = 0;
            let output_end = scrollbar_dimention.height - scrollbar_thumb_dimention.height;
            

            let slope = (output_end - output_start) / (input_end - input_start)
            let output = output_start + slope * (input - input_start)
            scrollbar_thumb_ref.current.style.top = output + "px"
            scrollbar_thumb_ref.current.style.opacity = 1;

            scrollbar_thumb_timer = setTimeout(function() {
                scrollbar_thumb_ref.current.style.opacity = 0;
            }, 1400);
        }
    }

    const scrollBarHandler = {
        onMouseEnter: () => {
            window.clearTimeout(scrollbar_thumb_timer);
            scrollbar_thumb_ref.current.style.opacity = 1;
        },
        onMouseLeave: () => {
            window.clearTimeout(scrollbar_thumb_timer);
            scrollbar_thumb_timer = setTimeout(function() {
                scrollbar_thumb_ref.current.style.opacity = 0;
            }, 1400);
        }
    }

    const thumbHandler = {
        onMouseDown: function(e) {
            e.preventDefault();
            e.stopPropagation();

            let origin_y = e.target.offsetTop;
            let yLength = 0;
            let bottom_scroll_position = scrollbar_dimention.height - e.target.clientHeight;

            function handleDrag(m) {

                yLength = (m.clientY - e.clientY);

                let nextThumbY = origin_y + yLength;

                if (nextThumbY < 0) {
                    nextThumbY = 0;
                } else if (nextThumbY > bottom_scroll_position) {
                    nextThumbY = bottom_scroll_position;
                }

                e.target.style.top = nextThumbY + "px";

                let input = nextThumbY;

                let output_start = 0;
                let output_end = 0;

                if (invert == true) {
                    // output_end = parent_content_dimention.top;
                    output_start = children.__e.scrollHeight - parent_content_dimention.height; 
                } else {
                    // output_start = parent_content_dimention.top;
                    output_end = children.__e.scrollHeight - parent_content_dimention.height; 
                }
                
                let input_start = 0;
                
                let input_end = scrollbar_dimention.height - scrollbar_thumb_dimention.height;
                
                let slope = (output_end - output_start) / (input_end - input_start)
                let output = output_start + slope * (input - input_start)
                content_ref.current.scrollTop = output;
            }

            function handleStopDrag () {
                window.removeEventListener("mousemove", handleDrag);
                window.removeEventListener("mouseup", handleStopDrag)
            }

            window.addEventListener("mousemove", handleDrag);
            window.addEventListener("mouseup", handleStopDrag);
        }
    }
    
    return <div className={[$Scrollable,className].join(" ")} style={style}>
        <div className="_scroll_parent" ref={parent_ref}>
            <div className="_scroll_horizontal" {...scrollBoxHandler} ref={content_ref}>
                { children }
            </div>
        </div>
        <div className="_scroll_bar" ref={scrollbar_ref} {...scrollBarHandler}>
            <div className="_thumb" ref={scrollbar_thumb_ref} {...thumbHandler}></div>
        </div>
    </div>

}

export function $_ () {
    return Array.from(arguments).filter(name => name != false).join(" ").trim();
}

function generateArrayOfYears(from = 0) {
    var max = new Date().getFullYear() - from;
    var min = max - 9
    var years = []
  
    for (var i = max; i >= min; i--) {
      years.push(i)
    }
    return years
  }

const $INPUT_CSS = css`
    position: relative;
    font-family: Montserrat;
    input, textarea {
        &:focus { outline:none; }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
    label {
        font-family: Montserrat;
        position: absolute;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        -webkit-letter-spacing: normal;
        -moz-letter-spacing: normal;
        -ms-letter-spacing: normal;
        -webkit-letter-spacing: normal;
        -moz-letter-spacing: normal;
        -ms-letter-spacing: normal;
        letter-spacing: normal;
        color: #666666;
        left: 6px;
        top: 10px;
        background: #fff;
        padding: 0 3px;
        opacity: 0;
        transition:0.2s ease all; 
        -moz-transition:0.2s ease all; 
        -webkit-transition:0.2s ease all;
      }
      
      input:focus ~ label, input:valid ~ label 		{
        opacity: 1;
        top: 0;
      }
      textarea:focus ~ label, textarea:valid ~ label 		{
        opacity: 1;
        top: 0;
    }
    span.error-text {
            display: none;
            font-size: 11px;
        }
    &.invalid {
        text-align: left;
        input, textarea {
            margin-bottom: 3px;
        }
        span.error-text {
            display: block;
        }
    }
    &.is-bootstrap {
        text-align: left;
        label {
            position: relative;
            opacity: 1;
            left: -3px;
            top: 0;
        }
        input, textarea {
            margin-top: 2px;
            -moz-appearance: none;
            -webkit-appearance: none;
            &:disabled {
                background: #F8F8F8;
                font-family: Montserrat;
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                line-height: 16px;
                color: #333333;
            }
            font-weight: 500;
            color: #333333;
            font-size: 15px;
        }
        textarea {
            min-height: 80px;
            resize: none;
        }
        .icon {
            width: 12px; height: 12px;
            position: absolute;
            right: 10px;
            top: 30px;
        }
    }
`
export function Input ({label, isBootstrap = false, icon = null, errorMsg, ...props}) {
    return <div className={$_($INPUT_CSS, isBootstrap && 'is-bootstrap')}>
        {label ? <label>{label}</label> : null}
        <input {...props} />
        { icon ? <img className="icon" src={`${HOST}/imgs/ic-check.svg`} /> : null }
        <span className="error-text">
            {errorMsg ? errorMsg : 'Vui lòng nhập ' + label}
        </span>
    </div>
}
export function Textarea ({label, isBootstrap = false, errorMsg, icon = null, ...props}) {
    return <div className={$_($INPUT_CSS, isBootstrap && 'is-bootstrap')}>
        {label ? <label>{label}</label> : null}
        <textarea {...props} />
        <span className="error-text">
        {errorMsg ? errorMsg : 'Vui lòng nhập ' + label}</span>
        { icon ? <img className="icon" src={`${HOST}/imgs/ic-check.svg`} /> : null }
    </div>
}
export function IconChat (props) {
    return <img {...props} src={`${HOST}/imgs/ic_chat.svg`}  />
}