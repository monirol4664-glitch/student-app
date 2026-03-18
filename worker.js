// HASH PASSWORD
async function hash(password) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2,'0'))
    .join('');
}

// GRADE SYSTEM
function calculateGrade(mark) {
  if (mark >= 80) return { grade: "A+", gpa: 4.0 };
  if (mark >= 70) return { grade: "A", gpa: 3.75 };
  if (mark >= 60) return { grade: "A-", gpa: 3.5 };
  if (mark >= 50) return { grade: "B", gpa: 3.0 };
  if (mark >= 40) return { grade: "C", gpa: 2.5 };
  if (mark >= 33) return { grade: "D", gpa: 2.0 };
  return { grade: "F", gpa: 0.0 };
}

// TOKEN
function createToken(user) {
  return btoa(JSON.stringify({ id: user.id, role: user.role }));
}

function verifyToken(token) {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

// CORS
function cors() {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    }
  };
}

export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response("ok", cors());
    }

    const url = new URL(request.url);

    // ======================
    // SIGNUP
    // ======================
    if (url.pathname === "/signup") {
      try {
        const { username, password } = await request.json();

        if (!username || !password) {
          return new Response("Missing fields", { status: 400, ...cors() });
        }

        const hashed = await hash(password);

        await env.DB.prepare(
          "INSERT INTO users (username, password) VALUES (?, ?)"
        ).bind(username, hashed).run();

        return new Response("Registered. Wait for admin approval.", cors());

      } catch {
        return new Response("Username already exists", { status: 400, ...cors() });
      }
    }

    // ======================
    // LOGIN
    // ======================
    if (url.pathname === "/login") {
      const { username, password } = await request.json();
      const hashed = await hash(password);

      const user = await env.DB.prepare(
        "SELECT * FROM users WHERE username=? AND password=?"
      ).bind(username, hashed).first();

      if (!user) {
        return new Response("Invalid credentials", { status: 401, ...cors() });
      }

      // BLOCK IF NOT APPROVED
      if (user.role === "student" && user.approved === 0) {
        return new Response("Waiting for admin approval", { status: 403, ...cors() });
      }

      const token = createToken(user);
      return new Response(JSON.stringify({ token, user }), cors());
    }

    // ======================
    // AUTH CHECK
    // ======================
    const auth = request.headers.get("Authorization");
    const decoded = verifyToken(auth);

    if (!decoded) {
      return new Response("Unauthorized", { status: 401, ...cors() });
    }

    // ======================
    // PROFILE GET
    // ======================
    if (url.pathname === "/profile") {
      const user = await env.DB.prepare(
        "SELECT id, username, full_name, email, department, photo FROM users WHERE id=?"
      ).bind(decoded.id).first();

      return new Response(JSON.stringify(user), cors());
    }

    // ======================
    // PROFILE UPDATE
    // ======================
    if (url.pathname === "/update-profile") {
      const { full_name, email, department, photo } = await request.json();

      await env.DB.prepare(
        "UPDATE users SET full_name=?, email=?, department=?, photo=? WHERE id=?"
      ).bind(full_name, email, department, photo, decoded.id).run();

      return new Response("Profile updated", cors());
    }

    // ======================
    // GET RESULTS
    // ======================
    if (url.pathname === "/results") {
      const data = await env.DB.prepare(
        "SELECT subject, marks, grade, gpa, semester FROM results WHERE user_id=? ORDER BY semester"
      ).bind(decoded.id).all();

      return new Response(JSON.stringify(data.results), cors());
    }

    // ======================
    // ADMIN ONLY
    // ======================
    if (decoded.role === "admin") {

      // GET USERS
      if (url.pathname === "/users") {
        const users = await env.DB.prepare(
          "SELECT id, username, role, approved FROM users"
        ).all();

        return new Response(JSON.stringify(users.results), cors());
      }

      // APPROVE USER
      if (url.pathname === "/approve") {
        const { id } = await request.json();

        await env.DB.prepare(
          "UPDATE users SET approved=1 WHERE id=?"
        ).bind(id).run();

        return new Response("User approved", cors());
      }

      // ADD RESULT (WITH GPA + GRADE)
      if (url.pathname === "/add-result") {
        const { user_id, subject, marks, semester } = await request.json();

        if (!user_id || !subject || !marks || !semester) {
          return new Response("Missing fields", { status: 400, ...cors() });
        }

        const { grade, gpa } = calculateGrade(parseInt(marks));

        await env.DB.prepare(
          "INSERT INTO results (user_id, subject, marks, grade, gpa, semester) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(user_id, subject, marks, grade, gpa, semester).run();

        return new Response("Result added successfully", cors());
      }
    }

    return new Response("Not found", { status: 404 });
  }
};