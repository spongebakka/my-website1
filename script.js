let currentIndex = 0;
let photos = [];
let brightness = 0; // Start with black (brightness 0)
let increment = 5; // Amount to change brightness by each click

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to display a photo based on the current index
function showPhoto(index) {
    const photoElement = document.getElementById('photo');
    if (index >= 0 && index < photos.length) {
        photoElement.src = `photos/${photos[index]}`;
    }
}

// Function to change the background color in cycles
function changeBackground() {
    brightness += increment;

    // Reverse direction of brightness change at the limits
    if (brightness >= 100 || brightness <= 0) {
        increment = -increment;
    }

    // Update the background color based on the current brightness
    document.body.style.backgroundColor = `hsl(0, 0%, ${brightness}%)`;
}

// Fetch photo filenames from the server and shuffle them
function fetchPhotos() {
    fetch('/images')
        .then(response => response.json())
        .then(data => {
            photos = data;
            shuffleArray(photos); // Shuffle the photos array
            if (photos.length > 0) {
                showPhoto(currentIndex);
            }
        })
        .catch(error => console.error('Error fetching images:', error));
}

// Event listener for clicking on the photo
document.getElementById('photo').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto(currentIndex);
    changeBackground(); // Change the background color on each click
});

// Initialize with the first photo
fetchPhotos();

// JavaScript to update cursor position
document.addEventListener('mousemove', (e) => {
    const cursorDot = document.querySelector('body::before');
    cursorDot.style.left = `${e.pageX - 8}px`; // Offset by half of the dot's width
    cursorDot.style.top = `${e.pageY - 8}px`; // Offset by half of the dot's height
});
