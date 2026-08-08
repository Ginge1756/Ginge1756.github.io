(function () {
const {
  hero,
  bio,
  skills,
  certifications,
  education,
  experience,
  footer,
  highlights,
} = window.AppData || {};

const { medium } = window.URLs || {};
const BADGE_ASSET_VERSION = "20260808-4";

function withAssetVersion(url) {
  if (window.location.protocol === "file:") {
    return url;
  }

  return `${url}?v=${BADGE_ASSET_VERSION}`;
}

if (!window.AppData || !window.URLs) {
  console.error("App data failed to load. Ensure user-data/data.js and user-data/urls.js are loaded before index.js.");
}

async function fetchBlogsFromMedium(url) {
  try {
    const response = await fetch(url);
    const { items } = await response.json();

    if (!items || items.length === 0) {
      console.warn("No blogs found in the Medium profile response.");
      return; // Exit if no blogs are found
    }

    populateBlogs(items, "blogs");
  } catch (error) {
    throw new Error(
      `Error in fetching the blogs from Medium profile: ${error}`
    );
  }
}

function mapBasicResponse(basics) {
  const {
    name,
    label,
    image,
    email,
    phone,
    url,
    summary,
    profiles,
    headline,
    blog,
    yearsOfExperience,
    username,
    locationAsString,
    region,
    karma,
    id,
    followers,
    following,
    picture,
    website,
  } = basics;

  // added title of page
  window.parent.document.title = name;
}

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  items.forEach((bioItem) => {
    const p = getElement("p", null);
    p.innerHTML = bioItem;
    bioTag.append(p);
  });
}

function populateSkills(items, id) {
  const skillsTag = document.getElementById(id);
  items.forEach((item) => {
    const card = getElement("article", "skill-card animate-box");
    card.setAttribute("data-animate-effect", "fadeInLeft");

    const title = getElement("h3", "skill-card-title");
    title.textContent = item.title;

    const summary = getElement("p", "skill-card-summary");
    summary.textContent = item.summary;

    const list = getElement("div", "skill-pill-list");
    item.items.forEach((skill) => {
      const pill = getElement("span", "skill-pill");
      pill.textContent = skill;
      list.append(pill);
    });

    card.append(title, summary, list);
    skillsTag.append(card);
  });
}

function getCertificationShield(level) {
  const normalizedLevel = (level || "associate").toLowerCase();

  if (normalizedLevel === "expert") {
    return withAssetVersion(new URL("./images/microsoft-certified-expert-badge.png", document.baseURI).href);
  }

  return withAssetVersion(new URL("./images/microsoft-certified-associate-badge.png", document.baseURI).href);
}

function populateCertifications(items, id) {
  const certificationsTag = document.getElementById(id);

  items.forEach((item) => {
    const card = getElement("article", "certification-card animate-box");
    card.setAttribute("data-animate-effect", "fadeInLeft");

    const icon = getElement("img", "certification-shield");
    const localShieldUrl = getCertificationShield(item.level || "associate");
    icon.src = localShieldUrl;
    icon.alt = `Microsoft ${item.level || "associate"} certification badge`;
    icon.loading = "eager";
    icon.onerror = () => {
      if (icon.dataset.localRetry === "1") {
        icon.onerror = null;
        return;
      }

      // Retry once with SVG source art as a fallback if PNG loading fails.
      icon.dataset.localRetry = "1";
      const fallbackFile = (item.level || "associate").toLowerCase() === "expert"
        ? "microsoft-certified-expert-badge.svg"
        : "microsoft-certified-associate-badge.svg";
      icon.src = withAssetVersion(`./images/${fallbackFile}`);
    };

    const content = getElement("div", "certification-content");
    const meta = getElement("p", "certification-meta");
    meta.textContent = "CERTIFICATION";

    const title = getElement("h3", "certification-title");
    title.textContent = item.title;

    content.append(meta, title);

    if (item.detailsUrl) {
      const detailsLink = getElement("a", "certification-link");
      detailsLink.href = item.detailsUrl;
      detailsLink.target = "_blank";
      detailsLink.rel = "noreferrer";
      detailsLink.textContent = "View certification details";
      content.append(detailsLink);
    }

    card.append(icon, content);
    certificationsTag.append(card);
  });
}

function populateBlogs(items, id) {
  const projectdesign = document.getElementById(id);
  const blogItems = items.slice(0, 3);

  blogItems.forEach((item) => {
    const blogCard = document.createElement("li");
    blogCard.className = "blog-card";

    const blogLink = document.createElement("a");
    blogLink.className = "blog-card-link";
    blogLink.href = item.link;
    blogLink.target = "_blank";
    blogLink.rel = "noreferrer";

    const blogTitle = document.createElement("h4");
    blogTitle.className = "blog-heading";
    blogTitle.textContent = item.title;

    const pubDateEle = document.createElement("p");
    pubDateEle.className = "publish-date";
    pubDateEle.textContent = getBlogDate(item.pubDate);

    const blogDescription = document.createElement("p");
    blogDescription.className = "blog-description";
    blogDescription.textContent = getBlogPreview(item.content);

    const categoriesDiv = document.createElement("div");
    categoriesDiv.className = "blog-tag-list";

    item.categories.slice(0, 3).forEach((category) => {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = category;
      categoriesDiv.appendChild(badge);
    });

    blogLink.append(blogTitle, pubDateEle, blogDescription, categoriesDiv);
    blogCard.append(blogLink);
    projectdesign.appendChild(blogCard);
  });
}

function populateRepo(items, id) {
  const projectdesign = document.getElementById(id);
  const count = 4; // Adjust this count based on the number of repos you want to display

  // Set up a wrapper div to hold repo cards in rows of 2
  const rowWrapper = document.createElement("div");
  rowWrapper.style =
    "display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between;";
  projectdesign.appendChild(rowWrapper);

  for (let i = 0; i < count; i++) {
    // Create elements for each repo card
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";
    repoCard.style = `
          flex: 1 0 48%;  /* Two cards in one row */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          background: linear-gradient(135deg,rgb(153,203,255), rgb(50,135,223));
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
          cursor: pointer;
      `;

    // Make the card clickable by wrapping the content inside an anchor tag
    const repoLink = document.createElement("a");
    repoLink.href = `https://github.com/${items[i].author}/${items[i].name}`;
    repoLink.target = "_blank";
    repoLink.style =
      "text-decoration: none; color: black; display: block; height: 100%;";

    repoCard.appendChild(repoLink);

    // Repository name
    const repoName = document.createElement("h4");
    repoName.className = "repo-heading";
    repoName.innerHTML = items[i].name;
    repoName.style = "margin: 0; font-size: 18px; font-weight: bold;";
    repoLink.appendChild(repoName);

    // Repository description
    const repoDescription = document.createElement("p");
    repoDescription.className = "repo-description";
    repoDescription.innerHTML = items[i].description;
    repoDescription.style = "margin-top: 8px; font-size: 12px; color: #555;";
    repoLink.appendChild(repoDescription);

    // Stats row (Language, Stars, Forks)
    const statsRow = document.createElement("div");
    statsRow.style = `
          display: flex; 
          align-items: center; 
          gap: 16px; 
          margin-top: 12px; 
          font-size: 12px; 
          color: #666;
      `;

    // Language
    const languageDiv = document.createElement("div");
    languageDiv.style = "display: flex; align-items: center; gap: 4px;";
    languageDiv.innerHTML = `
          <span style="width: 8px; height: 8px; background-color: #666; border-radius: 50%; display: inline-block;"></span>
          ${items[i].language}
      `;
    statsRow.appendChild(languageDiv);

    // Stars
    const starsDiv = document.createElement("div");
    starsDiv.style = "display: flex; align-items: center; gap: 4px;";
    starsDiv.innerHTML = `
          <img src="https://img.icons8.com/ios-filled/16/666666/star--v1.png" alt="Stars">
          ${items[i].stars}
      `;
    statsRow.appendChild(starsDiv);

    // Forks
    const forksDiv = document.createElement("div");
    forksDiv.style = "display: flex; align-items: center; gap: 4px;";
    forksDiv.innerHTML = `
          <img src="https://img.icons8.com/ios-filled/16/666666/code-fork.png" alt="Forks">
          ${items[i].forks}
      `;
    statsRow.appendChild(forksDiv);

    repoLink.appendChild(statsRow);

    // Add the repo card to the row wrapper
    rowWrapper.appendChild(repoCard);
  }
}

function populateExp_Edu(items, id) {
  let mainContainer = document.getElementById(id);

  for (let i = 0; i < items.length; i++) {
    let spanTimelineSublabel = document.createElement("span");
    spanTimelineSublabel.className = "timeline-sublabel";
    spanTimelineSublabel.innerHTML = items[i].subtitle;

    let spanh2 = document.createElement("span");
    spanh2.innerHTML = items[i].duration;

    let h2TimelineLabel = document.createElement("h2");
    h2TimelineLabel.innerHTML = items[i].title;
    h2TimelineLabel.append(spanh2);

    let divTimelineLabel = document.createElement("div");
    divTimelineLabel.className = "timeline-label";
    divTimelineLabel.append(h2TimelineLabel);
    divTimelineLabel.append(spanTimelineSublabel);

    for (let j = 0; j < items[i].details.length; j++) {
      let pTimelineText = document.createElement("p");
      pTimelineText.className = "timeline-text";
      pTimelineText.innerHTML = "&blacksquare; " + items[i].details[j];
      divTimelineLabel.append(pTimelineText);
    }

    let divTags = document.createElement("div");
    for (let j = 0; j < items[i].tags.length; j++) {
      let spanTags = document.createElement("span");
      spanTags.className = "badge";
      spanTags.innerHTML = items[i].tags[j];
      divTags.append(spanTags);
    }
    divTimelineLabel.append(divTags);

    let iFa = document.createElement("i");
    iFa.className = "fa fa-" + items[i].icon;

    let divTimelineIcon = document.createElement("div");
    divTimelineIcon.className = "timeline-icon color-2";
    divTimelineIcon.append(iFa);

    let divTimelineEntryInner = document.createElement("div");
    divTimelineEntryInner.className = "timeline-entry-inner";
    divTimelineEntryInner.append(divTimelineIcon);
    divTimelineEntryInner.append(divTimelineLabel);

    let article = document.createElement("article");
    article.className = "timeline-entry animate-box";
    article.append(divTimelineEntryInner);

    mainContainer.append(article);
  }

  let divTimelineIcon = document.createElement("div");
  divTimelineIcon.className = "timeline-icon color-2";

  let divTimelineEntryInner = document.createElement("div");
  divTimelineEntryInner.className = "timeline-entry-inner";
  divTimelineEntryInner.append(divTimelineIcon);

  let article = document.createElement("article");
  article.className = "timeline-entry begin animate-box";
  article.append(divTimelineEntryInner);

  mainContainer.append(article);
}

function populateLinks(items, id) {
  let footer = document.getElementById(id);

  items.forEach(function (item) {
    if (item.label !== "copyright-text") {
      let span = document.createElement("span");
      span.className = "col";

      let p = document.createElement("p");
      p.className = "col-title";
      p.innerHTML = item.label;
      span.append(p);

      let nav = document.createElement("nav");
      nav.className = "col-list";

      let ul = document.createElement("ul");
      item.data.forEach(function (data) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        if (data.link) {
          a.href = data.link;
          a.target = "_blank";
        }
        if (data.func) {
          a.setAttribute("onclick", data.func);
        }
        a.innerHTML = data.text;

        li.append(a);
        ul.append(li);
      });
      nav.append(ul);
      span.append(nav);
      footer.append(span);
    }

    if (item.label === "copyright-text") {
      let div = document.createElement("div");
      div.className = "copyright-text no-print";
      item.data.forEach(function (copyright) {
        let p = document.createElement("p");
        p.innerHTML = copyright;
        div.append(p);
      });
      footer.append(div);
    }
  });
}

