// Google Sign-In functionality
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

// Toggle Dark Mode
// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
//     const isDarkMode = document.body.classList.contains('dark-mode');
//     localStorage.setItem('dark-mode', isDarkMode);
// }

// // Apply Dark Mode on Page Load
// document.addEventListener('DOMContentLoaded', () => {
//     const isDarkMode = localStorage.getItem('dark-mode') === 'true';
//     if (isDarkMode) {
//         document.body.classList.add('dark-mode');
//     }

//     const darkModeToggle = document.querySelector('.dark-mode-toggle');
//     darkModeToggle.addEventListener('click', toggleDarkMode);
// });

// Hardcoded YouTube API Key
const API_KEY = 'AIzaSyCJ1VpPNvOnDBh4TS0lWzt5ORIgVW1CIx8';

// Search for YouTube videos
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query.trim() === '') return; // Avoid searching with an empty query
    searchYouTube(query);
});

// Perform YouTube Search
function searchYouTube(query) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => console.error('Error fetching YouTube data:', error));
}

// Display search results
function displayResults(videos) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails.medium.url;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <img src="${thumbnailUrl}" alt="${title}">
            <p>${title}</p>
        `;
        resultItem.addEventListener('click', () => {
            playVideo(videoId);
        });

        resultsContainer.appendChild(resultItem);
    });

    // Hide video player and show search results
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.innerHTML = ''; // Clear video player content
    videoPlayer.style.display = 'none'; // Hide video player
    resultsContainer.style.display = 'flex'; // Show search results
}

// Play a selected video
function playVideo(videoId) {
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
    videoPlayer.style.display = 'block'; // Show the video player
    document.getElementById('results').style.display = 'none'; // Hide the search results
}

// Handle Enter key for search
document.getElementById('search-input').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});
