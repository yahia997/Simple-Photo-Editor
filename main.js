let container = document.getElementById('work-space'),
    tools = document.getElementById('tools'),
    input = document.getElementById('value'),
    img = document.getElementById('img'),
    popUp = document.getElementById('pop-up');

if (input.getAttribute("effect") === null) {
    input.classList.add("d-none");
}

var height = window.innerHeight;

if (window.innerWidth >= 992) {
    container.style.height = `${height}px`;
    tools.style.height = `${height}px`;
    tools.firstElementChild.classList.remove('not-vertical');
} else {
    container.style.height = `${height - 70}px`;
    tools.style.height = "70px";
    tools.firstElementChild.classList.remove('vertical');
}

window.onresize = () => {
    height = window.innerHeight;
    if (window.innerWidth >= 992) {
        container.style.height = `${height}px`;
        tools.style.height = `${height}px`;
        tools.firstElementChild.classList.remove('not-vertical');
        tools.firstElementChild.classList.add('vertical');
    } else {
        container.style.height = `${height - 70}px`;
        tools.style.height = "70px";
        tools.firstElementChild.classList.remove('vertical');
        tools.firstElementChild.classList.add('not-vertical');
    }                   
}

let obj = {
    blur: {value: -1,degree: "px"},
    brightness: {value: -1,degree: "%"},
    hueRotate: {value: -1,degree: "deg"},
    opacity: {value: -1,degree: "%"},
    saturate: {value: -1,degree: "%"},
    sepia: { value: -1, degree: "%" },
    contrast: { value: -1, degree: "%" },
    grayscale: { value: -1, degree: "%" },
    invert: { value: -1, degree: "%" },
}

input.oninput = () => {
    effect = input.getAttribute('effect');
    obj[effect].value = input.value;

    let cssTxt = "";
    Object.keys(obj).map(a => {
        if (obj[a].value >= 0) {
            if (a === "hueRotate") {
                cssTxt += ` hue-rotate(${obj[a].value}${obj[a].degree})`;
            } else {
                cssTxt += ` ${a}(${obj[a].value}${obj[a].degree})`;
            }
        }
    });

    img.style.cssText = `filter:${cssTxt}`;
}

function addEffect(type) {
    input.setAttribute("effect", type);
    if (type === "opacity") {
        input.setAttribute("max", "100");
    } else {
        input.setAttribute("max", "300");
    }
    input.value = obj[type].value;
    input.classList.remove("d-none");
    popUp.textContent = type;
    popUp.classList.remove("d-none");
    popUp.classList.add("animation");
    setTimeout(() => {
        popUp.classList.add("d-none");
    }, 999);
}