function populateHero(details) {
  const fullName = (details.pageTitle || "Adam Walker").trim();
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ") || "Walker";

  document.getElementById("hero-eyebrow").textContent = details.eyebrow;
  document.getElementById("hero-name-first").textContent = firstName;
  document.getElementById("hero-name-last").textContent = lastName;
  document.getElementById("hero-title").textContent = details.title;
  document.getElementById("hero-summary").textContent = details.summary;
  document.getElementById("hero-focus").textContent = details.focus;
  document.getElementById("hero-location").textContent = details.location;
  document.getElementById("hero-availability").textContent = details.availability;
  document.title = fullName;
}

function populateHighlights(items, id) {
  const highlightsTag = document.getElementById(id);

  items.forEach((item) => {
    const card = getElement("article", "highlight-card");
    const title = getElement("h3", "highlight-card-title");
    title.textContent = item.title;
    const description = getElement("p", "highlight-card-description");
    description.textContent = item.description;

    card.append(title, description);
    highlightsTag.append(card);
  });
}

function getElement(tagName, className) {
  let item = document.createElement(tagName);
  item.className = className;
  return item;
}

function getBlogPreview(html) {
  const [, doc] = /<p>(.*?)<\/p>/s.exec(html) || [];
  if (!doc) {
    return "Read the full article for more details.";
  }

  const preview = document.createElement("div");
  preview.innerHTML = doc;
  return preview.textContent?.trim() || "Read the full article for more details.";
}

function getBlogDate(publishDate) {
  const elapsed = Date.now() - Date.parse(publishDate);

  // Time conversions in milliseconds
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (elapsed < msPerMinute) {
    const seconds = Math.floor(elapsed / msPerSecond);
    return `${seconds} seconds ago`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.floor(elapsed / msPerMinute);
    return `${minutes} minutes ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.floor(elapsed / msPerHour);
    return `${hours} hours ago`;
  } else if (elapsed < msPerMonth) {
    const days = Math.floor(elapsed / msPerDay);
    return days == 1 ? `${days} day ago` : `${days} days ago`;
  } else if (elapsed < msPerYear) {
    const months = Math.floor(elapsed / msPerMonth);
    return months == 1 ? `${months} month ago` : `${months} months ago`;
  } else {
    const years = Math.floor(elapsed / msPerYear);
    return years == 1 ? `${years} year ago` : `${years} years ago`;
  }
}

populateHero(hero);

populateHighlights(highlights, "hero-highlights");

populateBio(bio, "bio");

populateSkills(skills, "skills");

populateCertifications(certifications, "certifications");

fetchBlogsFromMedium(medium);

populateExp_Edu(experience, "experience");

populateExp_Edu(education, "education");

populateLinks(footer, "footer");
})();
