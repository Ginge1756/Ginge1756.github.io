const blogList = document.getElementById('blog-list');

// Fetch blog posts from a JSON file
fetch('blog-posts.json')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = post.link;
            postElement.className = 'list-group-item list-group-item-action';
            postElement.innerHTML = `
                <h5 class="mb-1">${post.title}</h5>
                <p class="mb-1">${post.summary}</p>
                <small>${post.date}</small>
            `;
            blogList.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error loading blog posts:', error));