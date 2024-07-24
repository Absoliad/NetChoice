<script>
    /** @type {import('./$types').PageData} */
    import "$lib/assets/css/main.css";
    export let data;
</script>

<main>
    <h1>{data.title}</h1>
    <form method="POST">
        <label>
            Identifiant
            <input name="username" type="text" required/>
        </label>
        <label>
            Mot de passe
            <input name="password" type="password" required/>
        </label>
        <button type="submit">Connexion</button>
    </form>
</main>