document.addEventListener("DOMContentLoaded", () => {
  const contestsContent = document.getElementById("contests-content");
  const problemsContent = document.getElementById("problems-content");
  const userContent = document.getElementById("user-content");
  const contestsList = document.getElementById("contests-list");
  const problemsList = document.getElementById("problems-list");
  const userInfo = document.getElementById("user-info");

  function showContent(sectionToShow) {
    contestsContent.classList.add("d-none");
    problemsContent.classList.add("d-none");
    userContent.classList.add("d-none");

    sectionToShow.classList.remove("d-none");
  }

  function fetchContests() {
    console.log("Fetching contests...");
    fetch("https://codeforces.com/api/contest.list?gym=false")
      .then((response) => response.json())
      .then((data) => {
        console.log("Contests data:", data);
        contestsList.innerHTML = "";
        if (data.result) {
          data.result.forEach((contest) => {
            const contestDiv = document.createElement("div");
            contestDiv.className = "col-md-6 mb-3";
            contestDiv.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${contest.name}</h5>
                  <p class="card-text">Start Time: ${new Date(
                    contest.startTimeSeconds * 1000
                  ).toLocaleString()}</p>
                  <a href="https://codeforces.com/contest/${
                    contest.id
                  }" class="btn btn-primary" target="_blank">View Contest</a>
                </div>
              </div>
            `;
            contestsList.appendChild(contestDiv);
          });
        } else {
          contestsList.innerHTML = "<p>No contests found.</p>";
        }
      })
      .catch((error) => console.error("Error fetching contests data:", error));
  }

  function fetchProblems() {
    console.log("Fetching problems...");
    fetch("https://codeforces.com/api/problemset.problems")
      .then((response) => response.json())
      .then((data) => {
        console.log("Problems data:", data);
        problemsList.innerHTML = "";
        if (data.result && data.result.problems) {
          data.result.problems.forEach((problem) => {
            const problemDiv = document.createElement("div");
            problemDiv.className = "col-md-6 mb-3";
            problemDiv.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${problem.name}</h5>
                  <p class="card-text">Contest: ${problem.contestId}</p>
                  <a href="https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}" class="btn btn-primary" target="_blank">View Problem</a>
                </div>
              </div>
            `;
            problemsList.appendChild(problemDiv);
          });
        } else {
          problemsList.innerHTML = "<p>No problems found.</p>";
        }
      })
      .catch((error) => console.error("Error fetching problems data:", error));
  }

  function fetchUserInfo() {
    console.log("Fetching user information...");
   
    const userHandle = "tourist";
    fetch(`https://codeforces.com/api/user.info?handles=${userHandle}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data);
        userInfo.innerHTML = "";
        if (data.result && data.result.length > 0) {
          const user = data.result[0];
          userInfo.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${user.handle}</h5>
                <p class="card-text">Rating: ${user.rating}</p>
                <p class="card-text">Rank: ${user.rank}</p>
                <p class="card-text">Max Rating: ${user.maxRating}</p>
              </div>
            </div>
          `;
        } else {
          userInfo.innerHTML = "<p>No user information found.</p>";
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }

  document.getElementById("contests-tab").addEventListener("click", () => {
    showContent(contestsContent);
    fetchContests();
  });

  document.getElementById("problems-tab").addEventListener("click", () => {
    showContent(problemsContent);
    fetchProblems();
  });

  document.getElementById("user-tab").addEventListener("click", () => {
    showContent(userContent);
    fetchUserInfo();
  });

  document.getElementById("contests-tab").click();
});
