
function toggleOverlay() {
    const overlayDiv = document.getElementById('overlay');
    
    // Toggle the 'overlay' class on the body
    document.body.classList.toggle('overlay');
    
    // Update the inner text based on the current state
    if (document.body.classList.contains('overlay')) {
        overlayDiv.innerText = 'To Hide';
    } else {
        overlayDiv.innerText = 'To Show';
    }
}

document.getElementById('overlay').addEventListener('click', toggleOverlay);
