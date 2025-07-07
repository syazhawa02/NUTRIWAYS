document.addEventListener("DOMContentLoaded", function () {
    const publicForm = document.getElementById("public-form");
    const privateForm = document.getElementById("private-form");
    const postsContainer = document.getElementById("posts-container");

    // ✅ Handle Public Post Submission
    publicForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("public-username").value.trim();
        const postText = document.getElementById("public-post").value.trim();

        if (username === "" || postText === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Create post container
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <div class="post-header">
                <strong>${username}</strong> <span class="post-date">${new Date().toLocaleString()}</span>
            </div>
            <p>${postText}</p>
            <hr>
            <div class="comment-section">
                <input type="text" class="comment-input" placeholder="Write a comment...">
                <button class="comment-btn">Comment</button>
                <div class="comments"></div>
            </div>
        `;

        postsContainer.prepend(postDiv); // Add new post at the top

        document.getElementById("public-username").value = "";
        document.getElementById("public-post").value = "";

        // ✅ Handle Comments for this Post
        const commentInput = postDiv.querySelector(".comment-input");
        const commentButton = postDiv.querySelector(".comment-btn");
        const commentsDiv = postDiv.querySelector(".comments");

        commentButton.addEventListener("click", function () {
            const commentText = commentInput.value.trim();
            if (commentText === "") return;

            const commentP = document.createElement("p");
            commentP.classList.add("comment");
            commentP.innerHTML = `<strong>${username}:</strong> ${commentText} <span class="comment-date">${new Date().toLocaleString()}</span>`;
            commentsDiv.appendChild(commentP);

            commentInput.value = ""; // Clear input
        });
    });

    // ✅ Handle Private Post Submission (Google Sheets)
    privateForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("username").value;
        let gmail = document.getElementById("gmail").value;
        let post = document.getElementById("post").value;

        fetch("https://script.google.com/macros/s/AKfycbyLgiXGDZxxXoUL5TluZyLON9MxbGnGONJIEyDHcZORNtjvZXX3ihm6ptzCoGSHtpoMuA/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, gmail, post })
        }).then(() => {
            alert("✅ Data sent successfully!");
            privateForm.reset();
        }).catch(error => {
            alert("❌ Error sending data.");
            console.error("Error:", error);
        });
    });
});
