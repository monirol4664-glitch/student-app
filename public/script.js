// 🔗 CHANGE THIS AFTER DEPLOY
const API = "https://api.monirol4664.workers.dev";

// ======================
// AUTH FETCH
// ======================
function authFetch(url, options = {}) {
  options.headers = {
    ...options.headers,
    Authorization: localStorage.getItem("token"),
    "Content-Type": "application/json"
  };
  return fetch(API + url, options);
}

// ======================
// SIGNUP
// ======================
async function signup() {
  let res = await fetch(API + "/signup", {
    method: "POST",
    body: JSON.stringify({
      username: signupUser.value,
      password: signupPass.value
    })
  });

  msg.innerText = await res.text();
}

// ======================
// LOGIN
// ======================
async function login() {
  let res = await fetch(API + "/login", {
    method: "POST",
    body: JSON.stringify({
      username: loginUser.value,
      password: loginPass.value
    })
  });

  let text = await res.text();

  if (res.status !== 200) {
    msg.innerText = text;
    return;
  }

  let data = JSON.parse(text);

  localStorage.setItem("token", data.token);

  if (data.user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
}

// ======================
// LOGOUT
// ======================
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ======================
// PROFILE
// ======================
async function loadProfile() {
  let res = await authFetch("/profile");
  let data = await res.json();

  name.value = data.full_name || "";
  email.value = data.email || "";
  dept.value = data.department || "";
  photo.value = data.photo || "";
}

async function updateProfile() {
  let res = await authFetch("/update-profile", {
    method: "POST",
    body: JSON.stringify({
      full_name: name.value,
      email: email.value,
      department: dept.value,
      photo: photo.value
    })
  });

  alert(await res.text());
}

// ======================
// RESULTS + GPA
// ======================
async function loadResults() {
  let res = await authFetch("/results");
  let data = await res.json();

  let semesters = {};
  let totalGpa = 0;
  let count = 0;

  // group by semester
  data.forEach(r => {
    if (!semesters[r.semester]) {
      semesters[r.semester] = [];
    }
    semesters[r.semester].push(r);
  });

  let html = "";

  for (let sem in semesters) {
    html += `<h3>${sem}</h3>
    <table>
      <tr>
        <th>Subject</th>
        <th>Marks</th>
        <th>Grade</th>
        <th>GPA</th>
      </tr>`;

    semesters[sem].forEach(r => {
      html += `
        <tr>
          <td>${r.subject}</td>
          <td>${r.marks}</td>
          <td>${r.grade}</td>
          <td>${r.gpa}</td>
        </tr>
      `;

      totalGpa += r.gpa;
      count++;
    });

    html += `</table>`;
  }

  resultArea.innerHTML = html;

  if (count > 0) {
    let cgpa = (totalGpa / count).toFixed(2);
    gpaBox.innerHTML = `🎓 CGPA: ${cgpa}`;
  } else {
    gpaBox.innerHTML = "No results yet";
  }
}

// ======================
// ADMIN PANEL
// ======================
async function loadUsers() {
  let res = await authFetch("/users");
  let users = await res.json();

  let tableHTML = "";
  let dropdownHTML = "";

  users.forEach(u => {
    if (u.role === "student") {

      tableHTML += `
        <tr>
          <td>${u.username}</td>
          <td>${u.approved ? "Approved" : "Pending"}</td>
          <td>
            ${!u.approved ? `<button onclick="approveUser(${u.id})">Approve</button>` : ""}
          </td>
        </tr>
      `;

      if (u.approved) {
        dropdownHTML += `<option value="${u.id}">${u.username}</option>`;
      }
    }
  });

  userTable.innerHTML = tableHTML;
  userSelect.innerHTML = dropdownHTML;
}

// APPROVE USER
async function approveUser(id) {
  await authFetch("/approve", {
    method: "POST",
    body: JSON.stringify({ id })
  });

  alert("User Approved");
  loadUsers();
}

// ADD RESULT
async function addResult() {

  if (!userSelect.value) {
    alert("Select a student first!");
    return;
  }

  if (!subject.value || !marks.value || !semester.value) {
    alert("Fill all fields!");
    return;
  }

  await authFetch("/add-result", {
    method: "POST",
    body: JSON.stringify({
      user_id: userSelect.value,
      subject: subject.value,
      marks: marks.value,
      semester: semester.value
    })
  });

  alert("Result Added ✅");

  subject.value = "";
  marks.value = "";
  semester.value = "";
}