window.addEventListener("DOMContentLoaded", async function () {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

  document.querySelectorAll(".stack-card").forEach(async function (el) {
    const userId = el.getAttribute("user-id");

    const response = await get(
      `https://api.stackexchange.com/2.2/users/${userId}?site=stackoverflow`
    );
    const user = response.items[0];
    const {
      profile_image,
      website_url,
      link,
      display_name,
      reputation,
      user_id,
    } = user;
    const { gold, silver, bronze } = user.badge_counts;

    const profileLink = website_url || link;

    el.innerHTML = `
        <a href="${profileLink}" target="_blank" rel="noreferrer" class="profile-link-card">
            <div class="profile-link-card-header">
                <img class="profile-link-card-avatar" src="https://avatars.githubusercontent.com/u/55461452?s=400&u=f91b46e3828e13ae46101064cfe70335914f9121" alt="Profile image"></img>
                <div class="profile-link-card-copy">
                    <p class="profile-link-card-label">Stack Overflow</p>
                    <h3 class="profile-link-card-title">${display_name}</h3>
                    <p class="profile-link-card-handle">
                        @${link.replace("https://", "").replace(`/users/${user_id}`, "")}
                    </p>
                </div>
            </div>
            <div class="profile-link-card-stats">
                <div>
                    <p class="profile-link-card-stat-label">Reputation</p>
                    <p class="profile-link-card-stat-value">${reputation}</p>
                </div>
                <div>
                    <p class="profile-link-card-stat-label">Gold</p>
                    <p class="profile-link-card-stat-value">${gold}</p>
                </div>
                <div>
                    <p class="profile-link-card-stat-label">Silver</p>
                    <p class="profile-link-card-stat-value">${silver}</p>
                </div>
                <div>
                    <p class="profile-link-card-stat-label">Bronze</p>
                    <p class="profile-link-card-stat-value">${bronze}</p>
                </div>
            </div>
        </a>
        `;
  });

  document.querySelectorAll(".github-card").forEach(async function (el) {
    const username = el.getAttribute("username");

    const response = await get(`https://api.github.com/users/${username}`);
    const { name, avatar_url, public_repos, followers, html_url, following } =
      response;

    el.innerHTML = `
        <a href="${html_url}" target="_blank" rel="noreferrer" class="profile-link-card">
            <div class="profile-link-card-header">
                <img class="profile-link-card-avatar" src="${avatar_url}" alt="Profile image"></img>
                <div class="profile-link-card-copy">
                    <p class="profile-link-card-label">GitHub</p>
                    <h3 class="profile-link-card-title">${name}</h3>
                    <p class="profile-link-card-handle">
                        @${html_url.replace("https://", "")}
                    </p>
                </div>
            </div>
            <div class="profile-link-card-stats profile-link-card-stats--three">
                <div>
                    <p class="profile-link-card-stat-label">Repositories</p>
                    <p class="profile-link-card-stat-value">${public_repos}</p>
                </div>
                <div>
                    <p class="profile-link-card-stat-label">Followers</p>
                    <p class="profile-link-card-stat-value">${followers}</p>
                </div>
                <div>
                    <p class="profile-link-card-stat-label">Following</p>
                    <p class="profile-link-card-stat-value">${following}</p>
                </div>
            </div>
        </a>
        `;
  });
});
