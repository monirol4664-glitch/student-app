<script>
  let count = 0;
</script>

<style>
  main {
    text-align: center;
    margin-top: 100px;
    font-family: Arial;
  }

  button {
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    background: #2563eb;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background: #1d4ed8;
  }
</style>

<main>
  <h1>SvelteKit + Cloudflare 🚀</h1>
  <p>Button clicked {count} times</p>

  <button on:click={() => count++}>
    Click Me
  </button>
</main>