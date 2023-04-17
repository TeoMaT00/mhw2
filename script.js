/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const X_IMAGE_URL = 'images/checked.png';
const Y_IMAGE_URL = 'images/unchecked.png';

function changeCheckbox(event) {
    unchecked(event);


    const c = event.currentTarget;
    const old = c.querySelector('img.checkbox');
    const image1 = document.createElement('img');

    image1.src = X_IMAGE_URL;

    image1.classList.add('checkbox');
    if (c instanceof HTMLElement) {

        c.removeChild(old);

    }
    c.appendChild(image1);
    c.style.backgroundColor = '#cfe3ff';
    c.style.opacity = '0.6';
    savecheck(event);
    complete();

}

const boxes = document.querySelectorAll('.choice-grid div');
for (const b of boxes) {
    b.addEventListener("click", changeCheckbox);
}



function unchecked(event) {
    const e = event.currentTarget;
    for (const b of boxes) {
        if (b.dataset.questionId == e.dataset.questionId) {
            const img = document.createElement('img');
            img.src = Y_IMAGE_URL;
            const old = b.querySelector('img.checkbox');
            img.classList.add('checkbox');
            b.removeChild(old);
            b.appendChild(img);
        }

        b.style.backgroundColor = '#f4f4f4';
        b.style.opacity = '1';

    }

}

let saveAns = [];

function savecheck(event) {
    const save = event.currentTarget;
    switch (save.dataset.questionId) {
        case 'one': saveAns[0] = save.dataset.choiceId;
            break;
        case 'two': saveAns[1] = save.dataset.choiceId;
            break;
        case 'three': saveAns[2] = save.dataset.choiceId;
            break;
        default:
            break;
    }
}

function complete() {
    if (saveAns.length > 2 && allCheck()) {
        for (const c of boxes) {
            c.removeEventListener("click", changeCheckbox);
        }
        result();

    }
}

function allCheck() {
    for (const e of saveAns) {
        if (e == undefined) {
            return false;
        }
    }
    return true;
}

function uncheckAll() {
    for (const c of boxes) {

        const img = document.createElement('img');
        img.src = Y_IMAGE_URL;
        const old = c.querySelector('img.checkbox');
        img.classList.add('checkbox');
        c.removeChild(old);
        c.appendChild(img);
        c.style.backgroundColor = '#f4f4f4';
        c.style.opacity = '1';
    }

}

function reset() {
    uncheckAll();
    saveAns = [];
    for (const c of boxes) {
        c.addEventListener("click", changeCheckbox);
    }
    ris.style.display = 'none';
}


const button=document.querySelector(".reset");
button.addEventListener("click",reset);
const ris = document.querySelector(".finequiz");

function result() {
    let fine;
    for (let i = 0; i < saveAns.length; i++) {

        for (let j = i + 1; j < saveAns.length; j++) {
            if (saveAns[i] == saveAns[j]) {
                fine = saveAns[i];

            }
        }

    }
    if (fine == undefined) {
        fine = saveAns[0];
    }

    const winner = document.querySelector(".finequiz p1");
    const tit = document.querySelector(".finequiz h2");

    winner.innerHTML = RESULTS_MAP[fine].title;
    tit.innerHTML = RESULTS_MAP[fine].contents;


    ris.style.display = "flex";



}


