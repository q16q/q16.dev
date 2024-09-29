document.querySelectorAll('.clouds img').forEach(element => {
    element.addEventListener('click', () => {
        // scroll to the bottom of the page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    })
})