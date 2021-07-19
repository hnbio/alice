export function randomColor(){
    const colorStr = Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();
    return colorStr.length===5?`#${colorStr}0`:`#${colorStr}`;
}

export function format(date = "") {
    if(!date) return "";
    const Time = new Date(date);
    let year = Time.getFullYear();
    let month = Time.getMonth() + 1;
    let day = Time.getDate();
    return `${year}年${month}月${day}日`;
}

const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
export function formatWeek() {
    return weeks[new Date().getDay()];
}