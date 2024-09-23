const windowHeaders = document.querySelectorAll('.window-header');
const windowElements = document.querySelectorAll('.window');

document.querySelector('#restore-all-windows').addEventListener('click', () => {
    windowElements.forEach(element => {
        element.style.visibility = 'visible';
    });
})

windowElements.forEach(element => {
    element.addEventListener('mousedown', () => {
        windowElements.forEach(element => {
            element.classList.remove('active'); // Remove 'active' class from all windows
        });
        element.classList.add('active');
    });
})

windowHeaders.forEach((header, index) => {
    const windowElement = windowElements[index];

    let isDragging = false;
    let offset = [0, 0];

    let coords = [[897, 325], [729, 471], [1127, 212], [352, 205]];
    coords[index].forEach((x,y) => {
        console.log(`setting style.${y == 0 ? 'left' : 'top'} to ${x}px`)
        if(y == 0) windowElement.style.left = `${x}px`;
        if(y == 1) windowElement.style.top = `${x}px`;
    })

    header.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Only respond to left mouse button
            isDragging = true;
            offset = [windowElement.offsetLeft - e.clientX, windowElement.offsetTop - e.clientY];
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.clientX + offset[0];
            const newY = e.clientY + offset[1];

            // Boundary check
            if (newX < 0) {
                windowElement.style.left = '0px';
            } else if (newX + windowElement.offsetWidth > window.innerWidth) {
                windowElement.style.left = `${window.innerWidth - windowElement.offsetWidth}px`;
            } else {
                windowElement.style.left = `${newX}px`;
            }

            if (newY < 0) {
                windowElement.style.top = '0px';
            } else if (newY + windowElement.offsetHeight > window.innerHeight) {
                windowElement.style.top = `${window.innerHeight - windowElement.offsetHeight}px`;
            } else {
                windowElement.style.top = `${newY}px`;
            }
        }
    });
});

document.querySelectorAll('.close').forEach(element => {
    element.addEventListener('click', () => {
        element.parentElement.parentElement.parentElement.style.visibility = 'hidden';
        let hidden = Array.from(windowElements).filter(element => element.style.visibility === 'hidden');
        if(hidden.length == windowElements.length) $('#restore-all-windows').css('opacity', '1');
    });
})