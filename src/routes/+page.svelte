<script>
  let name = "Cloudflare";
</script>

<main style="text-align:center;margin-top:100px">
  <h1>Hello from SvelteKit 🚀</h1>
  <p>Running on {name} Pages</p>

  <button on:click={() => name = "SvelteKit"}>
    Click Me
  </button>
</main>